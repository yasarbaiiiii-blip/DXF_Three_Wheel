import React from "react";
import { Pressable, Text, View } from "react-native";
import {
  Battery,
  ChevronLeft,
  Droplets,
  Moon,
  Satellite,
  Sun,
} from "lucide-react-native";

import type { Palette } from "../theme/colors";

type MachineStatus = "connected" | "degraded" | "disconnected";
type ThemeMode = "light" | "dark";

interface TopHeaderProps {
  title: string;
  fileName: string;
  status: MachineStatus;
  theme: ThemeMode;
  palette: Palette;
  onToggleTheme: () => void;
}

const statusMap: Record<
  MachineStatus,
  { label: string; color: string }
> = {
  connected: { label: "RTK Fixed", color: "#059669" },
  degraded: { label: "Float", color: "#D97706" },
  disconnected: { label: "Alert", color: "#DC2626" },
};

export function TopHeader({
  title,
  fileName,
  status,
  theme,
  palette,
  onToggleTheme,
}: TopHeaderProps) {
  return (
    <View
      className="h-16 flex-row items-center justify-between px-4"
      style={{
        borderBottomWidth: 1,
        borderBottomColor: palette.border,
        backgroundColor: palette.panel,
      }}
    >
      <View className="flex-row items-center" style={{ gap: 12, flex: 1.2 }}>
        <Pressable
          className="h-10 w-10 items-center justify-center rounded-[10px]"
        >
          <ChevronLeft color={palette.foreground} size={20} />
        </Pressable>

        <View className="shrink" style={{ flexShrink: 1 }}>
          <Text
            className="text-sm font-semibold"
            style={{
              color: palette.foreground,
            }}
          >
            {title}
          </Text>
          <Text
            numberOfLines={1}
            className="mt-0.5 text-xs"
            style={{
              color: palette.mutedForeground,
            }}
          >
            File: <Text className="font-semibold" style={{ color: palette.foreground }}>{fileName}</Text>
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-center" style={{ gap: 10, flex: 1 }}>
        <View
          className="rounded px-3 py-1"
          style={{
            backgroundColor: statusMap[status].color,
          }}
        >
          <Text className="text-xs font-semibold uppercase" style={{ color: "#FFFFFF", letterSpacing: 0.4 }}>
            {statusMap[status].label}
          </Text>
        </View>

        <View className="h-[18px] w-px" style={{ backgroundColor: palette.border }} />
        <MicroBadge icon={<Battery color={palette.mutedForeground} size={14} />} label="87%" palette={palette} />
        <MicroBadge icon={<Droplets color={palette.mutedForeground} size={14} />} label="45L" palette={palette} />
        <MicroBadge icon={<Satellite color={palette.mutedForeground} size={14} />} label="12 Lck" palette={palette} />
      </View>

      <View className="items-end" style={{ flex: 0.35 }}>
        <Pressable
          onPress={onToggleTheme}
          className="h-10 w-10 items-center justify-center rounded-[10px]"
        >
          {theme === "dark" ? (
            <Sun color={palette.foreground} size={20} />
          ) : (
            <Moon color={palette.foreground} size={20} />
          )}
        </Pressable>
      </View>
    </View>
  );
}

function MicroBadge({
  icon,
  label,
  palette,
}: {
  icon: React.ReactNode;
  label: string;
  palette: Palette;
}) {
  return (
    <View
      className="flex-row items-center rounded-md px-2.5 py-1.5"
      style={{
        gap: 6,
        backgroundColor: palette.muted,
      }}
    >
      {icon}
      <Text className="text-xs font-semibold" style={{ color: palette.foreground }}>
        {label}
      </Text>
    </View>
  );
}
