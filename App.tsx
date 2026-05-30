import "./global.css";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, G, Line, Polygon } from "react-native-svg";
import { io, Socket } from "socket.io-client";
import {
  Battery,
  CircleHelp,
  Copy,
  Car,
  File,
  FilePenLine,
  FilePlus2,
  Info,
  LocateFixed,
  LogOut,
  List,
  Menu,
  RadioTower,
  Settings,
  Signal,
  Tractor,
  Trash2,
  Target,
  ChevronRight,
  Waves,
  X,
} from "lucide-react-native";

import { readImportedPlanFile } from "./src/utils/planImport";
import type { ImportedPlan, PlanLine } from "./src/types/plan";

type Page =
  | "connection"
  | "home"
  | "fields"
  | "fields_csv_import"
  | "fields_dxf_import"
  | "templates"
  | "swozi"
  | "status"
  | "positioning"
  | "settings"
  | "howto"
  | "about";

type LayerVisibility = { boundary: boolean; marking: boolean; center: boolean };
type DiscoveredRover = {
  id: string;
  name: string;
  host: string;
  port: number;
  version?: string;
  responseTime?: number;
};

type SystemHealth = {
  ros_node?: boolean;
  fcu_connected?: boolean;
  armed?: boolean;
  mode?: string;
  rpp_state?: string | number | null;
  pose_age_ms?: number | null;
  mission_state?: string | null;
};

type TelemetrySnapshot = {
  pos_n?: number | null;
  pos_e?: number | null;
  heading_ned_deg?: number | null;
  xtrack_m?: number | null;
  heading_err_deg?: number | null;
  lookahead_m?: number | null;
  speed_m_s?: number | null;
  kappa?: number | null;
  dist_to_goal_m?: number | null;
  pose_age_ms?: number | null;
  rpp_state?: number | null;
  rpp_state_name?: string | null;
  armed?: boolean | null;
  mode?: string | null;
  connected?: boolean | null;
  battery_v?: number | null;
  battery_pct?: number | null;
  gps_fix?: number | null;
  gps_sat?: number | null;
  lat?: number | null;
  lon?: number | null;
  alt?: number | null;
};

type ActivityEntry = {
  timestamp: string;
  level: string;
  message: string;
};

const BG = "#d9d9dc";
const TOP = "#ececee";
const GREEN = "#eef2f7";
const GREEN_DARK = "#f8fafc";
const TEAL = "#0f988f";
const LOCAL_WS_CANDIDATES = [
  "http://127.0.0.1:5001",
  "http://localhost:5001",
  "http://192.168.1.10:5001",
  "http://192.168.0.10:5001",
  "http://10.0.2.2:5001",
];
const PRIORITY_BACKEND_IPS = [
  "192.168.1.102",
  "192.168.1.242",
  "192.168.1.213",
  "192.168.1.100",
  "192.168.1.101",
  "192.168.1.103",
  "192.168.1.104",
  "192.168.1.105",
  "192.168.1.210",
  "192.168.1.211",
  "192.168.1.214",
  "192.168.1.215",
  "192.168.1.25",
  "192.168.1.26",
  "192.168.1.27",
  "192.168.1.28",
  "192.168.1.29",
  "192.168.1.30",
  "192.168.1.31",
  "192.168.1.32",
  "192.168.1.33",
  "192.168.1.34",
  "192.168.1.35",
];
const DISCOVERY_REFRESH_MS = 5000;
const DISCOVERY_PORT = 5001;
const SUBNET_HOST_MIN = 1;
const SUBNET_HOST_MAX = 254;
const SUBNET_SCAN_CONCURRENCY = 24;

const MENU_ITEMS: Array<{ key: Page; label: string; icon: React.ReactNode }> = [
  { key: "fields", label: "Fields", icon: <File size={22} color="#fff" /> },
  { key: "swozi", label: "Swozi", icon: <Tractor size={22} color="#fff" /> },
  { key: "status", label: "Status", icon: <Waves size={22} color="#fff" /> },
  { key: "positioning", label: "Positioning", icon: <LocateFixed size={22} color="#fff" /> },
  { key: "settings", label: "Settings", icon: <Settings size={22} color="#fff" /> },
  { key: "howto", label: "How To", icon: <CircleHelp size={22} color="#fff" /> },
  { key: "about", label: "About", icon: <Info size={22} color="#fff" /> },
];

export default function App() {
  const [page, setPage] = useState<Page>("connection");
  const [menuOpen, setMenuOpen] = useState(true);
  const [selectedWs, setSelectedWs] = useState<string>("");
  const [manualHost, setManualHost] = useState<string>("http://192.168.1.28:5001");
  const [wsStatus, setWsStatus] = useState<"idle" | "scanning" | "ready" | "connecting" | "connected" | "error">("idle");
  const [wsError, setWsError] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [discoveredRovers, setDiscoveredRovers] = useState<DiscoveredRover[]>([]);
  const [fieldGeneratorOpen, setFieldGeneratorOpen] = useState(false);
  const [importedPlan, setImportedPlan] = useState<ImportedPlan | null>(null);
  const [lines, setLines] = useState<PlanLine[]>([]);
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);
  const [layerVisibility, setLayerVisibility] = useState<LayerVisibility>({
    boundary: true,
    marking: true,
    center: true,
  });
  const [telemetryDrawerOpen, setTelemetryDrawerOpen] = useState(false);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [telemetrySnapshot, setTelemetrySnapshot] = useState<TelemetrySnapshot | null>(null);
  const [activityFeed, setActivityFeed] = useState<ActivityEntry[]>([]);
  const [discoveryFeed, setDiscoveryFeed] = useState<DiscoveredRover[]>([]);
  const [telemetryError, setTelemetryError] = useState<string>("");
  const [telemetryLoading, setTelemetryLoading] = useState(false);
  const [toggleA, setToggleA] = useState(false);
  const [toggleB, setToggleB] = useState(false);
  const [toggleC, setToggleC] = useState(true);
  const [toggleD, setToggleD] = useState(false);
  const [delayA, setDelayA] = useState(0.1);
  const [delayB, setDelayB] = useState(0.1);

  const activeMenu = useMemo(() => MENU_ITEMS.find((x) => x.key === page), [page]);
  const sectionTitle =
    page === "fields" || page === "fields_csv_import" || page === "fields_dxf_import"
      ? "Fields"
      : activeMenu?.label ?? "Section";
  const isOffline = wsError.startsWith("Offline");
  const apiBaseUrl = selectedWs || manualHost;

  const handleImport = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: false,
        copyToCacheDirectory: true,
      });
      if (result.canceled || result.assets.length === 0) return;
      const asset = result.assets[0];
      const fileName = asset.name ?? "imported-plan.dxf";
      const extension = fileName.split(".").pop()?.toLowerCase();
      if (extension !== "csv" && extension !== "dxf") {
        Alert.alert("Unsupported", "Only CSV and DXF are supported.");
        return;
      }
      const plan: ImportedPlan = {
        fileName,
        uri: asset.uri,
        fileType: extension as "csv" | "dxf",
      };
      const parsed = await readImportedPlanFile(plan);
      setImportedPlan(plan);
      setLines(parsed);
      setSelectedLineId(parsed[0]?.id ?? null);
      setLayerVisibility({ boundary: true, marking: true, center: true });
    } catch {
      Alert.alert("Import failed", "Could not import file.");
    }
  };

  const handleImportTyped = async (fileType: ImportedPlan["fileType"]) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: false,
        copyToCacheDirectory: true,
      });
      if (result.canceled || result.assets.length === 0) return;
      const asset = result.assets[0];
      const fileName = asset.name ?? `imported-plan.${fileType}`;
      const extension = fileName.split(".").pop()?.toLowerCase();
      if (extension !== fileType) {
        Alert.alert("Unsupported", `Only ${fileType.toUpperCase()} files are supported here.`);
        return;
      }

      const plan: ImportedPlan = {
        fileName,
        uri: asset.uri,
        fileType,
      };
      const parsed = await readImportedPlanFile(plan);
      setImportedPlan(plan);
      setLines(parsed);
      setSelectedLineId(parsed[0]?.id ?? null);
      setLayerVisibility({ boundary: true, marking: true, center: true });
    } catch {
      Alert.alert("Import failed", "Could not import file.");
    }
  };

  const deleteSelectedLine = () => {
    if (!selectedLineId) return;
    setLines((prev) => {
      const next = prev.filter((line) => line.id !== selectedLineId);
      setSelectedLineId(next[0]?.id ?? null);
      if (next.length === 0) {
        setImportedPlan(null);
      }
      return next;
    });
  };

  const deleteEntirePlan = () => {
    setLines([]);
    setSelectedLineId(null);
    setImportedPlan(null);
    setLayerVisibility({ boundary: true, marking: true, center: true });
  };

  const connectSelectedWebsocket = async () => {
    if (!selectedWs) return;
    setWsStatus("connecting");
    setWsError("");

    try {
      const nextSocket = io(selectedWs, {
        transports: ["websocket"],
        timeout: 5000,
      });

      await new Promise<void>((resolve, reject) => {
        nextSocket.on("connect", () => {
          resolve();
        });
        nextSocket.on("connect_error", (err) => {
          reject(err);
        });
      });

      setSocket(nextSocket);
      setWsStatus("connected");
      setPage("home");
      setMenuOpen(true);
    } catch (error) {
      setWsStatus("error");
      setWsError(error instanceof Error ? error.message : "Unable to connect");
    }
  };

  const disconnectToConnectionScreen = () => {
    socket?.disconnect();
    setSocket(null);
    setWsStatus("idle");
    setPage("connection");
    setMenuOpen(true);
  };

  const enterOfflinePreview = () => {
    socket?.disconnect();
    setSocket(null);
    setSelectedWs("");
    setWsStatus("idle");
    setWsError("");
    setPage("home");
    setMenuOpen(true);
  };

  const scanForWebsockets = async () => {
    setWsStatus("scanning");
    setWsError("");
    const candidateHosts = Array.from(
      new Set([
        ...priorityScanHosts(),
        ...LOCAL_WS_CANDIDATES,
        manualHost,
        ...buildSubnetSweepCandidates(manualHost),
      ])
    );

    const discovered = (
      await runWithConcurrency(candidateHosts, SUBNET_SCAN_CONCURRENCY, async (candidate) => {
        const responseTime = await probeBackendHost(candidate);
        if (responseTime === null) return [] as DiscoveredRover[];

        const beacons = await discoverBackendBeacons(candidate, responseTime);
        if (beacons.length > 0) {
          return beacons;
        }

        const parsed = parseHost(candidate);
        return parsed
          ? [{
              id: `${parsed.host}-${parsed.port}`,
              name: `Rover ${parsed.host.split(".").pop() ?? parsed.host}`,
              host: parsed.host,
              port: parsed.port,
              version: "1.0",
              responseTime,
            }]
          : [];
      })
    ).flat();

    discovered.sort((a, b) => {
      const aPriority = PRIORITY_BACKEND_IPS.includes(a.host);
      const bPriority = PRIORITY_BACKEND_IPS.includes(b.host);
      if (aPriority && !bPriority) return -1;
      if (!aPriority && bPriority) return 1;
      return (a.responseTime ?? 9999) - (b.responseTime ?? 9999);
    });

    const seen = new Set<string>();
    const uniqueDiscovered = discovered.filter((entry) => {
      const key = `${entry.host}:${entry.port}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    setDiscoveredRovers(uniqueDiscovered);

    const bestHost = uniqueDiscovered[0] ? `http://${uniqueDiscovered[0].host}:${uniqueDiscovered[0].port}` : "";
    if (bestHost) {
      setSelectedWs(bestHost);
      setWsStatus("ready");
      setWsError("");
      return;
    }

    setSelectedWs("");
    setWsStatus("idle");
    setWsError("Offline: no backend found on the network.");
  };

  const handleSelectWebsocket = useCallback(
    (value: string) => {
      setSelectedWs(value);
    },
    []
  );

  useEffect(() => {
    if (page !== "connection") return;
    void scanForWebsockets();
    const timer = setInterval(() => {
      void scanForWebsockets();
    }, DISCOVERY_REFRESH_MS);
    return () => clearInterval(timer);
  }, [page]);

  useEffect(() => {
    if (page !== "home") return;
    void refreshTelemetryPanel();
    const timer = setInterval(() => {
      void refreshTelemetryPanel();
    }, 2500);
    return () => clearInterval(timer);
  }, [page, apiBaseUrl, selectedWs]);

  async function refreshTelemetryPanel() {
    if (!apiBaseUrl) return;
    setTelemetryLoading(true);
    setTelemetryError("");
    try {
      const [healthRes, telemetryRes, activityRes, discoverRes] = await Promise.all([
        fetchJson<SystemHealth>(`${apiBaseUrl}/api/healthz`),
        fetchJson<TelemetrySnapshot>(`${apiBaseUrl}/api/telemetry/latest`),
        fetchJson<ActivityEntry[]>(`${apiBaseUrl}/api/activity`),
        fetchJson<{ beacons?: DiscoveredRover[] }>(`${apiBaseUrl}/api/discover`, { method: "POST" }),
      ]);
      setSystemHealth(healthRes);
      setTelemetrySnapshot(telemetryRes);
      setActivityFeed(Array.isArray(activityRes) ? activityRes.slice(-8).reverse() : []);
      setDiscoveryFeed(Array.isArray(discoverRes?.beacons) ? discoverRes.beacons : []);
    } catch (error) {
      setTelemetryError(error instanceof Error ? error.message : "Unable to load telemetry");
    } finally {
      setTelemetryLoading(false);
    }
  }

  async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    try {
      const res = await fetch(url, { ...init, signal: controller.signal });
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      return (await res.json()) as T;
    } finally {
      clearTimeout(timeout);
    }
  }

  function priorityScanHosts() {
    return PRIORITY_BACKEND_IPS.map((ip) => `http://${ip}:${DISCOVERY_PORT}`);
  }

  function parseHost(candidate: string) {
    try {
      const url = new URL(candidate);
      return {
        host: url.hostname,
        port: Number(url.port || 5001),
      };
    } catch {
      return null;
    }
  }

  async function probeBackendHost(candidate: string): Promise<number | null> {
    const start = Date.now();
    const endpoints = ["/api/ping", "/api/healthz"];
    for (const endpoint of endpoints) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 1200);
        const res = await fetch(`${candidate}${endpoint}`, { signal: controller.signal });
        clearTimeout(timeout);
        if (res.ok) return Date.now() - start;
      } catch {
        // try next endpoint
      }
    }
    return null;
  }

  function buildSubnetSweepCandidates(seedHost: string) {
    const parsed = parseHost(seedHost);
    if (!parsed) return [];
    const octets = parsed.host.split(".");
    if (octets.length !== 4) return [];
    if (!isPrivateLanIp(parsed.host)) return [];

    const prefix = octets.slice(0, 3).join(".");
    return Array.from({ length: SUBNET_HOST_MAX - SUBNET_HOST_MIN + 1 }, (_, index) => {
      const hostOctet = SUBNET_HOST_MIN + index;
      return `http://${prefix}.${hostOctet}:${DISCOVERY_PORT}`;
    });
  }

  function isPrivateLanIp(host: string) {
    const octets = host.split(".").map((part) => Number(part));
    if (octets.length !== 4 || octets.some((part) => Number.isNaN(part))) {
      return false;
    }

    const [a, b] = octets;
    if (a === 10) return true;
    if (a === 192 && b === 168) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    return false;
  }

  async function runWithConcurrency<T, R>(
    items: T[],
    limit: number,
    worker: (item: T) => Promise<R>
  ): Promise<R[]> {
    const results: R[] = [];
    let cursor = 0;

    const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const currentIndex = cursor++;
        const value = items[currentIndex];
        const result = await worker(value);
        results[currentIndex] = result;
      }
    });

    await Promise.all(runners);
    return results;
  }

  async function discoverBackendBeacons(candidate: string, responseTime: number): Promise<DiscoveredRover[]> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1500);
      const res = await fetch(`${candidate}/api/discover`, {
        method: "POST",
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) return [];
      const body = await res.json();
      return (body.beacons ?? []).map((rover: any) => ({
        id: rover.id ?? rover.rover_id ?? `${rover.host}-${rover.port}`,
        name: rover.name ?? rover.rover_name ?? `Rover ${String(rover.host ?? "").split(".").pop() ?? ""}`,
        host: rover.host ?? rover.ip ?? "",
        port: Number(rover.port ?? 5001),
        version: rover.version ?? "1.0",
        responseTime,
      })).filter((entry: DiscoveredRover) => Boolean(entry.host));
    } catch {
      return [];
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
        {page === "connection" ? (
          <ConnectionView
            selectedWs={selectedWs}
            manualHost={manualHost}
            wsError={wsError}
            wsStatus={wsStatus}
            isOffline={isOffline}
            discoveredRovers={discoveredRovers}
            onRefresh={scanForWebsockets}
            onSelect={handleSelectWebsocket}
            onManualHostChange={setManualHost}
            onConnect={connectSelectedWebsocket}
            onOfflinePreview={enterOfflinePreview}
          />
        ) : page === "home" ? (
          <HomeView
            importedPlan={importedPlan}
            lines={lines}
            selectedLineId={selectedLineId}
            onSelectLine={setSelectedLineId}
            onDeleteSelectedLine={deleteSelectedLine}
            onDeleteEntirePlan={deleteEntirePlan}
            menuOpen={menuOpen}
            onToggleMenu={() => setMenuOpen((v) => !v)}
            onNav={(p) => {
              setPage(p);
              setMenuOpen(false);
            }}
          onDisconnect={disconnectToConnectionScreen}
          layerVisibility={layerVisibility}
          setLayerVisibility={setLayerVisibility}
          telemetryDrawerOpen={telemetryDrawerOpen}
          onOpenTelemetry={() => setTelemetryDrawerOpen(true)}
          onCloseTelemetry={() => setTelemetryDrawerOpen(false)}
          systemHealth={systemHealth}
          telemetrySnapshot={telemetrySnapshot}
          activityFeed={activityFeed}
          discoveryFeed={discoveryFeed}
          telemetryError={telemetryError}
          telemetryLoading={telemetryLoading}
        />
      ) : (
          <SectionScreen
            title={sectionTitle}
            page={page}
            importedPlan={importedPlan}
            lines={lines}
            selectedLineId={selectedLineId}
            onBack={() =>
              setPage(
                page === "fields_csv_import" || page === "fields_dxf_import"
                  ? "fields"
                  : "home"
              )
            }
            onNavigate={setPage}
            onImport={handleImport}
            onImportCsv={() => handleImportTyped("csv")}
            onImportDxf={() => handleImportTyped("dxf")}
            onOpenFieldGenerator={() => setFieldGeneratorOpen(true)}
            onSelectLine={setSelectedLineId}
            onGenerateTemplate={(name, generatedLines) => {
              setImportedPlan({ fileName: `${name}.dxf`, uri: "", fileType: "dxf" });
              setLines(generatedLines);
              setSelectedLineId(generatedLines[0]?.id ?? null);
              setPage("home");
            }}
            layerVisibility={layerVisibility}
            setLayerVisibility={setLayerVisibility}
            setImportedPlan={setImportedPlan}
            toggleA={toggleA}
            toggleB={toggleB}
            toggleC={toggleC}
            toggleD={toggleD}
            delayA={delayA}
            delayB={delayB}
            setToggleA={setToggleA}
            setToggleB={setToggleB}
            setToggleC={setToggleC}
            setToggleD={setToggleD}
            setDelayA={setDelayA}
            setDelayB={setDelayB}
          />
      )}
      <FieldGeneratorModal
        visible={fieldGeneratorOpen}
        onClose={() => setFieldGeneratorOpen(false)}
        onGenerate={(name, generatedLines) => {
          setImportedPlan({ fileName: `${name}.dxf`, uri: "", fileType: "dxf" });
          setLines(generatedLines);
          setSelectedLineId(generatedLines[0]?.id ?? null);
          setLayerVisibility({ boundary: true, marking: true, center: true });
          setFieldGeneratorOpen(false);
          setPage("home");
        }}
      />
    </SafeAreaView>
  </SafeAreaProvider>
  );
}

function TopBar({
  title,
  onBack,
  onMorePress,
}: {
  title: string;
  onBack?: () => void;
  onMorePress?: () => void;
}) {
  return (
    <View
      style={{
        height: 76,
        backgroundColor: "#f8fafc",
        borderBottomWidth: 1,
        borderBottomColor: "#d7dee8",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 14,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            hitSlop={14}
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              backgroundColor: "#eef2f7",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#d7dee8",
            }}
          >
            <Text style={{ fontSize: 24, color: "#0f172a", lineHeight: 24 }}>‹</Text>
          </Pressable>
        ) : null}
        <Text style={{ fontSize: 18, color: "#0f172a", fontWeight: "700" }}>{title}</Text>
      </View>
      {onMorePress ? (
        <Pressable
          onPress={onMorePress}
          hitSlop={14}
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            backgroundColor: "#eef2f7",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#d7dee8",
          }}
        >
          <Text style={{ fontSize: 20, color: "#0f172a", lineHeight: 20 }}>⋮</Text>
        </Pressable>
      ) : (
        <View style={{ width: 38, height: 38 }} />
      )}
    </View>
  );
}

function HomeView({
  importedPlan,
  lines,
  selectedLineId,
  onSelectLine,
  onDeleteSelectedLine,
  onDeleteEntirePlan,
  menuOpen,
  onToggleMenu,
  onNav,
  onDisconnect,
  layerVisibility,
  setLayerVisibility,
  telemetryDrawerOpen,
  onOpenTelemetry,
  onCloseTelemetry,
  systemHealth,
  telemetrySnapshot,
  activityFeed,
  discoveryFeed,
  telemetryError,
  telemetryLoading,
}: {
  importedPlan: ImportedPlan | null;
  lines: PlanLine[];
  selectedLineId: string | null;
  onSelectLine: (id: string | null) => void;
  onDeleteSelectedLine: () => void;
  onDeleteEntirePlan: () => void;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onNav: (p: Page) => void;
  onDisconnect: () => void;
  layerVisibility: LayerVisibility;
  setLayerVisibility: React.Dispatch<React.SetStateAction<LayerVisibility>>;
  telemetryDrawerOpen: boolean;
  onOpenTelemetry: () => void;
  onCloseTelemetry: () => void;
  systemHealth: SystemHealth | null;
  telemetrySnapshot: TelemetrySnapshot | null;
  activityFeed: ActivityEntry[];
  discoveryFeed: DiscoveredRover[];
  telemetryError: string;
  telemetryLoading: boolean;
}) {
  const selectedLine = lines.find((line) => line.id === selectedLineId) ?? null;
  const hasPlan = lines.length > 0;
  const hasSelectedLine = Boolean(selectedLine);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteScope, setDeleteScope] = useState<"line" | "plan" | null>(null);
  const swipeResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) => gesture.dx < -16 && Math.abs(gesture.dy) < 18,
        onPanResponderRelease: (_, gesture) => {
          if (gesture.dx < -90) {
            onOpenTelemetry();
          }
        },
      }),
    [onOpenTelemetry]
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f1f5f9" }} {...swipeResponder.panHandlers}>
      <View style={{ height: 66, backgroundColor: GREEN, flexDirection: "row", alignItems: "center" }}>
        <View style={{ width: "50%", height: "100%", flexDirection: "row", alignItems: "center" }}>
          <Pressable
            onPress={onToggleMenu}
            style={{
              width: 72,
              height: "100%",
              backgroundColor: "#0f172a",
              alignItems: "center",
              justifyContent: "center",
              borderRightWidth: 1,
              borderRightColor: "#cbd5e1",
            }}
          >
            <Menu size={36} color="#fff" />
          </Pressable>

          <View style={{ flex: 1, paddingLeft: 14, paddingRight: 12 }}>
            {importedPlan ? (
              <Text style={{ color: "#0f172a", fontSize: 18, fontWeight: "700" }} numberOfLines={1}>
                {importedPlan.fileName}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={{ width: "50%", height: "100%", flexDirection: "row", backgroundColor: "#e2e8f0", borderLeftWidth: 1, borderLeftColor: "#cbd5e1" }}>
          {[
            <Battery key="battery" size={22} color="#475569" />,
            <Target key="target" size={22} color="#475569" />,
            <LocateFixed key="loc" size={22} color="#475569" />,
            <Car key="car" size={22} color="#475569" />,
            <Signal key="signal" size={22} color="#475569" />,
          ].map((icon, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                borderRightWidth: i < 4 ? 1 : 0,
                borderRightColor: "#cbd5e1",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </View>
          ))}
        </View>
      </View>

      <View style={{ flex: 1, position: "relative" }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ width: "50%", backgroundColor: "#f8fafc" }}>
            <View style={{ flex: 1, margin: 14, borderRadius: 16, overflow: "hidden", backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#d8e1eb" }}>
              <PlanPreview lines={lines} visibility={layerVisibility} selectedLineId={selectedLineId} onSelectLine={onSelectLine} />
            </View>
          </View>

          <View style={{ flex: 1, backgroundColor: "#eef2f7", padding: 14 }}>
            <View
              style={{
                flex: 1,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "#d8e1eb",
                backgroundColor: "#f8fafc",
                overflow: "hidden",
                shadowColor: "#0f172a",
                shadowOpacity: 0.04,
                shadowRadius: 18,
                shadowOffset: { width: 0, height: 10 },
                elevation: 2,
              }}
            >
              <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: "#e2e8f0" }}>
                <Text style={{ color: "#64748b", fontSize: 11, fontWeight: "800", letterSpacing: 1.4, textTransform: "uppercase" }}>
                  Line Details
                </Text>
                <Text style={{ color: "#0f172a", fontSize: 24, fontWeight: "800", marginTop: 6 }} numberOfLines={2}>
                  {selectedLine ? selectedLine.label : "No line selected"}
                </Text>
                <Text style={{ color: "#64748b", fontSize: 13, marginTop: 4, lineHeight: 18 }}>
                  {selectedLine
                    ? "Geometry, metadata, and layer visibility are shown in one compact inspection view."
                    : "Tap a line in the preview to inspect its measurements and geometry."}
                </Text>
              </View>

              <View style={{ flex: 1, padding: 16, justifyContent: "space-between" }}>
                <View style={{ gap: 14 }}>
                  {selectedLine ? (
                    <>
                      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                        <MetricChip label="Layer" value={selectedLine.layer} />
                        <MetricChip label="Length" value={`${lineLength(selectedLine).toFixed(2)} m`} />
                        <MetricChip label="Angle" value={`${lineAngle(selectedLine).toFixed(2)}°`} />
                        <MetricChip label="Width" value={`${selectedLine.width.toFixed(2)} m`} />
                      </View>

                      <View style={{ gap: 10 }}>
                        <MetricRow label="From" value={`(${selectedLine.from.x.toFixed(2)}, ${selectedLine.from.y.toFixed(2)})`} />
                        <MetricRow label="To" value={`(${selectedLine.to.x.toFixed(2)}, ${selectedLine.to.y.toFixed(2)})`} />
                        <MetricRow label="Point IDs" value={`${selectedLine.from.id} -> ${selectedLine.to.id}`} />
                        <MetricRow label="Line ID" value={selectedLine.id} />
                        <MetricRow label="Label" value={selectedLine.label} />
                      </View>
                    </>
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        minHeight: 180,
                        padding: 16,
                        borderRadius: 16,
                        backgroundColor: "#ffffff",
                        borderWidth: 1,
                        borderColor: "#e2e8f0",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ color: "#334155", fontSize: 15, lineHeight: 22 }}>
                        The plan view is ready. Select any boundary, marking, or center line to inspect it here.
                      </Text>
                    </View>
                  )}
                </View>

                {hasPlan ? (
                  <View
                    style={{
                      marginTop: 16,
                      paddingTop: 14,
                      borderTopWidth: 1,
                      borderTopColor: "#e2e8f0",
                    }}
                  >
                    <Text style={{ color: "#64748b", fontSize: 12, fontWeight: "800", marginBottom: 10, letterSpacing: 0.8, textTransform: "uppercase" }}>
                      Visible Layers
                    </Text>
                    <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
                      <CompactLayerToggle
                        label="Boundary"
                        value={layerVisibility.boundary}
                        onToggle={() => setLayerVisibility((prev) => ({ ...prev, boundary: !prev.boundary }))}
                      />
                      <CompactLayerToggle
                        label="Marking"
                        value={layerVisibility.marking}
                        onToggle={() => setLayerVisibility((prev) => ({ ...prev, marking: !prev.marking }))}
                      />
                      <CompactLayerToggle
                        label="Center"
                        value={layerVisibility.center}
                        onToggle={() => setLayerVisibility((prev) => ({ ...prev, center: !prev.center }))}
                      />
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
            <View style={{ marginTop: 16, marginBottom: 12, paddingHorizontal: 4 }}>
              <Pressable
                onPress={onOpenTelemetry}
                style={telemetryCtaStyles.outer}
              >
                <View style={telemetryCtaStyles.inner}>
                  <View style={telemetryCtaStyles.leftRail}>
                    <View style={telemetryCtaStyles.dot} />
                    <View style={telemetryCtaStyles.line} />
                  </View>
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <Text style={telemetryCtaStyles.title}>System Panel</Text>
                    <Text style={telemetryCtaStyles.subtitle}>
                      Swipe right or tap for health, telemetry, discovery, and activity
                    </Text>
                  </View>
                  <View style={telemetryCtaStyles.chevronWrap}>
                    <ChevronRight size={18} color="#e2e8f0" />
                  </View>
                </View>
              </Pressable>
            </View>

            <View style={{ height: 66, backgroundColor: "#e2e8f0", borderTopWidth: 1, borderTopColor: "#cbd5e1", flexDirection: "row" }}>
              {[
                <LocateFixed key="b-loc" size={22} color="#475569" />,
                <Copy key="b-copy" size={22} color="#475569" />,
                <List key="b-lines" size={22} color="#475569" />,
                <Trash2 key="b-del" size={22} color="#475569" />,
                <Signal key="b-signal" size={22} color="#475569" />,
              ].map((icon, i) => (
                <Pressable
                  key={i}
                  onPress={i === 3 ? () => setDeleteDialogOpen(true) : undefined}
                  style={{
                    flex: 1,
                    borderRightWidth: i < 4 ? 1 : 0,
                    borderRightColor: "#cbd5e1",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: i === 3 && hasPlan ? "#b91c1c" : "transparent",
                  }}
                >
                  {i === 3 && hasPlan && React.isValidElement(icon)
                    ? React.cloneElement(icon as React.ReactElement<{ color?: string }>, { color: "#fff" })
                    : icon}
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        <Modal transparent visible={deleteDialogOpen} animationType="fade" onRequestClose={() => setDeleteDialogOpen(false)}>
          <Pressable
            style={{ flex: 1, backgroundColor: "rgba(15,23,42,0.25)", justifyContent: "center", padding: 20 }}
            onPress={() => {
              setDeleteDialogOpen(false);
              setDeleteScope(null);
            }}
          >
            <Pressable
              onPress={() => {}}
              style={{
                backgroundColor: "#fff",
                borderRadius: 22,
                padding: 18,
                borderWidth: 1,
                borderColor: "#d7dee8",
                maxWidth: 520,
                width: "100%",
                alignSelf: "center",
                shadowColor: "#000",
                shadowOpacity: 0.12,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 12 },
                elevation: 5,
              }}
            >
              <Text style={{ color: "#0f172a", fontSize: 20, fontWeight: "800" }}>Delete what?</Text>
              <Text style={{ color: "#64748b", marginTop: 6, lineHeight: 20 }}>
                Choose whether to delete the selected line or remove the entire plan.
              </Text>

              <View style={{ marginTop: 16, padding: 12, borderRadius: 18, backgroundColor: "#f8fafc", borderWidth: 1, borderColor: "#e2e8f0" }}>
                <Text style={{ color: "#64748b", fontSize: 11, fontWeight: "800", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10 }}>
                  Choice
                </Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable
                  disabled={!hasSelectedLine}
                  onPress={() => setDeleteScope("line")}
                  style={{
                    flex: 1,
                    paddingVertical: 14,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: deleteScope === "line" ? "#0f172a" : "#d7dee8",
                    backgroundColor: deleteScope === "line" ? "#eef2ff" : "#ffffff",
                    alignItems: "center",
                    opacity: hasSelectedLine ? 1 : 0.45,
                  }}
                >
                  <Text style={{ color: "#0f172a", fontWeight: "800" }}>Selected line</Text>
                </Pressable>
                <Pressable
                  onPress={() => setDeleteScope("plan")}
                  style={{
                    flex: 1,
                    paddingVertical: 14,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: deleteScope === "plan" ? "#0f172a" : "#d7dee8",
                    backgroundColor: deleteScope === "plan" ? "#eef2ff" : "#ffffff",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#0f172a", fontWeight: "800" }}>Full plan</Text>
                </Pressable>
                </View>
                {!hasSelectedLine ? (
                  <Text style={{ color: "#94a3b8", fontSize: 12, marginTop: 10, lineHeight: 18 }}>
                    No line is selected, so the selected-line option is disabled.
                  </Text>
                ) : null}
              </View>

              <View style={{ marginTop: 18, padding: 12, borderRadius: 18, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#e2e8f0" }}>
                <Text style={{ color: "#64748b", fontSize: 11, fontWeight: "800", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10 }}>
                  Action
                </Text>
                <View style={{ flexDirection: "row", gap: 12 }}>
                <Pressable
                  onPress={() => {
                    setDeleteDialogOpen(false);
                    setDeleteScope(null);
                  }}
                  style={{
                    flex: 1,
                    paddingVertical: 13,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: "#cbd5e1",
                    backgroundColor: "#f8fafc",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#0f172a", fontWeight: "800" }}>Cancel</Text>
                </Pressable>
                <Pressable
                  disabled={!deleteScope || (deleteScope === "line" && !hasSelectedLine)}
                  onPress={() => {
                    if (deleteScope === "line") {
                      onDeleteSelectedLine();
                    } else if (deleteScope === "plan") {
                      onDeleteEntirePlan();
                    }
                    setDeleteDialogOpen(false);
                    setDeleteScope(null);
                  }}
                  style={{
                    flex: 1,
                    paddingVertical: 13,
                    borderRadius: 16,
                    backgroundColor: deleteScope && !(deleteScope === "line" && !hasSelectedLine) ? "#b91c1c" : "#94a3b8",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "800" }}>Delete</Text>
                </Pressable>
                </View>
              </View>
            </Pressable>
          </Pressable>
        </Modal>

        {menuOpen ? (
          <View
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "50%",
              backgroundColor: "#0f172a",
              paddingVertical: 14,
              paddingHorizontal: 12,
            }}
          >
            {MENU_ITEMS.map((item) => (
              <Pressable
                key={item.key}
                onPress={() => onNav(item.key)}
                style={{ flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 12 }}
              >
                <View
                  style={{
                    width: 68,
                    height: 68,
                    backgroundColor: "#111827",
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: "#334155",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item.icon}
                </View>
                <Text style={{ color: "#f8fafc", fontSize: 34 / 2 }}>{item.label}</Text>
              </Pressable>
            ))}
            <View style={{ marginTop: 4 }}>
              <Pressable onPress={onDisconnect} style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                <View
                  style={{
                    width: 68,
                    height: 68,
                    backgroundColor: "#111827",
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: "#334155",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <LogOut size={22} color="#fff" />
                </View>
                <Text style={{ color: "#f8fafc", fontSize: 34 / 2 }}>Exit</Text>
              </Pressable>
            </View>
          </View>
        ) : null}
      </View>

      <TelemetryDrawer
        visible={telemetryDrawerOpen}
        onClose={onCloseTelemetry}
        systemHealth={systemHealth}
        telemetrySnapshot={telemetrySnapshot}
        activityFeed={activityFeed}
        discoveryFeed={discoveryFeed}
        telemetryError={telemetryError}
        telemetryLoading={telemetryLoading}
      />
    </View>
  );
}

const telemetryCtaStyles = {
  outer: {
    width: "100%",
    minHeight: 84,
    borderRadius: 18,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#d7e0ea",
    overflow: "hidden" as const,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  inner: {
    flex: 1,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  leftRail: {
    width: 18,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 99,
    backgroundColor: "#0f172a",
  },
  line: {
    width: 2,
    height: 30,
    borderRadius: 999,
    backgroundColor: "#cbd5e1",
  },
  title: {
    color: "#0f172a",
    fontSize: 17,
    fontWeight: "900" as const,
  },
  subtitle: {
    color: "#64748b",
    fontSize: 12,
    lineHeight: 16,
    marginTop: 1,
  },
  chevronWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#e2e8f0",
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
} as const;

function TelemetryDrawer({
  visible,
  onClose,
  systemHealth,
  telemetrySnapshot,
  activityFeed,
  discoveryFeed,
  telemetryError,
  telemetryLoading,
}: {
  visible: boolean;
  onClose: () => void;
  systemHealth: SystemHealth | null;
  telemetrySnapshot: TelemetrySnapshot | null;
  activityFeed: ActivityEntry[];
  discoveryFeed: DiscoveredRover[];
  telemetryError: string;
  telemetryLoading: boolean;
}) {
  const pulse = (label: string, ok: boolean | undefined | null) => ({
    label,
    value: ok === undefined || ok === null ? "Unknown" : ok ? "OK" : "Alert",
    tone: ok ? "#16a34a" : ok === false ? "#dc2626" : "#64748b",
  });
  const battery = telemetrySnapshot?.battery_pct;
  const batteryTone = battery == null ? "#64748b" : battery >= 55 ? "#16a34a" : battery >= 25 ? "#d97706" : "#dc2626";
  const poseAge = telemetrySnapshot?.pose_age_ms ?? systemHealth?.pose_age_ms ?? null;
  const poseTone = poseAge == null ? "#64748b" : poseAge <= 500 ? "#16a34a" : poseAge <= 1500 ? "#d97706" : "#dc2626";

  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: "rgba(15,23,42,0.2)" }} onPress={onClose}>
        <View style={drawerStyles.sheet}>
          <Pressable style={drawerStyles.close} onPress={onClose}>
            <Text style={drawerStyles.closeText}>×</Text>
          </Pressable>
          <Text style={drawerStyles.kicker}>Rover Ops</Text>
          <Text style={drawerStyles.title}>Live system panel</Text>
          <Text style={drawerStyles.subtitle}>
            Compact health, telemetry, discovery, and activity data tuned for the tablet side rail.
          </Text>

          {telemetryError ? <Text style={drawerStyles.error}>{telemetryError}</Text> : null}
          {telemetryLoading ? <Text style={drawerStyles.loading}>Refreshing live data...</Text> : null}

          <View style={drawerStyles.grid}>
            <StatCard label="ROS node" value={pulse("ROS node", systemHealth?.ros_node)} />
            <StatCard label="FCU link" value={pulse("FCU link", systemHealth?.fcu_connected)} />
            <StatCard label="Armed" value={pulse("Armed", telemetrySnapshot?.armed ?? systemHealth?.armed)} />
            <StatCard
              label="Mode"
              value={{
                label: "Control mode",
                value: telemetrySnapshot?.mode ?? systemHealth?.mode ?? "UNKNOWN",
                tone: "#0f172a",
              }}
            />
          </View>

          <View style={drawerStyles.stripRow}>
            <StripMetric label="Battery" value={battery == null ? "n/a" : `${battery.toFixed(0)}%`} tone={batteryTone} />
            <StripMetric label="Pose age" value={poseAge == null ? "n/a" : `${poseAge.toFixed(0)} ms`} tone={poseTone} />
            <StripMetric label="RPP" value={telemetrySnapshot?.rpp_state_name ?? String(telemetrySnapshot?.rpp_state ?? systemHealth?.rpp_state ?? "n/a")} tone="#0f172a" />
          </View>

          <View style={drawerStyles.section}>
            <SectionTitle title="Telemetry snapshot" />
            <MiniGrid
              items={[
                ["Speed", telemetrySnapshot?.speed_m_s == null ? "n/a" : `${telemetrySnapshot.speed_m_s.toFixed(2)} m/s`],
                ["Heading", telemetrySnapshot?.heading_ned_deg == null ? "n/a" : `${telemetrySnapshot.heading_ned_deg.toFixed(1)}°`],
                ["Cross-track", telemetrySnapshot?.xtrack_m == null ? "n/a" : `${telemetrySnapshot.xtrack_m.toFixed(2)} m`],
                ["Goal dist", telemetrySnapshot?.dist_to_goal_m == null ? "n/a" : `${telemetrySnapshot.dist_to_goal_m.toFixed(2)} m`],
                ["Lookahead", telemetrySnapshot?.lookahead_m == null ? "n/a" : `${telemetrySnapshot.lookahead_m.toFixed(2)} m`],
                ["Satellites", telemetrySnapshot?.gps_sat == null ? "n/a" : `${telemetrySnapshot.gps_sat}`],
              ]}
            />
          </View>

          <View style={drawerStyles.section}>
            <SectionTitle title="Discover" />
            <View style={drawerStyles.list}>
              {discoveryFeed.length > 0 ? discoveryFeed.slice(0, 4).map((item) => (
                <ListRow
                  key={item.id}
                  left={`${item.name}`}
                  right={`${item.host}:${item.port}`}
                  tone="#16a34a"
                />
              )) : (
                <EmptyLine text="No beacons discovered on the LAN." />
              )}
            </View>
          </View>

          <View style={drawerStyles.section}>
            <SectionTitle title="Activity" />
            <View style={drawerStyles.list}>
              {activityFeed.length > 0 ? activityFeed.slice(0, 5).map((item, index) => (
                <ListRow
                  key={`${item.timestamp}-${index}`}
                  left={item.message}
                  right={item.level.toUpperCase()}
                  tone={item.level === "error" ? "#dc2626" : item.level === "warn" ? "#d97706" : "#16a34a"}
                />
              )) : (
                <EmptyLine text="Activity log is empty right now." />
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

function StatCard({ label, value }: { label: string; value: { label: string; value: string; tone: string } }) {
  return (
    <View style={drawerStyles.card}>
      <Text style={drawerStyles.cardLabel}>{label}</Text>
      <Text style={[drawerStyles.cardValue, { color: value.tone }]}>{value.value}</Text>
      <Text style={drawerStyles.cardMeta}>{value.label}</Text>
    </View>
  );
}

function StripMetric({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <View style={drawerStyles.strip}>
      <Text style={drawerStyles.stripLabel}>{label}</Text>
      <Text style={[drawerStyles.stripValue, { color: tone }]}>{value}</Text>
    </View>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <Text style={drawerStyles.sectionTitle}>{title}</Text>;
}

function MiniGrid({ items }: { items: Array<[string, string]> }) {
  return (
    <View style={drawerStyles.miniGrid}>
      {items.map(([label, value]) => (
        <View key={label} style={drawerStyles.miniCell}>
          <Text style={drawerStyles.miniLabel}>{label}</Text>
          <Text style={drawerStyles.miniValue}>{value}</Text>
        </View>
      ))}
    </View>
  );
}

function ListRow({ left, right, tone }: { left: string; right: string; tone: string }) {
  return (
    <View style={drawerStyles.row}>
      <Text style={drawerStyles.rowLeft} numberOfLines={1}>{left}</Text>
      <Text style={[drawerStyles.rowRight, { color: tone }]} numberOfLines={1}>{right}</Text>
    </View>
  );
}

function EmptyLine({ text }: { text: string }) {
  return <Text style={drawerStyles.empty}>{text}</Text>;
}

const drawerStyles = {
  sheet: {
    position: "absolute" as const,
    right: 0,
    top: 0,
    bottom: 0,
    width: "42%",
    minWidth: 340,
    maxWidth: 520,
    backgroundColor: "#0b1220",
    padding: 18,
    borderLeftWidth: 1,
    borderLeftColor: "rgba(148,163,184,0.2)",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: { width: -8, height: 0 },
    elevation: 8,
  },
  close: {
    alignSelf: "flex-end" as const,
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: "rgba(148,163,184,0.12)",
    alignItems: "center" as const,
    justifyContent: "center" as const,
    marginBottom: 12,
  },
  closeText: { color: "#fff", fontSize: 22, lineHeight: 22, marginTop: -2 },
  kicker: { color: "#94a3b8", fontSize: 11, fontWeight: "800", letterSpacing: 1.6, textTransform: "uppercase" as const },
  title: { color: "#fff", fontSize: 28, fontWeight: "900", marginTop: 6 },
  subtitle: { color: "#cbd5e1", fontSize: 13, lineHeight: 19, marginTop: 8, maxWidth: 380 },
  error: { color: "#fecaca", marginTop: 10, fontWeight: "700" as const },
  loading: { color: "#bfdbfe", marginTop: 10, fontWeight: "700" as const },
  grid: { flexDirection: "row" as const, flexWrap: "wrap" as const, gap: 10, marginTop: 14 },
  card: { width: "48%", minWidth: 130, borderRadius: 16, backgroundColor: "#111827", borderWidth: 1, borderColor: "rgba(148,163,184,0.18)", padding: 12 },
  cardLabel: { color: "#94a3b8", fontSize: 11, fontWeight: "800" as const, letterSpacing: 0.6, textTransform: "uppercase" as const },
  cardValue: { color: "#fff", fontSize: 19, fontWeight: "900" as const, marginTop: 6 },
  cardMeta: { color: "#cbd5e1", fontSize: 11, marginTop: 4 },
  stripRow: { flexDirection: "row" as const, gap: 10, marginTop: 10 },
  strip: { flex: 1, borderRadius: 14, backgroundColor: "#111827", padding: 12, borderWidth: 1, borderColor: "rgba(148,163,184,0.16)" },
  stripLabel: { color: "#94a3b8", fontSize: 10, fontWeight: "800" as const, textTransform: "uppercase" as const },
  stripValue: { color: "#fff", fontSize: 16, fontWeight: "900" as const, marginTop: 4 },
  section: { marginTop: 14 },
  sectionTitle: { color: "#fff", fontSize: 13, fontWeight: "800" as const, letterSpacing: 0.8, textTransform: "uppercase" as const, marginBottom: 8 },
  miniGrid: { flexDirection: "row" as const, flexWrap: "wrap" as const, gap: 8 },
  miniCell: { width: "31.5%", minWidth: 94, borderRadius: 12, backgroundColor: "#111827", padding: 10, borderWidth: 1, borderColor: "rgba(148,163,184,0.16)" },
  miniLabel: { color: "#94a3b8", fontSize: 10, fontWeight: "800" as const, textTransform: "uppercase" as const },
  miniValue: { color: "#fff", fontSize: 13, fontWeight: "800" as const, marginTop: 6 },
  list: { gap: 8 },
  row: { flexDirection: "row" as const, justifyContent: "space-between", gap: 10, borderRadius: 12, backgroundColor: "#111827", paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: "rgba(148,163,184,0.14)" },
  rowLeft: { color: "#e2e8f0", fontSize: 12, flexShrink: 1, paddingRight: 8 },
  rowRight: { color: "#fff", fontSize: 11, fontWeight: "800" as const },
  empty: { color: "#94a3b8", fontSize: 12, paddingVertical: 8 },
} as const;

function CompactLayerToggle({
  label,
  value,
  onToggle,
}: {
  label: string;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable
      onPress={onToggle}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: value ? "#0f172a" : "#cbd5e1",
        backgroundColor: value ? "#e2e8f0" : "#f8fafc",
      }}
    >
      <View
        style={{
          width: 18,
          height: 18,
          borderRadius: 5,
          borderWidth: 1.5,
          borderColor: value ? "#0f172a" : "#94a3b8",
          backgroundColor: value ? "#0f172a" : "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {value ? <Text style={{ color: "#fff", fontSize: 11, fontWeight: "800" }}>✓</Text> : null}
      </View>
      <Text style={{ color: "#0f172a", fontSize: 13, fontWeight: "600" }}>{label}</Text>
    </Pressable>
  );
}

function MetricChip({ label, value }: { label: string; value: string }) {
  return (
    <View
      style={{
        flexGrow: 1,
        minWidth: 112,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#d8e1eb",
        backgroundColor: "#ffffff",
        paddingHorizontal: 12,
        paddingVertical: 10,
      }}
    >
      <Text style={{ color: "#64748b", fontSize: 11, fontWeight: "800", textTransform: "uppercase", letterSpacing: 0.6 }}>
        {label}
      </Text>
      <Text style={{ color: "#0f172a", fontSize: 15, fontWeight: "700", marginTop: 4 }}>
        {value}
      </Text>
    </View>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingVertical: 11,
        borderRadius: 14,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#e2e8f0",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <Text style={{ color: "#64748b", fontSize: 13, fontWeight: "700" }}>{label}</Text>
      <Text style={{ color: "#0f172a", fontSize: 13, fontWeight: "700", flexShrink: 1, textAlign: "right" }}>{value}</Text>
    </View>
  );
}
function SectionScreen(props: {
  title: string;
  page: Page;
  importedPlan: ImportedPlan | null;
  lines: PlanLine[];
  selectedLineId: string | null;
  onBack: () => void;
  onNavigate: (p: Page) => void;
  onImport: () => void;
  onImportCsv: () => void;
  onImportDxf: () => void;
  onSelectLine: (id: string | null) => void;
  onGenerateTemplate: (name: string, lines: PlanLine[]) => void;
  onOpenFieldGenerator: () => void;
  layerVisibility: LayerVisibility;
  setLayerVisibility: React.Dispatch<React.SetStateAction<LayerVisibility>>;
  setImportedPlan: React.Dispatch<React.SetStateAction<ImportedPlan | null>>;
  toggleA: boolean;
  toggleB: boolean;
  toggleC: boolean;
  toggleD: boolean;
  delayA: number;
  delayB: number;
  setToggleA: (v: boolean) => void;
  setToggleB: (v: boolean) => void;
  setToggleC: (v: boolean) => void;
  setToggleD: (v: boolean) => void;
  setDelayA: (v: number) => void;
  setDelayB: (v: number) => void;
}) {
  const { title, page, onBack } = props;
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <TopBar
        title={title}
        onBack={onBack}
        onMorePress={
          page === "fields" ? () => setMoreOpen(true) : undefined
        }
      />

      {page === "fields" ? <FieldsPage {...props} /> : null}
      {page === "fields_csv_import" ? <FieldsImportPage {...props} importType="csv" /> : null}
      {page === "fields_dxf_import" ? <FieldsImportPage {...props} importType="dxf" /> : null}
      {page === "templates" ? <TemplatesPage onGenerateTemplate={props.onGenerateTemplate} /> : null}
      {page === "swozi" ? <SwoziPage {...props} /> : null}
      {page === "status" ? <StatusPage /> : null}
      {page === "positioning" ? <PositioningPage {...props} /> : null}
      {page === "settings" ? <SettingsPage {...props} /> : null}
      {page === "howto" ? <HowToPage /> : null}
      {page === "about" ? <AboutPage /> : null}

      <Modal transparent visible={moreOpen} animationType="fade" onRequestClose={() => setMoreOpen(false)}>
        <Pressable style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.15)" }} onPress={() => setMoreOpen(false)}>
          <View style={{ position: "absolute", right: 12, top: 72, width: 220, backgroundColor: "#fff", borderRadius: 12, borderWidth: 1, borderColor: "#ddd", overflow: "hidden" }}>
            <Pressable
              onPress={() => {
                setMoreOpen(false);
                props.onNavigate("fields_csv_import");
              }}
              style={{ paddingVertical: 12, paddingHorizontal: 14 }}
            >
              <Text style={{ color: "#111", fontSize: 16 }}>CSV import</Text>
            </Pressable>
            <View style={{ height: 1, backgroundColor: "#eee" }} />
            <Pressable
              onPress={() => {
                setMoreOpen(false);
                props.onNavigate("fields_dxf_import");
              }}
              style={{ paddingVertical: 12, paddingHorizontal: 14 }}
            >
              <Text style={{ color: "#111", fontSize: 16 }}>DXF import</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

function ConnectionView({
  selectedWs,
  manualHost,
  wsError,
  wsStatus,
  isOffline,
  discoveredRovers,
  onRefresh,
  onSelect,
  onManualHostChange,
  onConnect,
  onOfflinePreview,
}: {
  selectedWs: string;
  manualHost: string;
  wsError: string;
  wsStatus: string;
  isOffline: boolean;
  discoveredRovers: Array<{ id: string; name: string; host: string; port: number; version?: string; responseTime?: number }>;
  onRefresh: () => void;
  onSelect: (value: string) => void;
  onManualHostChange: (value: string) => void;
  onConnect: () => void;
  onOfflinePreview: () => void;
}) {
  const selectedTarget = selectedWs || manualHost;
  const pingState = wsStatus === "scanning" ? "Checking" : isOffline ? "No reply" : "Ready";
  const healthState = selectedWs
    ? wsStatus === "connected"
      ? "Connected"
      : "Selected"
    : "No target";
  const discoverState = discoveredRovers.length > 0 ? `${discoveredRovers.length} found` : "None yet";

  return (
    <View style={{ flex: 1, backgroundColor: "#eef2f7", padding: 16 }}>
      <View
        style={{
          flex: 1,
          maxWidth: 1280,
          width: "100%",
          alignSelf: "center",
          flexDirection: "row",
          gap: 14,
        }}
      >
        <View
          style={{
            flex: 0.95,
            borderRadius: 26,
            backgroundColor: "#0f172a",
            padding: 20,
            justifyContent: "space-between",
            shadowColor: "#000",
            shadowOpacity: 0.12,
            shadowRadius: 22,
            shadowOffset: { width: 0, height: 12 },
            elevation: 5,
          }}
        >
            <View style={{ gap: 14 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 999,
                  backgroundColor: isOffline ? "rgba(239,68,68,0.12)" : "rgba(34,197,94,0.12)",
                  borderWidth: 1,
                  borderColor: isOffline ? "rgba(239,68,68,0.28)" : "rgba(34,197,94,0.22)",
                }}
              >
                <Text style={{ color: isOffline ? "#fecaca" : "#bbf7d0", fontSize: 12, fontWeight: "800" }}>
                  {isOffline ? "Offline" : "Backend reachable"}
                </Text>
              </View>
              {wsStatus === "scanning" ? (
                <View
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 999,
                    backgroundColor: "rgba(96,165,250,0.12)",
                    borderWidth: 1,
                    borderColor: "rgba(96,165,250,0.22)",
                  }}
                >
                  <Text style={{ color: "#bfdbfe", fontSize: 12, fontWeight: "800" }}>Scanning network</Text>
                </View>
              ) : null}
            </View>

            <View style={{ gap: 8 }}>
              <Text style={{ color: "#f8fafc", fontSize: 36, fontWeight: "900", lineHeight: 40 }}>
                Connect to Rover Backend
              </Text>
              <Text style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 22, maxWidth: 440 }}>
                The tablet scans the current Wi-Fi subnet for a reachable backend, then lets you connect to continue into the main app.
              </Text>
            </View>
          </View>

          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
              <View style={connectionStyles.infoCard}>
                <Text style={connectionStyles.infoValue}>1</Text>
                <Text style={connectionStyles.infoLabel}>Ping</Text>
                <Text style={connectionStyles.infoText}>{pingState}</Text>
                <Text style={connectionStyles.infoDetail}>{selectedTarget}</Text>
              </View>
              <View style={connectionStyles.infoCard}>
                <Text style={connectionStyles.infoValue}>2</Text>
                <Text style={connectionStyles.infoLabel}>Health</Text>
                <Text style={connectionStyles.infoText}>{healthState}</Text>
                <Text style={connectionStyles.infoDetail}>Socket.IO on port 5001</Text>
              </View>
              <View style={connectionStyles.infoCard}>
                <Text style={connectionStyles.infoValue}>3</Text>
                <Text style={connectionStyles.infoLabel}>Discover</Text>
                <Text style={connectionStyles.infoText}>{discoverState}</Text>
                <Text style={connectionStyles.infoDetail}>Auto-scanned on current Wi-Fi</Text>
              </View>
            </View>

            <View style={{ paddingTop: 8, borderTopWidth: 1, borderTopColor: "rgba(148,163,184,0.18)" }}>
              <Text style={{ color: "#cbd5e1", fontSize: 12, fontWeight: "800", letterSpacing: 0.8, textTransform: "uppercase" }}>
                How it works
              </Text>
              <Text style={{ color: "#94a3b8", fontSize: 13, lineHeight: 20, marginTop: 6 }}>
                The connection screen auto-scans the network, shows any discovered rover targets, and keeps a manual address fallback if discovery does not find the server.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1.05,
            borderRadius: 26,
            backgroundColor: "#ffffff",
            padding: 16,
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 10 },
            elevation: 3,
            borderWidth: 1,
            borderColor: "#d7dee8",
          }}
        >
          <View style={{ flex: 1, justifyContent: "space-between", gap: 14 }}>
            <View style={{ gap: 12 }}>
              <View>
                <Text style={{ color: "#0f172a", fontSize: 18, fontWeight: "800" }}>Manual backend address</Text>
                <Text style={{ color: "#64748b", marginTop: 4, lineHeight: 20 }}>
                  Type the laptop IP if the backend is not auto-discovered.
                </Text>
              </View>

              <TextInput
                value={manualHost}
                onChangeText={onManualHostChange}
                placeholder="http://192.168.1.28:5001"
                placeholderTextColor="#94a3b8"
                style={{
                  borderWidth: 1,
                  borderColor: "#cbd5e1",
                  borderRadius: 16,
                  paddingHorizontal: 14,
                  paddingVertical: 14,
                  color: "#0f172a",
                  backgroundColor: "#f8fafc",
                }}
              />

              <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
                <Pressable
                  onPress={() => onSelect(manualHost)}
                  style={{
                    backgroundColor: "#0f172a",
                    paddingHorizontal: 16,
                    paddingVertical: 13,
                    borderRadius: 16,
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "800" }}>Use manual address</Text>
                </Pressable>
                <Pressable
                  onPress={onRefresh}
                  style={{
                    backgroundColor: "#e2e8f0",
                    paddingHorizontal: 16,
                    paddingVertical: 13,
                    borderRadius: 16,
                  }}
                >
                  <Text style={{ color: "#0f172a", fontWeight: "800" }}>
                    {wsStatus === "scanning" ? "Scanning..." : "Refresh scan"}
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={{ flex: 1, minHeight: 0 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <Text style={{ color: "#0f172a", fontSize: 18, fontWeight: "800" }}>Discovered backend</Text>
                <Text style={{ color: "#64748b", fontSize: 12, fontWeight: "700" }}>
                  {discoveredRovers.length} found
                </Text>
              </View>

              <View style={{ flex: 1, gap: 10 }}>
                {discoveredRovers.length > 0 ? (
                  <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                    {discoveredRovers.map((rover) => {
                      const url = `http://${rover.host}:${rover.port}`;
                      const isSelected = selectedWs === url;
                      return (
                        <Pressable
                          key={`${rover.id}-${url}`}
                          onPress={() => onSelect(url)}
                          style={{
                            padding: 12,
                            borderRadius: 16,
                            borderWidth: 1,
                            borderColor: isSelected ? "#0f172a" : "#d7dee8",
                            backgroundColor: isSelected ? "#eef2ff" : "#ffffff",
                          }}
                        >
                          <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                            <View style={{ flex: 1 }}>
                              <Text style={{ color: "#0f172a", fontWeight: "800", fontSize: 15 }}>{rover.name}</Text>
                              <Text style={{ color: "#64748b", marginTop: 4 }}>{url}</Text>
                            </View>
                            <View
                              style={{
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderRadius: 999,
                                backgroundColor: isSelected ? "#0f172a" : "#f1f5f9",
                              }}
                            >
                              <Text style={{ color: isSelected ? "#fff" : "#334155", fontSize: 11, fontWeight: "800" }}>
                                {isSelected ? "Selected" : "Tap to select"}
                              </Text>
                            </View>
                          </View>
                          <Text style={{ color: "#64748b", marginTop: 6, fontSize: 12 }}>
                            {rover.version ? `v${rover.version}` : "Socket.IO backend"}
                            {typeof rover.responseTime === "number" ? ` • ${rover.responseTime} ms` : ""}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      borderRadius: 18,
                      borderWidth: 1,
                      borderColor: "#d7dee8",
                      backgroundColor: "#f8fafc",
                      padding: 16,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "#334155", fontSize: 15, lineHeight: 22 }}>
                      No backend found yet. Keep the backend running and tap Refresh to scan again.
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={{ gap: 10 }}>
              {wsError ? (
                <View style={{ padding: 12, borderRadius: 14, backgroundColor: "#fef2f2", borderWidth: 1, borderColor: "#fecaca" }}>
                  <Text style={{ color: "#b91c1c", fontWeight: "700" }}>{wsError}</Text>
                </View>
              ) : null}

              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable
                  onPress={onConnect}
                  disabled={!selectedWs || wsStatus === "connecting"}
                  style={{
                    flex: 1,
                    backgroundColor: !selectedWs ? "#94a3b8" : "#2563eb",
                    paddingHorizontal: 16,
                    paddingVertical: 13,
                    borderRadius: 16,
                    opacity: wsStatus === "connecting" ? 0.85 : 1,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "800" }}>
                    {wsStatus === "connecting" ? "Connecting..." : "Connect"}
                  </Text>
                </Pressable>
              </View>

              <Pressable
                onPress={onOfflinePreview}
                style={{
                  paddingVertical: 14,
                  paddingHorizontal: 14,
                  borderRadius: 18,
                  borderWidth: 1,
                  borderColor: "#cbd5e1",
                  backgroundColor: "#f8fafc",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 12,
                  minHeight: 72,
                  shadowColor: "#0f172a",
                  shadowOpacity: 0.05,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 4 },
                  elevation: 1,
                }}
              >
                <View
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    backgroundColor: "#e2e8f0",
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "#cbd5e1",
                  }}
                >
                  <Waves size={19} color="#0f172a" />
                </View>
                <View style={{ flex: 1, paddingRight: 4 }}>
                  <Text style={{ color: "#0f172a", fontWeight: "900", fontSize: 15.5 }}>Offline Preview</Text>
                  <Text style={{ color: "#64748b", fontSize: 12, marginTop: 2, lineHeight: 16 }}>
                    Open the app without connecting to the backend
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 999,
                    backgroundColor: "#e2e8f0",
                  }}
                >
                  <Text style={{ color: "#0f172a", fontSize: 11, fontWeight: "800" }}>Local</Text>
                </View>
              </Pressable>

              <Text style={{ color: "#64748b", fontSize: 12, lineHeight: 18 }}>
                Backend runs on <Text style={{ color: "#334155", fontWeight: "700" }}>server/main.py</Text> via Socket.IO on port <Text style={{ color: "#334155", fontWeight: "700" }}>5001</Text>.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const connectionStyles = {
  infoCard: {
    flexGrow: 1,
    minWidth: 120,
    padding: 14,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.16)",
  },
  infoValue: {
    color: "#f8fafc",
    fontSize: 22,
    fontWeight: "900" as const,
  },
  infoLabel: {
    color: "#e2e8f0",
    fontSize: 13,
    fontWeight: "800" as const,
    marginTop: 4,
  },
  infoText: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 4,
    lineHeight: 17,
  },
  infoDetail: {
    color: "#cbd5e1",
    fontSize: 11,
    marginTop: 8,
    lineHeight: 16,
    opacity: 0.9,
  },
};

function FieldsPage({
  importedPlan,
  lines,
  selectedLineId,
  onImport,
  onOpenFieldGenerator,
  layerVisibility,
}: {
  importedPlan: ImportedPlan | null;
  lines: PlanLine[];
  selectedLineId: string | null;
  onImport: () => void;
  onOpenFieldGenerator: () => void;
  layerVisibility: LayerVisibility;
  }) {
  return (
    <View style={{ flex: 1, flexDirection: "row", padding: 16, gap: 14 }}>
      <View
        style={{
          flex: 1.1,
          backgroundColor: "#f8fafc",
          borderRadius: 18,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#d8e1eb",
          shadowColor: "#0f172a",
          shadowOpacity: 0.05,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 8 },
          elevation: 2,
        }}
      >
        <PlanPreview lines={lines} visibility={layerVisibility} selectedLineId={selectedLineId} />
      </View>
      <View style={{ flex: 1, gap: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View style={{ width: 82, height: 82, borderWidth: 2, borderColor: "#111", borderRadius: 12, backgroundColor: "#f11212", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: "#fff", fontSize: 38 / 2 }}>☁</Text>
          </View>
          <Text style={{ color: "#666", fontSize: 24 / 2 }}>Account credentials are not valid.</Text>
        </View>
        <Text style={{ color: "#666", fontSize: 24 / 2 }}>Select Field.</Text>
        <View style={{ height: 50, backgroundColor: "#cdcdcf" }} />
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ color: "#888", fontSize: 22 / 2 }}>☑ Show All</Text>
          <Text style={{ color: "#888", fontSize: 22 / 2 }}>Sort by Distance ⏽</Text>
        </View>
        <Text style={{ color: "#555", fontSize: 42 / 2, marginTop: 8 }}>
          File: {importedPlan?.fileName ?? "soccer_pitch_fifa_edited.dxf"}
        </Text>
        <Text style={{ color: "#555", fontSize: 42 / 2 }}>Units: Meters</Text>
        <Text style={{ color: "#555", fontSize: 42 / 2 }}>CRS: No Coordinate Reference System</Text>
        <Text style={{ color: "#555", fontSize: 42 / 2 }}>Layers: CENTER</Text>
        <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
          {["＋", "🗑", "✎", "⧉", "▢", "▭"].map((t, i) => (
            <View key={i} style={{ flex: 1, height: 110 / 2, borderWidth: 1, borderColor: "#bbb", backgroundColor: "#d6d6d7", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "#b8b8b8", fontSize: 32 / 2 }}>{t}</Text>
            </View>
          ))}
        </View>
        <Pressable
          onPress={onOpenFieldGenerator}
          style={{
            height: 48,
            marginTop: 8,
            backgroundColor: "#eef2f7",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#cbd5e1",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 8,
          }}
        >
          <FilePenLine size={18} color="#0f172a" />
          <Text style={{ color: "#0f172a", fontSize: 15, fontWeight: "700" }}>Field Generator</Text>
        </Pressable>
      </View>
    </View>
  );
}

function FieldsImportPage({
  importType,
  importedPlan,
  lines,
  selectedLineId,
  onImportCsv,
  onImportDxf,
  layerVisibility,
  setLayerVisibility,
  setImportedPlan,
}: {
  importType: "csv" | "dxf";
  importedPlan: ImportedPlan | null;
  lines: PlanLine[];
  selectedLineId: string | null;
  onImportCsv: () => void;
  onImportDxf: () => void;
  layerVisibility: LayerVisibility;
  setLayerVisibility: React.Dispatch<React.SetStateAction<LayerVisibility>>;
  setImportedPlan: React.Dispatch<React.SetStateAction<ImportedPlan | null>>;
}) {
  const units =
    importedPlan?.fileName?.toLowerCase().includes("inch") ||
    importedPlan?.fileName?.toLowerCase().includes("inches")
      ? "Inches"
      : "Meters";

  const unitLabel = importType === "dxf" ? "DXF Units" : "CSV Units";

  const onImportPress = importType === "dxf" ? onImportDxf : onImportCsv;

  const toggleLayer = (key: keyof LayerVisibility) => {
    setLayerVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={{ flex: 1, flexDirection: "row", padding: 16, gap: 14 }}>
      <View
        style={{
          flex: 1.1,
          backgroundColor: "#f8fafc",
          borderRadius: 18,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#d8e1eb",
          shadowColor: "#0f172a",
          shadowOpacity: 0.05,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 8 },
          elevation: 2,
        }}
      >
        <PlanPreview lines={lines} visibility={layerVisibility} selectedLineId={selectedLineId} />
      </View>

      <View style={{ flex: 1, gap: 10 }}>
        <Text style={{ color: "#666", fontSize: 24 / 2 }}>Current field name</Text>
        <Text style={{ color: "#555", fontSize: 42 / 2, fontWeight: "700" }}>
          {importedPlan?.fileName ?? "No file imported"}
        </Text>

        <Text style={{ color: "#666", fontSize: 24 / 2, marginTop: 6 }}>Rename file</Text>
        <TextInput
          value={importedPlan?.fileName ?? ""}
          onChangeText={(text) =>
            setImportedPlan((prev) => (prev ? { ...prev, fileName: text } : prev))
          }
          placeholder="Enter file name"
          style={{
            height: 44,
            borderWidth: 1,
            borderColor: "#bbb",
            backgroundColor: "#fff",
            paddingHorizontal: 12,
            borderRadius: 10,
            color: "#111",
          }}
        />

        <Text style={{ color: "#555", fontSize: 42 / 2 }}>
          {unitLabel}: {units}
        </Text>
        <Text style={{ color: "#555", fontSize: 42 / 2 }}>CRS: No Coordinate Reference System</Text>

        <View style={{ marginTop: 8 }}>
          <Text style={{ color: "#555", fontSize: 42 / 2, marginBottom: 8 }}>Layers</Text>
          <LayerRow label="Boundary" value={layerVisibility.boundary} onToggle={() => toggleLayer("boundary")} />
          <LayerRow label="Markings" value={layerVisibility.marking} onToggle={() => toggleLayer("marking")} />
          <LayerRow label="Center" value={layerVisibility.center} onToggle={() => toggleLayer("center")} />
        </View>

        <Pressable
          onPress={onImportPress}
          style={{
            marginTop: 12,
            height: 48,
            backgroundColor: "#111",
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
            Import {importType.toUpperCase()}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const FIELD_GENERATOR_PRESETS = [
  { name: "Reference Sample", width: 100, height: 60 },
  { name: "Football", width: 100, height: 64 },
  { name: "Hockey", width: 91.4, height: 55 },
  { name: "Cricket Pitch", width: 20.12, height: 3.05 },
  { name: "Volleyball", width: 18, height: 9 },
  { name: "Badminton", width: 13.4, height: 6.1 },
  { name: "Kabaddi", width: 13, height: 10 },
  { name: "Kho-Kho", width: 27, height: 16 },
] as const;

function FieldGeneratorModal({
  visible,
  onClose,
  onGenerate,
}: {
  visible: boolean;
  onClose: () => void;
  onGenerate: (name: string, lines: PlanLine[]) => void;
}) {
  const presets = FIELD_GENERATOR_PRESETS;
  const [selected, setSelected] = useState<(typeof FIELD_GENERATOR_PRESETS)[number]>(presets[0]);
  const [useDefault, setUseDefault] = useState(true);
  const [customWidth, setCustomWidth] = useState(String(presets[0].width));
  const [customHeight, setCustomHeight] = useState(String(presets[0].height));

  useEffect(() => {
    const preset = presets.find((item) => item.name === selected.name) ?? presets[0];
    if (useDefault) {
      setCustomWidth(String(preset.width));
      setCustomHeight(String(preset.height));
    }
  }, [selected, useDefault]);

  const selectPreset = (preset: typeof presets[number]) => {
    setSelected(preset);
    if (useDefault) {
      setCustomWidth(String(preset.width));
      setCustomHeight(String(preset.height));
    }
  };

  const handleGenerate = () => {
    const width = useDefault ? selected.width : Number(customWidth) || selected.width;
    const height = useDefault ? selected.height : Number(customHeight) || selected.height;
    const lines = buildTemplate(selected.name, width, height);
    onGenerate(selected.name, lines);
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={generatorStyles.backdrop} onPress={onClose}>
        <Pressable style={generatorStyles.sheet} onPress={() => {}}>
          <View style={generatorStyles.sheetHeader}>
            <View style={{ flex: 1 }}>
              <Text style={generatorStyles.sheetTitle}>Field Generator</Text>
              <Text style={generatorStyles.sheetSubtitle}>
                Pick a sport, use the default size or enter your own dimensions.
              </Text>
            </View>
            <Pressable onPress={onClose} hitSlop={12} style={generatorStyles.closePill}>
              <Text style={generatorStyles.closeText}>×</Text>
            </Pressable>
          </View>

          <View style={generatorStyles.toggleRow}>
            <Pressable
              onPress={() => setUseDefault(true)}
              style={[generatorStyles.toggleChip, useDefault && generatorStyles.toggleChipActive]}
            >
              <Text style={[generatorStyles.toggleChipText, useDefault && generatorStyles.toggleChipTextActive]}>
                Default size
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setUseDefault(false)}
              style={[generatorStyles.toggleChip, !useDefault && generatorStyles.toggleChipActive]}
            >
              <Text style={[generatorStyles.toggleChipText, !useDefault && generatorStyles.toggleChipTextActive]}>
                Custom size
              </Text>
            </Pressable>
          </View>

          <ScrollView style={{ maxHeight: 260 }} showsVerticalScrollIndicator={false}>
            <View style={generatorStyles.presetGrid}>
              {presets.map((preset) => {
                const active = preset.name === selected.name;
                return (
                  <Pressable
                    key={preset.name}
                    onPress={() => selectPreset(preset)}
                    style={[generatorStyles.presetCard, active && generatorStyles.presetCardActive]}
                  >
                    <Text style={[generatorStyles.presetTitle, active && generatorStyles.presetTitleActive]}>
                      {preset.name}
                    </Text>
                    <Text style={[generatorStyles.presetMeta, active && generatorStyles.presetMetaActive]}>
                      {preset.width} m x {preset.height} m
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>

          {!useDefault ? (
            <View style={{ gap: 10, marginTop: 14 }}>
              <View style={generatorStyles.inputRow}>
                <View style={{ flex: 1 }}>
                  <Text style={generatorStyles.inputLabel}>Width (m)</Text>
                  <TextInput
                    value={customWidth}
                    onChangeText={setCustomWidth}
                    keyboardType="numeric"
                    style={generatorStyles.input}
                    placeholder="Custom width"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={generatorStyles.inputLabel}>Height (m)</Text>
                  <TextInput
                    value={customHeight}
                    onChangeText={setCustomHeight}
                    keyboardType="numeric"
                    style={generatorStyles.input}
                    placeholder="Custom height"
                  />
                </View>
              </View>
            </View>
          ) : null}

          <Pressable onPress={handleGenerate} style={generatorStyles.generateButton}>
            <Text style={generatorStyles.generateButtonText}>Generate Field</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function TemplatesPage({
  onGenerateTemplate,
}: {
  onGenerateTemplate: (name: string, lines: PlanLine[]) => void;
}) {
  const [selected, setSelected] = useState("Football");
  const [useDefault, setUseDefault] = useState(true);
  const [customW, setCustomW] = useState("100");
  const [customH, setCustomH] = useState("64");
  const [generated, setGenerated] = useState<PlanLine[] | null>(null);

  const templates = ["Reference Sample", "Football", "Volleyball", "Badminton", "Kabaddi", "Kho-Kho", "Hockey", "Cricket Pitch"];

  const generate = () => {
    let lines: PlanLine[];
    if (useDefault) {
      const dims = defaultDimensions(selected);
      lines = buildTemplate(selected, dims.width, dims.height);
    } else {
      lines = buildTemplate(selected, Number(customW) || 10, Number(customH) || 10);
    }
    setGenerated(lines);
    onGenerateTemplate(selected, lines);
  };

  const exportDxf = async () => {
    if (!generated) return;
    const content = linesToDxf(generated, selected);
    const uri = `${FileSystem.documentDirectory ?? ""}${selected.replace(/\s+/g, "_").toLowerCase()}_template.dxf`;
    await FileSystem.writeAsStringAsync(uri, content, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    Alert.alert("Exported", `DXF saved to ${uri}`);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 18 }}>
      <Text style={secH}>Templates</Text>
      <Text style={itemT}>Pick a preset field and generate its default or custom layout.</Text>
      {templates.map((template) => (
        <Pressable
          key={template}
          onPress={() => setSelected(template)}
          style={{ marginTop: 10, padding: 14, borderRadius: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc" }}
        >
          <Text style={itemH}>{template}</Text>
          <Text style={itemT}>{selected === template ? "Selected" : "Tap to select"}</Text>
        </Pressable>
      ))}
      <View style={{ marginTop: 16, padding: 14, borderRadius: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc" }}>
        <RowToggle label="Default size" value={useDefault} onChange={setUseDefault} />
        {!useDefault ? (
          <View style={{ gap: 8, marginTop: 12 }}>
            <TextInput value={customW} onChangeText={setCustomW} placeholder="Width (m)" keyboardType="numeric" style={inputStyle} />
            <TextInput value={customH} onChangeText={setCustomH} placeholder="Height (m)" keyboardType="numeric" style={inputStyle} />
          </View>
        ) : null}
        <Pressable onPress={generate} style={{ marginTop: 14, padding: 14, backgroundColor: "#111", borderRadius: 12 }}>
          <Text style={{ color: "#fff", textAlign: "center", fontWeight: "700" }}>Generate Template</Text>
        </Pressable>
        {generated ? (
          <Pressable onPress={exportDxf} style={{ marginTop: 10, padding: 14, backgroundColor: "#0f988f", borderRadius: 12 }}>
            <Text style={{ color: "#fff", textAlign: "center", fontWeight: "700" }}>Export DXF</Text>
          </Pressable>
        ) : null}
      </View>
    </ScrollView>
  );
}

function LayerRow({ label, value, onToggle }: { label: string; value: boolean; onToggle: () => void }) {
  return (
    <Pressable onPress={onToggle} style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 }}>
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          borderWidth: 2,
          borderColor: "#555",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: value ? "#111" : "#fff",
        }}
      >
        {value ? <Text style={{ color: "#fff", fontSize: 14, fontWeight: "800" }}>✓</Text> : null}
      </View>
      <Text style={{ color: "#333", fontSize: 16 }}>{label}</Text>
    </Pressable>
  );
}

type PreviewViewport = {
  panX: number;
  panY: number;
  zoom: number;
};

type LocalPoint = { x: number; y: number };

function touchDistance(t1: { locationX: number; locationY: number }, t2: { locationX: number; locationY: number }) {
  const dx = t1.locationX - t2.locationX;
  const dy = t1.locationY - t2.locationY;
  return Math.sqrt(dx * dx + dy * dy);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function computePlanBounds(lines: PlanLine[]) {
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  for (const line of lines) {
    minX = Math.min(minX, line.from.x, line.to.x);
    minY = Math.min(minY, line.from.y, line.to.y);
    maxX = Math.max(maxX, line.from.x, line.to.x);
    maxY = Math.max(maxY, line.from.y, line.to.y);
  }

  return { minX, minY, maxX, maxY };
}

function computeAutoFitViewport(lines: PlanLine[], width: number, height: number): PreviewViewport {
  if (lines.length === 0 || width <= 0 || height <= 0) {
    return { panX: width / 2, panY: height / 2, zoom: 1 };
  }

  const { minX, minY, maxX, maxY } = computePlanBounds(lines);
  const bboxW = maxX - minX;
  const bboxH = maxY - minY;

  if (bboxW <= 0.0001 && bboxH <= 0.0001) {
    return {
      panX: width / 2 - minX,
      panY: height / 2 - minY,
      zoom: 1,
    };
  }

  const paddingFactor = 0.82;
  const scaleX = bboxW > 0 ? (width * paddingFactor) / bboxW : 1;
  const scaleY = bboxH > 0 ? (height * paddingFactor) / bboxH : 1;
  const zoom = clamp(Math.min(scaleX, scaleY), 0.08, 24);
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  return {
    panX: width / 2 - centerX * zoom,
    panY: height / 2 - centerY * zoom,
    zoom,
  };
}

function toScreenPoint(point: { x: number; y: number }, viewport: PreviewViewport): LocalPoint {
  return {
    x: point.x * viewport.zoom + viewport.panX,
    y: point.y * viewport.zoom + viewport.panY,
  };
}

function distancePointToSegment(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) {
    return Math.hypot(px - x1, py - y1);
  }
  const t = clamp(((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy), 0, 1);
  const sx = x1 + t * dx;
  const sy = y1 + t * dy;
  return Math.hypot(px - sx, py - sy);
}

function pickNearestLineId(lines: PlanLine[], viewport: PreviewViewport, tap: LocalPoint, radiusPx: number) {
  let nearestId: string | null = null;
  let nearestDistance = radiusPx;

  for (const line of lines) {
    const from = toScreenPoint(line.from, viewport);
    const to = toScreenPoint(line.to, viewport);
    const distance = distancePointToSegment(tap.x, tap.y, from.x, from.y, to.x, to.y);

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestId = line.id;
    }
  }

  return nearestId;
}

function PlanPreview({
  lines,
  visibility,
  selectedLineId,
  onSelectLine,
}: {
  lines: PlanLine[];
  visibility: LayerVisibility;
  selectedLineId: string | null;
  onSelectLine?: (id: string | null) => void;
}) {
  const filtered = useMemo(
    () =>
      lines.filter((line) => {
        if (line.layer === "boundary") return visibility.boundary;
        if (line.layer === "marking") return visibility.marking;
        if (line.layer === "center") return visibility.center;
        return true;
      }),
    [lines, visibility]
  );

  const viewportRef = React.useRef<PreviewViewport>({ panX: 0, panY: 0, zoom: 1 });
  const linesRef = React.useRef(filtered);
  const onSelectLineRef = React.useRef(onSelectLine);
  const gestureRef = React.useRef<{
    lastTouch: LocalPoint | null;
    startTouch: LocalPoint | null;
    pinchDistance: number | null;
    pinchViewport: PreviewViewport;
    isTap: boolean;
  }>({
    lastTouch: null,
    startTouch: null,
    pinchDistance: null,
    pinchViewport: { panX: 0, panY: 0, zoom: 1 },
    isTap: false,
  });
  const [layoutSize, setLayoutSize] = useState({ width: 0, height: 0 });
  const [viewport, setViewport] = useState<PreviewViewport>({ panX: 0, panY: 0, zoom: 1 });

  useEffect(() => {
    linesRef.current = filtered;
  }, [filtered]);

  useEffect(() => {
    onSelectLineRef.current = onSelectLine;
  }, [onSelectLine]);

  useEffect(() => {
    viewportRef.current = viewport;
  }, [viewport]);

  useEffect(() => {
    if (layoutSize.width <= 0 || layoutSize.height <= 0 || filtered.length === 0) {
      return;
    }
    const fitted = computeAutoFitViewport(filtered, layoutSize.width, layoutSize.height);
    viewportRef.current = fitted;
    setViewport(fitted);
  }, [filtered, layoutSize.width, layoutSize.height]);

  const handleLayout = useCallback((event: any) => {
    const { width, height } = event.nativeEvent.layout ?? {};
    if (width && height) {
      setLayoutSize((prev) =>
        prev.width === width && prev.height === height ? prev : { width, height }
      );
    }
  }, []);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,

        onPanResponderGrant: (evt) => {
          const touches = evt.nativeEvent.touches;
          gestureRef.current.isTap = true;
          gestureRef.current.startTouch = { x: evt.nativeEvent.locationX, y: evt.nativeEvent.locationY };
          gestureRef.current.lastTouch = gestureRef.current.startTouch;
          gestureRef.current.pinchDistance = touches.length >= 2 ? touchDistance(touches[0], touches[1]) : null;
          gestureRef.current.pinchViewport = viewportRef.current;
        },

        onPanResponderMove: (evt) => {
          const touches = evt.nativeEvent.touches;

          if (touches.length === 1 && gestureRef.current.lastTouch) {
            const current = { x: touches[0].locationX, y: touches[0].locationY };
            const dx = current.x - gestureRef.current.lastTouch.x;
            const dy = current.y - gestureRef.current.lastTouch.y;
            if (Math.hypot(current.x - gestureRef.current.startTouch!.x, current.y - gestureRef.current.startTouch!.y) > 4) {
              gestureRef.current.isTap = false;
            }
            gestureRef.current.lastTouch = current;
            const next = {
              ...viewportRef.current,
              panX: viewportRef.current.panX + dx,
              panY: viewportRef.current.panY + dy,
            };
            viewportRef.current = next;
            setViewport(next);
            return;
          }

          if (touches.length >= 2) {
            const first = { x: touches[0].locationX, y: touches[0].locationY };
            const second = { x: touches[1].locationX, y: touches[1].locationY };
            const distance = Math.hypot(first.x - second.x, first.y - second.y);
            const midpoint = {
              x: (first.x + second.x) / 2,
              y: (first.y + second.y) / 2,
            };

            gestureRef.current.isTap = false;
            if (!gestureRef.current.pinchDistance || gestureRef.current.pinchDistance <= 0) {
              gestureRef.current.pinchDistance = distance;
              gestureRef.current.pinchViewport = viewportRef.current;
              return;
            }

            const scale = distance / gestureRef.current.pinchDistance;
            const base = gestureRef.current.pinchViewport;
            const nextZoom = clamp(base.zoom * scale, 0.08, 24);
            const zoomRatio = nextZoom / base.zoom;
            const next = {
              zoom: nextZoom,
              panX: midpoint.x - (midpoint.x - base.panX) * zoomRatio,
              panY: midpoint.y - (midpoint.y - base.panY) * zoomRatio,
            };
            viewportRef.current = next;
            setViewport(next);
          }
        },

        onPanResponderRelease: (evt) => {
          if (gestureRef.current.isTap && gestureRef.current.startTouch) {
            const tap = { x: evt.nativeEvent.locationX, y: evt.nativeEvent.locationY };
            const hit = pickNearestLineId(linesRef.current, viewportRef.current, tap, 24);
            if (hit) {
              onSelectLineRef.current?.(hit);
            } else {
              onSelectLineRef.current?.(null);
            }
          }

          gestureRef.current.lastTouch = null;
          gestureRef.current.startTouch = null;
          gestureRef.current.pinchDistance = null;
          gestureRef.current.isTap = false;
        },

        onPanResponderTerminate: () => {
          gestureRef.current.lastTouch = null;
          gestureRef.current.startTouch = null;
          gestureRef.current.pinchDistance = null;
          gestureRef.current.isTap = false;
        },
      }),
    []
  );

  const strokeForLayer = (layer: PlanLine["layer"]) => {
    if (layer === "boundary") return "#0f172a";
    if (layer === "center") return "#d97706";
    return "#475569";
  };

  return (
    <View
      onLayout={handleLayout}
      style={{ flex: 1, backgroundColor: "#f5f7fb" }}
      {...panResponder.panHandlers}
    >
      {filtered.length === 0 ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 18 }}>
          <Text style={{ color: "#475569", fontSize: 15, textAlign: "center", lineHeight: 22 }}>
            No plan lines to display yet.
          </Text>
          <Text style={{ color: "#94a3b8", fontSize: 12, marginTop: 6, textAlign: "center" }}>
            Import or generate a field to see the preview here.
          </Text>
        </View>
      ) : (
        <Svg width="100%" height="100%">
          <G transform={`translate(${viewport.panX}, ${viewport.panY}) scale(${viewport.zoom})`}>
            {filtered.map((line) => (
              <Line
                key={line.id}
                x1={line.from.x}
                y1={line.from.y}
                x2={line.to.x}
                y2={line.to.y}
                stroke={line.id === selectedLineId ? "#ef4444" : strokeForLayer(line.layer)}
                strokeWidth={0.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={line.id === selectedLineId ? 1 : 0.96}
              />
            ))}
          </G>
        </Svg>
      )}

      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: 14,
          right: 14,
          bottom: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.82)",
            borderRadius: 999,
            paddingHorizontal: 12,
            paddingVertical: 7,
            borderWidth: 1,
            borderColor: "rgba(148,163,184,0.35)",
          }}
        >
          <Text style={{ color: "#334155", fontSize: 11, fontWeight: "600" }}>
            Drag to pan • Pinch to zoom
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.82)",
            borderRadius: 999,
            paddingHorizontal: 12,
            paddingVertical: 7,
            borderWidth: 1,
            borderColor: "rgba(148,163,184,0.35)",
          }}
        >
          <Text style={{ color: "#334155", fontSize: 11, fontWeight: "600" }}>
            {selectedLineId ? "Tap a line to inspect details" : `${filtered.length} segments`}
          </Text>
        </View>
      </View>
    </View>
  );
}

function SwoziPage({
  delayA,
  delayB,
  setDelayA,
  setDelayB,
  toggleA,
  toggleB,
  setToggleA,
  setToggleB,
}: {
  delayA: number;
  delayB: number;
  setDelayA: (v: number) => void;
  setDelayB: (v: number) => void;
  toggleA: boolean;
  toggleB: boolean;
  setToggleA: (v: boolean) => void;
  setToggleB: (v: boolean) => void;
}) {
  return (
    <ScrollView style={{ flex: 1, padding: 18 }}>
      <Text style={secH}>Cart</Text>
      <Text style={itemH}>Configured Machine</Text>
      <Text style={itemT}>Not Configured</Text>
      <Text style={itemT}>Searching</Text>
      <Text style={secH}>Pump</Text>
      <Text style={itemH}>Manual Control</Text>
      <Text style={itemT}>Disconnected</Text>
      <RowToggle label="Manual Painting with Long Press" value={toggleA} onChange={setToggleA} />
      <RowToggle label="Paint When Reversing" value={toggleB} onChange={setToggleB} />
      <RowSlider label="Pump Start Delay [s]" value={delayA} onChange={setDelayA} />
      <RowSlider label="Pump Stop Delay [s]" value={delayB} onChange={setDelayB} />
      <Text style={secH}>Paint Rate</Text>
      <Text style={itemT}>Slowest Rate 100%</Text>
      <Text style={itemT}>Fastest Rate 100%</Text>
      <Text style={secH}>Arm Control</Text>
      <Text style={itemH}>Manual Control</Text>
      <Text style={itemT}>Disconnected</Text>
      <Text style={secH}>Dimensions</Text>
      <Text style={itemH}>Offset Sideways</Text>
      <Text style={itemT}>0.085m</Text>
      <Text style={itemH}>Offset Front</Text>
      <Text style={itemT}>0m</Text>
      <Text style={itemH}>Offset Up</Text>
      <Text style={itemT}>0.5m</Text>
      <Text style={itemH}>Mow Deck Cut Width</Text>
      <Text style={itemT}>1m</Text>
    </ScrollView>
  );
}

function StatusPage() {
  return (
    <ScrollView style={{ flex: 1, padding: 12 }}>
      <Text style={itemT}>Tablet not connected to a machine.</Text>
      <Text style={[itemT, { marginTop: 26 }]}>Searching for a machine to connect to.</Text>
      <Text style={[itemT, { marginTop: 26 }]}>Tablet not connected to a machine.</Text>
      <View style={{ marginTop: 26 }}>
        <Text style={itemH}>Current Status:</Text>
        <Text style={itemT}>Tablet App not connected to the machine.</Text>
        <Text style={itemH}>To Proceed:</Text>
        <Text style={[itemT, { fontWeight: "700" }]}>Ensure the tablet is configured and the machine is turned on.</Text>
        <Text style={itemH}>Next Status:</Text>
        <Text style={[itemT, { fontStyle: "italic" }]}>Connected to the machine.</Text>
      </View>
      <Text style={secH}>Field Category</Text>
      {[
        "Football (Soccer)",
        "Rugby",
        "North American Football (Gridiron)",
        "Running Tracks - Grass",
        "Athletics",
        "Ball and Net Sports",
        "Racquet, Bat and Stick Sports",
        "Miscellaneous Fields",
      ].map((x) => (
        <Text key={x} style={itemT}>🔒 {x}</Text>
      ))}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

function PositioningPage({
  toggleA,
  toggleB,
  toggleC,
  toggleD,
  setToggleA,
  setToggleB,
  setToggleC,
  setToggleD,
}: {
  toggleA: boolean;
  toggleB: boolean;
  toggleC: boolean;
  toggleD: boolean;
  setToggleA: (v: boolean) => void;
  setToggleB: (v: boolean) => void;
  setToggleC: (v: boolean) => void;
  setToggleD: (v: boolean) => void;
}) {
  return (
    <ScrollView style={{ flex: 1, padding: 18 }}>
      <Text style={secH}>Position</Text>
      <RowToggle label="Position Smoothing" value={toggleC} onChange={setToggleC} />
      <RowToggle label="Disable Position Snap with Long Press" value={toggleD} onChange={setToggleD} />
      <RowToggle label="Position Jump Detection" value={toggleA} onChange={setToggleA} />
      <Text style={secH}>Source</Text>
      <Text style={itemT}>◯ GPS</Text>
      <Text style={itemT}>◯ Local Laser Tracker</Text>
      <Text style={secH}>Terrain Correction</Text>
      <Text style={itemT}>Roll</Text>
      <RowToggle label="Terrain Correction" value={toggleA} onChange={setToggleA} />
      <RowToggle label="3D Terrain Correction (Beta)" value={toggleB} onChange={setToggleB} />
      <RowToggle label="3D Terrain Correction Prompts" value={toggleC} onChange={setToggleC} />
    </ScrollView>
  );
}

function SettingsPage({
  toggleA,
  toggleB,
  toggleC,
  delayA,
  setToggleA,
  setToggleB,
  setToggleC,
  setDelayA,
}: {
  toggleA: boolean;
  toggleB: boolean;
  toggleC: boolean;
  delayA: number;
  setToggleA: (v: boolean) => void;
  setToggleB: (v: boolean) => void;
  setToggleC: (v: boolean) => void;
  setDelayA: (v: number) => void;
}) {
  return (
    <ScrollView style={{ flex: 1, padding: 18 }}>
      <Text style={secH}>Field</Text>
      <Text style={itemH}>Ground Quality</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Text style={itemT}>Smooth</Text>
        <View style={{ flex: 1 }}>
          <Slider minimumValue={0} maximumValue={1} value={delayA} onValueChange={setDelayA} minimumTrackTintColor={TEAL} maximumTrackTintColor="#bfc0c3" />
        </View>
        <Text style={itemT}>Bumpy</Text>
      </View>
      <RowToggle label="Auto Line Select" value={toggleA} onChange={setToggleA} />
      <RowToggle label="Hard Surface" value={toggleB} onChange={setToggleB} />
      <Text style={secH}>Display</Text>
      <RowToggle label="Metric" value={toggleC} onChange={setToggleC} />
      <RowToggle label="Dark Mode" value={toggleB} onChange={setToggleB} />
      <Text style={secH}>Account Details</Text>
      <TextInput value="Username" style={{ borderBottomWidth: 1, borderBottomColor: "#c5c6c8", color: "#666", fontSize: 34 / 2, paddingVertical: 6 }} />
      <Text style={secH}>Restore Default Settings</Text>
      <Pressable style={{ width: 92, height: 92, borderWidth: 1, borderColor: "#bbb", backgroundColor: "#d6d6d7", justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 28 }}>↺</Text>
      </Pressable>
      <View style={{ height: 26 }} />
    </ScrollView>
  );
}

function HowToPage() {
  const items = [
    "Videos",
    "System Basics",
    "How to create a sports field",
    "How to reference the system",
    "How to change a sports field",
    "How to manually operate the pump or arm?",
    "How does the SWOZI terrain correction work? (Beta)",
  ];
  return (
    <ScrollView style={{ flex: 1, padding: 18 }}>
      <Text style={{ fontSize: 64 / 2, color: "#2c2c2d", fontWeight: "500", marginBottom: 10 }}>
        Welcome to the SWOZI knowledge base
      </Text>
      {items.map((x) => (
        <View key={x} style={{ height: 62 / 2, backgroundColor: "#d7d7d8", borderWidth: 1, borderColor: "#c8c9ca", borderRadius: 4, justifyContent: "center", paddingHorizontal: 12, marginBottom: 8 }}>
          <Text style={{ fontSize: 36 / 2, color: "#2e2f30" }}>{x}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function AboutPage() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ height: 52, backgroundColor: "#bcbdbf", flexDirection: "row" }}>
        {["TERMS", "OPEN SOURCE", "PRIVACY", "VERSION"].map((t, i) => (
          <View key={t} style={{ flex: 1, backgroundColor: i === 0 ? "#efefef" : "#bcbdbf", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 28 / 2, color: "#222" }}>{t}</Text>
          </View>
        ))}
      </View>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 62 / 2, color: "#2e2f31", marginBottom: 8 }}>SWOZI AG Terms of Service</Text>
        <Text style={itemT}>Last modified: November 1, 2016</Text>
        <Text style={[itemH, { marginTop: 12 }]}>Using our Services</Text>
        <Text style={itemT}>
          You must follow any policies made available to you within the Services.
        </Text>
        <Text style={[itemH, { marginTop: 12 }]}>Privacy and Copyright Protection</Text>
        <Text style={itemT}>SWOZI Privacy Policy explain how we treat your personal data.</Text>
      </View>
    </ScrollView>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
      <Text style={{ color: "#0f172a", fontWeight: "700" }}>{label}</Text>
      <Text style={{ color: "#0f172a", flexShrink: 1, textAlign: "right" }}>{value}</Text>
    </View>
  );
}

function lineLength(line: PlanLine) {
  return Math.hypot(line.to.x - line.from.x, line.to.y - line.from.y);
}

function lineAngle(line: PlanLine) {
  return (Math.atan2(line.to.y - line.from.y, line.to.x - line.from.x) * 180) / Math.PI;
}

function buildRectangleTemplate(name: string, width: number, height: number): PlanLine[] {
  const x0 = 10;
  const y0 = 10;
  const x1 = x0 + width;
  const y1 = y0 + height;
  const cx = x0 + width / 2;

  return [
    {
      id: `${name}-top`,
      label: `${name} Top`,
      layer: "boundary",
      from: { id: nextGeneratedPointId(), x: x0, y: y0 },
      to: { id: nextGeneratedPointId(), x: x1, y: y0 },
      width: 0.1,
    },
    {
      id: `${name}-right`,
      label: `${name} Right`,
      layer: "boundary",
      from: { id: nextGeneratedPointId(), x: x1, y: y0 },
      to: { id: nextGeneratedPointId(), x: x1, y: y1 },
      width: 0.1,
    },
    {
      id: `${name}-bottom`,
      label: `${name} Bottom`,
      layer: "boundary",
      from: { id: nextGeneratedPointId(), x: x1, y: y1 },
      to: { id: nextGeneratedPointId(), x: x0, y: y1 },
      width: 0.1,
    },
    {
      id: `${name}-left`,
      label: `${name} Left`,
      layer: "boundary",
      from: { id: nextGeneratedPointId(), x: x0, y: y1 },
      to: { id: nextGeneratedPointId(), x: x0, y: y0 },
      width: 0.1,
    },
    {
      id: `${name}-center`,
      label: `${name} Center`,
      layer: "center",
      from: { id: nextGeneratedPointId(), x: cx, y: y0 },
      to: { id: nextGeneratedPointId(), x: cx, y: y1 },
      width: 0.08,
    },
  ];
}

function buildTemplate(name: string, width: number, height: number): PlanLine[] {
  resetGeneratedPointIds();
  const key = name.toLowerCase();
  if (key.includes("reference sample")) return buildReferenceSampleTemplate(width, height);
  if (key.includes("football")) return buildFootballTemplate(width, height);
  if (key.includes("hockey")) return buildHockeyTemplate(width, height);
  if (key.includes("cricket")) return buildCricketPitchTemplate(width, height);
  if (key.includes("volleyball")) return buildVolleyballTemplate(width, height);
  if (key.includes("badminton")) return buildBadmintonTemplate(width, height);
  if (key.includes("kabaddi")) return buildKabaddiTemplate(width, height);
  if (key.includes("khokho")) return buildKhoKhoTemplate(width, height);
  return buildRectangleTemplate(name.toLowerCase().replace(/\s+/g, "_"), width, height);
}

function buildFootballTemplate(width: number, height: number): PlanLine[] {
  const name = "football";
  const x0 = 10;
  const y0 = 10;
  const x1 = x0 + width;
  const y1 = y0 + height;
  const centerX = x0 + width / 2;
  const centerY = y0 + height / 2;
  const penaltyW = 16.5;
  const penaltyH = 40.32;
  const goalW = 5.5;
  const goalH = 18.32;
  const arcRadius = 9.15;

  return [
    ...buildRectangleTemplate(name, width, height),
    line(`${name}-center-line`, "center", centerX, y0, centerX, y1, 0.1, "Center Line"),
    ...buildRect(name, "marking", x0, centerY - penaltyH / 2, x0 + penaltyW, centerY + penaltyH / 2, 0.08, "Left Penalty Box"),
    ...buildRect(name, "marking", x1 - penaltyW, centerY - penaltyH / 2, x1, centerY + penaltyH / 2, 0.08, "Right Penalty Box"),
    ...buildRect(name, "marking", x0, centerY - goalH / 2, x0 + goalW, centerY + goalH / 2, 0.08, "Left Goal Box"),
    ...buildRect(name, "marking", x1 - goalW, centerY - goalH / 2, x1, centerY + goalH / 2, 0.08, "Right Goal Box"),
    ...buildCircle(name, "center", centerX, centerY, arcRadius, 64, "Center Circle"),
    ...buildArcPolyline(x0 + penaltyW, centerY, arcRadius, 305, 55, 24, "marking", `${name}-left-penalty-arc`),
    ...buildArcPolyline(x1 - penaltyW, centerY, arcRadius, 125, 235, 24, "marking", `${name}-right-penalty-arc`),
    ...buildCornerArcs(name, x0, y0, x1, y1, 1, 12),
  ];
}

function buildHockeyTemplate(width: number, height: number): PlanLine[] {
  const name = "hockey";
  const x0 = 10;
  const y0 = 10;
  const x1 = x0 + width;
  const y1 = y0 + height;
  const centerX = x0 + width / 2;
  const centerY = y0 + height / 2;
  const dRadius = 14.63;
  const circleX = x0 + 22.9;
  const rightCircleX = x1 - 22.9;

  return [
    ...buildRectangleTemplate(name, width, height),
    line(`${name}-center-line`, "center", centerX, y0, centerX, y1, 0.08, "Center Line"),
    line(`${name}-left-23`, "marking", circleX, y0, circleX, y1, 0.06, "23m Line Left"),
    line(`${name}-right-23`, "marking", rightCircleX, y0, rightCircleX, y1, 0.06, "23m Line Right"),
    ...buildArcPolyline(x0 + 14.63, centerY, dRadius, 270, 90, 32, "marking", `${name}-left-d-arc-a`),
    ...buildArcPolyline(x0 + 14.63, centerY, dRadius, 90, 270, 32, "marking", `${name}-left-d-arc-b`),
    ...buildArcPolyline(x1 - 14.63, centerY, dRadius, 90, 270, 32, "marking", `${name}-right-d-arc-a`),
    ...buildArcPolyline(x1 - 14.63, centerY, dRadius, 270, 90, 32, "marking", `${name}-right-d-arc-b`),
  ];
}

function buildCricketPitchTemplate(width: number, height: number): PlanLine[] {
  const name = "cricket_pitch";
  const x0 = 10;
  const y0 = 10;
  const x1 = x0 + width;
  const y1 = y0 + height;
  const centerX = x0 + width / 2;
  const centerY = y0 + height / 2;
  return [
    ...buildRectangleTemplate(name, width, height),
    line(`${name}-pitch-line-a`, "center", centerX, y0, centerX, y1, 0.08, "Pitch Center"),
    line(`${name}-pitch-line-b`, "center", centerX - 1.525, y0, centerX - 1.525, y1, 0.08, "Pitch Stump Line Left"),
    line(`${name}-pitch-line-c`, "center", centerX + 1.525, y0, centerX + 1.525, y1, 0.08, "Pitch Stump Line Right"),
    ...buildArcPolyline(centerX, centerY, 27.43, 300, 60, 36, "marking", `${name}-left-ring`),
    ...buildArcPolyline(centerX, centerY, 27.43, 120, 240, 36, "marking", `${name}-right-ring`),
  ];
}

function buildVolleyballTemplate(width: number, height: number): PlanLine[] {
  const name = "volleyball";
  const x0 = 10;
  const y0 = 10;
  const x1 = x0 + width;
  const y1 = y0 + height;
  const centerX = x0 + width / 2;
  return [
    ...buildRectangleTemplate(name, width, height),
    line(`${name}-center-line`, "center", centerX, y0, centerX, y1, 0.08, "Center Line"),
    line(`${name}-attack-left`, "marking", centerX - 3, y0, centerX - 3, y1, 0.06, "Attack Line Left"),
    line(`${name}-attack-right`, "marking", centerX + 3, y0, centerX + 3, y1, 0.06, "Attack Line Right"),
  ];
}

function buildBadmintonTemplate(width: number, height: number): PlanLine[] {
  const name = "badminton";
  const x0 = 10;
  const y0 = 10;
  const x1 = x0 + width;
  const y1 = y0 + height;
  const centerX = x0 + width / 2;
  return [
    ...buildRectangleTemplate(name, width, height),
    line(`${name}-center-net`, "center", centerX, y0, centerX, y1, 0.05, "Net Line"),
    line(`${name}-short-service`, "marking", x0, y0 + 1.98, x1, y0 + 1.98, 0.05, "Short Service Line"),
    line(`${name}-long-service`, "marking", x0, y1 - 0.76, x1, y1 - 0.76, 0.05, "Long Service Line Doubles"),
    line(`${name}-singles-left`, "marking", x0 + 0.46, y0, x0 + 0.46, y1, 0.04, "Singles Sideline Left"),
    line(`${name}-singles-right`, "marking", x1 - 0.46, y0, x1 - 0.46, y1, 0.04, "Singles Sideline Right"),
  ];
}

function buildKabaddiTemplate(width: number, height: number): PlanLine[] {
  const name = "kabaddi";
  const x0 = 10;
  const y0 = 10;
  const x1 = x0 + width;
  const y1 = y0 + height;
  const centerY = y0 + height / 2;
  return [
    ...buildRectangleTemplate(name, width, height),
    line(`${name}-halfway`, "center", x0, centerY, x1, centerY, 0.08, "Halfway Line"),
    line(`${name}-baulk-a`, "marking", x0, centerY - 3.75, x1, centerY - 3.75, 0.06, "Baulk Line A"),
    line(`${name}-baulk-b`, "marking", x0, centerY + 3.75, x1, centerY + 3.75, 0.06, "Baulk Line B"),
    line(`${name}-bonus-a`, "marking", x0, y0 + 1.75, x1, y0 + 1.75, 0.06, "Bonus Line A"),
    line(`${name}-bonus-b`, "marking", x0, y1 - 1.75, x1, y1 - 1.75, 0.06, "Bonus Line B"),
  ];
}

function buildKhoKhoTemplate(width: number, height: number): PlanLine[] {
  const name = "khokho";
  const x0 = 10;
  const y0 = 10;
  const x1 = x0 + width;
  const y1 = y0 + height;
  const centerX = x0 + width / 2;
  const centerY = y0 + height / 2;
  const laneGap = 2.3;
  return [
    ...buildRectangleTemplate(name, width, height),
    line(`${name}-central-lane`, "center", centerX, y0 + 1.5, centerX, y1 - 1.5, 0.08, "Central Lane"),
    ...Array.from({ length: 8 }, (_, i) => {
      const offset = y0 + 2.55 + laneGap * i;
      return line(`${name}-cross-${i + 1}`, "marking", x0, offset, x1, offset, 0.05, `Cross Lane ${i + 1}`);
    }),
  ];
}

function buildArcPolyline(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  segments: number,
  layer: PlanLine["layer"],
  prefix: string
): PlanLine[] {
  const points: Array<{ x: number; y: number }> = [];
  const sweep = endAngle >= startAngle ? endAngle - startAngle : endAngle + 360 - startAngle;
  for (let i = 0; i <= segments; i += 1) {
    const angle = startAngle + (sweep * i) / segments;
    const rad = (angle * Math.PI) / 180;
    points.push({ x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) });
  }
  const lines: PlanLine[] = [];
  for (let i = 0; i < points.length - 1; i += 1) {
    lines.push({
      id: `${prefix}-${i}`,
      label: `${prefix} segment ${i + 1}`,
      layer,
      from: { id: nextGeneratedPointId(), x: points[i].x, y: points[i].y },
      to: { id: nextGeneratedPointId(), x: points[i + 1].x, y: points[i + 1].y },
      width: layer === "boundary" ? 0.12 : 0.08,
    });
  }
  return lines;
}

function buildCircle(
  name: string,
  layer: PlanLine["layer"],
  cx: number,
  cy: number,
  radius: number,
  segments: number,
  label: string
) {
  return buildArcPolyline(cx, cy, radius, 0, 360, segments, layer, `${name}-${label.replace(/\s+/g, "-").toLowerCase()}`);
}

function buildRect(
  name: string,
  layer: PlanLine["layer"],
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  width: number,
  label: string
) {
  return [
    line(`${name}-${label}-top`, layer, x0, y0, x1, y0, width, `${label} Top`),
    line(`${name}-${label}-right`, layer, x1, y0, x1, y1, width, `${label} Right`),
    line(`${name}-${label}-bottom`, layer, x1, y1, x0, y1, width, `${label} Bottom`),
    line(`${name}-${label}-left`, layer, x0, y1, x0, y0, width, `${label} Left`),
  ];
}

function buildCornerArcs(name: string, x0: number, y0: number, x1: number, y1: number, radius: number, segments = 12) {
  return [
    ...buildArcPolyline(x0, y0, radius, 180, 270, segments, "marking", `${name}-corner-nw`),
    ...buildArcPolyline(x1, y0, radius, 270, 360, segments, "marking", `${name}-corner-ne`),
    ...buildArcPolyline(x1, y1, radius, 0, 90, segments, "marking", `${name}-corner-se`),
    ...buildArcPolyline(x0, y1, radius, 90, 180, segments, "marking", `${name}-corner-sw`),
  ];
}

function buildReferenceSampleTemplate(width: number, height: number): PlanLine[] {
  const x0 = 12;
  const y0 = 10;
  const x1 = 88;
  const y1 = 50;
  const centerX = (x0 + x1) / 2;
  const penaltyW = 14;
  const penaltyH = 24;

  return [
    line("ref-top", "boundary", x0, y0, x1, y0, 0.12, "Touchline North"),
    line("ref-right", "boundary", x1, y0, x1, y1, 0.12, "Goal Line East"),
    line("ref-bottom", "boundary", x1, y1, x0, y1, 0.12, "Touchline South"),
    line("ref-left", "boundary", x0, y1, x0, y0, 0.12, "Goal Line West"),
    line("ref-center", "center", centerX, y0, centerX, y1, 0.1, "Center Split"),
    line("ref-center-guide", "center", centerX - 10, (y0 + y1) / 2, centerX + 10, (y0 + y1) / 2, 0.08, "Center Guide"),
    ...buildRect("ref-left-box", "marking", x0, y0 + 8, x0 + penaltyW, y0 + 32, 0.1, "Penalty Box West"),
    ...buildRect("ref-right-box", "marking", x1 - penaltyW, y0 + 8, x1, y0 + 32, 0.1, "Penalty Box East"),
  ];
}

function line(
  id: string,
  layer: PlanLine["layer"],
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  width: number,
  label: string
): PlanLine {
  return {
    id,
    label,
    layer,
    from: { id: nextGeneratedPointId(), x: x1, y: y1 },
    to: { id: nextGeneratedPointId(), x: x2, y: y2 },
    width,
  };
}

let generatedPointIdCounter = 1;

function resetGeneratedPointIds() {
  generatedPointIdCounter = 1;
}

function nextGeneratedPointId() {
  return generatedPointIdCounter++;
}

function defaultDimensions(name: string) {
  const key = name.toLowerCase();
  if (key.includes("volleyball")) return { width: 18, height: 9 };
  if (key.includes("badminton")) return { width: 13.4, height: 6.1 };
  if (key.includes("kabaddi")) return { width: 13, height: 10 };
  if (key.includes("khokho")) return { width: 27, height: 16 };
  if (key.includes("hockey")) return { width: 91.4, height: 55 };
  if (key.includes("cricket")) return { width: 20.12, height: 3.05 };
  return { width: 100, height: 64 };
}

const inputStyle = {
  borderWidth: 1,
  borderColor: "#cbd5e1",
  borderRadius: 10,
  paddingHorizontal: 12,
  paddingVertical: 10,
  color: "#111",
} as const;

const generatorStyles = {
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.22)",
    justifyContent: "center",
    padding: 18,
  },
  sheet: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#d7dee8",
    maxWidth: 760,
    width: "100%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 14,
  },
  sheetTitle: {
    color: "#0f172a",
    fontSize: 22,
    fontWeight: "800",
  },
  sheetSubtitle: {
    color: "#64748b",
    marginTop: 4,
    lineHeight: 20,
  },
  closePill: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#d7dee8",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },
  closeText: {
    color: "#0f172a",
    fontSize: 22,
    lineHeight: 22,
    marginTop: -2,
  },
  toggleRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  toggleChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#d7dee8",
  },
  toggleChipActive: {
    backgroundColor: "#0f172a",
    borderColor: "#0f172a",
  },
  toggleChipText: {
    color: "#334155",
    fontWeight: "700",
  },
  toggleChipTextActive: {
    color: "#fff",
  },
  presetGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  presetCard: {
    width: "48.5%",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#d7dee8",
    backgroundColor: "#f8fafc",
  },
  presetCardActive: {
    borderColor: "#0f172a",
    backgroundColor: "#eef2f7",
  },
  presetTitle: {
    color: "#0f172a",
    fontWeight: "700",
    fontSize: 15,
  },
  presetTitleActive: {},
  presetMeta: {
    color: "#64748b",
    marginTop: 4,
    fontSize: 12,
  },
  presetMetaActive: {},
  inputRow: {
    flexDirection: "row",
    gap: 12,
  },
  inputLabel: {
    color: "#334155",
    fontWeight: "700",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#f8fafc",
    color: "#0f172a",
  },
  generateButton: {
    marginTop: 16,
    backgroundColor: "#0f172a",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  generateButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
  },
} as const;

function linesToDxf(lines: PlanLine[], name: string) {
  const layers = Array.from(new Set(lines.map((line) => line.layer.toUpperCase())));
  const layerTable = layers
    .map((layer) => [
      "0",
      "LAYER",
      "2",
      layer,
      "70",
      "0",
      "62",
      layer === "BOUNDARY" ? "7" : layer === "CENTER" ? "3" : "4",
      "6",
      "CONTINUOUS",
    ].join("\n"))
    .join("\n");

  const entities = lines
    .map((entry) => [
      "0",
      "LINE",
      "8",
      entry.layer.toUpperCase(),
      "370",
      String(mmLineweight(entry.width)),
      "10",
      String(entry.from.x),
      "20",
      String(entry.from.y),
      "11",
      String(entry.to.x),
      "21",
      String(entry.to.y),
    ].join("\n"))
    .join("\n");

  return [
    "0",
    "SECTION",
    "2",
    "HEADER",
    "0",
    "ENDSEC",
    "0",
    "SECTION",
    "2",
    "TABLES",
    "0",
    "TABLE",
    "2",
    "LAYER",
    "70",
    String(layers.length),
    layerTable,
    "0",
    "ENDTAB",
    "0",
    "ENDSEC",
    "0",
    "SECTION",
    "2",
    "ENTITIES",
    entities,
    "0",
    "ENDSEC",
    "0",
    "EOF",
  ].join("\n");
}

function mmLineweight(widthMeters: number) {
  const mm = Math.round(widthMeters * 1000);
  if (mm <= 0) return -1;
  return Math.min(211, Math.max(0, mm));
}

function RowToggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
      <Text style={itemT}>{label}</Text>
      <Switch value={value} onValueChange={onChange} trackColor={{ false: "#cfd0d2", true: "#95d4cc" }} thumbColor={value ? TEAL : "#e3e3e3"} />
    </View>
  );
}

function RowSlider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={itemH}>{label}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Slider minimumValue={0} maximumValue={1} value={value} onValueChange={onChange} minimumTrackTintColor={TEAL} maximumTrackTintColor="#bfc0c3" />
        </View>
        <Text style={itemT}>{value.toFixed(2)}s</Text>
      </View>
    </View>
  );
}

const secH = { fontSize: 66 / 2, color: "#515254", fontWeight: "700", marginTop: 10 } as const;
const itemH = { fontSize: 50 / 2, color: "#55565a", fontWeight: "700", marginTop: 8 } as const;
const itemT = { fontSize: 46 / 2, color: "#616266", marginTop: 4 } as const;
