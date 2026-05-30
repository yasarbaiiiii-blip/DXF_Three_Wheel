import React from "react";
import { Pressable, Text, View } from "react-native";
import {
  Battery,
  Droplets,
  Menu,
  Moon,
  Satellite,
  Sun,
} from "lucide-react-native";

import type { Palette } from "../theme/colors";

type MachineStatus = "connected" | "degraded" | "disconnected";
type ThemeMode = "light" | "dark";
type AppMode = "home" | "plan";

interface TopHeaderProps {
  title: string;
  fileName?: string;
  status: MachineStatus;
  theme: ThemeMode;
  palette: Palette;
  sidebarVisible: boolean;
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
  onToggleSidebar: () => void;
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
  sidebarVisible,
  mode,
  onModeChange,
  onToggleSidebar,
  onToggleTheme,
}: TopHeaderProps) {
  return (
    <View
      className="h-[90px] flex-row items-center justify-between px-5"
      style={{
        borderBottomWidth: 1,
        borderBottomColor: palette.border,
        backgroundColor: palette.panel,
      }}
    >
      <View className="flex-row items-center" style={{ gap: 12 }}>
        {mode === "plan" ? (
<Pressable
             onPress={onToggleSidebar}
             className="h-14 w-14 items-center justify-center"
           >
             <Menu color={palette.foreground} size={30} />
          </Pressable>
        ) : null}

        <View className="shrink" style={{ flexShrink: 1 }}>
          <Text
            className="text-xl font-semibold"
            style={{
              color: palette.foreground,
            }}
          >
            {title}
          </Text>
          {fileName ? (
            <Text
              numberOfLines={1}
              className="mt-0.5 text-base"
              style={{
                color: palette.mutedForeground,
              }}
            >
              File:{" "}
              <Text
                className="font-semibold"
                style={{ color: palette.foreground }}
              >
                {fileName}
              </Text>
            </Text>
          ) : null}
          {!fileName ? (
            <Pressable
              onPress={() => onModeChange("home")}
              className="mt-1 self-start overflow-hidden rounded-2xl"
              style={{
                maxWidth: 300,
                borderWidth: 1,
                borderColor: palette.amber,
                backgroundColor: palette.panel,
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 4 },
                elevation: 2,
              }}
            >
              <View
                className="flex-row items-center"
                style={{
                  gap: 12,
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                }}
              >
                <View
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 13,
                    backgroundColor: palette.amber,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 5,
                      borderWidth: 2,
                      borderColor: palette.background,
                      backgroundColor: palette.background,
                    }}
                  />
                </View>
                <View style={{ flexShrink: 1 }}>
                  <Text
                    numberOfLines={1}
                    className="text-base font-extrabold"
                    style={{
                      color: palette.foreground,
                    }}
                  >
                    Start a new plan
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="text-sm font-medium"
                    style={{
                      color: palette.mutedForeground,
                    }}
                  >
                    Tap to load or create one
                  </Text>
                </View>
              </View>
            </Pressable>
          ) : null}
        </View>
      </View>

      <View className="flex-row items-center justify-center" style={{ gap: 10 }}>
        {mode === "plan" ? (
          <>
            <View
              className="rounded px-3 py-1"
              style={{
                backgroundColor: statusMap[status].color,
              }}
            >
              <Text className="text-base font-semibold uppercase" style={{ color: "#FFFFFF", letterSpacing: 0.4 }}>
                {statusMap[status].label}
              </Text>
            </View>

            <View className="h-[18px] w-px" style={{ backgroundColor: palette.border }} />
            <MicroBadge icon={<Battery color={palette.mutedForeground} size={14} />} label="87%" palette={palette} />
            <MicroBadge icon={<Droplets color={palette.mutedForeground} size={14} />} label="45L" palette={palette} />
            <MicroBadge icon={<Satellite color={palette.mutedForeground} size={14} />} label="12 Lck" palette={palette} />
          </>
        ) : null}
      </View>

      <View className="flex-row items-center" style={{ gap: 10 }}>
        <View
          className="flex-row rounded-xl p-1"
          style={{ backgroundColor: palette.muted, gap: 6 }}
        >
          <Pressable
            onPress={() => onModeChange("home")}
              className="items-center rounded-lg py-2"
              style={{
                width: 92,
                backgroundColor: mode === "home" ? palette.foreground : "transparent",
              }}
            >
              <Text
                className="text-xl font-semibold"
                style={{
                  color: mode === "home" ? palette.background : palette.foreground,
                }}
              >
              Home
            </Text>
          </Pressable>
          <Pressable
            onPress={() => onModeChange("plan")}
              className="items-center rounded-lg py-2"
              style={{
                width: 92,
                backgroundColor: mode === "plan" ? palette.foreground : "transparent",
              }}
            >
              <Text
                className="text-xl font-semibold"
                style={{
                  color: mode === "plan" ? palette.background : palette.foreground,
                }}
              >
              Plan
            </Text>
          </Pressable>
        </View>

        {mode === "plan" ? (
<Pressable
             onPress={onToggleTheme}
             className="h-14 w-14 items-center justify-center"
           >
             {theme === "dark" ? (
               <Sun color={palette.foreground} size={26} />
             ) : (
               <Moon color={palette.foreground} size={26} />
             )}
          </Pressable>
        ) : null}
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
      className="flex-row items-center rounded-xl px-4 py-2.5"
      style={{
        gap: 6,
        backgroundColor: palette.muted,
      }}
    >
      {icon}
      <Text className="text-base font-semibold" style={{ color: palette.foreground }}>
        {label}
      </Text>
    </View>
  );
}
