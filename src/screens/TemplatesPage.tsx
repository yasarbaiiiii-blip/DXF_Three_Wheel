import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Alert, Modal, Pressable, ScrollView, Switch, Text, TextInput, View } from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import { X } from "lucide-react-native";
import Slider from "@react-native-community/slider";

import { BoundaryEditor, PlacedItem } from "../components/BoundaryEditor";
import { generateAlphabetLines, FontStyle, AlphabetType, NumberType, generateNumberLines } from "../utils/characterTemplates";
import { generateRoadSignLines, RoadSignType, ROAD_SIGN_LABELS } from "../utils/roadSignTemplates";
import { generateTemplateLines, ShapeType, ArcType } from "../utils/shapeTemplates";
import { linesToDxf } from "../utils/dxfGenerator";
import type { PlanLine, LayerVisibility, Page, TelemetrySnapshot, DxfEntity } from "../types/plan";

interface TemplatesPageProps {
  telemetrySnapshot: TelemetrySnapshot | null;
  layerVisibility: LayerVisibility;
  selectedLineId: string | null;
  onSelectLine: (id: string | null) => void;
  previewRoverPoint: { north: number; east: number } | null;
  onGenerateTemplate: (name: string, lines: PlanLine[]) => void;
  apiBaseUrl: string;
  onSelectPath: (name: string) => void;
  onRefreshPaths: () => void;
  onNav: (page: Page) => void;
  PlanPreviewComponent: React.ComponentType<{
    lines: PlanLine[];
    visibility: LayerVisibility;
    selectedLineId: string | null;
    onSelectLine?: (id: string | null) => void;
    roverPosN?: number | null;
    roverPosE?: number | null;
    roverHeadingDeg?: number | null;
  }>;
}

interface WordGroup {
  id: string;
  label: string;
  itemIds: string[];
}

export function TemplatesPage(props: TemplatesPageProps) {
  const [boundaryMode, setBoundaryMode] = useState(false);
  const [boundaryWidthStr, setBoundaryWidthStr] = useState("4.0");
  const [boundaryHeightStr, setBoundaryHeightStr] = useState("3.0");
  const [indentSpacingStr, setIndentSpacingStr] = useState("0.25");
  const [letterSpacingStr, setLetterSpacingStr] = useState("10");
  const [snapCenter, setSnapCenter] = useState(true);
  const [snapCorners, setSnapCorners] = useState(true);
  const [snapAngles, setSnapAngles] = useState(true);
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  
  const [wordGroups, setWordGroups] = useState<WordGroup[]>([]);
  const [arrangeMode, setArrangeMode] = useState<"none" | "horizontal" | "vertical">("none");
  const [multiTouchMode, setMultiTouchMode] = useState<"both" | "scale" | "rotate">("both");
  const [itemScaleStr, setItemScaleStr] = useState("1.0");
  const [itemRotationStr, setItemRotationStr] = useState("0");

  useEffect(() => {
    if (selectedItemIds.length > 0) {
      const firstItem = placedItems.find(p => p.id === selectedItemIds[0]);
      if (firstItem) {
        setItemScaleStr(firstItem.scale.toFixed(2));
        setItemRotationStr(Math.round(firstItem.rotation).toString());
      }
    } else {
      setMultiTouchMode("both");
    }
  }, [selectedItemIds, placedItems]);

  const [category, setCategory] = useState<"shapes" | "alphabets" | "numbers" | "road_signs" | "sports_fields">("shapes");
  const [fontStyle, setFontStyle] = useState<FontStyle>("smooth");
  const [shape, setShape] = useState<ShapeType>("square");
  const [selectedLetter, setSelectedLetter] = useState<AlphabetType>("A");
  const [selectedDigit, setSelectedDigit] = useState<NumberType>("0");
  const [selectedSign, setSelectedSign] = useState<RoadSignType>("ArrowStraight");
  const [arcType, setArcType] = useState<ArcType>("full");
  const [sizeInput, setSizeInput] = useState("1.0");
  const [isParsing, setIsParsing] = useState(false);

  // Active boundary dimensions (applied to canvas)
  const [activeBoundaryWidth, setActiveBoundaryWidth] = useState(4.0);
  const [activeBoundaryHeight, setActiveBoundaryHeight] = useState(3.0);
  const [activeIndentSpacing, setActiveIndentSpacing] = useState(0.25);
  const [activeLetterSpacingCm, setActiveLetterSpacingCm] = useState(10);

  const parsedSize = Math.max(0.5, Math.min(3.0, parseFloat(sizeInput) || 1.0));

  // PENDING values from text inputs
  const pendingWidth = parseFloat(boundaryWidthStr) || 4.0;
  const pendingHeight = parseFloat(boundaryHeightStr) || 3.0;
  const pendingIndent = parseFloat(indentSpacingStr) || 0.25;
  const pendingLetterSpacingCm = parseFloat(letterSpacingStr) || 10;

  // ACTIVE values (applied to canvas)
  const bw = activeBoundaryWidth;
  const bh = activeBoundaryHeight;
  const indent = activeIndentSpacing;
  const lSpacing = activeLetterSpacingCm / 100; // cm → meters

  // Check if pending values differ from active
  const hasBoundaryChanges =
    pendingWidth !== activeBoundaryWidth ||
    pendingHeight !== activeBoundaryHeight ||
    pendingIndent !== activeIndentSpacing ||
    pendingLetterSpacingCm !== activeLetterSpacingCm;

  const previewLines = useMemo(() => {
    if (category === "shapes") return generateTemplateLines(shape, parsedSize, arcType);
    if (category === "alphabets") return generateAlphabetLines(selectedLetter, parsedSize, fontStyle);
    if (category === "numbers") return generateNumberLines(selectedDigit, parsedSize, fontStyle);
    if (category === "road_signs") return generateRoadSignLines(selectedSign, parsedSize);
    return [];
  }, [category, shape, selectedLetter, selectedDigit, selectedSign, parsedSize, arcType, fontStyle]);

  const computeBoundingBox = useCallback((lines: PlanLine[]): { width: number; height: number } => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const line of lines) {
      minX = Math.min(minX, line.from.x, line.to.x);
      maxX = Math.max(maxX, line.from.x, line.to.x);
      minY = Math.min(minY, line.from.y, line.to.y);
      maxY = Math.max(maxY, line.from.y, line.to.y);
    }
    return {
      width: Math.max(0.5, maxX - minX || 0.5),
      height: Math.max(0.5, maxY - minY || 0.5),
    };
  }, []);

  const handleAddToBoundary = useCallback(() => {
    if (previewLines.length === 0) return;
    const bounds = computeBoundingBox(previewLines);
    
    const newWidth = bounds.width * parsedSize;
    const newHeight = bounds.height * parsedSize;
    
    let newX = 0;
    let newY = 0;
    
    if (placedItems.length === 0) {
      newX = -bw / 2 + indent + newWidth / 2;
      newY = 0;
    } else {
      const lastItem = placedItems[placedItems.length - 1];
      newX = lastItem.x + lastItem.width / 2 + newWidth / 2 + lSpacing;
      newY = lastItem.y;
      
      const rightEdge = bw / 2 - indent;
      if (newX + newWidth / 2 > rightEdge) {
        newX = -bw / 2 + indent + newWidth / 2;
        newY = lastItem.y - Math.max(lastItem.height, newHeight) - 0.2;
      }
    }
    
    const newItem: PlacedItem = {
      id: "item-" + Date.now(),
      lines: previewLines,
      x: newX,
      y: newY,
      rotation: 0,
      scale: 1.0,
      width: newWidth,
      height: newHeight,
    };
    setPlacedItems(prev => [...prev, newItem]);
    // Auto-select so user can immediately scale/rotate/drag
    setSelectedItemIds([newItem.id]);
  }, [previewLines, parsedSize, computeBoundingBox, placedItems, lSpacing, bw, indent]);

  const handleDeleteItem = useCallback(() => {
    const deletedGroupIds = new Set(
      placedItems.filter(p => selectedItemIds.includes(p.id) && p.groupId).map(p => p.groupId)
    );
    setPlacedItems(prev => prev.filter(p => !selectedItemIds.includes(p.id)));
    setWordGroups(prev => prev.filter(g => 
      !deletedGroupIds.has(g.id) ||
      placedItems.filter(p => p.groupId === g.id && !selectedItemIds.includes(p.id)).length > 0
    ));
    setSelectedItemIds([]);
  }, [placedItems, selectedItemIds]);

  const handleAutoArrange = useCallback(() => {
    if (placedItems.length === 0) return;
    const usableWidth = Math.max(0.1, bw - 2 * indent);
    const totalItemsWidth = placedItems.reduce((sum, item) => sum + item.width, 0);
    const totalGaps = (placedItems.length - 1) * lSpacing;
    const spaceNeeded = totalItemsWidth + totalGaps;
    if (spaceNeeded > usableWidth) {
      Alert.alert("Too Wide", 
        `Items need ${(spaceNeeded * 100).toFixed(0)}cm but boundary provides ${(usableWidth * 100).toFixed(0)}cm. Reduce scale or increase boundary width.`
      );
      return;
    }
    
    // Start from the LEFT edge of the indent area
    const leftIndentEdge = -bw / 2 + indent;
    let cursorX = leftIndentEdge;
    
    // Center vertically in boundary (Y=0 is boundary center)
    const centerY = 0;
    
    setPlacedItems(prev => prev.map(item => {
      const centerX = cursorX + item.width / 2;
      cursorX += item.width + lSpacing;
      return { ...item, x: centerX, y: centerY };
    }));
  }, [placedItems, bw, indent, lSpacing]);

  const handleApplyScale = useCallback(() => {
    if (selectedItemIds.length === 0) return;
    const val = parseFloat(itemScaleStr);
    const targetScale = Math.max(0.1, isNaN(val) ? 1.0 : val);
    setPlacedItems(prev => prev.map(p => {
      if (!selectedItemIds.includes(p.id)) return p;
      const scaleMultiplier = targetScale / p.scale;
      return {
        ...p,
        scale: targetScale,
        width: p.width * scaleMultiplier,
        height: p.height * scaleMultiplier,
        lines: p.lines.map(l => ({
          ...l,
          from: { ...l.from, x: l.from.x * scaleMultiplier, y: l.from.y * scaleMultiplier },
          to: { ...l.to, x: l.to.x * scaleMultiplier, y: l.to.y * scaleMultiplier },
        })),
      };
    }));
  }, [selectedItemIds, itemScaleStr]);

  const handleApplyRotation = useCallback(() => {
    if (selectedItemIds.length === 0) return;
    const val = parseFloat(itemRotationStr);
    const targetRot = isNaN(val) ? 0 : (val % 360);
    setPlacedItems(prev => prev.map(p => 
      selectedItemIds.includes(p.id) 
        ? { ...p, rotation: targetRot }
        : p
    ));
  }, [selectedItemIds, itemRotationStr]);

  const handleGroupItems = useCallback(() => {
     if (selectedItemIds.length < 2) return;
     const groupId = "grp-" + Date.now();
     setPlacedItems(prev => prev.map(p => selectedItemIds.includes(p.id) ? { ...p, groupId } : p));
     setWordGroups(prev => [...prev, { id: groupId, label: "Word", itemIds: [...selectedItemIds] }]);
  }, [selectedItemIds]);

  const handleUngroupItems = useCallback(() => {
    const firstItem = placedItems.find(p => selectedItemIds.includes(p.id));
    if (!firstItem?.groupId) return;
    const groupId = firstItem.groupId;
    setPlacedItems(prev => prev.map(p => 
      p.groupId === groupId ? { ...p, groupId: undefined } : p
    ));
    setWordGroups(prev => prev.filter(g => g.id !== groupId));
    setSelectedItemIds([firstItem.id]);
  }, [placedItems, selectedItemIds]);

  const handleParse = async () => {
    if (!props.apiBaseUrl) return;
    let finalLines: PlanLine[] = [];
    let title = "";

    if (boundaryMode) {
      if (placedItems.length === 0) {
        Alert.alert("Empty Boundary", "No items placed in boundary.");
        return;
      }
      title = `Boundary_${bw}x${bh}_${new Date().toISOString().slice(0,10)}`;
      placedItems.forEach(item => {
        const cos = Math.cos((item.rotation || 0) * Math.PI / 180) || 0;
        const sin = Math.sin((item.rotation || 0) * Math.PI / 180) || 0;
        item.lines.forEach((l, i) => {
          const fx = (l.from.x * cos - l.from.y * sin) + (item.x || 0);
          const fy = (l.from.x * sin + l.from.y * cos) + (item.y || 0);
          const tx = (l.to.x * cos - l.to.y * sin) + (item.x || 0);
          const ty = (l.to.x * sin + l.to.y * cos) + (item.y || 0);
          if (!isFinite(fx) || !isFinite(fy) || !isFinite(tx) || !isFinite(ty)) return;
          
          finalLines.push({
            ...l,
            id: `${item.id}-${i}`,
            from: { ...l.from, x: fx, y: fy },
            to: { ...l.to, x: tx, y: ty },
            entity: {
              entity_id: `${item.id}-${i}`,
              entity_type: "LINE",
              layer: "MARKING",
              color: 3,
              is_mark: true,
              length_m: Math.hypot(tx - fx, ty - fy),
              geometry: {},
              preview_points: [
                { north: fx, east: fy },
                { north: tx, east: ty },
              ],
            } as DxfEntity,
          });
        });
      });
    } else {
      if (previewLines.length === 0) {
        Alert.alert("Empty Template", "No valid template to generate.");
        return;
      }
      title = category === "shapes" 
        ? `${shape.charAt(0).toUpperCase() + shape.slice(1)}_Template_${parsedSize}m`
        : category === "alphabets"
          ? `Letter_${selectedLetter}_${fontStyle}_${parsedSize}m`
          : category === "numbers"
            ? `Number_${selectedDigit}_${fontStyle}_${parsedSize}m`
            : `Road_Sign_${parsedSize}m`;
      finalLines = previewLines;
    }

    setIsParsing(true);
    try {
      const fileName = `${title.replace(/\s+/g, "_")}.dxf`;
      const fileContent = linesToDxf(finalLines, fileName);
      const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
      await FileSystem.writeAsStringAsync(fileUri, fileContent, { encoding: FileSystem.EncodingType.UTF8 });

      const formData = new FormData();
      formData.append("file", { uri: fileUri, name: fileName, type: "application/dxf" } as any);

      const res = await fetch(`${props.apiBaseUrl}/api/path/parse-dxf`, { method: "POST", body: formData });
      if (res.ok) {
        Alert.alert("Success", `Template "${fileName}" sent. Switching to alignment view.`);
        props.onRefreshPaths();
        props.onSelectPath(fileName);
        setTimeout(() => props.onNav("fields"), 500);
      } else {
        const errText = await res.text();
        Alert.alert("Parse Failed", errText || "Unknown error");
      }
    } catch (err: any) {
      console.log("Error parsing template:", err);
      Alert.alert("Error", err.message || "Failed to send template to backend.");
    } finally {
      setIsParsing(false);
    }
  };

  const handleApplyBoundary = useCallback(() => {
    setActiveBoundaryWidth(pendingWidth);
    setActiveBoundaryHeight(pendingHeight);
    setActiveIndentSpacing(pendingIndent);
    setActiveLetterSpacingCm(pendingLetterSpacingCm);
  }, [pendingWidth, pendingHeight, pendingIndent, pendingLetterSpacingCm]);

  const memoizedSnapSettings = useMemo(() => ({
    center: snapCenter,
    corners: snapCorners,
    angles: snapAngles,
  }), [snapCenter, snapCorners, snapAngles]);

  const memoSetSelectedItemIds = useCallback((ids: string[]) => {
    setSelectedItemIds(ids);
  }, []);

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ width: "58%", backgroundColor: "transparent", padding: 14 }}>
        <View style={{ flex: 1, borderRadius: 20, overflow: "hidden", backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#d8e1eb" }}>
          {boundaryMode ? (
            <BoundaryEditor
              boundaryWidth={bw}
              boundaryHeight={bh}
              indentSpacing={indent}
              letterSpacing={lSpacing}
              items={placedItems}
              setItems={setPlacedItems}
              selectedItemIds={selectedItemIds}
              setSelectedItemIds={memoSetSelectedItemIds}
              snapSettings={memoizedSnapSettings}
              multiTouchMode={multiTouchMode}
            />
          ) : (
            <View style={{ flex: 1, position: "relative" }}>
              <props.PlanPreviewComponent
                lines={previewLines}
                visibility={props.layerVisibility}
                selectedLineId={props.selectedLineId}
                onSelectLine={props.onSelectLine}
                roverPosN={props.previewRoverPoint?.north ?? null}
                roverPosE={props.previewRoverPoint?.east ?? null}
                roverHeadingDeg={props.telemetrySnapshot?.heading_ned_deg ?? null}
              />
            </View>
          )}
        </View>
      </View>
      
      <View style={{ width: "42%", height: "100%", padding: 14, paddingLeft: 0, gap: 12 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ gap: 12 }}>
            <View style={{ borderRadius: 14, padding: 14, backgroundColor: "#0f172a" }}>
              <Text style={{ color: "#94a3b8", fontSize: 11, fontWeight: "800", letterSpacing: 1.2, textTransform: "uppercase" }}>
                Templates
              </Text>
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "900", marginTop: 5 }}>
                {boundaryMode ? "Boundary Mode" : "Generator"}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
                 <Text style={{ color: "#cbd5e1", fontSize: 13, fontWeight: "700" }}>Use Boundary Concept</Text>
                 <Switch value={boundaryMode} onValueChange={setBoundaryMode} trackColor={{ false: "#334155", true: "#0b6b68" }} thumbColor={"#f8fafc"} />
              </View>
            </View>

            {boundaryMode && (
              <View style={{ borderRadius: 14, padding: 14, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#d8e1eb", gap: 12 }}>
                <Text style={{ color: "#64748b", fontSize: 11, fontWeight: "800", letterSpacing: 1, textTransform: "uppercase" }}>Boundary Settings</Text>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#475569", fontSize: 12, marginBottom: 4 }}>Width (m)</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 8, color: "#0f172a" }} value={boundaryWidthStr} onChangeText={setBoundaryWidthStr} keyboardType="numeric" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#475569", fontSize: 12, marginBottom: 4 }}>Height (m)</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 8, color: "#0f172a" }} value={boundaryHeightStr} onChangeText={setBoundaryHeightStr} keyboardType="numeric" />
                  </View>
                </View>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#475569", fontSize: 12, marginBottom: 4 }}>Indent Spacing</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 8, color: "#0f172a" }} value={indentSpacingStr} onChangeText={setIndentSpacingStr} keyboardType="numeric" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#475569", fontSize: 12, marginBottom: 4 }}>Letter Spacing (cm)</Text>
                    <TextInput style={{ borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 8, color: "#0f172a" }} value={letterSpacingStr} onChangeText={setLetterSpacingStr} keyboardType="numeric" />
                  </View>
                </View>

                <Text style={{ color: "#64748b", fontSize: 11, fontWeight: "800", letterSpacing: 1, textTransform: "uppercase", marginTop: 8 }}>Object Snapping</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                  <Pressable onPress={() => setSnapCenter(!snapCenter)} style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: snapCenter ? "#0b6b68" : "#f1f5f9" }}><Text style={{ color: snapCenter ? "#fff" : "#475569", fontSize: 12, fontWeight: "700" }}>Center</Text></Pressable>
                  <Pressable onPress={() => setSnapCorners(!snapCorners)} style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: snapCorners ? "#0b6b68" : "#f1f5f9" }}><Text style={{ color: snapCorners ? "#fff" : "#475569", fontSize: 12, fontWeight: "700" }}>Corners</Text></Pressable>
                  <Pressable onPress={() => setSnapAngles(!snapAngles)} style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: snapAngles ? "#0b6b68" : "#f1f5f9" }}><Text style={{ color: snapAngles ? "#fff" : "#475569", fontSize: 12, fontWeight: "700" }}>Angles</Text></Pressable>
                </View>
                
                {hasBoundaryChanges && (
                  <Pressable
                    onPress={handleApplyBoundary}
                    style={{
                      height: 44,
                      borderRadius: 10,
                      backgroundColor: "#0f988f",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 6,
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 14, fontWeight: "800" }}>
                      Apply Boundary Changes
                    </Text>
                  </Pressable>
                )}
              </View>
            )}

            <View style={{ borderRadius: 14, padding: 14, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#d8e1eb" }}>
              <Text style={{ color: "#64748b", fontSize: 11, fontWeight: "800", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
                Category
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                {(["shapes", "alphabets", "numbers", "road_signs", "sports_fields"] as const).map((c) => (
                  <Pressable
                    key={c}
                    onPress={() => setCategory(c)}
                    style={{
                      flexBasis: c === "sports_fields" ? "100%" : "47%",
                      padding: 8,
                      borderRadius: 12,
                      backgroundColor: category === c ? "#0b6b68" : "#f8fafc",
                      borderWidth: 1,
                      borderColor: category === c ? "#0b6b68" : "#e2e8f0",
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ color: category === c ? "#fff" : "#0f172a", fontSize: 13, fontWeight: "800", textTransform: "capitalize" }}>
                      {c.replace("_", " ")}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {category === "sports_fields" && (
              <View style={{ borderRadius: 14, padding: 14, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#d8e1eb" }}>
                <Text style={{ color: "#64748b", fontSize: 11, fontWeight: "800", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
                  Sports Fields
                </Text>
                <Text style={{ color: "#94a3b8", fontSize: 13, textAlign: "center" }}>Empty</Text>
              </View>
            )}

            {(category === "alphabets" || category === "numbers") && (
              <View style={{ borderRadius: 14, padding: 14, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#d8e1eb" }}>
                <Text style={{ color: "#64748b", fontSize: 11, fontWeight: "800", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
                  Font Style
                </Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  {(["smooth"] as FontStyle[]).map((f) => (
                    <Pressable
                      key={f}
                      onPress={() => setFontStyle(f)}
                      style={{
                        flex: 1,
                        padding: 12,
                        borderRadius: 12,
                        backgroundColor: fontStyle === f ? "#0f172a" : "#f8fafc",
                        borderWidth: 1,
                        borderColor: fontStyle === f ? "#0f172a" : "#e2e8f0",
                        alignItems: "center"
                      }}
                    >
                      <Text style={{ color: fontStyle === f ? "#fff" : "#0f172a", fontSize: 14, fontWeight: "800", textTransform: "capitalize" }}>
                        {f}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}

            <View style={{ borderRadius: 14, padding: 14, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#d8e1eb" }}>
              <Text style={{ color: "#64748b", fontSize: 11, fontWeight: "800", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
                Selection
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                  {category === "shapes" && ([] as ShapeType[]).concat(["square", "circle", "triangle"]).map((s) => (
                    <Pressable
                      key={s}
                      onPress={() => setShape(s)}
                      style={{
                        width: "30%",
                        padding: 12,
                        borderRadius: 12,
                        backgroundColor: shape === s ? "#0b6b68" : "#f8fafc",
                        borderWidth: 1,
                        borderColor: shape === s ? "#0b6b68" : "#e2e8f0",
                        alignItems: "center"
                      }}
                    >
                      <Text style={{ color: shape === s ? "#fff" : "#0f172a", fontSize: 13, fontWeight: "800", textTransform: "capitalize" }}>
                        {s}
                      </Text>
                    </Pressable>
                  ))}

                  {category === "alphabets" && Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((l) => (
                    <Pressable
                      key={l}
                      onPress={() => setSelectedLetter(l as AlphabetType)}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        backgroundColor: selectedLetter === l ? "#0b6b68" : "#f8fafc",
                        borderWidth: 1,
                        borderColor: selectedLetter === l ? "#0b6b68" : "#e2e8f0",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Text style={{ color: selectedLetter === l ? "#fff" : "#0f172a", fontSize: 18, fontWeight: "800" }}>
                        {l}
                      </Text>
                    </Pressable>
                  ))}

                  {category === "numbers" && Array.from("0123456789").map((n) => (
                    <Pressable
                      key={n}
                      onPress={() => setSelectedDigit(n as NumberType)}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 12,
                        backgroundColor: selectedDigit === n ? "#0b6b68" : "#f8fafc",
                        borderWidth: 1,
                        borderColor: selectedDigit === n ? "#0b6b68" : "#e2e8f0",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Text style={{ color: selectedDigit === n ? "#fff" : "#0f172a", fontSize: 20, fontWeight: "800" }}>
                        {n}
                      </Text>
                    </Pressable>
                  ))}

                  {category === "road_signs" && (Object.keys(ROAD_SIGN_LABELS) as RoadSignType[]).map((s) => (
                    <Pressable
                      key={s}
                      onPress={() => setSelectedSign(s)}
                      style={{
                        flexBasis: "31%",
                        padding: 12,
                        borderRadius: 12,
                        backgroundColor: selectedSign === s ? "#0f172a" : "#f1f5f9",
                        borderWidth: 1,
                        borderColor: selectedSign === s ? "#0f172a" : "#e2e8f0",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: selectedSign === s ? "#ffffff" : "#475569", fontSize: 13, fontWeight: "700", textAlign: "center" }}>
                        {ROAD_SIGN_LABELS[s]}
                      </Text>
                    </Pressable>
                  ))}
              </View>

              {category === "shapes" && shape === "circle" && (
                <View style={{ marginTop: 20 }}>
                  <Text style={{ color: "#64748b", fontSize: 11, fontWeight: "800", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
                    Arc Type
                  </Text>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    {([] as ArcType[]).concat(["quarter", "half", "full"]).map((a) => (
                      <Pressable
                        key={a}
                        onPress={() => setArcType(a)}
                        style={{
                          flex: 1,
                          padding: 12,
                          borderRadius: 12,
                          backgroundColor: arcType === a ? "#0b6b68" : "#f8fafc",
                          borderWidth: 1,
                          borderColor: arcType === a ? "#0b6b68" : "#e2e8f0",
                          alignItems: "center"
                        }}
                      >
                        <Text style={{ color: arcType === a ? "#fff" : "#0f172a", fontSize: 14, fontWeight: "800", textTransform: "capitalize" }}>
                          {a === "full" ? "Full" : a === "half" ? "Half" : "Quarter"}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              )}

              <View style={{ marginTop: 20 }}>
                <Text style={{ color: "#64748b", fontSize: 11, fontWeight: "800", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
                  Size (Scale)
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Slider
                      style={{ width: "100%", height: 40 }}
                      minimumValue={0.5}
                      maximumValue={3.0}
                      step={0.1}
                      value={parsedSize}
                      onValueChange={(val) => setSizeInput(val.toFixed(2))}
                      minimumTrackTintColor="#0f988f"
                      maximumTrackTintColor="#cbd5e1"
                      thumbTintColor="#0f172a"
                    />
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#f8fafc", borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, paddingHorizontal: 10 }}>
                    <TextInput
                      value={sizeInput}
                      onChangeText={setSizeInput}
                      keyboardType="numeric"
                      style={{ width: 44, height: 40, color: "#0f172a", fontSize: 14, fontWeight: "700", textAlign: "right" }}
                    />
                    <Text style={{ color: "#64748b", fontSize: 14, fontWeight: "700", marginLeft: 2 }}>m</Text>
                  </View>
                </View>
                <Text style={{ color: "#64748b", fontSize: 11, marginTop: 4 }}>
                  {category === "shapes" ? (shape === "circle" ? "Diameter in meters" : shape === "square" ? "Side length in meters" : "Height in meters") : "Height in meters"}
                </Text>
              </View>
            </View>

            {boundaryMode && selectedItemIds.length > 0 && placedItems.find(p => selectedItemIds.includes(p.id))?.groupId && (
              <View style={{ flexDirection: "row", gap: 8, marginVertical: 8, justifyContent: "center" }}>
                <Pressable
                  onPress={() => setMultiTouchMode(multiTouchMode === "scale" ? "both" : "scale")}
                  style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, backgroundColor: multiTouchMode === "scale" ? "#0ea5e9" : "#f1f5f9", borderWidth: 1, borderColor: "#cbd5e1" }}
                >
                  <Text style={{ color: multiTouchMode === "scale" ? "#fff" : "#475569", fontWeight: "700", fontSize: 12 }}>Scale Only</Text>
                </Pressable>
                <Pressable
                  onPress={() => setMultiTouchMode(multiTouchMode === "rotate" ? "both" : "rotate")}
                  style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, backgroundColor: multiTouchMode === "rotate" ? "#0ea5e9" : "#f1f5f9", borderWidth: 1, borderColor: "#cbd5e1" }}
                >
                  <Text style={{ color: multiTouchMode === "rotate" ? "#fff" : "#475569", fontWeight: "700", fontSize: 12 }}>Rotate Only</Text>
                </Pressable>
              </View>
            )}

            {boundaryMode && selectedItemIds.length > 0 && selectedItemIds.filter(id => id !== "boundary").length > 0 && (
              <View style={{ borderRadius: 14, padding: 14, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#d8e1eb", gap: 8 }}>
                <Text style={{ color: "#64748b", fontSize: 11, fontWeight: "800", letterSpacing: 1, textTransform: "uppercase" }}>
                  Transform Selected
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Text style={{ color: "#475569", fontSize: 12, fontWeight: "600", width: 50 }}>Scale:</Text>
                  <TextInput
                    style={{ flex: 1, borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 6, color: "#0f172a" }}
                    value={itemScaleStr}
                    onChangeText={setItemScaleStr}
                    keyboardType="numeric"
                  />
                  <Pressable
                    onPress={handleApplyScale}
                    style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8, backgroundColor: "#0b6b68" }}
                  >
                    <Text style={{ color: "#fff", fontSize: 12, fontWeight: "700" }}>Apply</Text>
                  </Pressable>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Text style={{ color: "#475569", fontSize: 12, fontWeight: "600", width: 50 }}>Angle:</Text>
                  <TextInput
                    style={{ flex: 1, borderWidth: 1, borderColor: "#cbd5e1", borderRadius: 8, padding: 6, color: "#0f172a" }}
                    value={itemRotationStr}
                    onChangeText={setItemRotationStr}
                    keyboardType="numeric"
                  />
                  <Pressable
                    onPress={handleApplyRotation}
                    style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8, backgroundColor: "#6366f1" }}
                  >
                    <Text style={{ color: "#fff", fontSize: 12, fontWeight: "700" }}>Apply</Text>
                  </Pressable>
                </View>
              </View>
            )}

            {boundaryMode && (
              <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
                <Pressable
                  onPress={handleAddToBoundary}
                  style={{ flex: 1, minWidth: 100, height: 48, borderRadius: 12, backgroundColor: "#0ea5e9", alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={{ color: "#fff", fontSize: 14, fontWeight: "800" }}>+ Add</Text>
                </Pressable>
                
                {placedItems.length > 1 && (
                  <Pressable
                    onPress={handleAutoArrange}
                    style={{ height: 48, paddingHorizontal: 16, borderRadius: 12, backgroundColor: "#2563eb", alignItems: "center", justifyContent: "center" }}
                  >
                    <Text style={{ color: "#fff", fontSize: 14, fontWeight: "800" }}>Arrange</Text>
                  </Pressable>
                )}
                
                {selectedItemIds.length > 1 && (
                  <Pressable
                    onPress={handleGroupItems}
                    style={{ height: 48, paddingHorizontal: 16, borderRadius: 12, backgroundColor: "#6366f1", alignItems: "center", justifyContent: "center" }}
                  >
                    <Text style={{ color: "#fff", fontSize: 14, fontWeight: "800" }}>Group</Text>
                  </Pressable>
                )}
                
                {selectedItemIds.length > 0 && placedItems.find(p => selectedItemIds.includes(p.id))?.groupId && (
                  <Pressable
                    onPress={handleUngroupItems}
                    style={{ height: 48, paddingHorizontal: 16, borderRadius: 12, backgroundColor: "#f59e0b", alignItems: "center", justifyContent: "center" }}
                  >
                    <Text style={{ color: "#fff", fontSize: 14, fontWeight: "800" }}>Ungroup</Text>
                  </Pressable>
                )}
                
                {selectedItemIds.length > 0 && (
                  <Pressable
                    onPress={handleDeleteItem}
                    style={{ height: 48, paddingHorizontal: 16, borderRadius: 12, backgroundColor: "#ef4444", alignItems: "center", justifyContent: "center" }}
                  >
                    <Text style={{ color: "#fff", fontSize: 14, fontWeight: "800" }}>Delete</Text>
                  </Pressable>
                )}
              </View>
            )}

            <Pressable
              onPress={handleParse}
              disabled={isParsing || (boundaryMode ? placedItems.length === 0 : previewLines.length === 0)}
              style={{
                height: 52,
                borderRadius: 14,
                backgroundColor: isParsing || (boundaryMode ? placedItems.length === 0 : previewLines.length === 0) ? "#94a3b8" : "#0f988f",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
                marginBottom: 20
              }}
            >
              <Text style={{ color: "#fff", fontSize: 15, fontWeight: "800" }}>
                {isParsing ? "Parsing..." : "Parse & Send to Alignment"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
