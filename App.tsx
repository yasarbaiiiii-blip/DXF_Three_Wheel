import "./global.css";

import React, { useEffect, useMemo, useState } from "react";
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

type MachineStatus = "connected" | "degraded" | "disconnected";
type ThemeMode = "light" | "dark";

const defaultVisibility: LayerVisibility = {
  boundary: true,
  marking: true,
  center: true,
};

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [machineStatus] = useState<MachineStatus>("connected");
  const [activePanel, setActivePanel] = useState<SidebarPanel | null>(null);
  const [importedPlan, setImportedPlan] = useState<ImportedPlan | null>(null);
  const [layerVisibility, setLayerVisibility] =
    useState<LayerVisibility>(defaultVisibility);
  const [planLines, setPlanLines] = useState<PlanLine[]>([]);
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);
  const [missionRunning, setMissionRunning] = useState(false);
  const [markingStyle, setMarkingStyle] = useState<MarkingStyle>("straight");
  const [rotation, setRotation] = useState(0);
  const { width } = useWindowDimensions();

  const palette: Palette = theme === "dark" ? darkPalette : lightPalette;
  const isCompact = width < 1100;

  const visibleLines = useMemo(() => {
    if (!importedPlan) {
      return [] as PlanLine[];
    }

    return planLines.filter((line) => layerVisibility[line.layer]);
  }, [importedPlan, layerVisibility, planLines]);

  const selectedLine = useMemo(
    () => visibleLines.find((line) => line.id === selectedLineId) ?? null,
    [selectedLineId, visibleLines]
  );

  useEffect(() => {
    if (!selectedLineId) {
      return;
    }

    if (!visibleLines.some((line) => line.id === selectedLineId)) {
      setSelectedLineId(null);
    }
  }, [selectedLineId, visibleLines]);

  const handleImport = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: false,
        copyToCacheDirectory: true,
      });

      if (result.canceled || result.assets.length === 0) {
        return;
      }

      const asset = result.assets[0];
      const fileName = asset.name ?? "imported-plan";
      const extension = fileName.split(".").pop()?.toLowerCase();

      if (extension !== "csv" && extension !== "dxf") {
        Alert.alert(
          "Unsupported file",
          "Only CSV and DXF files are supported right now."
        );
        return;
      }

      const nextPlan: ImportedPlan = {
        fileName,
        uri: asset.uri,
        fileType: extension,
      };
      const parsedLines = await readImportedPlanFile(nextPlan);

      if (parsedLines.length === 0) {
        Alert.alert(
          "Import failed",
          "This file did not produce any visible geometry."
        );
        return;
      }

      setImportedPlan(nextPlan);
      setPlanLines(parsedLines);
      setLayerVisibility(defaultVisibility);
      setSelectedLineId(parsedLines[0]?.id ?? null);
      setActivePanel("details");
    } catch (error) {
      Alert.alert("Import failed", "The file could not be read or parsed.");
    }
  };

  const handleCopyFileName = async () => {
    if (!importedPlan) {
      return;
    }

    await Clipboard.setStringAsync(importedPlan.fileName);
    Alert.alert("Copied", "The file name has been copied.");
  };

  const handleDeletePlan = () => {
    if (!importedPlan) {
      return;
    }

    Alert.alert("Delete imported plan?", "This will remove the current plan.", [
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
    if (!selectedLine) {
      return;
    }

    Alert.alert(
      "Delete selected line?",
      `Remove ${selectedLine.label} from the plan?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setPlanLines((current) =>
              current.filter((line) => line.id !== selectedLine.id)
            );
            setSelectedLineId(null);
          },
        },
      ]
    );
  };

  const handleTogglePanel = (panel: SidebarPanel) => {
    setActivePanel((current) => (current === panel ? null : panel));
  };

  const handleToggleLayer = (layer: keyof LayerVisibility) => {
    setLayerVisibility((current) => ({
      ...current,
      [layer]: !current[layer],
    }));
  };

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
            onToggleTheme={() =>
              setTheme((current) => (current === "dark" ? "light" : "dark"))
            }
          />

          <View
            className="flex-1"
            style={{
              flexDirection: isCompact ? "column" : "row",
            }}
          >
            <LeftSidebar
              palette={palette}
              compact={isCompact}
              activePanel={activePanel}
              onTogglePanel={handleTogglePanel}
              importedPlan={importedPlan}
              layerVisibility={layerVisibility}
              onToggleLayer={handleToggleLayer}
              onImportPress={handleImport}
              onCopyFileName={handleCopyFileName}
              onDeletePlan={handleDeletePlan}
              selectedLine={selectedLine}
              totalVisibleLines={visibleLines.length}
              missionRunning={missionRunning}
              onToggleMission={() => setMissionRunning((current) => !current)}
              markingStyle={markingStyle}
              onSelectMarkingStyle={setMarkingStyle}
              rotation={rotation}
              onDeleteSelectedLine={handleDeleteSelectedLine}
            />
            <GeometryViewport
              palette={palette}
              compact={isCompact}
              importedPlan={importedPlan}
              lines={visibleLines}
              selectedLineId={selectedLineId}
              onSelectLine={setSelectedLineId}
              onImportPress={handleImport}
              missionRunning={missionRunning}
              onToggleMission={() => setMissionRunning((current) => !current)}
              markingStyle={markingStyle}
              rotation={rotation}
              onRotationChange={setRotation}
              onDeleteSelectedLine={handleDeleteSelectedLine}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
