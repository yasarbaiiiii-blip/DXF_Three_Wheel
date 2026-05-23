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
  FileUp,
  Hand,
  Play,
  RotateCw,
  Search,
  Square,
  Trash2,
  ZoomIn,
  ZoomOut,
} from "lucide-react-native";
import Svg, { Circle, G, Line, Rect } from "react-native-svg";

import type { Palette } from "../theme/colors";
import type { ImportedPlan, MarkingStyle, PlanLine } from "../types/plan";

interface GeometryViewportProps {
  palette: Palette;
  compact: boolean;
  importedPlan: ImportedPlan | null;
  lines: PlanLine[];
  selectedLineId: string | null;
  onSelectLine: (id: string | null) => void;
  onImportPress: () => void;
  missionRunning: boolean;
  onToggleMission: () => void;
  markingStyle: MarkingStyle;
  rotation: number;
  onRotationChange: (angle: number) => void;
  onDeleteSelectedLine: () => void;
}

export function GeometryViewport({
  palette,
  compact,
  importedPlan,
  lines,
  selectedLineId,
  onSelectLine,
  onImportPress,
  missionRunning,
  onToggleMission,
  markingStyle,
  rotation,
  onRotationChange,
  onDeleteSelectedLine,
}: GeometryViewportProps) {
  const [zoom, setZoom] = useState(1);
  const [rotateDragMode, setRotateDragMode] = useState(false);
  const [dragMode, setDragMode] = useState(false);
  const [angleModalVisible, setAngleModalVisible] = useState(false);
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
      <View className="flex-1 items-center justify-center p-6">
        <View
          className="w-full flex-1 overflow-hidden border"
          style={{
            borderColor: palette.border,
            backgroundColor: palette.panel,
            minHeight: compact ? 320 : undefined,
            maxWidth: 980,
            maxHeight: compact ? undefined : "84%",
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
                  <Rect
                    x="4"
                    y="4"
                    width="92"
                    height="52"
                    fill="none"
                    stroke={palette.border}
                    strokeWidth="0.2"
                  />

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

              <View
                className="absolute left-5 top-5 gap-1 rounded-md px-3 py-2"
                style={{ backgroundColor: palette.background }}
              >
                <Text
                  className="text-xs font-semibold uppercase"
                  style={{ color: palette.mutedForeground, letterSpacing: 0.5 }}
                >
                  Plan Preview
                </Text>
                <Text className="text-base font-semibold" style={{ color: palette.foreground }}>
                  {importedPlan.fileName}
                </Text>
                <Text className="text-xs" style={{ color: palette.mutedForeground }}>
                  Tap a line to inspect it on the left.
                </Text>
              </View>

              <View className="absolute right-5 top-5 flex-row" style={{ gap: 8 }}>
                <ToolButton
                  icon={<ZoomOut size={18} color={palette.foreground} />}
                  label="Zoom out"
                  palette={palette}
                  onPress={() => setZoom((current) => Math.max(0.6, current - 0.15))}
                />
                <ToolButton
                  icon={<ZoomIn size={18} color={palette.foreground} />}
                  label="Zoom in"
                  palette={palette}
                  onPress={() => setZoom((current) => Math.min(2.6, current + 0.15))}
                />
                <Pressable
                  onPress={() => {
                    setRotateDragMode(false);
                    setDragMode((current) => !current);
                  }}
                  className="h-10 w-10 items-center justify-center rounded-md"
                  style={{
                    backgroundColor: dragMode ? palette.emerald : palette.muted,
                  }}
                >
                  <Hand
                    size={18}
                    color={dragMode ? "#FFFFFF" : palette.foreground}
                  />
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
                  className="h-10 w-10 items-center justify-center rounded-md"
                  style={{
                    backgroundColor: rotateDragMode ? palette.emerald : palette.muted,
                  }}
                >
                  <RotateCw
                    size={18}
                    color={rotateDragMode ? "#FFFFFF" : palette.foreground}
                  />
                </Pressable>
              </View>

              <View className="absolute bottom-5 left-5 flex-row" style={{ gap: 10 }}>
                <MetaBadge label={`Zoom ${(zoom * 100).toFixed(0)}%`} palette={palette} />
                <MetaBadge label={`Rotate ${rotation.toFixed(0)} deg`} palette={palette} />
                <MetaBadge label={dragMode ? "Drag mode on" : "Drag mode off"} palette={palette} />
                <MetaBadge
                  label={rotateDragMode ? "Rotate mode on" : "Rotate mode off"}
                  palette={palette}
                />
              </View>

              <View className="absolute bottom-5 right-5">
                <MetaBadge
                  label={
                    selectedLine
                      ? `Selected ${selectedLine.from.id} to ${selectedLine.to.id}`
                      : "Select a line"
                  }
                  palette={palette}
                />
              </View>
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
                className="h-12 flex-row items-center justify-center rounded-md px-5"
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
        className="border-t p-4"
        style={{
          borderTopColor: palette.border,
          backgroundColor: palette.panel,
        }}
      >
        <View className="flex-row" style={{ gap: 12 }}>
          <Pressable
            onPress={onToggleMission}
            className="h-14 flex-1 items-center justify-center rounded-md"
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
              <Text className="text-base font-semibold" style={{ color: "#FFFFFF" }}>
                {missionRunning ? "STOP" : "START"}
              </Text>
            </View>
          </Pressable>

          {selectedLine ? (
            <Pressable
              onPress={onDeleteSelectedLine}
              className="h-14 items-center justify-center rounded-md px-5"
              style={{ backgroundColor: palette.crimson }}
            >
              <View className="flex-row items-center" style={{ gap: 8 }}>
                <Trash2 size={18} color="#FFFFFF" />
                <Text className="text-base font-semibold" style={{ color: "#FFFFFF" }}>
                  DELETE
                </Text>
              </View>
            </Pressable>
          ) : null}
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
    </View>
  );
}

function ToolButton({
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
      className="h-10 w-10 items-center justify-center rounded-md"
      style={{ backgroundColor: palette.muted }}
    >
      {icon}
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
      className="rounded-md px-3 py-2"
      style={{ backgroundColor: palette.background }}
    >
      <Text className="text-xs font-semibold" style={{ color: palette.foreground }}>
        {label}
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
