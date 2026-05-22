import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";
import {
  Check,
  Crosshair,
  FileCheck2,
  FileUp,
  Lock,
  Map,
  Settings2,
} from "lucide-react-native";

import type { Palette } from "../theme/colors";

type TabType = "fields" | "dxf" | "calibration" | "positioning";

interface LeftSidebarProps {
  palette: Palette;
  compact: boolean;
}

export function LeftSidebar({ palette, compact }: LeftSidebarProps) {
  const [activeTab, setActiveTab] = useState<TabType>("fields");

  return (
    <View
      className="flex-row"
      style={{
        width: compact ? "100%" : "40%",
        minHeight: compact ? 380 : undefined,
        backgroundColor: palette.panel,
        borderBottomWidth: compact ? 1 : 0,
        borderRightWidth: compact ? 0 : 1,
        borderColor: palette.border,
      }}
    >
      <View
        className="items-center py-4"
        style={{
          width: 64,
          gap: 16,
          backgroundColor: palette.background,
          borderRightWidth: 1,
          borderRightColor: palette.border,
        }}
      >
        <NavButton
          label="Fields"
          active={activeTab === "fields"}
          icon={<Map size={20} color={activeTab === "fields" ? palette.background : palette.mutedForeground} />}
          onPress={() => setActiveTab("fields")}
          palette={palette}
        />
        <NavButton
          label="DXF Import"
          active={activeTab === "dxf"}
          icon={<FileUp size={20} color={activeTab === "dxf" ? palette.background : palette.mutedForeground} />}
          onPress={() => setActiveTab("dxf")}
          palette={palette}
        />
        <NavButton
          label="Hardware"
          active={activeTab === "calibration"}
          icon={<Settings2 size={20} color={activeTab === "calibration" ? palette.background : palette.mutedForeground} />}
          onPress={() => setActiveTab("calibration")}
          palette={palette}
        />
        <NavButton
          label="Positioning"
          active={activeTab === "positioning"}
          icon={<Crosshair size={20} color={activeTab === "positioning" ? palette.background : palette.mutedForeground} />}
          onPress={() => setActiveTab("positioning")}
          palette={palette}
        />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, gap: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === "fields" && <FieldInventoryView palette={palette} />}
        {activeTab === "dxf" && <DxfImportView palette={palette} />}
        {activeTab === "calibration" && <HardwareCalibrationView palette={palette} />}
        {activeTab === "positioning" && <PositioningFilterView palette={palette} />}
      </ScrollView>
    </View>
  );
}

function FieldInventoryView({ palette }: { palette: Palette }) {
  return (
    <View className="gap-6">
      <SectionIntro
        title="Field Inventory"
        subtitle="Select a template or custom layout."
        palette={palette}
      />
      <View className="gap-2.5">
        <TemplateItem label="Football (Soccer)" locked active palette={palette} />
        <TemplateItem label="Rugby" locked palette={palette} />
        <TemplateItem label="North American Football" locked palette={palette} />
        <TemplateItem label="Running Tracks - Grass" locked palette={palette} />
        <TemplateItem label="Athletics" locked palette={palette} />
        <TemplateItem label="Ball and Net Sports" locked palette={palette} />
        <TemplateItem label="Custom Layout - Beta Field" locked={false} palette={palette} />
      </View>
    </View>
  );
}

function DxfImportView({ palette }: { palette: Palette }) {
  const [units, setUnits] = useState<"meters" | "feet">("meters");

  return (
    <View className="gap-6">
      <SectionIntro
        title="DXF Import Profile"
        subtitle="Configure CAD geometry mapping."
        palette={palette}
      />

      <View
        className="gap-4 rounded-xl border p-4"
        style={{
          borderColor: palette.border,
          backgroundColor: palette.background,
        }}
      >
        <MetaBlock label="File Name" value="soccer_pitch_fifa_edited.dxf" palette={palette} />

        <View className="gap-2">
          <Text style={labelStyle(palette)}>Scale Units</Text>
          <View
            className="self-start flex-row gap-1 rounded-[10px] p-1"
            style={{
              backgroundColor: palette.muted,
            }}
          >
            <SegmentButton
              label="Meters"
              active={units === "meters"}
              palette={palette}
              onPress={() => setUnits("meters")}
            />
            <SegmentButton
              label="Feet"
              active={units === "feet"}
              palette={palette}
              onPress={() => setUnits("feet")}
            />
          </View>
        </View>
      </View>

      <View className="gap-3">
        <Text style={labelStyle(palette)}>Layer Mapping Checklist</Text>
        <View
          className="overflow-hidden rounded-xl border"
          style={{
            borderColor: palette.border,
            backgroundColor: palette.background,
          }}
        >
          <LayerCheckItem label="BOUNDARY" checked palette={palette} />
          <LayerCheckItem label="MARKINGS" checked palette={palette} />
          <LayerCheckItem label="CENTER" checked palette={palette} last />
        </View>
      </View>
    </View>
  );
}

function HardwareCalibrationView({ palette }: { palette: Palette }) {
  const [pumpStart, setPumpStart] = useState(0.1);
  const [pumpStop, setPumpStop] = useState(0.15);

  return (
    <View className="gap-7">
      <SectionIntro
        title="Hardware Calibration"
        subtitle="Adjust structural offsets and fluid delays."
        palette={palette}
      />

      <View className="gap-6">
        <SliderRow
          label="Pump Start Delay [s]"
          value={pumpStart}
          onChange={setPumpStart}
          palette={palette}
        />
        <SliderRow
          label="Pump Stop Delay [s]"
          value={pumpStop}
          onChange={setPumpStop}
          palette={palette}
        />
      </View>

      <View className="h-px" style={{ backgroundColor: palette.border }} />

      <View className="flex-row flex-wrap gap-3">
        <OffsetInputCard label="Offset Sideways" value="0.085" unit="m" palette={palette} />
        <OffsetInputCard label="Offset Front" value="0.000" unit="m" palette={palette} />
        <OffsetInputCard label="Offset Up" value="0.500" unit="m" palette={palette} />
        <OffsetInputCard label="Mow Deck Cut Width" value="1.000" unit="m" palette={palette} />
      </View>
    </View>
  );
}

function PositioningFilterView({ palette }: { palette: Palette }) {
  return (
    <View className="gap-7">
      <SectionIntro
        title="Positioning Filters"
        subtitle="Sensor overrides and terrain corrections."
        palette={palette}
      />

      <View className="gap-4">
        <ToggleRow label="Position Smoothing" initialValue palette={palette} />
        <ToggleRow label="Disable Position Snap with Long Press" initialValue={false} palette={palette} />
        <ToggleRow label="Position Jump Detection" initialValue palette={palette} />
      </View>

      <View className="gap-3">
        <Text style={labelStyle(palette)}>Source</Text>
        <RadioOption label="GPS (RTK)" selected palette={palette} />
        <RadioOption label="Local Laser Tracker" disabled palette={palette} />
      </View>

      <View className="gap-4">
        <Text style={labelStyle(palette)}>Terrain Correction</Text>
        <ToggleRow label="Terrain Correction" initialValue palette={palette} />
        <ToggleRow label="3D Terrain Correction (Beta)" initialValue palette={palette} />
      </View>
    </View>
  );
}

function SectionIntro({
  title,
  subtitle,
  palette,
}: {
  title: string;
  subtitle: string;
  palette: Palette;
}) {
  return (
    <View className="gap-1">
      <Text className="text-xl font-semibold" style={{ color: palette.foreground }}>{title}</Text>
      <Text className="text-sm" style={{ color: palette.mutedForeground }}>{subtitle}</Text>
    </View>
  );
}

function NavButton({
  label,
  active,
  icon,
  onPress,
  palette,
}: {
  label: string;
  active: boolean;
  icon: React.ReactNode;
  onPress: () => void;
  palette: Palette;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="h-10 w-10 items-center justify-center rounded-[10px]"
      style={{
        backgroundColor: active ? palette.foreground : "transparent",
      }}
      accessibilityLabel={label}
    >
      {icon}
    </Pressable>
  );
}

function TemplateItem({
  label,
  locked,
  active = false,
  palette,
}: {
  label: string;
  locked: boolean;
  active?: boolean;
  palette: Palette;
}) {
  return (
    <Pressable
      className="flex-row items-center rounded-md border p-3"
      style={{
        gap: 12,
        borderColor: active ? palette.foreground : palette.border,
        backgroundColor: active ? palette.muted : palette.background,
      }}
    >
      <View className="w-5 items-center">
        {locked ? (
          <Lock size={16} color={palette.mutedForeground} />
        ) : active ? (
          <Check size={16} color={palette.foreground} />
        ) : null}
      </View>
      <Text className="shrink text-sm font-semibold" style={{ color: palette.foreground, flexShrink: 1 }}>
        {label}
      </Text>
    </Pressable>
  );
}

function LayerCheckItem({
  label,
  checked,
  palette,
  last = false,
}: {
  label: string;
  checked: boolean;
  palette: Palette;
  last?: boolean;
}) {
  return (
    <View
      className="flex-row items-center justify-between p-3"
      style={{
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: palette.border,
      }}
    >
      <Text className="text-sm font-semibold" style={{ color: palette.foreground }}>{label}</Text>
      <FileCheck2 size={16} color={checked ? palette.emerald : palette.mutedForeground} />
    </View>
  );
}

function OffsetInputCard({
  label,
  value,
  unit,
  palette,
}: {
  label: string;
  value: string;
  unit: string;
  palette: Palette;
}) {
  return (
    <View
      className="w-[47%] min-w-[150px] gap-1.5 rounded-md border p-3"
      style={{
        borderColor: palette.border,
        backgroundColor: palette.background,
      }}
    >
      <Text className="text-xs" style={{ color: palette.mutedForeground }}>{label}</Text>
      <View className="flex-row items-end gap-1">
        <Text className="text-[22px] font-bold" style={{ color: palette.foreground }}>{value}</Text>
        <Text className="mb-0.5 text-sm" style={{ color: palette.mutedForeground }}>{unit}</Text>
      </View>
    </View>
  );
}

function ToggleRow({
  label,
  initialValue = true,
  palette,
}: {
  label: string;
  initialValue?: boolean;
  palette: Palette;
}) {
  const [enabled, setEnabled] = useState(initialValue);

  return (
    <View className="flex-row items-center justify-between" style={{ gap: 16 }}>
      <Text className="flex-1 text-sm font-semibold" style={{ color: palette.foreground, flex: 1 }}>
        {label}
      </Text>
      <Switch
        value={enabled}
        onValueChange={setEnabled}
        trackColor={{ false: palette.muted, true: palette.emerald }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

function RadioOption({
  label,
  selected = false,
  disabled = false,
  palette,
}: {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  palette: Palette;
}) {
  return (
    <Pressable
      disabled={disabled}
      className="flex-row items-center rounded-md border p-3"
      style={{
        gap: 12,
        borderColor: palette.border,
        backgroundColor: palette.background,
        opacity: disabled ? 0.45 : 1,
      }}
    >
      <View
        style={{
          width: 18,
          height: 18,
          borderRadius: 9,
          borderWidth: 2,
          borderColor: selected ? palette.emerald : palette.mutedForeground,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selected ? (
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: palette.emerald,
            }}
          />
        ) : null}
      </View>
      <Text className="text-sm font-semibold" style={{ color: palette.foreground }}>{label}</Text>
    </Pressable>
  );
}

function SliderRow({
  label,
  value,
  onChange,
  palette,
}: {
  label: string;
  value: number;
  onChange: (next: number) => void;
  palette: Palette;
}) {
  return (
    <View className="gap-2.5">
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-semibold" style={{ color: palette.foreground }}>{label}</Text>
        <Text className="text-sm" style={{ color: palette.mutedForeground }}>{value.toFixed(2)}s</Text>
      </View>
      <Slider
        minimumValue={0}
        maximumValue={1}
        step={0.01}
        minimumTrackTintColor={palette.emerald}
        maximumTrackTintColor={palette.muted}
        thumbTintColor="#FFFFFF"
        value={value}
        onValueChange={onChange}
      />
    </View>
  );
}

function SegmentButton({
  label,
  active,
  palette,
  onPress,
}: {
  label: string;
  active: boolean;
  palette: Palette;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-md px-3 py-1.5"
      style={{
        backgroundColor: active ? palette.panel : "transparent",
      }}
    >
      <Text
        className="text-sm font-semibold"
        style={{
          color: active ? palette.foreground : palette.mutedForeground,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function MetaBlock({
  label,
  value,
  palette,
}: {
  label: string;
  value: string;
  palette: Palette;
}) {
  return (
    <View className="gap-1.5">
      <Text style={labelStyle(palette)}>{label}</Text>
      <TextInput
        value={value}
        editable={false}
        className="rounded-[10px] border px-[14px] py-3 text-sm font-semibold"
        style={{
          color: palette.foreground,
          borderColor: palette.border,
          backgroundColor: palette.panel,
        }}
      />
    </View>
  );
}

function labelStyle(palette: Palette) {
  return {
    color: palette.mutedForeground,
    fontSize: 12,
    fontWeight: "700" as const,
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
  };
}
