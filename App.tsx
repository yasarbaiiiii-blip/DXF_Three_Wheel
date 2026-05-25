import "./global.css";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, View, useWindowDimensions } from "react-native";
import * as Clipboard from "expo-clipboard";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { GeometryViewport } from "./src/components/GeometryViewport";
import { LeftSidebar } from "./src/components/LeftSidebar";
import { TopHeader } from "./src/components/TopHeader";
import { darkPalette, lightPalette, type Palette } from "./src/theme/colors";
import { readImportedPlanFile } from "./src/utils/planImport";
import type {
  ImportedPlan,
  LayerVisibility,
  MarkingStyle,
  PlanLine,
  SidebarPanel,
} from "./src/types/plan";

import type { PlanLine as PlanLineType } from "./src/types/plan";

type MachineStatus = "connected" | "degraded" | "disconnected";
type ThemeMode = "light" | "dark";

const defaultVisibility: LayerVisibility = {
  boundary: true,
  marking: true,
  center: true,
};

// ── NAV TRACKER ──────────────────────────────────────────────────────────────
// Every call to _setSidebarOpen is wrapped in a named callback so we can log who called it.
let _trackerIdx = 0;
function trackNavChange(open: boolean, tag: string) {
  /* eslint-disable no-console */
  console.log(`[NAV #${++_trackerIdx}] ${tag} → ${open}`);
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [machineStatus] = useState<MachineStatus>("connected");

  // Wrapped setters so every call site is visible in the console
  const [sidebarOpen, _setSidebarOpenRaw] = useState(false);
  const setSidebarOpen = (open: boolean, tag: string) => {
    trackNavChange(open, tag);
    _setSidebarOpenRaw(open);
  };

  const [activePanel, setActivePanel] = useState<SidebarPanel | null>(null);
  const [importedPlan, setImportedPlan] = useState<ImportedPlan | null>(null);
  const [layerVisibility, setLayerVisibility] = useState<LayerVisibility>(defaultVisibility);
  const [planLines, setPlanLines] = useState<PlanLine[]>([]);
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);
  const [missionRunning, setMissionRunning] = useState(false);
  const [markingStyle, setMarkingStyle] = useState<MarkingStyle>("straight");
  const [rotation, setRotation] = useState(0);
  const { width } = useWindowDimensions();

  const palette: Palette = theme === "dark" ? darkPalette : lightPalette;
  const isCompact = width < 1100;

  // ── DERIVED DATA ───────────────────────────────────────────────────────────
  const visibleLines = useMemo(() => {
    if (!importedPlan) return [] as PlanLine[];
    return planLines.filter((line) => layerVisibility[line.layer]);
  }, [importedPlan, layerVisibility, planLines]);

  const selectedLine = useMemo(
    () => visibleLines.find((line) => line.id === selectedLineId) ?? null,
    [selectedLineId, visibleLines]
  );

  // selectedMetrics — same computation that LeftSidebar.PanelContent used to do inline
  const selectedMetrics = useMemo(() => {
    if (!selectedLine) return null;
    const dx = selectedLine.to.x - selectedLine.from.x;
    const dy = selectedLine.to.y - selectedLine.from.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;
    return {
      length,
      angle,
      span: `${selectedLine.from.id} to ${selectedLine.to.id}`,
      range: `(${selectedLine.from.x.toFixed(1)}, ${selectedLine.from.y.toFixed(
        1
      )}) -> (${selectedLine.to.x.toFixed(1)}, ${selectedLine.to.y.toFixed(1)})`,
    };
  }, [selectedLine]);

  // ① UseEffect: fires on every render where sidebarOpen or activePanel differs from last render
  useEffect(() => {
    trackNavChange(sidebarOpen, "USE-EFFECT snapshot");
  }, [sidebarOpen, activePanel]);

  // ② Invariant tracker: detects the exact moment navMenuOpen flips true→false or false→true
  const prevOpenRef = useRef(sidebarOpen);
  useEffect(() => {
    if (prevOpenRef.current !== sidebarOpen) {
      trackNavChange(sidebarOpen, prevOpenRef.current ? "WAS-OPEN now CLOSING" : "WAS-CLOSED now OPENING");
    }
    prevOpenRef.current = sidebarOpen;
  }, [sidebarOpen, activePanel]);

  // ③ Reset selectedLineId when the currently-selected line is no longer visible
  useEffect(() => {
    if (!selectedLineId) return;
    if (!visibleLines.some((line) => line.id === selectedLineId)) {
      setSelectedLineId(null);
    }
  }, [selectedLineId, visibleLines]);

  // ── CALLBACKS ─────────────────────────────────────────────────────────────
  const handleImport = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: false,
        copyToCacheDirectory: true,
      });
      if (result.canceled || result.assets.length === 0) return;
      const asset = result.assets[0];
      const fileName = asset.name ?? "imported-plan";
      const extension = fileName.split(".").pop()?.toLowerCase();
      if (extension !== "csv" && extension !== "dxf") {
        Alert.alert("Unsupported file", "Only CSV and DXF files are supported.");
        return;
      }
      const nextPlan: ImportedPlan = { fileName, uri: asset.uri, fileType: extension as "csv" | "dxf" };
      const parsedLines = await readImportedPlanFile(nextPlan);
      if (parsedLines.length === 0) {
        Alert.alert("Import failed", "This file did not produce any visible geometry.");
        return;
      }
      setImportedPlan(nextPlan);
      setPlanLines(parsedLines);
      setLayerVisibility(defaultVisibility);
      setSelectedLineId(parsedLines[0]?.id ?? null);
      setActivePanel("details");
    } catch {
      Alert.alert("Import failed", "The file could not be read or parsed.");
    }
  };

  const handleCopyFileName = async () => {
    if (!importedPlan) return;
    await Clipboard.setStringAsync(importedPlan.fileName);
    Alert.alert("Copied", "File name copied to clipboard.");
  };

  const handleDeletePlan = () => {
    if (!importedPlan) return;
    Alert.alert("Delete imported plan?", "Remove the current plan.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setImportedPlan(null);
          setSelectedLineId(null);
          setMissionRunning(false);
          setRotation(0);
          setPlanLines([]);
          setLayerVisibility(defaultVisibility);
          setActivePanel("import");
        },
      },
    ]);
  };

  const handleDeleteSelectedLine = () => {
    if (!selectedLine) return;
    Alert.alert(
      "Delete selected line?",
      `Remove "${selectedLine.label}" from the plan?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setPlanLines((cur) => cur.filter((l) => l.id !== selectedLine.id));
            setSelectedLineId(null);
          },
        },
      ]
    );
  };

  // ── NAV MUTATORS ──────────────────────────────────────────────────────────
  // Each explicitly names itself in the tracker so we always know WHO flipped navMenuOpen

  const handleTogglePanel = (panel: SidebarPanel) => {
    // eslint-disable-next-line no-console
    console.log("[NAV] handleTogglePanel → activePanel:", panel);
    setActivePanel(panel);
    setSidebarOpen(false, `handleTogglePanel("${panel}")`);
  };

  const handleToggleSidebar = () => {
    // eslint-disable-next-line no-console
    console.log("[NAV] handleToggleSidebar → open:true, activePanel:null");
    setActivePanel(null);
    setSidebarOpen(true, "HAMBURGER onPress");
  };

  const handleBackHome = () => {
    // eslint-disable-next-line no-console
    console.log("[NAV] handleBackHome → activePanel:null, open:false");
    setActivePanel(null);
    setSidebarOpen(false, "BACK_ICON onPress");
  };

  const handleCloseFromBackdrop = () => {
    setSidebarOpen(false, "BACKDROP onPress");
  };

  const handleToggleLayer = (layer: keyof LayerVisibility) => {
    setLayerVisibility((cur) => ({ ...cur, [layer]: !cur[layer] }));
  };

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <SafeAreaProvider>
      <SafeAreaView
        className="flex-1"
        style={{ flex: 1, backgroundColor: palette.background }}
        edges={["top", "left", "right"]}
      >
        <StatusBar style={theme === "dark" ? "light" : "dark"} />
        <View className="flex-1" style={{ backgroundColor: palette.background }}>
          <TopHeader
            title="DXY Field Marker"
            fileName={importedPlan?.fileName}
            status={machineStatus}
            theme={theme}
            palette={palette}
            sidebarVisible={sidebarOpen}
            onToggleSidebar={handleToggleSidebar}
            onToggleTheme={() =>
              setTheme((cur) => (cur === "dark" ? "light" : "dark"))
            }
          />

          <View className="flex-1">
            <GeometryViewport
              palette={palette}
              compact={isCompact}
              importedPlan={importedPlan}
              lines={visibleLines}
              selectedLineId={selectedLineId}
              onSelectLine={setSelectedLineId}
              onImportPress={handleImport}
              markingStyle={markingStyle}
              onSelectMarkingStyle={setMarkingStyle}
              rotation={rotation}
              onRotationChange={setRotation}
              onDeleteSelectedLine={handleDeleteSelectedLine}
            />
          </View>
        </View>

        {/* ── MENU MODE ─────────────────────────────────────────────────── */}
        {sidebarOpen && !activePanel ? (
          <LeftSidebar
            palette={palette}
            compact={isCompact}
            mode="menu"
            activePanel={activePanel}
            // eslint-disable-next-line no-console
            onTogglePanel={(panel) => { console.log("[NAV]", "MenuButton onClick → panel:", panel); setActivePanel(panel); setSidebarOpen(false, `MenuButton "${panel}"`); }}
            onCloseMenu={handleCloseFromBackdrop}
            importedPlan={importedPlan}
            layerVisibility={layerVisibility}
            onToggleLayer={handleToggleLayer}
            onImportPress={handleImport}
            onCopyFileName={handleCopyFileName}
            onDeletePlan={handleDeletePlan}
            selectedLine={selectedLine}
            totalVisibleLines={visibleLines.length}
            missionRunning={missionRunning}
            onToggleMission={() => { setMissionRunning((c) => !c); }}
            markingStyle={markingStyle}
            onSelectMarkingStyle={setMarkingStyle}
            rotation={rotation}
            onDeleteSelectedLine={handleDeleteSelectedLine}
          />
        ) : null}

        {/* ── PANEL MODE ────────────────────────────────────────────────── */}
        {activePanel ? (
          <LeftSidebar
            palette={palette}
            compact={isCompact}
            mode="panel"
            activePanel={activePanel}
            onTogglePanel={handleTogglePanel}
            onBack={handleBackHome}
            importedPlan={importedPlan}
            layerVisibility={layerVisibility}
            onToggleLayer={handleToggleLayer}
            onImportPress={handleImport}
            onCopyFileName={handleCopyFileName}
            onDeletePlan={handleDeletePlan}
            selectedLine={selectedLine}
            totalVisibleLines={visibleLines.length}
            missionRunning={missionRunning}
            onToggleMission={() => { setMissionRunning((c) => !c); }}
            markingStyle={markingStyle}
            onSelectMarkingStyle={setMarkingStyle}
            rotation={rotation}
            onDeleteSelectedLine={handleDeleteSelectedLine}
          />
        ) : null}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
