import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";
import {
  Copy,
  FileUp,
  Info,
  ListChecks,
  Play,
  Settings2,
  Square,
  Trash2,
  Upload,
} from "lucide-react-native";

import type { Palette } from "../theme/colors";
import type {
  ImportedPlan,
  LayerVisibility,
  MarkingStyle,
  PlanLine,
  SidebarPanel,
} from "../types/plan";

interface LeftSidebarProps {
  palette: Palette;
  compact: boolean;
  activePanel: SidebarPanel | null;
  onTogglePanel: (panel: SidebarPanel) => void;
  importedPlan: ImportedPlan | null;
  layerVisibility: LayerVisibility;
  onToggleLayer: (layer: keyof LayerVisibility) => void;
  onImportPress: () => void;
  onCopyFileName: () => void;
  onDeletePlan: () => void;
  selectedLine: PlanLine | null;
  totalVisibleLines: number;
  missionRunning: boolean;
  onToggleMission: () => void;
  markingStyle: MarkingStyle;
  onSelectMarkingStyle: (style: MarkingStyle) => void;
  rotation: number;
  onDeleteSelectedLine: () => void;
}

export function LeftSidebar({
  palette,
  compact,
  activePanel,
  onTogglePanel,
  importedPlan,
  layerVisibility,
  onToggleLayer,
  onImportPress,
  onCopyFileName,
  onDeletePlan,
  selectedLine,
  totalVisibleLines,
  missionRunning,
  onToggleMission,
  markingStyle,
  onSelectMarkingStyle,
  rotation,
  onDeleteSelectedLine,
}: LeftSidebarProps) {
  const [displayPanel, setDisplayPanel] = useState<SidebarPanel | null>(activePanel);

  useEffect(() => {
    setDisplayPanel(activePanel);
  }, [activePanel]);

  const selectedMetrics = useMemo(() => {
    if (!selectedLine) {
      return null;
    }

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

  const panelWidth = compact ? 300 : 360;

  return (
    <View
      className="flex-row"
      style={{
        width: compact ? "100%" : undefined,
        backgroundColor: palette.panel,
        borderRightWidth: 1,
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
          label="Import"
          active={activePanel === "import"}
          icon={
            <FileUp
              size={20}
              color={
                activePanel === "import"
                  ? palette.background
                  : palette.mutedForeground
              }
            />
          }
          onPress={() => onTogglePanel("import")}
          palette={palette}
        />
        <NavButton
          label="Plan Info"
          active={activePanel === "details"}
          icon={
            <Info
              size={20}
              color={
                activePanel === "details"
                  ? palette.background
                  : palette.mutedForeground
              }
            />
          }
          onPress={() => onTogglePanel("details")}
          palette={palette}
        />
        <NavButton
          label="Mission"
          active={activePanel === "mission"}
          icon={
            <ListChecks
              size={20}
              color={
                activePanel === "mission"
                  ? palette.background
                  : palette.mutedForeground
              }
            />
          }
          onPress={() => onTogglePanel("mission")}
          palette={palette}
        />
        <NavButton
          label="Control"
          active={activePanel === "view"}
          icon={
            <Settings2
              size={20}
              color={
                activePanel === "view"
                  ? palette.background
                  : palette.mutedForeground
              }
            />
          }
          onPress={() => onTogglePanel("view")}
          palette={palette}
        />
      </View>

      {displayPanel ? (
        <View
          style={{
            width: panelWidth,
            overflow: "hidden",
            backgroundColor: palette.panel,
            borderRightWidth: 1,
            borderRightColor: palette.border,
          }}
        >
          <ScrollView
            key={displayPanel}
            contentContainerStyle={{ padding: 20, gap: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <PanelContent
              activePanel={displayPanel}
              palette={palette}
              importedPlan={importedPlan}
              layerVisibility={layerVisibility}
              onToggleLayer={onToggleLayer}
              onImportPress={onImportPress}
              onCopyFileName={onCopyFileName}
              onDeletePlan={onDeletePlan}
              selectedLine={selectedLine}
              selectedMetrics={selectedMetrics}
              totalVisibleLines={totalVisibleLines}
              missionRunning={missionRunning}
              onToggleMission={onToggleMission}
              markingStyle={markingStyle}
              onSelectMarkingStyle={onSelectMarkingStyle}
              rotation={rotation}
              onDeleteSelectedLine={onDeleteSelectedLine}
            />
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}

function PanelContent({
  activePanel,
  palette,
  importedPlan,
  layerVisibility,
  onToggleLayer,
  onImportPress,
  onCopyFileName,
  onDeletePlan,
  selectedLine,
  selectedMetrics,
  totalVisibleLines,
  missionRunning,
  onToggleMission,
  markingStyle,
  onSelectMarkingStyle,
  rotation,
  onDeleteSelectedLine,
}: {
  activePanel: SidebarPanel;
  palette: Palette;
  importedPlan: ImportedPlan | null;
  layerVisibility: LayerVisibility;
  onToggleLayer: (layer: keyof LayerVisibility) => void;
  onImportPress: () => void;
  onCopyFileName: () => void;
  onDeletePlan: () => void;
  selectedLine: PlanLine | null;
  selectedMetrics: {
    length: number;
    angle: number;
    span: string;
    range: string;
  } | null;
  totalVisibleLines: number;
  missionRunning: boolean;
  onToggleMission: () => void;
  markingStyle: MarkingStyle;
  onSelectMarkingStyle: (style: MarkingStyle) => void;
  rotation: number;
  onDeleteSelectedLine: () => void;
}) {
  const [fieldName, setFieldName] = useState("");
  const [fieldNotes, setFieldNotes] = useState("");
  const [manualPainting, setManualPainting] = useState(false);
  const [paintWhenReversing, setPaintWhenReversing] = useState(false);
  const [pumpStartDelay, setPumpStartDelay] = useState(0.2);
  const [pumpStopDelay, setPumpStopDelay] = useState(0.2);
  const [rateModalOpen, setRateModalOpen] = useState(false);
  const [slowestRateDraft, setSlowestRateDraft] = useState(100);
  const [fastestRateDraft, setFastestRateDraft] = useState(100);
  const [slowestRate, setSlowestRate] = useState(100);
  const [fastestRate, setFastestRate] = useState(100);
  const [pumpRelayInstalled, setPumpRelayInstalled] = useState(true);
  const [offsetSideways, setOffsetSideways] = useState("0.085");
  const [offsetFront, setOffsetFront] = useState("0.000");
  const [offsetUp, setOffsetUp] = useState("0.500");
  const [mowDeckCutWidth, setMowDeckCutWidth] = useState("1.000");
  const [savedDimensions, setSavedDimensions] = useState({
    offsetSideways: "0.085",
    offsetFront: "0.000",
    offsetUp: "0.500",
    mowDeckCutWidth: "1.000",
  });

  useEffect(() => {
    if (!importedPlan) {
      setFieldName("");
      setFieldNotes("");
      return;
    }

    const nextName = importedPlan.fileName.replace(/\.(csv|dxf)$/i, "");
    setFieldName(nextName);
    setFieldNotes("");
  }, [importedPlan]);

  const hasDimensionChanges =
    offsetSideways !== savedDimensions.offsetSideways ||
    offsetFront !== savedDimensions.offsetFront ||
    offsetUp !== savedDimensions.offsetUp ||
    mowDeckCutWidth !== savedDimensions.mowDeckCutWidth;

  if (activePanel === "import") {
    return (
      <View className="gap-6">
        <SectionIntro
          title="Import Profile"
          subtitle="Import a DXF or CSV file and decide which layers are visible."
          palette={palette}
        />

        <View
          className="gap-4 rounded-xl border p-4"
          style={{
            borderColor: palette.border,
            backgroundColor: palette.background,
          }}
        >
          <Pressable
            onPress={onImportPress}
            className="h-12 flex-row items-center justify-center rounded-md"
            style={{ backgroundColor: palette.foreground, gap: 8 }}
          >
            <Upload size={18} color={palette.background} />
            <Text
              className="text-sm font-semibold"
              style={{ color: palette.background }}
            >
              Import File
            </Text>
          </Pressable>

          <Text className="text-xs" style={{ color: palette.mutedForeground }}>
            Only CSV and DXF supported.
          </Text>

          {importedPlan ? (
            <>
              <MetaPill
                label="Imported file"
                value={importedPlan.fileName}
                palette={palette}
              />

              <LabeledInput
                label="Field Name"
                value={fieldName}
                onChangeText={setFieldName}
                palette={palette}
              />
              <LabeledInput
                label="Field Notes"
                value={fieldNotes}
                onChangeText={setFieldNotes}
                palette={palette}
                multiline
              />

              <View className="flex-row" style={{ gap: 10 }}>
                <ActionChip
                  icon={<Copy size={16} color={palette.foreground} />}
                  label="Copy file name"
                  palette={palette}
                  onPress={onCopyFileName}
                />
                <ActionChip
                  icon={<Trash2 size={16} color="#FFFFFF" />}
                  label="Delete plan"
                  palette={palette}
                  destructive
                  onPress={onDeletePlan}
                />
              </View>
            </>
          ) : null}
        </View>

        {importedPlan ? (
          <View className="gap-3">
            <Text style={labelStyle(palette)}>Visible Layers</Text>
            <CheckboxRow
              label="Boundary"
              checked={layerVisibility.boundary}
              onPress={() => onToggleLayer("boundary")}
              palette={palette}
            />
            <CheckboxRow
              label="Marking"
              checked={layerVisibility.marking}
              onPress={() => onToggleLayer("marking")}
              palette={palette}
            />
            <CheckboxRow
              label="Center"
              checked={layerVisibility.center}
              onPress={() => onToggleLayer("center")}
              palette={palette}
            />
          </View>
        ) : null}
      </View>
    );
  }

  if (activePanel === "details") {
    return (
      <View className="gap-6">
        <SectionIntro
          title="Plan Info"
          subtitle="Select a line in the canvas to inspect its values here."
          palette={palette}
        />

        <View
          className="gap-4 rounded-xl border p-4"
          style={{
            borderColor: palette.border,
            backgroundColor: palette.background,
          }}
        >
          <DetailRow
            label="Visible segments"
            value={`${totalVisibleLines}`}
            palette={palette}
          />
          <DetailRow
            label="Imported file"
            value={importedPlan?.fileName ?? "Nothing imported"}
            palette={palette}
          />
          <DetailRow
            label="Selected segment"
            value={selectedLine?.label ?? "Tap a line to inspect it"}
            palette={palette}
          />
        </View>

        {selectedLine && selectedMetrics ? (
          <View className="gap-3">
            <InfoTile label="Layer" value={selectedLine.layer} palette={palette} />
            <InfoTile
              label="Length"
              value={`${selectedMetrics.length.toFixed(2)} m`}
              palette={palette}
            />
            <InfoTile
              label="Width"
              value={`${selectedLine.width.toFixed(2)} m`}
              palette={palette}
            />
            <InfoTile
              label="Angle"
              value={`${selectedMetrics.angle.toFixed(1)} deg`}
              palette={palette}
            />
            <InfoTile
              label="Point span"
              value={selectedMetrics.span}
              palette={palette}
            />
            <InfoTile
              label="Range"
              value={selectedMetrics.range}
              palette={palette}
            />
          </View>
        ) : (
          <EmptyNote
            title="No line selected yet"
            body="After you import a plan, tap any highlighted line in the canvas and its details will show up here."
            palette={palette}
          />
        )}
      </View>
    );
  }

  if (activePanel === "mission") {
    return (
      <View className="gap-6">
        <SectionIntro
          title="Mission Setup"
          subtitle="Choose how the rover should mark the field."
          palette={palette}
        />

        <View className="gap-3">
          <Text style={labelStyle(palette)}>Marking Style</Text>
          <OptionButton
            label="Straight Line"
            active={markingStyle === "straight"}
            palette={palette}
            onPress={() => onSelectMarkingStyle("straight")}
          />
          <OptionButton
            label="Dotted Line"
            active={markingStyle === "dotted"}
            palette={palette}
            onPress={() => onSelectMarkingStyle("dotted")}
          />
          <OptionButton
            label="Dashed Line"
            active={markingStyle === "dashed"}
            palette={palette}
            onPress={() => onSelectMarkingStyle("dashed")}
          />
        </View>

        <View
          className="gap-3 rounded-xl border p-4"
          style={{
            borderColor: palette.border,
            backgroundColor: palette.background,
          }}
        >
          <DetailRow
            label="Rotation"
            value={`${rotation.toFixed(0)} deg`}
            palette={palette}
          />
          <Text className="text-xs" style={{ color: palette.mutedForeground }}>
            Tap rotate once in the canvas toolbar to enter an angle, or long-press
            it and drag on the plan to rotate.
          </Text>
        </View>

        <Pressable
          onPress={onToggleMission}
          className="h-14 items-center justify-center rounded-md"
          style={{
            backgroundColor: missionRunning ? palette.crimson : palette.emerald,
          }}
        >
          <View className="flex-row items-center" style={{ gap: 8 }}>
            {missionRunning ? (
              <Square size={18} color="#FFFFFF" />
            ) : (
              <Play size={18} color="#FFFFFF" />
            )}
            <Text
              className="text-base font-semibold"
              style={{ color: "#FFFFFF" }}
            >
              {missionRunning ? "STOP" : "START"}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="gap-6">
      <SectionIntro
        title="Control Section"
        subtitle="Plan interaction and painting preferences for the imported field."
        palette={palette}
      />

      <View
        className="gap-3 rounded-xl border p-4"
        style={{
          borderColor: palette.border,
          backgroundColor: palette.background,
        }}
      >
        <DetailRow
          label="Current file"
          value={importedPlan?.fileName ?? "Nothing imported"}
          palette={palette}
        />
        <DetailRow
          label="Layer visibility"
          value={`${Number(layerVisibility.boundary) + Number(layerVisibility.marking) + Number(layerVisibility.center)} / 3 active`}
          palette={palette}
        />
      </View>

      <View className="gap-4">
        <ToggleRow
          label="Manual painting with long press"
          value={manualPainting}
          onValueChange={setManualPainting}
          palette={palette}
        />
        <ToggleRow
          label="Paint when reversing"
          value={paintWhenReversing}
          onValueChange={setPaintWhenReversing}
          palette={palette}
        />
      </View>

      <SliderBlock
        label="Pump Start Delay [s]"
        value={pumpStartDelay}
        onValueChange={setPumpStartDelay}
        palette={palette}
      />

      <SliderBlock
        label="Pump Stop Delay [s]"
        value={pumpStopDelay}
        onValueChange={setPumpStopDelay}
        palette={palette}
      />

      <View
        className="gap-3 rounded-xl border p-4"
        style={{
          borderColor: palette.border,
          backgroundColor: palette.background,
        }}
      >
        <Text style={labelStyle(palette)}>Heading Paint Rate</Text>
        <DetailRow
          label="Slowest rate"
          value={`${slowestRate}%`}
          palette={palette}
        />
        <DetailRow
          label="Fastest rate"
          value={`${fastestRate}%`}
          palette={palette}
        />
        <Pressable
          onPress={() => {
            setSlowestRateDraft(slowestRate);
            setFastestRateDraft(fastestRate);
            setRateModalOpen(true);
          }}
          className="mt-2 h-11 items-center justify-center rounded-md"
          style={{ backgroundColor: palette.muted }}
        >
          <Text className="text-sm font-semibold" style={{ color: palette.foreground }}>
            Adjust
          </Text>
        </Pressable>
      </View>

      <View className="gap-3">
        <Text style={labelStyle(palette)}>Heading Dimensions</Text>
        <DimensionInput
          label="Offset Sideways"
          value={offsetSideways}
          onChangeText={setOffsetSideways}
          palette={palette}
        />
        <DimensionInput
          label="Offset Front"
          value={offsetFront}
          onChangeText={setOffsetFront}
          palette={palette}
        />
        <DimensionInput
          label="Offset Up"
          value={offsetUp}
          onChangeText={setOffsetUp}
          palette={palette}
        />
        <DimensionInput
          label="Mow Deck Cut Width"
          value={mowDeckCutWidth}
          onChangeText={setMowDeckCutWidth}
          palette={palette}
        />

        {hasDimensionChanges ? (
          <View className="flex-row" style={{ gap: 10 }}>
            <Pressable
              onPress={() => {
                setOffsetSideways(savedDimensions.offsetSideways);
                setOffsetFront(savedDimensions.offsetFront);
                setOffsetUp(savedDimensions.offsetUp);
                setMowDeckCutWidth(savedDimensions.mowDeckCutWidth);
              }}
              className="flex-1 items-center justify-center rounded-md px-4 py-3"
              style={{ backgroundColor: palette.muted }}
            >
              <Text className="text-sm font-semibold" style={{ color: palette.foreground }}>
                Cancel Changes
              </Text>
            </Pressable>
            <Pressable
              onPress={() =>
                setSavedDimensions({
                  offsetSideways,
                  offsetFront,
                  offsetUp,
                  mowDeckCutWidth,
                })
              }
              className="flex-1 items-center justify-center rounded-md px-4 py-3"
              style={{ backgroundColor: palette.foreground }}
            >
              <Text className="text-sm font-semibold" style={{ color: palette.background }}>
                Save Changes
              </Text>
            </Pressable>
          </View>
        ) : null}
      </View>

      <Modal
        visible={rateModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setRateModalOpen(false)}
      >
        <View
          className="flex-1 items-center justify-center px-6"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
        >
          <View
            className="w-full max-w-[360px] rounded-xl border p-5"
            style={{
              borderColor: palette.border,
              backgroundColor: palette.panel,
              gap: 14,
            }}
          >
            <Text className="text-lg font-semibold" style={{ color: palette.foreground }}>
              Heading Paint Rate
            </Text>
            <RateSlider
              label="Slowest rate"
              value={slowestRateDraft}
              onValueChange={setSlowestRateDraft}
              palette={palette}
            />
            <RateSlider
              label="Fastest rate"
              value={fastestRateDraft}
              onValueChange={setFastestRateDraft}
              palette={palette}
            />

            <CheckboxRow
              label="Pump relay installed"
              checked={pumpRelayInstalled}
              onPress={() => setPumpRelayInstalled((current) => !current)}
              palette={palette}
            />

            <View className="flex-row" style={{ gap: 10 }}>
              <Pressable
                onPress={() => setRateModalOpen(false)}
                className="flex-1 items-center justify-center rounded-md px-4 py-3"
                style={{ backgroundColor: palette.muted }}
              >
                <Text className="text-sm font-semibold" style={{ color: palette.foreground }}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setSlowestRate(slowestRateDraft);
                  setFastestRate(fastestRateDraft);
                  setRateModalOpen(false);
                }}
                className="flex-1 items-center justify-center rounded-md px-4 py-3"
                style={{ backgroundColor: palette.foreground }}
              >
                <Text className="text-sm font-semibold" style={{ color: palette.background }}>
                  Save
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
      <Text className="text-xl font-semibold" style={{ color: palette.foreground }}>
        {title}
      </Text>
      <Text className="text-sm" style={{ color: palette.mutedForeground }}>
        {subtitle}
      </Text>
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

function CheckboxRow({
  label,
  checked,
  onPress,
  palette,
}: {
  label: string;
  checked: boolean;
  onPress: () => void;
  palette: Palette;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between rounded-md border p-3"
      style={{
        borderColor: palette.border,
        backgroundColor: palette.background,
      }}
    >
      <Text className="text-sm font-semibold" style={{ color: palette.foreground }}>
        {label}
      </Text>
      <View
        className="items-center justify-center rounded-sm"
        style={{
          width: 18,
          height: 18,
          borderWidth: 1.5,
          borderColor: checked ? palette.emerald : palette.mutedForeground,
          backgroundColor: checked ? palette.emerald : "transparent",
        }}
      >
        {checked ? (
          <Text style={{ color: "#FFFFFF", fontSize: 11, fontWeight: "700" }}>
            X
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

function ToggleRow({
  label,
  value,
  onValueChange,
  palette,
}: {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  palette: Palette;
}) {
  return (
    <View
      className="flex-row items-center justify-between rounded-md border p-3"
      style={{
        borderColor: palette.border,
        backgroundColor: palette.background,
      }}
    >
      <Text
        className="mr-3 flex-1 text-sm font-semibold"
        style={{ color: palette.foreground }}
      >
        {label}
      </Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: palette.muted, true: palette.emerald }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

function SliderBlock({
  label,
  value,
  onValueChange,
  palette,
}: {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  palette: Palette;
}) {
  return (
    <View
      className="gap-3 rounded-xl border p-4"
      style={{
        borderColor: palette.border,
        backgroundColor: palette.background,
      }}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-semibold" style={{ color: palette.foreground }}>
          {label}
        </Text>
        <Text className="text-sm" style={{ color: palette.mutedForeground }}>
          {value.toFixed(2)} s
        </Text>
      </View>
      <Slider
        minimumValue={0}
        maximumValue={3}
        step={0.05}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={palette.emerald}
        maximumTrackTintColor={palette.muted}
        thumbTintColor="#FFFFFF"
      />
    </View>
  );
}

function RateSlider({
  label,
  value,
  onValueChange,
  palette,
}: {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  palette: Palette;
}) {
  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-semibold" style={{ color: palette.foreground }}>
          {label}
        </Text>
        <Text className="text-sm" style={{ color: palette.mutedForeground }}>
          {value}%
        </Text>
      </View>
      <Slider
        minimumValue={0}
        maximumValue={100}
        step={10}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={palette.emerald}
        maximumTrackTintColor={palette.muted}
        thumbTintColor="#FFFFFF"
      />
    </View>
  );
}

function LabeledInput({
  label,
  value,
  onChangeText,
  palette,
  multiline = false,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  palette: Palette;
  multiline?: boolean;
}) {
  return (
    <View className="gap-1.5">
      <Text style={labelStyle(palette)}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        className="rounded-md border px-3 py-3 text-sm font-semibold"
        style={{
          minHeight: multiline ? 92 : undefined,
          color: palette.foreground,
          borderColor: palette.border,
          backgroundColor: palette.panel,
        }}
      />
    </View>
  );
}

function DimensionInput({
  label,
  value,
  onChangeText,
  palette,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  palette: Palette;
}) {
  return (
    <View className="gap-1.5">
      <Text style={labelStyle(palette)}>{label}</Text>
      <View
        className="flex-row items-center rounded-md border px-3"
        style={{
          borderColor: palette.border,
          backgroundColor: palette.background,
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType="decimal-pad"
          className="flex-1 py-3 text-sm font-semibold"
          style={{ color: palette.foreground }}
        />
        <Text className="text-sm" style={{ color: palette.mutedForeground }}>
          m
        </Text>
      </View>
    </View>
  );
}

function ActionChip({
  icon,
  label,
  palette,
  destructive = false,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  palette: Palette;
  destructive?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 flex-row items-center justify-center rounded-md px-3 py-2.5"
      style={{
        gap: 8,
        backgroundColor: destructive ? palette.crimson : palette.muted,
      }}
    >
      {icon}
      <Text
        className="text-sm font-semibold"
        style={{ color: destructive ? "#FFFFFF" : palette.foreground }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function OptionButton({
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
      className="rounded-md border px-4 py-3"
      style={{
        borderColor: active ? palette.foreground : palette.border,
        backgroundColor: active ? palette.muted : palette.background,
      }}
    >
      <Text className="text-sm font-semibold" style={{ color: palette.foreground }}>
        {label}
      </Text>
    </Pressable>
  );
}

function MetaPill({
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
      <View
        className="rounded-md border px-3 py-3"
        style={{
          borderColor: palette.border,
          backgroundColor: palette.panel,
        }}
      >
        <Text className="text-sm font-semibold" style={{ color: palette.foreground }}>
          {value}
        </Text>
      </View>
    </View>
  );
}

function DetailRow({
  label,
  value,
  palette,
}: {
  label: string;
  value: string;
  palette: Palette;
}) {
  return (
    <View className="gap-1">
      <Text style={labelStyle(palette)}>{label}</Text>
      <Text className="text-sm font-semibold" style={{ color: palette.foreground }}>
        {value}
      </Text>
    </View>
  );
}

function InfoTile({
  label,
  value,
  palette,
}: {
  label: string;
  value: string;
  palette: Palette;
}) {
  return (
    <View
      className="rounded-md border p-3"
      style={{
        borderColor: palette.border,
        backgroundColor: palette.background,
      }}
    >
      <Text style={labelStyle(palette)}>{label}</Text>
      <Text className="mt-1 text-sm font-semibold" style={{ color: palette.foreground }}>
        {value}
      </Text>
    </View>
  );
}

function EmptyNote({
  title,
  body,
  palette,
}: {
  title: string;
  body: string;
  palette: Palette;
}) {
  return (
    <View
      className="gap-2 rounded-xl border p-4"
      style={{
        borderColor: palette.border,
        backgroundColor: palette.background,
      }}
    >
      <Text className="text-sm font-semibold" style={{ color: palette.foreground }}>
        {title}
      </Text>
      <Text className="text-sm" style={{ color: palette.mutedForeground }}>
        {body}
      </Text>
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
