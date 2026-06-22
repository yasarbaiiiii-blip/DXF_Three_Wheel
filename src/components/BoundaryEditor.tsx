import React, { useState, useMemo, useRef, useEffect, memo } from "react";
import { View, Text, Pressable, PanResponder, Switch, LayoutChangeEvent } from "react-native";
import Svg, { Path, G, Line, Rect } from "react-native-svg";
import type { PlanLine } from "../types/plan";

export interface PlacedItem {
  id: string;
  lines: PlanLine[];
  x: number;
  y: number;
  rotation: number;
  scale: number;
  groupId?: string;
  width: number;
  height: number;
}

export interface BoundaryEditorProps {
  boundaryWidth: number;
  boundaryHeight: number;
  indentSpacing: number;
  letterSpacing: number;
  items: PlacedItem[];
  setItems: React.Dispatch<React.SetStateAction<PlacedItem[]>>;
  selectedItemIds: string[];
  setSelectedItemIds: (ids: string[]) => void;
  snapSettings: { center: boolean; corners: boolean; angles: boolean };
  multiTouchMode: "both" | "scale" | "rotate";
}

export const BoundaryEditor = memo(function BoundaryEditor({
  boundaryWidth,
  boundaryHeight,
  indentSpacing,
  letterSpacing,
  items,
  setItems,
  selectedItemIds,
  setSelectedItemIds,
  snapSettings,
  multiTouchMode,
}: BoundaryEditorProps) {
  const METER_TO_PX = 100;

  const [snapLines, setSnapLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
  const [svgSize, setSvgSize] = useState({ width: 400, height: 400 }); // fallback for initial taps
  const [camera, setCamera] = useState({ x: 0, y: 0, zoom: 1 });

  const [lockPanDrag, setLockPanDrag] = useState(false);
  const [lockZoom, setLockZoom] = useState(false);

  const lockPanDragRef = useRef(lockPanDrag);
  useEffect(() => { lockPanDragRef.current = lockPanDrag; }, [lockPanDrag]);

  const lockZoomRef = useRef(lockZoom);
  useEffect(() => { lockZoomRef.current = lockZoom; }, [lockZoom]);

  const itemsRef = useRef(items);
  useEffect(() => { itemsRef.current = items; }, [items]);

  const selectedItemIdsRef = useRef(selectedItemIds);
  useEffect(() => { selectedItemIdsRef.current = selectedItemIds; }, [selectedItemIds]);

  const boundaryWidthRef = useRef(boundaryWidth);
  useEffect(() => { boundaryWidthRef.current = boundaryWidth; }, [boundaryWidth]);

  const boundaryHeightRef = useRef(boundaryHeight);
  useEffect(() => { boundaryHeightRef.current = boundaryHeight; }, [boundaryHeight]);

  const indentSpacingRef = useRef(indentSpacing);
  useEffect(() => { indentSpacingRef.current = indentSpacing; }, [indentSpacing]);

  const letterSpacingRef = useRef(letterSpacing);
  useEffect(() => { letterSpacingRef.current = letterSpacing; }, [letterSpacing]);

  const cameraRef = useRef(camera);
  useEffect(() => { cameraRef.current = camera; }, [camera]);
  
  const multiTouchModeRef = useRef(multiTouchMode);
  useEffect(() => { multiTouchModeRef.current = multiTouchMode; }, [multiTouchMode]);
  useEffect(() => { letterSpacingRef.current = letterSpacing; }, [letterSpacing]);

  const snapSettingsRef = useRef(snapSettings);
  useEffect(() => { snapSettingsRef.current = snapSettings; }, [snapSettings]);

  const setItemsRef = useRef(setItems);
  useEffect(() => { setItemsRef.current = setItems; }, [setItems]);

  const setSelectedItemIdsRef = useRef(setSelectedItemIds);
  useEffect(() => { setSelectedItemIdsRef.current = setSelectedItemIds; }, [setSelectedItemIds]);

  const setSnapLinesRef = useRef(setSnapLines);
  useEffect(() => { setSnapLinesRef.current = setSnapLines; }, [setSnapLines]);

  const svgSizeRef = useRef({ width: 0, height: 0 });
  useEffect(() => { svgSizeRef.current = svgSize; }, [svgSize]);

  type StartPosition = { id: string; x: number; y: number; width: number; height: number; rotation: number; scale: number; lines: PlanLine[] };
  const activeDragRef = useRef<{ 
    type: "items" | "camera";
    ids?: string[]; 
    startPositions?: StartPosition[];
    startCamera?: { x: number; y: number; zoom: number };
    pinchState?: { initialDist: number; initialAngle: number; startPos?: StartPosition[]; startCamera?: { x: number; y: number; zoom: number } };
  } | null>(null);

  const hitTest = (locationX: number, locationY: number) => {
    const bw = boundaryWidthRef.current;
    const bh = boundaryHeightRef.current;
    const sz = svgSizeRef.current;
    const cam = cameraRef.current;
    if (sz.width <= 0 || sz.height <= 0) return null;
    
    const viewBoxWidth = (bw * METER_TO_PX) / cam.zoom;
    const viewBoxHeight = (bh * METER_TO_PX) / cam.zoom;
    const viewBoxX = -viewBoxWidth / 2 - cam.x * METER_TO_PX;
    const viewBoxY = -viewBoxHeight / 2 + cam.y * METER_TO_PX;
    
    const scaleX = viewBoxWidth / sz.width;
    const scaleY = viewBoxHeight / sz.height;
    
    const svgTapX = locationX * scaleX + viewBoxX;
    const svgTapY = locationY * scaleY + viewBoxY;
    
    const screenToSvg = (scaleX + scaleY) / 2;
    const itemScaleScreen = cam.zoom < 0.5 ? 50 : 30;
    const toleranceLineSvgSq = (itemScaleScreen * screenToSvg) ** 2; 

    // Keep track of candidates
    let bestLineId: string | null = null;
    let bestLineArea = Infinity;
    let bestLineDistSq = toleranceLineSvgSq;

    const distToSegmentSquared = (px: number, py: number, vx: number, vy: number, wx: number, wy: number) => {
      const l2 = (vx - wx) ** 2 + (vy - wy) ** 2;
      if (l2 === 0) return (px - vx) ** 2 + (py - vy) ** 2;
      let t = ((px - vx) * (wx - vx) + (py - vy) * (wy - vy)) / l2;
      t = Math.max(0, Math.min(1, t));
      return (px - (vx + t * (wx - vx))) ** 2 + (py - (vy + t * (wy - vy))) ** 2;
    };

    // 1. Check boundary lines
    const bx1 = -bw * METER_TO_PX / 2;
    const by1 = -bh * METER_TO_PX / 2;
    const bx2 = bw * METER_TO_PX / 2;
    const by2 = bh * METER_TO_PX / 2;
    const dTop = distToSegmentSquared(svgTapX, svgTapY, bx1, by1, bx2, by1);
    const dBot = distToSegmentSquared(svgTapX, svgTapY, bx1, by2, bx2, by2);
    const dLeft = distToSegmentSquared(svgTapX, svgTapY, bx1, by1, bx1, by2);
    const dRight = distToSegmentSquared(svgTapX, svgTapY, bx2, by1, bx2, by2);
    const minBoundaryDist = Math.min(dTop, dBot, dLeft, dRight);
    if (minBoundaryDist < toleranceLineSvgSq) {
      bestLineId = "boundary";
      bestLineArea = 999999; // Huge area so that actual item line hits are preferred over boundary
      bestLineDistSq = minBoundaryDist;
    }
    
    let bestBoxId: string | null = null;
    let bestBoxArea = Infinity;

    itemsRef.current.forEach(item => {
      const dx = svgTapX - (item.x * METER_TO_PX);
      const dy = svgTapY - (-item.y * METER_TO_PX);
      const rad = -item.rotation * Math.PI / 180;
      const localTapX = dx * Math.cos(rad) - dy * Math.sin(rad);
      const localTapY = dx * Math.sin(rad) + dy * Math.cos(rad);
      
      const itemArea = item.width * item.height;

      // Check line hits (precise)
      let minItemLineDistSq = Infinity;
      for (const l of item.lines) {
         const x1 = l.from.y * METER_TO_PX;
         const y1 = -l.from.x * METER_TO_PX;
         const x2 = l.to.y * METER_TO_PX;
         const y2 = -l.to.x * METER_TO_PX;
         const d2 = distToSegmentSquared(localTapX, localTapY, x1, y1, x2, y2);
         if (d2 < minItemLineDistSq) {
            minItemLineDistSq = d2;
         }
      }

      if (minItemLineDistSq < toleranceLineSvgSq) {
         if (itemArea < bestLineArea) {
            bestLineArea = itemArea;
            bestLineId = item.id;
            bestLineDistSq = minItemLineDistSq;
         }
      }

      // 2. Bounding Box check (with tolerance scaled to SVG)
      const toleranceBoxSvg = 30 * screenToSvg;
      const halfW = (item.height * METER_TO_PX) / 2 + toleranceBoxSvg;
      const halfH = (item.width * METER_TO_PX) / 2 + toleranceBoxSvg;
      if (Math.abs(localTapX) <= halfW && Math.abs(localTapY) <= halfH) {
         if (itemArea < bestBoxArea) {
            bestBoxArea = itemArea;
            bestBoxId = item.id;
         }
      }
    });

    return bestLineId || bestBoxId;
  };

  const panResponder = useMemo(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const hitId = hitTest(evt.nativeEvent.locationX, evt.nativeEvent.locationY);
        
        if (hitId && hitId !== "boundary" && selectedItemIdsRef.current.includes(hitId)) {
           const starts = selectedItemIdsRef.current.map(id => {
             const it = itemsRef.current.find(i => i.id === id);
             return { id, x: it?.x || 0, y: it?.y || 0, width: it?.width || 0, height: it?.height || 0, rotation: it?.rotation || 0, scale: it?.scale || 1, lines: it?.lines || [] };
           });
           activeDragRef.current = { type: "items", ids: selectedItemIdsRef.current, startPositions: starts };
        } else {
           activeDragRef.current = { type: "camera", startCamera: cameraRef.current };
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        const dragData = activeDragRef.current;
        if (!dragData) return;
        
        const touches = evt.nativeEvent.touches;
        if (touches.length >= 2) {
           const t1 = touches[0];
           const t2 = touches[1];
           const currentDist = Math.hypot(t2.pageX - t1.pageX, t2.pageY - t1.pageY);
           const currentAngle = Math.atan2(t2.pageY - t1.pageY, t2.pageX - t1.pageX) * (180 / Math.PI);
           
           if (!dragData.pinchState) {
               if (dragData.type === "camera") {
                   dragData.pinchState = { initialDist: currentDist, initialAngle: currentAngle, startCamera: cameraRef.current };
               } else {
                   const starts = dragData.ids!.map(id => {
                     const it = itemsRef.current.find(i => i.id === id);
                     return { id, x: it?.x || 0, y: it?.y || 0, width: it?.width || 0, height: it?.height || 0, rotation: it?.rotation || 0, scale: it?.scale || 1, lines: it?.lines || [] };
                   });
                   dragData.pinchState = { initialDist: currentDist, initialAngle: currentAngle, startPos: starts };
               }
           }
           
            if (dragData.type === "camera") {
                if (lockZoomRef.current) return;
                const initialDist = dragData.pinchState.initialDist;
                if (initialDist === 0) return;
                const scaleMultiplier = currentDist / initialDist;
                setCamera({
                   ...dragData.pinchState.startCamera!,
                   zoom: Math.max(0.01, Math.min(10, dragData.pinchState.startCamera!.zoom * scaleMultiplier))
                });
                return;
            }
            
            if (lockPanDragRef.current) return;
           
           const initialDist = dragData.pinchState.initialDist;
           const initialAngle = dragData.pinchState.initialAngle;
           const scaleMultiplier = initialDist === 0 ? 1 : currentDist / initialDist;
           const angleDelta = currentAngle - initialAngle;
           
           const mode = multiTouchModeRef.current;
           const appliedScale = mode === "rotate" ? 1 : Math.max(0.1, scaleMultiplier);
           const appliedRot = mode === "scale" ? 0 : angleDelta;
           
           const starts = dragData.pinchState.startPos!;
           let cX = 0, cY = 0;
           if (starts.length > 0) {
              starts.forEach(p => { cX += p.x; cY += p.y; });
              cX /= starts.length;
              cY /= starts.length;
           }
           
           const rad = -(appliedRot) * Math.PI / 180;
           const cosA = Math.cos(rad);
           const sinA = Math.sin(rad);
           
           const leftBoundary = -boundaryWidthRef.current / 2 + indentSpacingRef.current;
           const rightBoundary = boundaryWidthRef.current / 2 - indentSpacingRef.current;
           const topBoundary = -boundaryHeightRef.current / 2 + indentSpacingRef.current;
           const bottomBoundary = boundaryHeightRef.current / 2 - indentSpacingRef.current;
           
           setItemsRef.current(prev => prev.map(item => {
              const startP = starts.find(p => p.id === item.id);
              if (startP) {
                 const dx = startP.x - cX;
                 const dy = startP.y - cY;
                 const sdx = dx * appliedScale;
                 const sdy = dy * appliedScale;
                 
                 let newX = cX + sdx * cosA - sdy * sinA;
                 let newY = cY + sdx * sinA + sdy * cosA;
                 
                 const newW = startP.width * appliedScale;
                 const newH = startP.height * appliedScale;
                 
                 newX = Math.max(leftBoundary + newW / 2, Math.min(newX, rightBoundary - newW / 2));
                 newY = Math.max(topBoundary + newH / 2, Math.min(newY, bottomBoundary - newH / 2));
                 
                 return {
                    ...item,
                    rotation: (startP.rotation + appliedRot) % 360,
                    scale: startP.scale * appliedScale,
                    width: newW,
                    height: newH,
                    x: newX,
                    y: newY,
                    lines: startP.lines.map(l => ({
                        ...l,
                        from: { ...l.from, x: l.from.x * appliedScale, y: l.from.y * appliedScale },
                        to: { ...l.to, x: l.to.x * appliedScale, y: l.to.y * appliedScale },
                    }))
                 };
              }
              return item;
           }));
           return;
        } else {
           if (dragData.pinchState) {
               dragData.pinchState = undefined;
               if (dragData.type === "camera") {
                   dragData.startCamera = cameraRef.current;
               }
           }
        }

        const zoom = cameraRef.current.zoom;
        const sz = svgSizeRef.current;
        const screenW = sz.width > 0 ? sz.width : 400;
        const screenH = sz.height > 0 ? sz.height : 400;
        const bwVal = boundaryWidthRef.current;
        const bhVal = boundaryHeightRef.current;

        const dx = gestureState.dx * (bwVal / (screenW * zoom));
        const dy = -gestureState.dy * (bhVal / (screenH * zoom));

         if (dragData.type === "camera") {
            if (lockPanDragRef.current) return;
            const camDx = -gestureState.dx * (bwVal / (screenW * zoom));
            const camDy = gestureState.dy * (bhVal / (screenH * zoom));
            setCamera({
               ...dragData.startCamera!,
               x: dragData.startCamera!.x + camDx,
               y: dragData.startCamera!.y + camDy
            });
            return;
         }

         if (lockPanDragRef.current) return;

        const bw = boundaryWidthRef.current;
        const bh = boundaryHeightRef.current;
        const indent = indentSpacingRef.current;
        const snaps = snapSettingsRef.current;

        let newSnapLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
        const updates: Record<string, {x: number, y: number}> = {};

        dragData.startPositions!.forEach(start => {
          let newX = start.x + dx;
          let newY = start.y + dy;

          const leftIndent = -bw / 2 + indent;
          const rightIndent = bw / 2 - indent;
          const topIndent = -bh / 2 + indent;
          const bottomIndent = bh / 2 - indent;
          const halfW = start.width / 2;
          const halfH = start.height / 2;

          if (snaps.corners) {
            if (Math.abs(newX - halfW - leftIndent) < 0.1) { newX = leftIndent + halfW; newSnapLines.push({x1: leftIndent, y1: -bh, x2: leftIndent, y2: bh}); }
            if (Math.abs(newX + halfW - rightIndent) < 0.1) { newX = rightIndent - halfW; newSnapLines.push({x1: rightIndent, y1: -bh, x2: rightIndent, y2: bh}); }
            if (Math.abs(newY - halfH - topIndent) < 0.1) { newY = topIndent + halfH; newSnapLines.push({x1: -bw, y1: topIndent, x2: bw, y2: topIndent}); }
            if (Math.abs(newY + halfH - bottomIndent) < 0.1) { newY = bottomIndent - halfH; newSnapLines.push({x1: -bw, y1: bottomIndent, x2: bw, y2: bottomIndent}); }
          }
          
          newX = Math.max(leftIndent + halfW, Math.min(newX, rightIndent - halfW));
          newY = Math.max(topIndent + halfH, Math.min(newY, bottomIndent - halfH));

          updates[start.id] = {x: newX, y: newY};
        });
        
        setSnapLinesRef.current(newSnapLines);
        setItemsRef.current(prev => prev.map(item => updates[item.id] ? { ...item, x: updates[item.id].x, y: updates[item.id].y } : item));
      },
      onPanResponderRelease: (evt, gestureState) => {
        activeDragRef.current = null;
        setSnapLinesRef.current([]);
        
        if (Math.abs(gestureState.dx) < 3 && Math.abs(gestureState.dy) < 3) {
          const touch = evt.nativeEvent;
          const nearestId = hitTest(touch.locationX, touch.locationY);
          
          if (nearestId) {
            const currentSelected = selectedItemIdsRef.current;
            const tappedItem = itemsRef.current.find(i => i.id === nearestId);
            
            if (tappedItem?.groupId) {
              const groupItemIds = itemsRef.current
                .filter(i => i.groupId === tappedItem.groupId)
                .map(i => i.id);
              
              if (currentSelected.length > 0 && currentSelected.every(id => groupItemIds.includes(id))) {
                setSelectedItemIdsRef.current([]);
              } else {
                setSelectedItemIdsRef.current(groupItemIds);
              }
            } else {
              if (currentSelected.includes(nearestId)) {
                setSelectedItemIdsRef.current(currentSelected.filter(id => id !== nearestId));
              } else {
                setSelectedItemIdsRef.current([...currentSelected, nearestId]);
              }
            }
          } else {
            setSelectedItemIdsRef.current([]);
          }
        }
      },
      onPanResponderTerminate: () => {
        activeDragRef.current = null;
        setSnapLinesRef.current([]);
      }
    }),
    []
  );

  return (
    <View 
      style={{ flex: 1, backgroundColor: "#f8fafc", overflow: "hidden", position: "relative" }} 
      {...panResponder.panHandlers}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        if (width > 0 && height > 0) setSvgSize({ width, height });
      }}
    >
      <Svg style={{ width: "100%", height: "100%" }} viewBox={`${-boundaryWidth * METER_TO_PX / (2 * camera.zoom) - camera.x * METER_TO_PX} ${-boundaryHeight * METER_TO_PX / (2 * camera.zoom) + camera.y * METER_TO_PX} ${boundaryWidth * METER_TO_PX / camera.zoom} ${boundaryHeight * METER_TO_PX / camera.zoom}`}>
        {/* Draw Boundary Box (Outer area filled with light gray) */}
        <Rect
          x={-boundaryWidth * METER_TO_PX / 2}
          y={-boundaryHeight * METER_TO_PX / 2}
          width={boundaryWidth * METER_TO_PX}
          height={boundaryHeight * METER_TO_PX}
          fill="#f1f5f9"
          stroke={selectedItemIds.includes("boundary") ? "#ef4444" : "#0f172a"}
          strokeWidth={selectedItemIds.includes("boundary") ? 4 / camera.zoom : 3 / camera.zoom}
          strokeLinejoin="round"
        />

        {/* Draw Indent Spacing Bounds (Inner canvas filled with white) */}
        {indentSpacing >= 0 && (
           <Rect
             x={-(boundaryWidth / 2 - indentSpacing) * METER_TO_PX}
             y={-(boundaryHeight / 2 - indentSpacing) * METER_TO_PX}
             width={(boundaryWidth - indentSpacing * 2) * METER_TO_PX}
             height={(boundaryHeight - indentSpacing * 2) * METER_TO_PX}
             fill="#ffffff"
           />
        )}

        {/* Draw Snap Lines */}
        {snapLines.map((line, i) => (
           <Line
             key={`snap-${i}`}
             x1={line.x1 * METER_TO_PX}
             y1={line.y1 * METER_TO_PX}
             x2={line.x2 * METER_TO_PX}
             y2={line.y2 * METER_TO_PX}
             stroke="#ef4444"
             strokeWidth={1.5 / camera.zoom}
           />
        ))}

        {/* Draw Items */}
        {items.map(item => {
          const isSelected = selectedItemIds.includes(item.id);
          const totalDim = Math.max(item.width || 0, item.height || 0) * item.scale;
          const sizeScale = totalDim > 0 ? Math.sqrt(totalDim) : 1;
          
          return (
            <G 
              key={item.id} 
              transform={`translate(${item.x * METER_TO_PX}, ${-item.y * METER_TO_PX}) rotate(${item.rotation})`}
            >
               {/* Item SVG Lines - Y NEGATED for world coords */}
               {item.lines.map((l, i) => (
                  <Line
                    key={`${item.id}-l-${i}`}
                    x1={l.from.y * METER_TO_PX}
                    y1={-l.from.x * METER_TO_PX}
                    x2={l.to.y * METER_TO_PX}
                    y2={-l.to.x * METER_TO_PX}
                    stroke={isSelected ? "#ef4444" : "#0f172a"}
                    strokeWidth={isSelected ? (3 * sizeScale) / camera.zoom : (2 * sizeScale) / camera.zoom}
                  />
               ))}
            </G>
          );
        })}
      </Svg>

      {/* Floating Control Panel for Lock Toggles */}
      <View style={{
        position: "absolute",
        top: 16,
        left: 16,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        shadowColor: "#0f172a",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 1,
        borderColor: "rgba(226, 232, 240, 0.8)",
        flexDirection: "column",
        gap: 8,
      }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: 155 }}>
          <Text style={{ fontSize: 13, fontWeight: "600", color: "#334155" }}>Lock Pan/Drag</Text>
          <Switch
            value={lockPanDrag}
            onValueChange={setLockPanDrag}
            trackColor={{ false: "#cbd5e1", true: "#3b82f6" }}
            thumbColor="#ffffff"
            ios_backgroundColor="#cbd5e1"
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: 155 }}>
          <Text style={{ fontSize: 13, fontWeight: "600", color: "#334155" }}>Lock Zoom</Text>
          <Switch
            value={lockZoom}
            onValueChange={setLockZoom}
            trackColor={{ false: "#cbd5e1", true: "#3b82f6" }}
            thumbColor="#ffffff"
            ios_backgroundColor="#cbd5e1"
          />
        </View>
      </View>
    </View>
  );
});
