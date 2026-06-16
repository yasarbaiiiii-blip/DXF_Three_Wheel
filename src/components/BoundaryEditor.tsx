import React, { useState, useMemo, useRef, useEffect, memo } from "react";
import { View, Text, Pressable, PanResponder, Switch } from "react-native";
import Svg, { Path, G, Line, Rect } from "react-native-svg";
import type { PlanLine } from "../types/plan";

export interface PlacedItem {
  id: string;
  lines: PlanLine[];
  x: number; // offset center X
  y: number; // offset center Y
  rotation: number;
  groupId?: string; // Group ID for words
  width: number;
  height: number;
}

export interface BoundaryEditorProps {
  boundaryWidth: number;
  boundaryHeight: number;
  indentSpacing: number; // Space from boundary edges
  letterSpacing: number; // Space between items
  items: PlacedItem[];
  setItems: React.Dispatch<React.SetStateAction<PlacedItem[]>>;
  selectedItemIds: string[];
  setSelectedItemIds: (ids: string[]) => void;
  snapSettings: { center: boolean; corners: boolean; angles: boolean };
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
}: BoundaryEditorProps) {
  // A simple grid scale: let's map meters to pixels
  // e.g. 1 meter = 100 pixels
  const METER_TO_PX = 100;

  const [snapLines, setSnapLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);

  // Calculate bounding box of an item in local space
  const getItemBounds = (item: PlacedItem) => {
    return {
      left: item.x - item.width / 2,
      right: item.x + item.width / 2,
      top: item.y - item.height / 2,
      bottom: item.y + item.height / 2,
    };
  };

  // We will build a pan responder for dragging items
  const activeDragRef = useRef<{ ids: string[]; startPositions: { id: string; x: number; y: number; width: number; height: number }[] } | null>(null);
  
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

  const snapSettingsRef = useRef(snapSettings);
  useEffect(() => { snapSettingsRef.current = snapSettings; }, [snapSettings]);

  const setItemsRef = useRef(setItems);
  useEffect(() => { setItemsRef.current = setItems; }, [setItems]);

  const setSelectedItemIdsRef = useRef(setSelectedItemIds);
  useEffect(() => { setSelectedItemIdsRef.current = setSelectedItemIds; }, [setSelectedItemIds]);

  const setSnapLinesRef = useRef(setSnapLines);
  useEffect(() => { setSnapLinesRef.current = setSnapLines; }, [setSnapLines]);

  const panResponder = useMemo(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        if (selectedItemIdsRef.current.length > 0) {
          const starts = selectedItemIdsRef.current.map(id => {
            const it = itemsRef.current.find(i => i.id === id);
            return { id, x: it?.x || 0, y: it?.y || 0, width: it?.width || 0, height: it?.height || 0 };
          });
          activeDragRef.current = { ids: selectedItemIdsRef.current, startPositions: starts };
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        const dragData = activeDragRef.current;
        if (!dragData) return;
        
        const dx = gestureState.dx / METER_TO_PX;
        const dy = gestureState.dy / METER_TO_PX;

        const bw = boundaryWidthRef.current;
        const bh = boundaryHeightRef.current;
        const indent = indentSpacingRef.current;
        const snaps = snapSettingsRef.current;

        let newSnapLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
        const updates: Record<string, {x: number, y: number}> = {};

        dragData.startPositions.forEach(start => {
          let newX = start.x + dx;
          let newY = start.y + dy;

          if (snaps.corners) {
            const leftIndent = -bw / 2 + indent;
            const rightIndent = bw / 2 - indent;
            const topIndent = -bh / 2 + indent;
            const bottomIndent = bh / 2 - indent;
            
            const halfW = start.width / 2;
            const halfH = start.height / 2;

            if (Math.abs(newX - halfW - leftIndent) < 0.1) { newX = leftIndent + halfW; newSnapLines.push({x1: leftIndent, y1: -bh, x2: leftIndent, y2: bh}); }
            if (Math.abs(newX + halfW - rightIndent) < 0.1) { newX = rightIndent - halfW; newSnapLines.push({x1: rightIndent, y1: -bh, x2: rightIndent, y2: bh}); }
            if (Math.abs(newY - halfH - topIndent) < 0.1) { newY = topIndent + halfH; newSnapLines.push({x1: -bw, y1: topIndent, x2: bw, y2: topIndent}); }
            if (Math.abs(newY + halfH - bottomIndent) < 0.1) { newY = bottomIndent - halfH; newSnapLines.push({x1: -bw, y1: bottomIndent, x2: bw, y2: bottomIndent}); }
          }
          updates[start.id] = {x: newX, y: newY};
        });

        setSnapLinesRef.current(newSnapLines);
        
        setItemsRef.current(prev => prev.map(item => {
           if (updates[item.id]) {
             return { ...item, x: updates[item.id].x, y: updates[item.id].y };
           }
           return item;
        }));
      },
      onPanResponderRelease: (evt, gestureState) => {
        activeDragRef.current = null;
        setSnapLinesRef.current([]);
        
        if (Math.abs(gestureState.dx) < 3 && Math.abs(gestureState.dy) < 3) {
          const touch = evt.nativeEvent;
          const tapX = (touch.locationX / METER_TO_PX) - (boundaryWidthRef.current / 2);
          const tapY = (touch.locationY / METER_TO_PX) - (boundaryHeightRef.current / 2);
          
          let nearestId: string | null = null;
          let nearestDist = 0.3; 
          
          itemsRef.current.forEach(item => {
            const halfW = item.width / 2;
            const halfH = item.height / 2;
            if (tapX >= item.x - halfW && tapX <= item.x + halfW && 
                tapY >= item.y - halfH && tapY <= item.y + halfH) {
              const dist = Math.hypot(tapX - item.x, tapY - item.y);
              if (dist < nearestDist) {
                nearestDist = dist;
                nearestId = item.id;
              }
            }
          });
          
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
    <View style={{ flex: 1, backgroundColor: "#f8fafc", overflow: "hidden", position: "relative" }} {...panResponder.panHandlers}>
      <Svg style={{ width: "100%", height: "100%" }} viewBox={`-${boundaryWidth * METER_TO_PX / 2} -${boundaryHeight * METER_TO_PX / 2} ${boundaryWidth * METER_TO_PX} ${boundaryHeight * METER_TO_PX}`}>
        {/* Draw Boundary Box */}
        <Rect
          x={-boundaryWidth * METER_TO_PX / 2}
          y={-boundaryHeight * METER_TO_PX / 2}
          width={boundaryWidth * METER_TO_PX}
          height={boundaryHeight * METER_TO_PX}
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="10, 10"
        />

        {/* Draw Indent Spacing Bounds if > 0 */}
        {indentSpacing > 0 && (
           <Rect
             x={-(boundaryWidth / 2 - indentSpacing) * METER_TO_PX}
             y={-(boundaryHeight / 2 - indentSpacing) * METER_TO_PX}
             width={(boundaryWidth - indentSpacing * 2) * METER_TO_PX}
             height={(boundaryHeight - indentSpacing * 2) * METER_TO_PX}
             fill="none"
             stroke="#cbd5e1"
             strokeWidth="1"
             strokeDasharray="5, 5"
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
            strokeWidth="1.5"
          />
        ))}

        {/* Draw Items */}
        {items.map(item => {
          const isSelected = selectedItemIds.includes(item.id);
          
          return (
            <G 
              key={item.id} 
              transform={`translate(${item.x * METER_TO_PX}, ${item.y * METER_TO_PX}) rotate(${item.rotation})`}
            >
               {/* Selection Box */}
               {isSelected && (
                 <Rect
                   x={-item.width * METER_TO_PX / 2}
                   y={-item.height * METER_TO_PX / 2}
                   width={item.width * METER_TO_PX}
                   height={item.height * METER_TO_PX}
                   fill="rgba(11, 107, 104, 0.1)"
                   stroke="#0b6b68"
                   strokeWidth="2"
                 />
               )}
               {/* Item SVG Lines */}
               {item.lines.map((l, i) => (
                  <Line
                    key={`${item.id}-l-${i}`}
                    x1={l.from.y * METER_TO_PX} // East
                    y1={l.from.x * METER_TO_PX} // North
                    x2={l.to.y * METER_TO_PX}
                    y2={l.to.x * METER_TO_PX}
                    stroke={isSelected ? "#0b6b68" : "#0f172a"}
                    strokeWidth="2"
                  />
               ))}
            </G>
          );
        })}
      </Svg>
    </View>
  );
});
