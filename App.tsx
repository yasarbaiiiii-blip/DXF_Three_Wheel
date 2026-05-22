import "./global.css";

import React, { useState } from "react";
import { Alert, View, useWindowDimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { GeometryViewport } from "./src/components/GeometryViewport";
import { LeftSidebar } from "./src/components/LeftSidebar";
import { TopHeader } from "./src/components/TopHeader";
import { darkPalette, lightPalette, type Palette } from "./src/theme/colors";

type MachineStatus = "connected" | "degraded" | "disconnected";
type ThemeMode = "light" | "dark";

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [machineStatus, setMachineStatus] = useState<MachineStatus>("connected");
  const { width } = useWindowDimensions();

  const palette: Palette = theme === "dark" ? darkPalette : lightPalette;
  const isCompact = width < 1100;

  const handleEmergencyStop = () => {
    setMachineStatus("disconnected");
    Alert.alert(
      "Mission Halted",
      "Emergency stop activated. System disconnected."
    );
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
            title="Swozi Marking System"
            fileName="soccer_pitch_fifa_edited.dxf"
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
            <LeftSidebar palette={palette} compact={isCompact} />
            <GeometryViewport
              onEmergencyStop={handleEmergencyStop}
              palette={palette}
              compact={isCompact}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
