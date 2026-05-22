import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Target, Triangle } from "lucide-react-native";
import Svg, { Circle, Line, Rect } from "react-native-svg";

import type { Palette } from "../theme/colors";

interface GeometryViewportProps {
  onEmergencyStop: () => void;
  palette: Palette;
  compact: boolean;
}

export function GeometryViewport({
  onEmergencyStop,
  palette,
  compact,
}: GeometryViewportProps) {
  const [telemetry, setTelemetry] = useState({ x: 0, y: 0, rotation: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        x: prev.x + (Math.random() - 0.45) * 0.1,
        y: prev.y + (Math.random() - 0.5) * 0.1,
        rotation: (prev.rotation + (Math.random() - 0.5) * 2 + 360) % 360,
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const markerLeft = 50 + telemetry.x * 12;
  const markerTop = 50 + telemetry.y * 18;

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor: palette.background,
        borderLeftWidth: compact ? 0 : 1,
        borderTopWidth: compact ? 1 : 0,
        borderColor: palette.border,
      }}
    >
      <View className="flex-1 items-center justify-center p-8">
        <View
          className="w-full flex-1 overflow-hidden border"
          style={{
            borderColor: palette.border,
            backgroundColor: palette.panel,
            minHeight: compact ? 320 : undefined,
            maxWidth: 960,
            maxHeight: compact ? undefined : "80%",
            borderRadius: 0,
          }}
        >
          <Svg width="100%" height="100%" viewBox="0 0 100 60" preserveAspectRatio="xMidYMid meet">
            <Rect x="5" y="5" width="90" height="50" fill="none" stroke={palette.mutedForeground} strokeWidth="0.2" opacity="0.5" />
            <Line x1="50" y1="5" x2="50" y2="55" stroke={palette.mutedForeground} strokeWidth="0.2" opacity="0.5" />
            <Circle cx="50" cy="30" r="8" fill="none" stroke={palette.mutedForeground} strokeWidth="0.2" opacity="0.5" />
            <Rect x="5" y="15" width="15" height="30" fill="none" stroke={palette.mutedForeground} strokeWidth="0.2" opacity="0.5" />
            <Rect x="80" y="15" width="15" height="30" fill="none" stroke={palette.mutedForeground} strokeWidth="0.2" opacity="0.5" />
            <Line
              x1="50"
              y1="30"
              x2={50 + telemetry.x * 2}
              y2={30 + telemetry.y * 2}
              stroke={palette.amber}
              strokeWidth="0.3"
              strokeDasharray="1 1"
            />
            <Line x1="50" y1="30" x2="62.5" y2="34.25" stroke={palette.emerald} strokeWidth="0.2" opacity="0.5" />
          </Svg>

          <View
            style={{
              position: "absolute",
              left: `${markerLeft}%`,
              top: `${markerTop}%`,
              marginLeft: -12,
              marginTop: -12,
              transform: [{ rotate: `${telemetry.rotation}deg` }],
            }}
          >
            <Triangle size={24} color={palette.emerald} fill={palette.emerald} />
          </View>

          <View
            style={{
              position: "absolute",
              right: "30%",
              top: "40%",
              marginRight: -10,
              marginTop: -10,
            }}
          >
            <Target size={20} color={palette.amber} />
          </View>

          <View className="absolute left-4 top-4 gap-1">
            <Text
              className="text-xs font-semibold uppercase"
              style={{
                color: palette.mutedForeground,
                letterSpacing: 0.5,
              }}
            >
              Live Offset
            </Text>
            <Text className="text-[24px] font-light" style={{ color: palette.foreground }}>
              X: {Math.abs(telemetry.x).toFixed(2)}m
            </Text>
            <Text className="text-[24px] font-light" style={{ color: palette.foreground }}>
              Y: {Math.abs(telemetry.y).toFixed(2)}m
            </Text>
          </View>

          <View className="absolute right-4 top-4 items-end gap-1">
            <Text
              className="text-xs font-semibold uppercase"
              style={{
                color: palette.mutedForeground,
                letterSpacing: 0.5,
              }}
            >
              Heading
            </Text>
            <Text className="text-[24px] font-light" style={{ color: palette.foreground }}>
              {Math.abs(telemetry.rotation).toFixed(2)} deg
            </Text>
          </View>
        </View>
      </View>

      <View
        className="border-t p-4"
        style={{
          borderTopColor: palette.border,
          backgroundColor: palette.panel,
        }}
      >
        <Pressable
          onPress={onEmergencyStop}
          className="h-16 items-center justify-center rounded-md"
          style={{
            backgroundColor: palette.crimson,
          }}
        >
          <Text className="text-lg font-bold" style={{ color: "#FFFFFF", letterSpacing: 1.2 }}>
            EMERGENCY HALT / PAUSE MISSION
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
