import React, { useState, useMemo, useRef, useEffect } from "react";
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

export function BoundaryEditor({
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
  const activeDragRef = useRef<{ ids: string[]; startPositions: { id: string; x: number; y: number }[] } | null>(null);

  const panResponder = useMemo(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        // If we drag, record starting positions of selected items
        if (selectedItemIds.length > 0) {
          const starts = selectedItemIds.map(id => {
            const it = items.find(i => i.id === id);
            return { id, x: it?.x || 0, y: it?.y || 0 };
          });
          activeDragRef.current = { ids: selectedItemIds, startPositions: starts };
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        if (!activeDragRef.current) return;
        
        const dx = gestureState.dx / METER_TO_PX;
        const dy = gestureState.dy / METER_TO_PX;

        setItems(prev => {
          const next = [...prev];
          
          let newSnapLines: { x1: number; y1: number; x2: number; y2: number }[] = [];

          activeDragRef.current!.startPositions.forEach(start => {
            const idx = next.findIndex(i => i.id === start.id);
            if (idx >= 0) {
              let newX = start.x + dx;
              let newY = start.y + dy;

              // Simplified Object Snapping logic
              if (snapSettings.corners) {
                // Snap to boundary indents
                const leftIndent = -boundaryWidth / 2 + indentSpacing;
                const rightIndent = boundaryWidth / 2 - indentSpacing;
                const topIndent = -boundaryHeight / 2 + indentSpacing;
                const bottomIndent = boundaryHeight / 2 - indentSpacing;
                
                const halfW = next[idx].width / 2;
                const halfH = next[idx].height / 2;

                if (Math.abs(newX - halfW - leftIndent) < 0.1) { newX = leftIndent + halfW; newSnapLines.push({x1: leftIndent, y1: -boundaryHeight, x2: leftIndent, y2: boundaryHeight}); }
                if (Math.abs(newX + halfW - rightIndent) < 0.1) { newX = rightIndent - halfW; newSnapLines.push({x1: rightIndent, y1: -boundaryHeight, x2: rightIndent, y2: boundaryHeight}); }
                if (Math.abs(newY - halfH - topIndent) < 0.1) { newY = topIndent + halfH; newSnapLines.push({x1: -boundaryWidth, y1: topIndent, x2: boundaryWidth, y2: topIndent}); }
                if (Math.abs(newY + halfH - bottomIndent) < 0.1) { newY = bottomIndent - halfH; newSnapLines.push({x1: -boundaryWidth, y1: bottomIndent, x2: boundaryWidth, y2: bottomIndent}); }
              }

              next[idx] = { ...next[idx], x: newX, y: newY };
            }
          });

          setSnapLines(newSnapLines);
          return next;
        });
      },
      onPanResponderRelease: () => {
        activeDragRef.current = null;
        setSnapLines([]); // clear snap lines
      },
      onPanResponderTerminate: () => {
        activeDragRef.current = null;
        setSnapLines([]);
      }
    }),
    [items, selectedItemIds, boundaryWidth, boundaryHeight, indentSpacing, letterSpacing, snapSettings, setItems]
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
}
