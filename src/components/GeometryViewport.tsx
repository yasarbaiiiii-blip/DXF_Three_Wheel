import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  Paintbrush,
  FileUp,
  Hand,
  RotateCw,
  RotateCcw,
  Search,
  Trash2,
  ZoomIn,
  ZoomOut,
} from "lucide-react-native";
import Svg, { Circle, G, Line, Polygon, Text as SvgText } from "react-native-svg";

import type { Palette } from "../theme/colors";
import type { ImportedPlan, MarkingStyle, PlanLine } from "../types/plan";

interface GeometryViewportProps {
  palette: Palette;
  compact: boolean;
  mode?: "home" | "plan";
  importedPlan: ImportedPlan | null;
  lines: PlanLine[];
  selectedLineId: string | null;
  onSelectLine: (id: string | null) => void;
  onImportPress: () => void;
  markingStyle: MarkingStyle;
  onSelectMarkingStyle: (style: MarkingStyle) => void;
  rotation: number;
  onRotationChange: (angle: number) => void;
  onDeleteSelectedLine: () => void;
  planNotes: string;
}

export function GeometryViewport({
  palette,
  compact,
  importedPlan,
  lines,
  selectedLineId,
  onSelectLine,
  onImportPress,
  markingStyle,
  onSelectMarkingStyle,
  rotation,
  onRotationChange,
  onDeleteSelectedLine,
}: GeometryViewportProps) {
  const [zoom, setZoom] = useState(1);
  const [rotateDragMode, setRotateDragMode] = useState(false);
  const [dragMode, setDragMode] = useState(false);
  const [angleModalVisible, setAngleModalVisible] = useState(false);
  const [markingModalVisible, setMarkingModalVisible] = useState(false);
  const [miniInfoVisible, setMiniInfoVisible] = useState(false);
  const [angleInput, setAngleInput] = useState("0");
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [surfaceSize, setSurfaceSize] = useState({
    width: 0,
    height: 0,
  });
  const rotationRef = useRef(rotation);
  const ignoreTapRef = useRef(false);
  const dragBaseRotation = useRef(rotation);
  const dragBaseOffset = useRef(offset);
  const pinchDistanceRef = useRef<number | null>(null);
  const pinchZoomBaseRef = useRef(1);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchMovedRef = useRef(false);

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  useEffect(() => {
    dragBaseOffset.current = offset;
  }, [offset]);

  useEffect(() => {
    if (!importedPlan) {
      setZoom(1);
      setRotateDragMode(false);
      setDragMode(false);
      setOffset({ x: 0, y: 0 });
    }
  }, [importedPlan]);

  const selectedLine = useMemo(
    () => lines.find((line) => line.id === selectedLineId) ?? null,
    [lines, selectedLineId]
  );

  const planTransform = useMemo(
    () =>
      `translate(50 30) translate(${offset.x} ${offset.y}) scale(${zoom}) rotate(${rotation}) translate(-50 -30)`,
    [offset.x, offset.y, rotation, zoom]
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => dragMode || rotateDragMode,
        onMoveShouldSetPanResponder: (_, gesture) => {
          if (!(rotateDragMode || dragMode)) {
            return false;
          }

          return (
            Math.abs(gesture.dx) > 6 ||
            Math.abs(gesture.dy) > 6 ||
            gesture.numberActiveTouches > 1
          );
        },
        onPanResponderGrant: (_, gesture) => {
          dragBaseRotation.current = rotationRef.current;
          dragBaseOffset.current = offset;
        },
        onPanResponderMove: (_, gesture) => {
          if (rotateDragMode) {
            const nextAngle =
              (dragBaseRotation.current + gesture.dx * 0.6 + 3600) % 360;
            onRotationChange(nextAngle);
            return;
          }

          if (dragMode) {
            setOffset({
              x: dragBaseOffset.current.x + gesture.dx * 0.045,
              y: dragBaseOffset.current.y + gesture.dy * 0.045,
            });
          }
        },
        onPanResponderRelease: (_, gesture) => {
          if (rotateDragMode) {
            setRotateDragMode(false);
          }
        },
        onPanResponderTerminate: () => {
          if (rotateDragMode) {
            setRotateDragMode(false);
          }
        },
      }),
    [dragMode, offset, onRotationChange, rotateDragMode]
  );

  const applyAngle = () => {
    const next = Number(angleInput);

    if (Number.isNaN(next)) {
      return;
    }

    onRotationChange(((next % 360) + 360) % 360);
    setAngleModalVisible(false);
  };

  const handleTouchStart = (event: any) => {
    const touches = event.nativeEvent.touches;
    touchMovedRef.current = false;

    if (touches.length === 1) {
      touchStartRef.current = {
        x: touches[0].locationX,
        y: touches[0].locationY,
      };
    }

    if (!dragMode) {
      return;
    }

    if (touches.length === 2) {
      const [a, b] = touches;
      pinchDistanceRef.current = Math.hypot(
        a.pageX - b.pageX,
        a.pageY - b.pageY
      );
      pinchZoomBaseRef.current = zoom;
    }
  };

  const handleTouchMove = (event: any) => {
    const touches = event.nativeEvent.touches;

    if (touches.length === 1 && touchStartRef.current) {
      const dx = touches[0].locationX - touchStartRef.current.x;
      const dy = touches[0].locationY - touchStartRef.current.y;

      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        touchMovedRef.current = true;
      }
    } else if (touches.length > 1) {
      touchMovedRef.current = true;
    }

    if (!dragMode) {
      return;
    }

    if (touches.length === 2 && pinchDistanceRef.current) {
      const [a, b] = touches;
      const nextDistance = Math.hypot(a.pageX - b.pageX, a.pageY - b.pageY);
      const scale = nextDistance / pinchDistanceRef.current;
      const nextZoom = Math.max(0.6, Math.min(2.6, pinchZoomBaseRef.current * scale));
      setZoom(nextZoom);
    }
  };

  const handleTouchEnd = (event: any) => {
    if (
      !dragMode &&
      !rotateDragMode &&
      !touchMovedRef.current &&
      touchStartRef.current
    ) {
      const touch =
        event.nativeEvent.changedTouches?.[0] ?? event.nativeEvent;
      const locationX = touch.locationX ?? touchStartRef.current.x;
      const locationY = touch.locationY ?? touchStartRef.current.y;
      handleCanvasTapFromLocalPoint(locationX, locationY);
    }

    pinchDistanceRef.current = null;
    touchStartRef.current = null;
    touchMovedRef.current = false;
  };

  const handleSurfaceLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSurfaceSize({ width, height });
  };

  const handleCanvasTapFromLocalPoint = (locationX: number, locationY: number) => {
    if (
      dragMode ||
      rotateDragMode ||
      lines.length === 0 ||
      !surfaceSize.width ||
      !surfaceSize.height
    ) {
      return;
    }

    const viewportPoint = mapLocalPointToCanvas(
      locationX,
      locationY,
      surfaceSize.width,
      surfaceSize.height
    );

    if (!viewportPoint) {
      return;
    }

    const planPoint = invertCanvasTransform(
      viewportPoint.x,
      viewportPoint.y,
      zoom,
      rotation,
      offset
    );
    const nearest = findNearestLine(planPoint.x, planPoint.y, lines);
    const hitThreshold = Math.max(0.8, 18 / (viewportPoint.scale * zoom));

    if (nearest && nearest.distance <= hitThreshold) {
      onSelectLine(nearest.line.id);
      return;
    }

    onSelectLine(null);
  };

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
      <View className="flex-1 p-4">
        <View
          className="w-full flex-1 overflow-hidden border"
          style={{
            borderColor: palette.border,
            backgroundColor: palette.panel,
            minHeight: compact ? 320 : undefined,
            borderRadius: 0,
          }}
        >
          {importedPlan ? (
            <>
              <View
                style={styles.canvasGestureSurface}
                onLayout={handleSurfaceLayout}
                {...panResponder.panHandlers}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <Svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 60"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <G transform={planTransform}>
                    {lines.map((line) => {
                      const isSelected = line.id === selectedLineId;
                      const strokeColor = isSelected
                        ? palette.emerald
                        : line.layer === "center"
                          ? palette.amber
                          : line.layer === "boundary"
                            ? palette.foreground
                            : palette.mutedForeground;

                      return (
                        <React.Fragment key={line.id}>
                          <Line
                            x1={line.from.x}
                            y1={line.from.y}
                            x2={line.to.x}
                            y2={line.to.y}
                            stroke={strokeColor}
                            strokeWidth={isSelected ? 0.85 : 0.45}
                            strokeDasharray={dashPattern(markingStyle)}
                            strokeLinecap="round"
                          />
                          {isSelected ? (
                            <>
                              <Circle
                                cx={line.from.x}
                                cy={line.from.y}
                                r="1.2"
                                fill={palette.emerald}
                              />
                              <Circle
                                cx={line.to.x}
                                cy={line.to.y}
                                r="1.2"
                                fill={palette.emerald}
                              />
                            </>
                          ) : null}
                        </React.Fragment>
                      );
                    })}
                  </G>
                </Svg>
              </View>

              {/* Floating Compass Overlay */}
              <View
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  width: 54,
                  height: 54,
                  zIndex: 40,
                  elevation: 40,
                  backgroundColor: "transparent",
                }}
              >
                <Svg width={54} height={54} viewBox="0 0 54 54">
                  {/* Outer circle */}
                  <Circle cx={27} cy={27} r={24} fill="rgba(15,23,42,0.85)" stroke={palette.border} strokeWidth={1.5} />
                  
                  {/* Cardinal labels */}
                  <SvgText x={27} y={12} fontSize={8} fill="#ef4444" fontWeight="900" textAnchor="middle">N</SvgText>
                  <SvgText x={27} y={48} fontSize={7} fill={palette.mutedForeground} fontWeight="700" textAnchor="middle">S</SvgText>
                  <SvgText x={47} y={30} fontSize={7} fill={palette.mutedForeground} fontWeight="700" textAnchor="middle">E</SvgText>
                  <SvgText x={7} y={30} fontSize={7} fill={palette.mutedForeground} fontWeight="700" textAnchor="middle">W</SvgText>
                  
                  {/* Rotating needle */}
                  <G transform={`rotate(${rotation} 27 27)`}>
                    {/* North Pointer */}
                    <Polygon points="27,15 31,27 23,27" fill="#ef4444" />
                    {/* South Pointer */}
                    <Polygon points="27,39 31,27 23,27" fill="#cbd5e1" />
                    {/* Center pin */}
                    <Circle cx={27} cy={27} r={2.5} fill="#0f172a" stroke="#fff" strokeWidth={1} />
                  </G>
                </Svg>
              </View>

              <View
                className="absolute left-6 right-6 top-6 flex-row items-start justify-between rounded-2xl px-4 py-4"
                style={{ backgroundColor: palette.background, gap: 16 }}
              >
                <View
                  className="flex-1"
                  style={{ maxWidth: 200 }}
                >
                  <Text
                    className="text-xs font-semibold uppercase"
                    style={{ color: palette.mutedForeground, letterSpacing: 0.5 }}
                  >
                    File Summary
                  </Text>
                  <Text
                    className="mt-1 text-base font-semibold"
                    style={{ color: palette.foreground }}
                  >
                    {importedPlan.fileName}
                  </Text>
                  <Text className="mt-1 text-xs" style={{ color: palette.mutedForeground }}>
                    {lines.length} points imported
                  </Text>
                </View>
                <View className="items-end" style={{ gap: 10 }}>
                  <View
                    className="flex-1"
                    style={{ maxWidth: 200, alignItems: "flex-end" }}
                  >
                    <Text
                      className="text-xs font-semibold uppercase"
                      style={{ color: palette.mutedForeground, letterSpacing: 0.5 }}
                    >
                      Map Home
                    </Text>
                    <Text
                      className="mt-1 text-base font-semibold text-right"
                      style={{ color: palette.foreground }}
                    >
                      {importedPlan.fileName}
                    </Text>
                    <Text className="mt-1 text-xs text-right" style={{ color: palette.mutedForeground }}>
                      {selectedLine
                        ? "Selected details are in Plan Info."
                        : "Tap a line to see its details."}
                    </Text>
                  </View>
                </View>

                <View className="items-end">
                  <Text
                    className="text-xs font-semibold uppercase"
                    style={{ color: palette.mutedForeground, letterSpacing: 0.5 }}
                  >
                    Selected Line
                  </Text>
                  <Text
                    className="mt-1 text-sm font-semibold"
                    style={{ color: palette.foreground }}
                  >
                    {selectedLine
                      ? `${selectedLine.from.id} to ${selectedLine.to.id}`
                      : "Tap any line"}
                  </Text>
                  {selectedLine ? (
                    <Pressable
                      onPress={() => setMiniInfoVisible(true)}
                      className="mt-3 rounded-xl px-4 py-3"
                      style={{ backgroundColor: palette.muted }}
                    >
                      <Text className="text-sm font-semibold" style={{ color: palette.foreground }}>
                        Open mini info tab
                      </Text>
                    </Pressable>
                  ) : null}
                </View>
              </View>

              {selectedLine ? (
                <Pressable
                  onPress={onDeleteSelectedLine}
                  className="absolute bottom-6 right-6 h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: palette.crimson,
                    zIndex: 20,
                    elevation: 20,
                  }}
                >
                  <Trash2 size={18} color="#FFFFFF" />
                </Pressable>
              ) : null}

            </>
          ) : (
            <View className="flex-1 items-center justify-center px-8" style={{ gap: 16 }}>
              <View
                className="items-center justify-center rounded-full"
                style={{
                  width: 72,
                  height: 72,
                  backgroundColor: palette.muted,
                }}
              >
                <Search size={28} color={palette.mutedForeground} />
              </View>
              <Text className="text-xl font-semibold" style={{ color: palette.foreground }}>
                Import a plan to view it here
              </Text>
              <Text
                className="text-center text-sm"
                style={{ color: palette.mutedForeground, maxWidth: 360 }}
              >
                Upload a DXF or CSV file to preview the plan, inspect lines, and
                start the mission flow.
              </Text>
              <Pressable
                onPress={onImportPress}
                className="h-14 flex-row items-center justify-center rounded-md px-5"
                style={{ backgroundColor: palette.foreground, gap: 8 }}
              >
                <FileUp size={18} color={palette.background} />
                <Text className="text-sm font-semibold" style={{ color: palette.background }}>
                  Import File
                </Text>
              </Pressable>
              <Text className="text-xs" style={{ color: palette.mutedForeground }}>
                Only CSV and DXF supported.
              </Text>
            </View>
          )}
        </View>
      </View>

      <View
        className="border-t px-4 py-3"
        style={{
          borderTopColor: palette.border,
          backgroundColor: palette.panel,
        }}
      >
        <View
          className="rounded-2xl px-4 py-4"
          style={{ backgroundColor: palette.background }}
        >
          <View className="flex-row items-center justify-between" style={{ gap: 14 }}>
            <View className="flex-row items-center" style={{ gap: 12 }}>
              <LabeledToolButton
                icon={<ZoomOut size={24} color={palette.foreground} />}
                label="Zoom -"
                palette={palette}
                onPress={() => setZoom((current) => Math.max(0.6, current - 0.15))}
              />
              <LabeledToolButton
                icon={<ZoomIn size={24} color={palette.foreground} />}
                label="Zoom +"
                palette={palette}
                onPress={() => setZoom((current) => Math.min(2.6, current + 0.15))}
              />
              <LabeledToolButton
                icon={<RotateCcw size={24} color={palette.foreground} />}
                label="Rot CCW"
                palette={palette}
                onPress={() => onRotationChange(((rotation - 15) % 360 + 360) % 360)}
              />
              <LabeledToolButton
                icon={<RotateCw size={24} color={palette.foreground} />}
                label="Rot CW"
                palette={palette}
                onPress={() => onRotationChange(((rotation + 15) % 360 + 360) % 360)}
              />
              <Pressable
                onPress={() => {
                  setRotateDragMode(false);
                  setDragMode((current) => !current);
                }}
                className="items-center"
              >
                <View
                  className="h-14 w-[78px] items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: dragMode ? palette.emerald : palette.muted,
                  }}
                >
                  <Hand
                    size={24}
                    color={dragMode ? "#FFFFFF" : palette.foreground}
                  />
                </View>
                <Text
                  className="mt-2 text-xs font-semibold"
                  style={{ color: palette.foreground }}
                >
                  Move
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  if (ignoreTapRef.current) {
                    ignoreTapRef.current = false;
                    return;
                  }

                  setAngleInput(rotation.toFixed(0));
                  setAngleModalVisible(true);
                }}
                onLongPress={() => {
                  ignoreTapRef.current = true;
                  setDragMode(false);
                  setRotateDragMode(true);
                }}
                delayLongPress={260}
                className="items-center"
              >
                <View
                  className="h-14 w-[78px] items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: rotateDragMode ? palette.emerald : palette.muted,
                  }}
                >
                  <RotateCw
                    size={24}
                    color={rotateDragMode ? "#FFFFFF" : palette.foreground}
                  />
                </View>
                <Text
                  className="mt-2 text-xs font-semibold"
                  style={{ color: palette.foreground }}
                >
                  Rotate
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setMarkingModalVisible(true)}
                className="items-center"
              >
                <View
                  className="h-14 w-[78px] items-center justify-center rounded-2xl"
                  style={{ backgroundColor: palette.muted }}
                >
                  <Paintbrush size={24} color={palette.foreground} />
                </View>
                <Text className="mt-2 text-xs font-semibold" style={{ color: palette.foreground }}>
                  Style
                </Text>
              </Pressable>
            </View>

            <View className="flex-1 items-end">
              <View className="flex-row flex-wrap justify-end" style={{ gap: 12 }}>
                <MetaBadge label={`${(zoom * 100).toFixed(0)}%`} palette={palette} />
                <MetaBadge label={`${rotation.toFixed(0)} deg`} palette={palette} />
                <MetaBadge
                  label={dragMode ? "Drag on" : "Drag off"}
                  palette={palette}
                />
                <MetaBadge
                  label={rotateDragMode ? "Rotate on" : "Rotate off"}
                  palette={palette}
                />
                <MetaBadge
                  label={
                    selectedLine
                      ? `${selectedLine.from.id}-${selectedLine.to.id}`
                      : "No line"
                  }
                  palette={palette}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <Modal
        visible={angleModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAngleModalVisible(false)}
      >
        <View
          className="flex-1 items-center justify-center px-6"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View
            className="w-full max-w-[340px] rounded-xl border p-5"
            style={{
              borderColor: palette.border,
              backgroundColor: palette.panel,
              gap: 14,
            }}
          >
            <Text className="text-lg font-semibold" style={{ color: palette.foreground }}>
              Rotate Plan
            </Text>
            <Text className="text-sm" style={{ color: palette.mutedForeground }}>
              Enter the angle in degrees.
            </Text>
            <TextInput
              value={angleInput}
              onChangeText={setAngleInput}
              keyboardType="numeric"
              className="rounded-md border px-4 py-3 text-sm font-semibold"
              style={{
                color: palette.foreground,
                borderColor: palette.border,
                backgroundColor: palette.background,
              }}
            />
            <View className="flex-row" style={{ gap: 10 }}>
              <Pressable
                onPress={() => setAngleModalVisible(false)}
                className="flex-1 items-center justify-center rounded-md px-4 py-3"
                style={{ backgroundColor: palette.muted }}
              >
                <Text className="text-sm font-semibold" style={{ color: palette.foreground }}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={applyAngle}
                className="flex-1 items-center justify-center rounded-md px-4 py-3"
                style={{ backgroundColor: palette.foreground }}
              >
                <Text className="text-sm font-semibold" style={{ color: palette.background }}>
                  Apply
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={miniInfoVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMiniInfoVisible(false)}
      >
        <View
          className="flex-1 items-end justify-start px-6 pt-28"
          style={{ backgroundColor: "rgba(0,0,0,0.28)" }}
        >
          <View
            className="rounded-2xl border p-5"
            style={{
              width: 320,
              borderColor: palette.border,
              backgroundColor: palette.panel,
              gap: 10,
            }}
          >
            <Text className="text-lg font-semibold" style={{ color: palette.foreground }}>
              Mini Line Info
            </Text>
            {selectedLine ? (
              <>
                <MiniInfoRow label="Line" value={selectedLine.label} palette={palette} />
                <MiniInfoRow label="Layer" value={selectedLine.layer} palette={palette} />
                <MiniInfoRow
                  label="Length"
                  value={`${lineLength(selectedLine).toFixed(2)} m`}
                  palette={palette}
                />
                <MiniInfoRow
                  label="Width"
                  value={`${selectedLine.width.toFixed(2)} m`}
                  palette={palette}
                />
                <MiniInfoRow
                  label="Angle"
                  value={`${lineAngle(selectedLine).toFixed(1)} deg`}
                  palette={palette}
                />
              </>
            ) : (
              <Text className="text-sm" style={{ color: palette.mutedForeground }}>
                Select a line first.
              </Text>
            )}

            <Pressable
              onPress={() => setMiniInfoVisible(false)}
              className="mt-2 items-center justify-center rounded-xl px-4 py-3"
              style={{ backgroundColor: palette.muted }}
            >
              <Text className="text-sm font-semibold" style={{ color: palette.foreground }}>
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={markingModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMarkingModalVisible(false)}
      >
        <View
          className="flex-1 items-center justify-center px-6"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View
            className="w-full max-w-[340px] rounded-xl border p-5"
            style={{
              borderColor: palette.border,
              backgroundColor: palette.panel,
              gap: 14,
            }}
          >
            <Text className="text-lg font-semibold" style={{ color: palette.foreground }}>
              Marking Style
            </Text>
            <Text className="text-sm" style={{ color: palette.mutedForeground }}>
              Choose how the field lines should be painted.
            </Text>

            <MarkingOption
              label="Straight Line"
              active={markingStyle === "straight"}
              palette={palette}
              onPress={() => onSelectMarkingStyle("straight")}
            />
            <MarkingOption
              label="Dotted Line"
              active={markingStyle === "dotted"}
              palette={palette}
              onPress={() => onSelectMarkingStyle("dotted")}
            />
            <MarkingOption
              label="Dashed Line"
              active={markingStyle === "dashed"}
              palette={palette}
              onPress={() => onSelectMarkingStyle("dashed")}
            />

            <View className="flex-row" style={{ gap: 10 }}>
              <Pressable
                onPress={() => setMarkingModalVisible(false)}
                className="flex-1 items-center justify-center rounded-md px-4 py-3"
                style={{ backgroundColor: palette.muted }}
              >
                <Text className="text-sm font-semibold" style={{ color: palette.foreground }}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setMarkingModalVisible(false)}
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

function LabeledToolButton({
  icon,
  label,
  palette,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  palette: Palette;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={label}
      className="items-center"
    >
      <View
        className="h-14 w-[78px] items-center justify-center rounded-2xl"
        style={{ backgroundColor: palette.muted }}
      >
        {icon}
      </View>
      <Text className="mt-2 text-xs font-semibold" style={{ color: palette.foreground }}>
        {label}
      </Text>
    </Pressable>
  );
}

function MarkingOption({
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
      className="rounded-xl border px-4 py-4"
      style={{
        borderColor: active ? palette.emerald : palette.border,
        backgroundColor: active ? palette.muted : palette.background,
      }}
    >
      <Text className="text-base font-semibold" style={{ color: palette.foreground }}>
        {label}
      </Text>
    </Pressable>
  );
}

function MetaBadge({
  label,
  palette,
}: {
  label: string;
  palette: Palette;
}) {
  return (
    <View
      className="rounded-xl px-4 py-3"
      style={{ backgroundColor: palette.background }}
    >
      <Text className="text-xs font-semibold" style={{ color: palette.foreground }}>
        {label}
      </Text>
    </View>
  );
}

function MiniInfoRow({
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
      className="flex-row items-center justify-between rounded-xl px-4 py-3"
      style={{ backgroundColor: palette.background }}
    >
      <Text className="text-sm font-semibold" style={{ color: palette.mutedForeground }}>
        {label}
      </Text>
      <Text className="ml-4 flex-1 text-right text-sm font-semibold" style={{ color: palette.foreground }}>
        {value}
      </Text>
    </View>
  );
}

function dashPattern(style: MarkingStyle) {
  if (style === "dotted") {
    return "0.3 1.3";
  }

  if (style === "dashed") {
    return "2.2 1.5";
  }

  return undefined;
}

function formatMarkingStyle(style: MarkingStyle) {
  if (style === "dotted") {
    return "Dotted Line";
  }

  if (style === "dashed") {
    return "Dashed Line";
  }

  return "Straight Line";
}

function lineLength(line: PlanLine) {
  const dx = line.to.x - line.from.x;
  const dy = line.to.y - line.from.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function lineAngle(line: PlanLine) {
  const dx = line.to.x - line.from.x;
  const dy = line.to.y - line.from.y;
  return ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;
}

const styles = StyleSheet.create({
  canvasGestureSurface: {
    flex: 1,
    padding: 20,
  },
});

function mapLocalPointToCanvas(
  locationX: number,
  locationY: number,
  width: number,
  height: number
) {
  if (!width || !height) {
    return null;
  }

  const innerWidth = Math.max(width - 40, 1);
  const innerHeight = Math.max(height - 40, 1);
  const scale = Math.min(innerWidth / 100, innerHeight / 60);
  const drawnWidth = 100 * scale;
  const drawnHeight = 60 * scale;
  const offsetX = 20 + (innerWidth - drawnWidth) / 2;
  const offsetY = 20 + (innerHeight - drawnHeight) / 2;
  const x = (locationX - offsetX) / scale;
  const y = (locationY - offsetY) / scale;

  if (x < 0 || x > 100 || y < 0 || y > 60) {
    return null;
  }

  return { x, y, scale };
}

function invertCanvasTransform(
  x: number,
  y: number,
  zoom: number,
  rotation: number,
  offset: { x: number; y: number }
) {
  const centerX = 50;
  const centerY = 30;
  const radians = (-rotation * Math.PI) / 180;
  const normalizedX = (x - centerX - offset.x) / zoom;
  const normalizedY = (y - centerY - offset.y) / zoom;

  const rotatedX =
    normalizedX * Math.cos(radians) - normalizedY * Math.sin(radians);
  const rotatedY =
    normalizedX * Math.sin(radians) + normalizedY * Math.cos(radians);

  return {
    x: centerX + rotatedX,
    y: centerY + rotatedY,
  };
}

function findNearestLine(x: number, y: number, lines: PlanLine[]) {
  let best: { line: PlanLine; distance: number } | null = null;

  for (const line of lines) {
    const distance = pointToSegmentDistance(
      x,
      y,
      line.from.x,
      line.from.y,
      line.to.x,
      line.to.y
    );

    if (!best || distance < best.distance) {
      best = { line, distance };
    }
  }

  return best;
}

function pointToSegmentDistance(
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

  const t = Math.max(
    0,
    Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy))
  );
  const projectionX = x1 + t * dx;
  const projectionY = y1 + t * dy;

  return Math.hypot(px - projectionX, py - projectionY);
}
