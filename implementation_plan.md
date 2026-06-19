# Implementation Plan — 90fps Canvas Rendering Performance

## Overview

Optimize the SVG canvas rendering pipeline across GeometryViewport.tsx and BoundaryEditor.tsx to achieve 90fps smooth rendering during gestures (drag/zoom/pan) and with large plans (500+ lines, large sports field templates). No workflow, UI, or logic changes — only rendering performance optimizations.

The root cause is that React state updates (`setOffset`, `setZoom`, `setCamera`, `setItems`) fire at 60fps during `PanResponder.onPanResponderMove`, triggering full SVG re-renders on every frame. Combined with no viewport culling (all lines render always) and line-by-line SVG elements (hundreds of `<Line>` nodes), the frame rate drops to 15-25fps during interaction. The plan fixes this by: (1) RAF-throttling gesture state updates to decouple gesture frequency from React commit frequency, (2) batching `<Line>` elements into single `<Path>` per item, (3) adding viewport culling to skip off-screen lines, (4) moving path chunk computation off the selection-change dependency, (5) adding a proper memo comparator to BoundaryEditor, (6) RAF-throttling BoundaryEditor's gesture state updates.

## Types

No new types or type changes needed. All changes are internal to component rendering logic.

## Files

Four existing files will be modified. No new files, no deleted files, no config changes.

- `src/components/GeometryViewport.tsx` — Modify: add RAF-throttled state refs, decouple path chunks from selectedLineId dependency, add visible bounds computation + viewport culling filter
- `src/components/BoundaryEditor.tsx` — Modify: add RAF-throttled state refs for setCamera/setItems/setSnapLines, batch multi-Line rendering into single Path per item, add custom memo comparator
- `src/utils/sportsFieldTemplates.ts` — No changes needed (already fixed in earlier session)
- `src/screens/TemplatesPage.tsx` — No changes needed (sports field validation already updated in earlier session)

## Functions

No new functions. All changes are modifications to existing component logic:

### GeometryViewport.tsx (inside `export function GeometryViewport`)
- **Modified: `panResponder.onPanResponderMove`** (lines 214-227) — Replace direct `setOffset()` call with RAF-throttled pending state pattern. Store values in `rafPendingRef.current`, schedule single `requestAnimationFrame` commit.
- **Modified: `handleTouchMove`** (lines 297-303) — Replace direct `setZoom()` call with same RAF-throttled pattern (reuse `rafPendingRef`/`rafIdRef`).
- **Modified: `pathChunksByLayer` useMemo** (lines 180-187) — Move to `useRef` + separate `useEffect` that depends only on `safeLines` (not `selectedLineId`). Rebuild path data into a ref, trigger a `pathVersion` state toggle to re-render.
- **New state + refs added** (after line 117): `rafPendingRef`, `rafIdRef`, `pathChunksRef`, `pathVersion` state, `visibleBounds` useMemo, `culledLines` useMemo.
- **New useEffect** (replacing lines 180-187): Rebuild `pathChunksRef.current` from `culledLines` only.

### BoundaryEditor.tsx (inside `BoundaryEditor` component)
- **Modified: `onPanResponderMove`** for camera (lines 250-253, 343-347) — RAF-throttle `setCamera()` calls.
- **Modified: `onPanResponderMove`** for item drag (line 386) — RAF-throttle `setItemsRef.current()` calls.
- **Modified: `onPanResponderMove`** for snap lines (line 385) — RAF-throttle `setSnapLinesRef.current()` calls.
- **Modified: SVG rendering loop** (lines 482-499) — Replace `item.lines.map((l, i) => <Line ... />)` with single `<Path>` element containing all line segments in one `d` attribute.
- **Modified: React.memo comparator** (line 31) — Add custom equality check comparing boundary dimensions, items length + positions, selectedItemIds.

## Classes

No class changes. All components are function components.

## Dependencies

No new dependencies. Phase 2 (Skia GPU rendering) is deferred. This plan covers Phase 1 only — zero new npm packages.

## Testing

Manual testing after implementation:
1. Open TemplatesPage with Boundary Mode → add ~10 items (alphabets, shapes) → drag/zoom the canvas → verify smooth 60fps during gestures
2. Add a sports field (increase boundary to 120m×120m) → drag/zoom → verify smooth rendering, lines remain visible, items tappable
3. Open a plan with 500+ lines in Fields section → tap to select lines → drag/zoom → verify smooth 60fps
4. Verify item selection still works (tap detection on small and large items)
5. Verify snap lines still show correctly
6. Verify auto-arrange still functions

## Implementation Order

Execute in this order to minimize conflicts, testing after each step:

1. **GeometryViewport RAF throttle** — Add `rafPendingRef` + `rafIdRef` + replace `setOffset` in onPanResponderMove and `setZoom` in handleTouchMove
2. **GeometryViewport path chunk decoupling + viewport culling** — Replace `pathChunksByLayer` useMemo with ref + effect pattern, add `visibleBounds` + `culledLines` memoized filters, wire into path chunk building
3. **BoundaryEditor RAF throttle** — Add same RAF-throttle pattern for `setCamera`, `setItemsRef.current`, `setSnapLinesRef.current` in onPanResponderMove
4. **BoundaryEditor batch `<Line>` → `<Path>`** — Replace per-line `<Line>` loop with single `<Path>` per item
5. **BoundaryEditor memo comparator** — Add custom comparator to `React.memo` wrapping