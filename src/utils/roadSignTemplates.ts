import type { PlanLine } from "../types/plan";

export type RoadSignType = "ArrowStraight" | "ArrowLeftTurn" | "ArrowRightTurn" | "ArrowStraightLeft" | "ArrowStraightRight" | "ArrowUTurn" | "HOVDiamond" | "YieldSharkTeeth" | "Crosswalk" | "StopLine" | "WordSTOP" | "WordSLOW" | "WordBUS" | "WordTAXI" | "WordONLY" | "ParkingTMark" | "ParkingLMark" | "HandicapBox" | "BicycleOutline" | "NoParkingCross";

export const ROAD_SIGN_LABELS: Record<RoadSignType, string> = {
    "ArrowStraight": "Arrow Straight",
    "ArrowLeftTurn": "Arrow Left Turn",
    "ArrowRightTurn": "Arrow Right Turn",
    "ArrowStraightLeft": "Arrow Straight Left",
    "ArrowStraightRight": "Arrow Straight Right",
    "ArrowUTurn": "Arrow U Turn",
    "HOVDiamond": "H O V Diamond",
    "YieldSharkTeeth": "Yield Shark Teeth",
    "Crosswalk": "Crosswalk",
    "StopLine": "Stop Line",
    "WordSTOP": "Word S T O P",
    "WordSLOW": "Word S L O W",
    "WordBUS": "Word B U S",
    "WordTAXI": "Word T A X I",
    "WordONLY": "Word O N L Y",
    "ParkingTMark": "Parking T Mark",
    "ParkingLMark": "Parking L Mark",
    "HandicapBox": "Handicap Box",
    "BicycleOutline": "Bicycle Outline",
    "NoParkingCross": "No Parking Cross",
};

export function generateRoadSignLines(signType: RoadSignType, size: number): PlanLine[] {
    const lines: PlanLine[] = [];
    let pointId = 1;
    let lineId = 1;

    if (signType === "ArrowStraight") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.4000 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.6000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.6000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.6000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.6000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.8000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.8000 * size },
            to: { id: pointId++, x: 1.0000 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 1.0000 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.2000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.2000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.4000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.4000 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.4000 * size },
        });
    } else if (signType === "ArrowLeftTurn") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.7000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.7000 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.7000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.7000 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.7000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.7000 * size },
            to: { id: pointId++, x: 0.4626 * size, y: 0.6951 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4626 * size, y: 0.6951 * size },
            to: { id: pointId++, x: 0.5236 * size, y: 0.6804 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5236 * size, y: 0.6804 * size },
            to: { id: pointId++, x: 0.5816 * size, y: 0.6564 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5816 * size, y: 0.6564 * size },
            to: { id: pointId++, x: 0.6351 * size, y: 0.6236 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6351 * size, y: 0.6236 * size },
            to: { id: pointId++, x: 0.6828 * size, y: 0.5828 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6828 * size, y: 0.5828 * size },
            to: { id: pointId++, x: 0.7236 * size, y: 0.5351 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7236 * size, y: 0.5351 * size },
            to: { id: pointId++, x: 0.7564 * size, y: 0.4816 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7564 * size, y: 0.4816 * size },
            to: { id: pointId++, x: 0.7804 * size, y: 0.4236 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7804 * size, y: 0.4236 * size },
            to: { id: pointId++, x: 0.7951 * size, y: 0.3626 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7951 * size, y: 0.3626 * size },
            to: { id: pointId++, x: 0.8000 * size, y: 0.3000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.8000 * size, y: 0.3000 * size },
            to: { id: pointId++, x: 0.8000 * size, y: 0.2000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.8000 * size, y: 0.2000 * size },
            to: { id: pointId++, x: 0.9500 * size, y: 0.2000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9500 * size, y: 0.2000 * size },
            to: { id: pointId++, x: 0.7000 * size, y: 0.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7000 * size, y: 0.0000 * size },
            to: { id: pointId++, x: 0.4500 * size, y: 0.2000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4500 * size, y: 0.2000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.2000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.2000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.3000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.3000 * size },
            to: { id: pointId++, x: 0.5975 * size, y: 0.3313 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5975 * size, y: 0.3313 * size },
            to: { id: pointId++, x: 0.5902 * size, y: 0.3618 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5902 * size, y: 0.3618 * size },
            to: { id: pointId++, x: 0.5782 * size, y: 0.3908 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5782 * size, y: 0.3908 * size },
            to: { id: pointId++, x: 0.5618 * size, y: 0.4176 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5618 * size, y: 0.4176 * size },
            to: { id: pointId++, x: 0.5414 * size, y: 0.4414 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5414 * size, y: 0.4414 * size },
            to: { id: pointId++, x: 0.5176 * size, y: 0.4618 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5176 * size, y: 0.4618 * size },
            to: { id: pointId++, x: 0.4908 * size, y: 0.4782 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4908 * size, y: 0.4782 * size },
            to: { id: pointId++, x: 0.4618 * size, y: 0.4902 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4618 * size, y: 0.4902 * size },
            to: { id: pointId++, x: 0.4313 * size, y: 0.4975 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4313 * size, y: 0.4975 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.5000 * size },
        });
    } else if (signType === "ArrowRightTurn") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.3000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.3000 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.3000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.3000 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.3000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.3000 * size },
            to: { id: pointId++, x: 0.4626 * size, y: 0.3049 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4626 * size, y: 0.3049 * size },
            to: { id: pointId++, x: 0.5236 * size, y: 0.3196 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5236 * size, y: 0.3196 * size },
            to: { id: pointId++, x: 0.5816 * size, y: 0.3436 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5816 * size, y: 0.3436 * size },
            to: { id: pointId++, x: 0.6351 * size, y: 0.3764 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6351 * size, y: 0.3764 * size },
            to: { id: pointId++, x: 0.6828 * size, y: 0.4172 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6828 * size, y: 0.4172 * size },
            to: { id: pointId++, x: 0.7236 * size, y: 0.4649 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7236 * size, y: 0.4649 * size },
            to: { id: pointId++, x: 0.7564 * size, y: 0.5184 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7564 * size, y: 0.5184 * size },
            to: { id: pointId++, x: 0.7804 * size, y: 0.5764 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7804 * size, y: 0.5764 * size },
            to: { id: pointId++, x: 0.7951 * size, y: 0.6374 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7951 * size, y: 0.6374 * size },
            to: { id: pointId++, x: 0.8000 * size, y: 0.7000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.8000 * size, y: 0.7000 * size },
            to: { id: pointId++, x: 0.8000 * size, y: 0.8000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.8000 * size, y: 0.8000 * size },
            to: { id: pointId++, x: 0.9500 * size, y: 0.8000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9500 * size, y: 0.8000 * size },
            to: { id: pointId++, x: 0.7000 * size, y: 1.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7000 * size, y: 1.0000 * size },
            to: { id: pointId++, x: 0.4500 * size, y: 0.8000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4500 * size, y: 0.8000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.8000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.8000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.7000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.7000 * size },
            to: { id: pointId++, x: 0.5975 * size, y: 0.6687 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5975 * size, y: 0.6687 * size },
            to: { id: pointId++, x: 0.5902 * size, y: 0.6382 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5902 * size, y: 0.6382 * size },
            to: { id: pointId++, x: 0.5782 * size, y: 0.6092 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5782 * size, y: 0.6092 * size },
            to: { id: pointId++, x: 0.5618 * size, y: 0.5824 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5618 * size, y: 0.5824 * size },
            to: { id: pointId++, x: 0.5414 * size, y: 0.5586 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5414 * size, y: 0.5586 * size },
            to: { id: pointId++, x: 0.5176 * size, y: 0.5382 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5176 * size, y: 0.5382 * size },
            to: { id: pointId++, x: 0.4908 * size, y: 0.5218 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4908 * size, y: 0.5218 * size },
            to: { id: pointId++, x: 0.4618 * size, y: 0.5098 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4618 * size, y: 0.5098 * size },
            to: { id: pointId++, x: 0.4313 * size, y: 0.5025 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4313 * size, y: 0.5025 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.5000 * size },
        });
    } else if (signType === "ArrowStraightLeft") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.6000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.6000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.6000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.8000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.8000 * size },
            to: { id: pointId++, x: 1.0000 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 1.0000 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.2000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.2000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.4000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.4000 * size },
            to: { id: pointId++, x: 0.3000 * size, y: 0.4000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3000 * size, y: 0.4000 * size },
            to: { id: pointId++, x: 0.3000 * size, y: 0.4000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3000 * size, y: 0.4000 * size },
            to: { id: pointId++, x: 0.3469 * size, y: 0.3963 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3469 * size, y: 0.3963 * size },
            to: { id: pointId++, x: 0.3927 * size, y: 0.3853 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3927 * size, y: 0.3853 * size },
            to: { id: pointId++, x: 0.4362 * size, y: 0.3673 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4362 * size, y: 0.3673 * size },
            to: { id: pointId++, x: 0.4763 * size, y: 0.3427 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4763 * size, y: 0.3427 * size },
            to: { id: pointId++, x: 0.5121 * size, y: 0.3121 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5121 * size, y: 0.3121 * size },
            to: { id: pointId++, x: 0.5427 * size, y: 0.2763 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5427 * size, y: 0.2763 * size },
            to: { id: pointId++, x: 0.5673 * size, y: 0.2362 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5673 * size, y: 0.2362 * size },
            to: { id: pointId++, x: 0.5853 * size, y: 0.1927 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5853 * size, y: 0.1927 * size },
            to: { id: pointId++, x: 0.5963 * size, y: 0.1469 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5963 * size, y: 0.1469 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.1000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.1000 * size },
            to: { id: pointId++, x: 0.7500 * size, y: 0.1000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7500 * size, y: 0.1000 * size },
            to: { id: pointId++, x: 0.5000 * size, y: -0.1500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5000 * size, y: -0.1500 * size },
            to: { id: pointId++, x: 0.2500 * size, y: 0.1000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2500 * size, y: 0.1000 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.1000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.1000 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.1000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.1000 * size },
            to: { id: pointId++, x: 0.3963 * size, y: 0.1469 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3963 * size, y: 0.1469 * size },
            to: { id: pointId++, x: 0.3853 * size, y: 0.1927 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3853 * size, y: 0.1927 * size },
            to: { id: pointId++, x: 0.3673 * size, y: 0.2362 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3673 * size, y: 0.2362 * size },
            to: { id: pointId++, x: 0.3427 * size, y: 0.2763 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3427 * size, y: 0.2763 * size },
            to: { id: pointId++, x: 0.3121 * size, y: 0.3121 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3121 * size, y: 0.3121 * size },
            to: { id: pointId++, x: 0.2763 * size, y: 0.3427 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2763 * size, y: 0.3427 * size },
            to: { id: pointId++, x: 0.2362 * size, y: 0.3673 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2362 * size, y: 0.3673 * size },
            to: { id: pointId++, x: 0.1927 * size, y: 0.3853 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1927 * size, y: 0.3853 * size },
            to: { id: pointId++, x: 0.1469 * size, y: 0.3963 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1469 * size, y: 0.3963 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.4000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.4000 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.4000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.4000 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.6000 * size },
        });
    } else if (signType === "ArrowStraightRight") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.4000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.4000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.4000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.2000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.2000 * size },
            to: { id: pointId++, x: 1.0000 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 1.0000 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.8000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.8000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.6000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.6000 * size },
            to: { id: pointId++, x: 0.3000 * size, y: 0.6000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3000 * size, y: 0.6000 * size },
            to: { id: pointId++, x: 0.3000 * size, y: 0.6000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3000 * size, y: 0.6000 * size },
            to: { id: pointId++, x: 0.3469 * size, y: 0.6037 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3469 * size, y: 0.6037 * size },
            to: { id: pointId++, x: 0.3927 * size, y: 0.6147 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3927 * size, y: 0.6147 * size },
            to: { id: pointId++, x: 0.4362 * size, y: 0.6327 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4362 * size, y: 0.6327 * size },
            to: { id: pointId++, x: 0.4763 * size, y: 0.6573 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4763 * size, y: 0.6573 * size },
            to: { id: pointId++, x: 0.5121 * size, y: 0.6879 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5121 * size, y: 0.6879 * size },
            to: { id: pointId++, x: 0.5427 * size, y: 0.7237 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5427 * size, y: 0.7237 * size },
            to: { id: pointId++, x: 0.5673 * size, y: 0.7638 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5673 * size, y: 0.7638 * size },
            to: { id: pointId++, x: 0.5853 * size, y: 0.8073 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5853 * size, y: 0.8073 * size },
            to: { id: pointId++, x: 0.5963 * size, y: 0.8531 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5963 * size, y: 0.8531 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.9000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.9000 * size },
            to: { id: pointId++, x: 0.7500 * size, y: 0.9000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7500 * size, y: 0.9000 * size },
            to: { id: pointId++, x: 0.5000 * size, y: 1.1500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5000 * size, y: 1.1500 * size },
            to: { id: pointId++, x: 0.2500 * size, y: 0.9000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2500 * size, y: 0.9000 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.9000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.9000 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.9000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.9000 * size },
            to: { id: pointId++, x: 0.3963 * size, y: 0.8531 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3963 * size, y: 0.8531 * size },
            to: { id: pointId++, x: 0.3853 * size, y: 0.8073 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3853 * size, y: 0.8073 * size },
            to: { id: pointId++, x: 0.3673 * size, y: 0.7638 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3673 * size, y: 0.7638 * size },
            to: { id: pointId++, x: 0.3427 * size, y: 0.7237 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3427 * size, y: 0.7237 * size },
            to: { id: pointId++, x: 0.3121 * size, y: 0.6879 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3121 * size, y: 0.6879 * size },
            to: { id: pointId++, x: 0.2763 * size, y: 0.6573 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2763 * size, y: 0.6573 * size },
            to: { id: pointId++, x: 0.2362 * size, y: 0.6327 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2362 * size, y: 0.6327 * size },
            to: { id: pointId++, x: 0.1927 * size, y: 0.6147 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1927 * size, y: 0.6147 * size },
            to: { id: pointId++, x: 0.1469 * size, y: 0.6037 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1469 * size, y: 0.6037 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.6000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.6000 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.6000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.6000 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.4000 * size },
        });
    } else if (signType === "ArrowUTurn") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.7000 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.9000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.9000 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.9000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.9000 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.9000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.9000 * size },
            to: { id: pointId++, x: 0.4780 * size, y: 0.8923 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4780 * size, y: 0.8923 * size },
            to: { id: pointId++, x: 0.5531 * size, y: 0.8696 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5531 * size, y: 0.8696 * size },
            to: { id: pointId++, x: 0.6222 * size, y: 0.8326 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6222 * size, y: 0.8326 * size },
            to: { id: pointId++, x: 0.6828 * size, y: 0.7828 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6828 * size, y: 0.7828 * size },
            to: { id: pointId++, x: 0.7326 * size, y: 0.7222 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7326 * size, y: 0.7222 * size },
            to: { id: pointId++, x: 0.7696 * size, y: 0.6531 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7696 * size, y: 0.6531 * size },
            to: { id: pointId++, x: 0.7923 * size, y: 0.5780 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7923 * size, y: 0.5780 * size },
            to: { id: pointId++, x: 0.8000 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.8000 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.7923 * size, y: 0.4220 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7923 * size, y: 0.4220 * size },
            to: { id: pointId++, x: 0.7696 * size, y: 0.3469 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7696 * size, y: 0.3469 * size },
            to: { id: pointId++, x: 0.7326 * size, y: 0.2778 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7326 * size, y: 0.2778 * size },
            to: { id: pointId++, x: 0.6828 * size, y: 0.2172 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6828 * size, y: 0.2172 * size },
            to: { id: pointId++, x: 0.6222 * size, y: 0.1674 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6222 * size, y: 0.1674 * size },
            to: { id: pointId++, x: 0.5531 * size, y: 0.1304 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5531 * size, y: 0.1304 * size },
            to: { id: pointId++, x: 0.4780 * size, y: 0.1077 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4780 * size, y: 0.1077 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.1000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.1000 * size },
            to: { id: pointId++, x: 0.3000 * size, y: 0.1000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3000 * size, y: 0.1000 * size },
            to: { id: pointId++, x: 0.3000 * size, y: -0.0500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3000 * size, y: -0.0500 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.2000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.2000 * size },
            to: { id: pointId++, x: 0.3000 * size, y: 0.4500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3000 * size, y: 0.4500 * size },
            to: { id: pointId++, x: 0.3000 * size, y: 0.3000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3000 * size, y: 0.3000 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.3000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.3000 * size },
            to: { id: pointId++, x: 0.4390 * size, y: 0.3038 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4390 * size, y: 0.3038 * size },
            to: { id: pointId++, x: 0.4765 * size, y: 0.3152 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4765 * size, y: 0.3152 * size },
            to: { id: pointId++, x: 0.5111 * size, y: 0.3337 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5111 * size, y: 0.3337 * size },
            to: { id: pointId++, x: 0.5414 * size, y: 0.3586 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5414 * size, y: 0.3586 * size },
            to: { id: pointId++, x: 0.5663 * size, y: 0.3889 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5663 * size, y: 0.3889 * size },
            to: { id: pointId++, x: 0.5848 * size, y: 0.4235 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5848 * size, y: 0.4235 * size },
            to: { id: pointId++, x: 0.5962 * size, y: 0.4610 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5962 * size, y: 0.4610 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.5962 * size, y: 0.5390 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5962 * size, y: 0.5390 * size },
            to: { id: pointId++, x: 0.5848 * size, y: 0.5765 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5848 * size, y: 0.5765 * size },
            to: { id: pointId++, x: 0.5663 * size, y: 0.6111 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5663 * size, y: 0.6111 * size },
            to: { id: pointId++, x: 0.5414 * size, y: 0.6414 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5414 * size, y: 0.6414 * size },
            to: { id: pointId++, x: 0.5111 * size, y: 0.6663 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5111 * size, y: 0.6663 * size },
            to: { id: pointId++, x: 0.4765 * size, y: 0.6848 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4765 * size, y: 0.6848 * size },
            to: { id: pointId++, x: 0.4390 * size, y: 0.6962 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4390 * size, y: 0.6962 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.7000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.7000 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.7000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.7000 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.7000 * size },
        });
    } else if (signType === "HOVDiamond") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 1.0000 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.5000 * size, y: 0.9000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5000 * size, y: 0.9000 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.5000 * size, y: 0.1000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5000 * size, y: 0.1000 * size },
            to: { id: pointId++, x: 1.0000 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.8500 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.5000 * size, y: 0.7500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5000 * size, y: 0.7500 * size },
            to: { id: pointId++, x: 0.1500 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1500 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.5000 * size, y: 0.2500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5000 * size, y: 0.2500 * size },
            to: { id: pointId++, x: 0.8500 * size, y: 0.5000 * size },
        });
    } else if (signType === "YieldSharkTeeth") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.0500 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.2500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.2500 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.1500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.1500 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.0500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.4000 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.6000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.6000 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.4000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.7500 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.9500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.9500 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.8500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.8500 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.7500 * size },
        });
    } else if (signType === "Crosswalk") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.0200 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.1800 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.1800 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.1800 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.1800 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.0200 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.0200 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.0200 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.2200 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.3800 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.3800 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.3800 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.3800 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.2200 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.2200 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.2200 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.4200 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.5800 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.5800 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.5800 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.5800 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.4200 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.4200 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.4200 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.6200 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.7800 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.7800 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.7800 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.7800 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.6200 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.6200 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.6200 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.8200 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.9800 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.9800 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.9800 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.9800 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.8200 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.8200 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.8200 * size },
        });
    } else if (signType === "StopLine") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3000 * size, y: 0.0000 * size },
            to: { id: pointId++, x: 0.3000 * size, y: 1.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3000 * size, y: 1.0000 * size },
            to: { id: pointId++, x: 0.7000 * size, y: 1.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7000 * size, y: 1.0000 * size },
            to: { id: pointId++, x: 0.7000 * size, y: 0.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7000 * size, y: 0.0000 * size },
            to: { id: pointId++, x: 0.3000 * size, y: 0.0000 * size },
        });
    } else if (signType === "WordSTOP") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0919 * size, y: 0.0000 * size },
            to: { id: pointId++, x: 0.0949 * size, y: 0.0339 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0949 * size, y: 0.0339 * size },
            to: { id: pointId++, x: 0.0852 * size, y: 0.0355 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0852 * size, y: 0.0355 * size },
            to: { id: pointId++, x: 0.0763 * size, y: 0.0379 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0763 * size, y: 0.0379 * size },
            to: { id: pointId++, x: 0.0684 * size, y: 0.0411 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0684 * size, y: 0.0411 * size },
            to: { id: pointId++, x: 0.0614 * size, y: 0.0451 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0614 * size, y: 0.0451 * size },
            to: { id: pointId++, x: 0.0552 * size, y: 0.0501 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0552 * size, y: 0.0501 * size },
            to: { id: pointId++, x: 0.0496 * size, y: 0.0564 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0496 * size, y: 0.0564 * size },
            to: { id: pointId++, x: 0.0447 * size, y: 0.0638 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0447 * size, y: 0.0638 * size },
            to: { id: pointId++, x: 0.0403 * size, y: 0.0725 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0403 * size, y: 0.0725 * size },
            to: { id: pointId++, x: 0.0368 * size, y: 0.0820 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0368 * size, y: 0.0820 * size },
            to: { id: pointId++, x: 0.0343 * size, y: 0.0922 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0343 * size, y: 0.0922 * size },
            to: { id: pointId++, x: 0.0328 * size, y: 0.1029 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0328 * size, y: 0.1029 * size },
            to: { id: pointId++, x: 0.0323 * size, y: 0.1142 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0323 * size, y: 0.1142 * size },
            to: { id: pointId++, x: 0.0326 * size, y: 0.1242 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0326 * size, y: 0.1242 * size },
            to: { id: pointId++, x: 0.0338 * size, y: 0.1335 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0338 * size, y: 0.1335 * size },
            to: { id: pointId++, x: 0.0357 * size, y: 0.1423 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0357 * size, y: 0.1423 * size },
            to: { id: pointId++, x: 0.0384 * size, y: 0.1505 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0384 * size, y: 0.1505 * size },
            to: { id: pointId++, x: 0.0417 * size, y: 0.1579 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0417 * size, y: 0.1579 * size },
            to: { id: pointId++, x: 0.0456 * size, y: 0.1642 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0456 * size, y: 0.1642 * size },
            to: { id: pointId++, x: 0.0501 * size, y: 0.1696 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0501 * size, y: 0.1696 * size },
            to: { id: pointId++, x: 0.0551 * size, y: 0.1740 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0551 * size, y: 0.1740 * size },
            to: { id: pointId++, x: 0.0606 * size, y: 0.1773 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0606 * size, y: 0.1773 * size },
            to: { id: pointId++, x: 0.0663 * size, y: 0.1797 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0663 * size, y: 0.1797 * size },
            to: { id: pointId++, x: 0.0722 * size, y: 0.1812 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0722 * size, y: 0.1812 * size },
            to: { id: pointId++, x: 0.0784 * size, y: 0.1816 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0784 * size, y: 0.1816 * size },
            to: { id: pointId++, x: 0.0846 * size, y: 0.1812 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0846 * size, y: 0.1812 * size },
            to: { id: pointId++, x: 0.0904 * size, y: 0.1798 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0904 * size, y: 0.1798 * size },
            to: { id: pointId++, x: 0.0958 * size, y: 0.1775 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0958 * size, y: 0.1775 * size },
            to: { id: pointId++, x: 0.1007 * size, y: 0.1742 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1007 * size, y: 0.1742 * size },
            to: { id: pointId++, x: 0.1053 * size, y: 0.1699 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1053 * size, y: 0.1699 * size },
            to: { id: pointId++, x: 0.1095 * size, y: 0.1644 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1095 * size, y: 0.1644 * size },
            to: { id: pointId++, x: 0.1133 * size, y: 0.1577 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1133 * size, y: 0.1577 * size },
            to: { id: pointId++, x: 0.1168 * size, y: 0.1498 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1168 * size, y: 0.1498 * size },
            to: { id: pointId++, x: 0.1192 * size, y: 0.1426 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1192 * size, y: 0.1426 * size },
            to: { id: pointId++, x: 0.1222 * size, y: 0.1322 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1222 * size, y: 0.1322 * size },
            to: { id: pointId++, x: 0.1258 * size, y: 0.1185 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1258 * size, y: 0.1185 * size },
            to: { id: pointId++, x: 0.1300 * size, y: 0.1014 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1300 * size, y: 0.1014 * size },
            to: { id: pointId++, x: 0.1345 * size, y: 0.0841 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1345 * size, y: 0.0841 * size },
            to: { id: pointId++, x: 0.1388 * size, y: 0.0696 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1388 * size, y: 0.0696 * size },
            to: { id: pointId++, x: 0.1429 * size, y: 0.0578 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1429 * size, y: 0.0578 * size },
            to: { id: pointId++, x: 0.1470 * size, y: 0.0489 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1470 * size, y: 0.0489 * size },
            to: { id: pointId++, x: 0.1524 * size, y: 0.0398 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1524 * size, y: 0.0398 * size },
            to: { id: pointId++, x: 0.1584 * size, y: 0.0320 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1584 * size, y: 0.0320 * size },
            to: { id: pointId++, x: 0.1650 * size, y: 0.0253 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1650 * size, y: 0.0253 * size },
            to: { id: pointId++, x: 0.1723 * size, y: 0.0199 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1723 * size, y: 0.0199 * size },
            to: { id: pointId++, x: 0.1801 * size, y: 0.0157 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1801 * size, y: 0.0157 * size },
            to: { id: pointId++, x: 0.1883 * size, y: 0.0128 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1883 * size, y: 0.0128 * size },
            to: { id: pointId++, x: 0.1970 * size, y: 0.0110 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1970 * size, y: 0.0110 * size },
            to: { id: pointId++, x: 0.2061 * size, y: 0.0104 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2061 * size, y: 0.0104 * size },
            to: { id: pointId++, x: 0.2162 * size, y: 0.0111 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2162 * size, y: 0.0111 * size },
            to: { id: pointId++, x: 0.2260 * size, y: 0.0133 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2260 * size, y: 0.0133 * size },
            to: { id: pointId++, x: 0.2355 * size, y: 0.0169 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2355 * size, y: 0.0169 * size },
            to: { id: pointId++, x: 0.2446 * size, y: 0.0221 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2446 * size, y: 0.0221 * size },
            to: { id: pointId++, x: 0.2530 * size, y: 0.0286 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2530 * size, y: 0.0286 * size },
            to: { id: pointId++, x: 0.2603 * size, y: 0.0364 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2603 * size, y: 0.0364 * size },
            to: { id: pointId++, x: 0.2666 * size, y: 0.0456 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2666 * size, y: 0.0456 * size },
            to: { id: pointId++, x: 0.2717 * size, y: 0.0562 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2717 * size, y: 0.0562 * size },
            to: { id: pointId++, x: 0.2758 * size, y: 0.0677 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2758 * size, y: 0.0677 * size },
            to: { id: pointId++, x: 0.2787 * size, y: 0.0798 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2787 * size, y: 0.0798 * size },
            to: { id: pointId++, x: 0.2804 * size, y: 0.0926 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2804 * size, y: 0.0926 * size },
            to: { id: pointId++, x: 0.2810 * size, y: 0.1060 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2810 * size, y: 0.1060 * size },
            to: { id: pointId++, x: 0.2804 * size, y: 0.1207 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2804 * size, y: 0.1207 * size },
            to: { id: pointId++, x: 0.2786 * size, y: 0.1345 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2786 * size, y: 0.1345 * size },
            to: { id: pointId++, x: 0.2755 * size, y: 0.1473 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2755 * size, y: 0.1473 * size },
            to: { id: pointId++, x: 0.2713 * size, y: 0.1593 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2713 * size, y: 0.1593 * size },
            to: { id: pointId++, x: 0.2658 * size, y: 0.1702 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2658 * size, y: 0.1702 * size },
            to: { id: pointId++, x: 0.2592 * size, y: 0.1797 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2592 * size, y: 0.1797 * size },
            to: { id: pointId++, x: 0.2515 * size, y: 0.1879 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2515 * size, y: 0.1879 * size },
            to: { id: pointId++, x: 0.2426 * size, y: 0.1948 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2426 * size, y: 0.1948 * size },
            to: { id: pointId++, x: 0.2329 * size, y: 0.2003 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2329 * size, y: 0.2003 * size },
            to: { id: pointId++, x: 0.2225 * size, y: 0.2044 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2225 * size, y: 0.2044 * size },
            to: { id: pointId++, x: 0.2115 * size, y: 0.2070 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2115 * size, y: 0.2070 * size },
            to: { id: pointId++, x: 0.1998 * size, y: 0.2082 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1998 * size, y: 0.2082 * size },
            to: { id: pointId++, x: 0.1972 * size, y: 0.1737 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1972 * size, y: 0.1737 * size },
            to: { id: pointId++, x: 0.2093 * size, y: 0.1715 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2093 * size, y: 0.1715 * size },
            to: { id: pointId++, x: 0.2198 * size, y: 0.1676 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2198 * size, y: 0.1676 * size },
            to: { id: pointId++, x: 0.2288 * size, y: 0.1621 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2288 * size, y: 0.1621 * size },
            to: { id: pointId++, x: 0.2361 * size, y: 0.1549 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2361 * size, y: 0.1549 * size },
            to: { id: pointId++, x: 0.2419 * size, y: 0.1459 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2419 * size, y: 0.1459 * size },
            to: { id: pointId++, x: 0.2460 * size, y: 0.1350 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2460 * size, y: 0.1350 * size },
            to: { id: pointId++, x: 0.2485 * size, y: 0.1222 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2485 * size, y: 0.1222 * size },
            to: { id: pointId++, x: 0.2493 * size, y: 0.1075 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2493 * size, y: 0.1075 * size },
            to: { id: pointId++, x: 0.2486 * size, y: 0.0923 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2486 * size, y: 0.0923 * size },
            to: { id: pointId++, x: 0.2463 * size, y: 0.0793 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2463 * size, y: 0.0793 * size },
            to: { id: pointId++, x: 0.2426 * size, y: 0.0685 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2426 * size, y: 0.0685 * size },
            to: { id: pointId++, x: 0.2373 * size, y: 0.0600 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2373 * size, y: 0.0600 * size },
            to: { id: pointId++, x: 0.2311 * size, y: 0.0534 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2311 * size, y: 0.0534 * size },
            to: { id: pointId++, x: 0.2242 * size, y: 0.0488 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2242 * size, y: 0.0488 * size },
            to: { id: pointId++, x: 0.2167 * size, y: 0.0460 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2167 * size, y: 0.0460 * size },
            to: { id: pointId++, x: 0.2085 * size, y: 0.0450 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2085 * size, y: 0.0450 * size },
            to: { id: pointId++, x: 0.2015 * size, y: 0.0457 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2015 * size, y: 0.0457 * size },
            to: { id: pointId++, x: 0.1952 * size, y: 0.0477 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1952 * size, y: 0.0477 * size },
            to: { id: pointId++, x: 0.1895 * size, y: 0.0510 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1895 * size, y: 0.0510 * size },
            to: { id: pointId++, x: 0.1844 * size, y: 0.0556 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1844 * size, y: 0.0556 * size },
            to: { id: pointId++, x: 0.1797 * size, y: 0.0629 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1797 * size, y: 0.0629 * size },
            to: { id: pointId++, x: 0.1749 * size, y: 0.0744 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1749 * size, y: 0.0744 * size },
            to: { id: pointId++, x: 0.1700 * size, y: 0.0900 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1700 * size, y: 0.0900 * size },
            to: { id: pointId++, x: 0.1651 * size, y: 0.1098 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1651 * size, y: 0.1098 * size },
            to: { id: pointId++, x: 0.1603 * size, y: 0.1300 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1603 * size, y: 0.1300 * size },
            to: { id: pointId++, x: 0.1558 * size, y: 0.1468 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1558 * size, y: 0.1468 * size },
            to: { id: pointId++, x: 0.1516 * size, y: 0.1601 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1516 * size, y: 0.1601 * size },
            to: { id: pointId++, x: 0.1477 * size, y: 0.1700 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1477 * size, y: 0.1700 * size },
            to: { id: pointId++, x: 0.1419 * size, y: 0.1811 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1419 * size, y: 0.1811 * size },
            to: { id: pointId++, x: 0.1353 * size, y: 0.1906 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1353 * size, y: 0.1906 * size },
            to: { id: pointId++, x: 0.1280 * size, y: 0.1986 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1280 * size, y: 0.1986 * size },
            to: { id: pointId++, x: 0.1200 * size, y: 0.2050 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1200 * size, y: 0.2050 * size },
            to: { id: pointId++, x: 0.1113 * size, y: 0.2100 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1113 * size, y: 0.2100 * size },
            to: { id: pointId++, x: 0.1020 * size, y: 0.2135 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1020 * size, y: 0.2135 * size },
            to: { id: pointId++, x: 0.0920 * size, y: 0.2156 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0920 * size, y: 0.2156 * size },
            to: { id: pointId++, x: 0.0814 * size, y: 0.2163 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0814 * size, y: 0.2163 * size },
            to: { id: pointId++, x: 0.0707 * size, y: 0.2155 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0707 * size, y: 0.2155 * size },
            to: { id: pointId++, x: 0.0603 * size, y: 0.2132 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0603 * size, y: 0.2132 * size },
            to: { id: pointId++, x: 0.0502 * size, y: 0.2093 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0502 * size, y: 0.2093 * size },
            to: { id: pointId++, x: 0.0405 * size, y: 0.2039 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0405 * size, y: 0.2039 * size },
            to: { id: pointId++, x: 0.0314 * size, y: 0.1970 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0314 * size, y: 0.1970 * size },
            to: { id: pointId++, x: 0.0234 * size, y: 0.1888 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0234 * size, y: 0.1888 * size },
            to: { id: pointId++, x: 0.0165 * size, y: 0.1792 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0165 * size, y: 0.1792 * size },
            to: { id: pointId++, x: 0.0107 * size, y: 0.1682 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0107 * size, y: 0.1682 * size },
            to: { id: pointId++, x: 0.0060 * size, y: 0.1562 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0060 * size, y: 0.1562 * size },
            to: { id: pointId++, x: 0.0027 * size, y: 0.1435 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0027 * size, y: 0.1435 * size },
            to: { id: pointId++, x: 0.0007 * size, y: 0.1300 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0007 * size, y: 0.1300 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.1158 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.1158 * size },
            to: { id: pointId++, x: 0.0007 * size, y: 0.0982 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0007 * size, y: 0.0982 * size },
            to: { id: pointId++, x: 0.0027 * size, y: 0.0820 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0027 * size, y: 0.0820 * size },
            to: { id: pointId++, x: 0.0060 * size, y: 0.0672 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0060 * size, y: 0.0672 * size },
            to: { id: pointId++, x: 0.0108 * size, y: 0.0540 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0108 * size, y: 0.0540 * size },
            to: { id: pointId++, x: 0.0168 * size, y: 0.0422 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0168 * size, y: 0.0422 * size },
            to: { id: pointId++, x: 0.0242 * size, y: 0.0318 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0242 * size, y: 0.0318 * size },
            to: { id: pointId++, x: 0.0330 * size, y: 0.0227 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0330 * size, y: 0.0227 * size },
            to: { id: pointId++, x: 0.0431 * size, y: 0.0149 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0431 * size, y: 0.0149 * size },
            to: { id: pointId++, x: 0.0542 * size, y: 0.0087 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0542 * size, y: 0.0087 * size },
            to: { id: pointId++, x: 0.0661 * size, y: 0.0041 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0661 * size, y: 0.0041 * size },
            to: { id: pointId++, x: 0.0787 * size, y: 0.0012 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0787 * size, y: 0.0012 * size },
            to: { id: pointId++, x: 0.0919 * size, y: 0.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0919 * size, y: 0.0000 * size },
            to: { id: pointId++, x: 0.0919 * size, y: 0.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0046 * size, y: 0.3346 * size },
            to: { id: pointId++, x: 0.2443 * size, y: 0.3346 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2443 * size, y: 0.3346 * size },
            to: { id: pointId++, x: 0.2443 * size, y: 0.2450 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2443 * size, y: 0.2450 * size },
            to: { id: pointId++, x: 0.2764 * size, y: 0.2450 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2764 * size, y: 0.2450 * size },
            to: { id: pointId++, x: 0.2764 * size, y: 0.4604 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2764 * size, y: 0.4604 * size },
            to: { id: pointId++, x: 0.2443 * size, y: 0.4604 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2443 * size, y: 0.4604 * size },
            to: { id: pointId++, x: 0.2443 * size, y: 0.3705 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2443 * size, y: 0.3705 * size },
            to: { id: pointId++, x: 0.0046 * size, y: 0.3705 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0046 * size, y: 0.3705 * size },
            to: { id: pointId++, x: 0.0046 * size, y: 0.3346 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0046 * size, y: 0.3346 * size },
            to: { id: pointId++, x: 0.0046 * size, y: 0.3346 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1370 * size, y: 0.4864 * size },
            to: { id: pointId++, x: 0.1690 * size, y: 0.4886 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1690 * size, y: 0.4886 * size },
            to: { id: pointId++, x: 0.1973 * size, y: 0.4955 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1973 * size, y: 0.4955 * size },
            to: { id: pointId++, x: 0.2219 * size, y: 0.5068 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2219 * size, y: 0.5068 * size },
            to: { id: pointId++, x: 0.2429 * size, y: 0.5227 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2429 * size, y: 0.5227 * size },
            to: { id: pointId++, x: 0.2597 * size, y: 0.5422 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2597 * size, y: 0.5422 * size },
            to: { id: pointId++, x: 0.2716 * size, y: 0.5643 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2716 * size, y: 0.5643 * size },
            to: { id: pointId++, x: 0.2788 * size, y: 0.5891 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2788 * size, y: 0.5891 * size },
            to: { id: pointId++, x: 0.2812 * size, y: 0.6165 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2812 * size, y: 0.6165 * size },
            to: { id: pointId++, x: 0.2801 * size, y: 0.6348 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2801 * size, y: 0.6348 * size },
            to: { id: pointId++, x: 0.2767 * size, y: 0.6523 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2767 * size, y: 0.6523 * size },
            to: { id: pointId++, x: 0.2711 * size, y: 0.6688 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2711 * size, y: 0.6688 * size },
            to: { id: pointId++, x: 0.2632 * size, y: 0.6843 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2632 * size, y: 0.6843 * size },
            to: { id: pointId++, x: 0.2533 * size, y: 0.6985 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2533 * size, y: 0.6985 * size },
            to: { id: pointId++, x: 0.2417 * size, y: 0.7110 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2417 * size, y: 0.7110 * size },
            to: { id: pointId++, x: 0.2283 * size, y: 0.7216 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2283 * size, y: 0.7216 * size },
            to: { id: pointId++, x: 0.2131 * size, y: 0.7304 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2131 * size, y: 0.7304 * size },
            to: { id: pointId++, x: 0.1964 * size, y: 0.7373 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1964 * size, y: 0.7373 * size },
            to: { id: pointId++, x: 0.1788 * size, y: 0.7423 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1788 * size, y: 0.7423 * size },
            to: { id: pointId++, x: 0.1600 * size, y: 0.7453 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1600 * size, y: 0.7453 * size },
            to: { id: pointId++, x: 0.1401 * size, y: 0.7462 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1401 * size, y: 0.7462 * size },
            to: { id: pointId++, x: 0.1200 * size, y: 0.7452 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1200 * size, y: 0.7452 * size },
            to: { id: pointId++, x: 0.1010 * size, y: 0.7421 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1010 * size, y: 0.7421 * size },
            to: { id: pointId++, x: 0.0830 * size, y: 0.7369 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0830 * size, y: 0.7369 * size },
            to: { id: pointId++, x: 0.0662 * size, y: 0.7296 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0662 * size, y: 0.7296 * size },
            to: { id: pointId++, x: 0.0509 * size, y: 0.7204 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0509 * size, y: 0.7204 * size },
            to: { id: pointId++, x: 0.0375 * size, y: 0.7094 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0375 * size, y: 0.7094 * size },
            to: { id: pointId++, x: 0.0262 * size, y: 0.6967 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0262 * size, y: 0.6967 * size },
            to: { id: pointId++, x: 0.0168 * size, y: 0.6823 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0168 * size, y: 0.6823 * size },
            to: { id: pointId++, x: 0.0094 * size, y: 0.6667 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0094 * size, y: 0.6667 * size },
            to: { id: pointId++, x: 0.0042 * size, y: 0.6505 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0042 * size, y: 0.6505 * size },
            to: { id: pointId++, x: 0.0010 * size, y: 0.6337 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0010 * size, y: 0.6337 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.6163 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.6163 * size },
            to: { id: pointId++, x: 0.0012 * size, y: 0.5976 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0012 * size, y: 0.5976 * size },
            to: { id: pointId++, x: 0.0046 * size, y: 0.5800 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0046 * size, y: 0.5800 * size },
            to: { id: pointId++, x: 0.0104 * size, y: 0.5633 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0104 * size, y: 0.5633 * size },
            to: { id: pointId++, x: 0.0185 * size, y: 0.5477 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0185 * size, y: 0.5477 * size },
            to: { id: pointId++, x: 0.0286 * size, y: 0.5335 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0286 * size, y: 0.5335 * size },
            to: { id: pointId++, x: 0.0405 * size, y: 0.5212 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0405 * size, y: 0.5212 * size },
            to: { id: pointId++, x: 0.0540 * size, y: 0.5106 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0540 * size, y: 0.5106 * size },
            to: { id: pointId++, x: 0.0691 * size, y: 0.5019 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0691 * size, y: 0.5019 * size },
            to: { id: pointId++, x: 0.0854 * size, y: 0.4951 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0854 * size, y: 0.4951 * size },
            to: { id: pointId++, x: 0.1021 * size, y: 0.4903 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1021 * size, y: 0.4903 * size },
            to: { id: pointId++, x: 0.1193 * size, y: 0.4873 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1193 * size, y: 0.4873 * size },
            to: { id: pointId++, x: 0.1370 * size, y: 0.4864 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1370 * size, y: 0.4864 * size },
            to: { id: pointId++, x: 0.1370 * size, y: 0.4864 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1364 * size, y: 0.5234 * size },
            to: { id: pointId++, x: 0.1132 * size, y: 0.5251 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1132 * size, y: 0.5251 * size },
            to: { id: pointId++, x: 0.0925 * size, y: 0.5301 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0925 * size, y: 0.5301 * size },
            to: { id: pointId++, x: 0.0745 * size, y: 0.5383 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0745 * size, y: 0.5383 * size },
            to: { id: pointId++, x: 0.0590 * size, y: 0.5499 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0590 * size, y: 0.5499 * size },
            to: { id: pointId++, x: 0.0467 * size, y: 0.5639 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0467 * size, y: 0.5639 * size },
            to: { id: pointId++, x: 0.0378 * size, y: 0.5796 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0378 * size, y: 0.5796 * size },
            to: { id: pointId++, x: 0.0325 * size, y: 0.5970 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0325 * size, y: 0.5970 * size },
            to: { id: pointId++, x: 0.0308 * size, y: 0.6161 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0308 * size, y: 0.6161 * size },
            to: { id: pointId++, x: 0.0326 * size, y: 0.6355 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0326 * size, y: 0.6355 * size },
            to: { id: pointId++, x: 0.0379 * size, y: 0.6531 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0379 * size, y: 0.6531 * size },
            to: { id: pointId++, x: 0.0468 * size, y: 0.6689 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0468 * size, y: 0.6689 * size },
            to: { id: pointId++, x: 0.0593 * size, y: 0.6829 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0593 * size, y: 0.6829 * size },
            to: { id: pointId++, x: 0.0751 * size, y: 0.6944 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0751 * size, y: 0.6944 * size },
            to: { id: pointId++, x: 0.0938 * size, y: 0.7026 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0938 * size, y: 0.7026 * size },
            to: { id: pointId++, x: 0.1156 * size, y: 0.7075 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1156 * size, y: 0.7075 * size },
            to: { id: pointId++, x: 0.1403 * size, y: 0.7092 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1403 * size, y: 0.7092 * size },
            to: { id: pointId++, x: 0.1564 * size, y: 0.7085 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1564 * size, y: 0.7085 * size },
            to: { id: pointId++, x: 0.1714 * size, y: 0.7064 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1714 * size, y: 0.7064 * size },
            to: { id: pointId++, x: 0.1853 * size, y: 0.7029 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1853 * size, y: 0.7029 * size },
            to: { id: pointId++, x: 0.1982 * size, y: 0.6980 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1982 * size, y: 0.6980 * size },
            to: { id: pointId++, x: 0.2099 * size, y: 0.6917 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2099 * size, y: 0.6917 * size },
            to: { id: pointId++, x: 0.2202 * size, y: 0.6842 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2202 * size, y: 0.6842 * size },
            to: { id: pointId++, x: 0.2291 * size, y: 0.6753 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2291 * size, y: 0.6753 * size },
            to: { id: pointId++, x: 0.2366 * size, y: 0.6652 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2366 * size, y: 0.6652 * size },
            to: { id: pointId++, x: 0.2426 * size, y: 0.6540 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2426 * size, y: 0.6540 * size },
            to: { id: pointId++, x: 0.2468 * size, y: 0.6422 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2468 * size, y: 0.6422 * size },
            to: { id: pointId++, x: 0.2494 * size, y: 0.6298 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2494 * size, y: 0.6298 * size },
            to: { id: pointId++, x: 0.2502 * size, y: 0.6167 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2502 * size, y: 0.6167 * size },
            to: { id: pointId++, x: 0.2486 * size, y: 0.5983 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2486 * size, y: 0.5983 * size },
            to: { id: pointId++, x: 0.2437 * size, y: 0.5812 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2437 * size, y: 0.5812 * size },
            to: { id: pointId++, x: 0.2355 * size, y: 0.5654 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2355 * size, y: 0.5654 * size },
            to: { id: pointId++, x: 0.2240 * size, y: 0.5510 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2240 * size, y: 0.5510 * size },
            to: { id: pointId++, x: 0.2087 * size, y: 0.5389 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2087 * size, y: 0.5389 * size },
            to: { id: pointId++, x: 0.1890 * size, y: 0.5303 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1890 * size, y: 0.5303 * size },
            to: { id: pointId++, x: 0.1649 * size, y: 0.5252 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1649 * size, y: 0.5252 * size },
            to: { id: pointId++, x: 0.1364 * size, y: 0.5234 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1364 * size, y: 0.5234 * size },
            to: { id: pointId++, x: 0.1364 * size, y: 0.5234 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0046 * size, y: 0.7926 * size },
            to: { id: pointId++, x: 0.2764 * size, y: 0.7926 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2764 * size, y: 0.7926 * size },
            to: { id: pointId++, x: 0.2764 * size, y: 0.8951 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2764 * size, y: 0.8951 * size },
            to: { id: pointId++, x: 0.2762 * size, y: 0.9078 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2762 * size, y: 0.9078 * size },
            to: { id: pointId++, x: 0.2757 * size, y: 0.9190 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2757 * size, y: 0.9190 * size },
            to: { id: pointId++, x: 0.2749 * size, y: 0.9285 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2749 * size, y: 0.9285 * size },
            to: { id: pointId++, x: 0.2738 * size, y: 0.9364 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2738 * size, y: 0.9364 * size },
            to: { id: pointId++, x: 0.2717 * size, y: 0.9460 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2717 * size, y: 0.9460 * size },
            to: { id: pointId++, x: 0.2689 * size, y: 0.9548 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2689 * size, y: 0.9548 * size },
            to: { id: pointId++, x: 0.2654 * size, y: 0.9628 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2654 * size, y: 0.9628 * size },
            to: { id: pointId++, x: 0.2611 * size, y: 0.9700 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2611 * size, y: 0.9700 * size },
            to: { id: pointId++, x: 0.2559 * size, y: 0.9764 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2559 * size, y: 0.9764 * size },
            to: { id: pointId++, x: 0.2498 * size, y: 0.9822 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2498 * size, y: 0.9822 * size },
            to: { id: pointId++, x: 0.2428 * size, y: 0.9873 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2428 * size, y: 0.9873 * size },
            to: { id: pointId++, x: 0.2348 * size, y: 0.9918 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2348 * size, y: 0.9918 * size },
            to: { id: pointId++, x: 0.2262 * size, y: 0.9954 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2262 * size, y: 0.9954 * size },
            to: { id: pointId++, x: 0.2171 * size, y: 0.9979 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2171 * size, y: 0.9979 * size },
            to: { id: pointId++, x: 0.2077 * size, y: 0.9995 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2077 * size, y: 0.9995 * size },
            to: { id: pointId++, x: 0.1978 * size, y: 1.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1978 * size, y: 1.0000 * size },
            to: { id: pointId++, x: 0.1811 * size, y: 0.9986 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1811 * size, y: 0.9986 * size },
            to: { id: pointId++, x: 0.1658 * size, y: 0.9945 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1658 * size, y: 0.9945 * size },
            to: { id: pointId++, x: 0.1518 * size, y: 0.9876 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1518 * size, y: 0.9876 * size },
            to: { id: pointId++, x: 0.1391 * size, y: 0.9779 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1391 * size, y: 0.9779 * size },
            to: { id: pointId++, x: 0.1286 * size, y: 0.9647 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1286 * size, y: 0.9647 * size },
            to: { id: pointId++, x: 0.1211 * size, y: 0.9470 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1211 * size, y: 0.9470 * size },
            to: { id: pointId++, x: 0.1166 * size, y: 0.9248 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1166 * size, y: 0.9248 * size },
            to: { id: pointId++, x: 0.1151 * size, y: 0.8982 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1151 * size, y: 0.8982 * size },
            to: { id: pointId++, x: 0.1151 * size, y: 0.8285 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1151 * size, y: 0.8285 * size },
            to: { id: pointId++, x: 0.0046 * size, y: 0.8285 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0046 * size, y: 0.8285 * size },
            to: { id: pointId++, x: 0.0046 * size, y: 0.7926 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0046 * size, y: 0.7926 * size },
            to: { id: pointId++, x: 0.0046 * size, y: 0.7926 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1472 * size, y: 0.8285 * size },
            to: { id: pointId++, x: 0.1472 * size, y: 0.8988 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1472 * size, y: 0.8988 * size },
            to: { id: pointId++, x: 0.1480 * size, y: 0.9150 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1480 * size, y: 0.9150 * size },
            to: { id: pointId++, x: 0.1504 * size, y: 0.9286 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1504 * size, y: 0.9286 * size },
            to: { id: pointId++, x: 0.1545 * size, y: 0.9397 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1545 * size, y: 0.9397 * size },
            to: { id: pointId++, x: 0.1601 * size, y: 0.9483 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1601 * size, y: 0.9483 * size },
            to: { id: pointId++, x: 0.1673 * size, y: 0.9547 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1673 * size, y: 0.9547 * size },
            to: { id: pointId++, x: 0.1758 * size, y: 0.9593 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1758 * size, y: 0.9593 * size },
            to: { id: pointId++, x: 0.1856 * size, y: 0.9620 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1856 * size, y: 0.9620 * size },
            to: { id: pointId++, x: 0.1967 * size, y: 0.9629 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1967 * size, y: 0.9629 * size },
            to: { id: pointId++, x: 0.2049 * size, y: 0.9624 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2049 * size, y: 0.9624 * size },
            to: { id: pointId++, x: 0.2125 * size, y: 0.9608 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2125 * size, y: 0.9608 * size },
            to: { id: pointId++, x: 0.2195 * size, y: 0.9581 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2195 * size, y: 0.9581 * size },
            to: { id: pointId++, x: 0.2259 * size, y: 0.9543 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2259 * size, y: 0.9543 * size },
            to: { id: pointId++, x: 0.2314 * size, y: 0.9497 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2314 * size, y: 0.9497 * size },
            to: { id: pointId++, x: 0.2359 * size, y: 0.9443 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2359 * size, y: 0.9443 * size },
            to: { id: pointId++, x: 0.2394 * size, y: 0.9383 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2394 * size, y: 0.9383 * size },
            to: { id: pointId++, x: 0.2419 * size, y: 0.9316 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2419 * size, y: 0.9316 * size },
            to: { id: pointId++, x: 0.2429 * size, y: 0.9261 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2429 * size, y: 0.9261 * size },
            to: { id: pointId++, x: 0.2437 * size, y: 0.9187 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2437 * size, y: 0.9187 * size },
            to: { id: pointId++, x: 0.2441 * size, y: 0.9093 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2441 * size, y: 0.9093 * size },
            to: { id: pointId++, x: 0.2443 * size, y: 0.8981 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2443 * size, y: 0.8981 * size },
            to: { id: pointId++, x: 0.2443 * size, y: 0.8285 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2443 * size, y: 0.8285 * size },
            to: { id: pointId++, x: 0.1472 * size, y: 0.8285 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1472 * size, y: 0.8285 * size },
            to: { id: pointId++, x: 0.1472 * size, y: 0.8285 * size },
        });
    } else if (signType === "WordSLOW") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0838 * size, y: 0.0000 * size },
            to: { id: pointId++, x: 0.0865 * size, y: 0.0309 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0865 * size, y: 0.0309 * size },
            to: { id: pointId++, x: 0.0777 * size, y: 0.0324 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0777 * size, y: 0.0324 * size },
            to: { id: pointId++, x: 0.0696 * size, y: 0.0346 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0696 * size, y: 0.0346 * size },
            to: { id: pointId++, x: 0.0624 * size, y: 0.0375 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0624 * size, y: 0.0375 * size },
            to: { id: pointId++, x: 0.0560 * size, y: 0.0412 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0560 * size, y: 0.0412 * size },
            to: { id: pointId++, x: 0.0504 * size, y: 0.0457 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0504 * size, y: 0.0457 * size },
            to: { id: pointId++, x: 0.0453 * size, y: 0.0514 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0453 * size, y: 0.0514 * size },
            to: { id: pointId++, x: 0.0407 * size, y: 0.0582 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0407 * size, y: 0.0582 * size },
            to: { id: pointId++, x: 0.0368 * size, y: 0.0661 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0368 * size, y: 0.0661 * size },
            to: { id: pointId++, x: 0.0335 * size, y: 0.0748 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0335 * size, y: 0.0748 * size },
            to: { id: pointId++, x: 0.0313 * size, y: 0.0841 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0313 * size, y: 0.0841 * size },
            to: { id: pointId++, x: 0.0299 * size, y: 0.0938 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0299 * size, y: 0.0938 * size },
            to: { id: pointId++, x: 0.0294 * size, y: 0.1041 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0294 * size, y: 0.1041 * size },
            to: { id: pointId++, x: 0.0298 * size, y: 0.1132 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0298 * size, y: 0.1132 * size },
            to: { id: pointId++, x: 0.0308 * size, y: 0.1218 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0308 * size, y: 0.1218 * size },
            to: { id: pointId++, x: 0.0325 * size, y: 0.1298 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0325 * size, y: 0.1298 * size },
            to: { id: pointId++, x: 0.0350 * size, y: 0.1373 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0350 * size, y: 0.1373 * size },
            to: { id: pointId++, x: 0.0380 * size, y: 0.1440 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0380 * size, y: 0.1440 * size },
            to: { id: pointId++, x: 0.0416 * size, y: 0.1498 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0416 * size, y: 0.1498 * size },
            to: { id: pointId++, x: 0.0457 * size, y: 0.1547 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0457 * size, y: 0.1547 * size },
            to: { id: pointId++, x: 0.0503 * size, y: 0.1586 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0503 * size, y: 0.1586 * size },
            to: { id: pointId++, x: 0.0553 * size, y: 0.1617 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0553 * size, y: 0.1617 * size },
            to: { id: pointId++, x: 0.0605 * size, y: 0.1639 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0605 * size, y: 0.1639 * size },
            to: { id: pointId++, x: 0.0659 * size, y: 0.1652 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0659 * size, y: 0.1652 * size },
            to: { id: pointId++, x: 0.0715 * size, y: 0.1657 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0715 * size, y: 0.1657 * size },
            to: { id: pointId++, x: 0.0771 * size, y: 0.1652 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0771 * size, y: 0.1652 * size },
            to: { id: pointId++, x: 0.0824 * size, y: 0.1640 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0824 * size, y: 0.1640 * size },
            to: { id: pointId++, x: 0.0873 * size, y: 0.1618 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0873 * size, y: 0.1618 * size },
            to: { id: pointId++, x: 0.0919 * size, y: 0.1589 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0919 * size, y: 0.1589 * size },
            to: { id: pointId++, x: 0.0960 * size, y: 0.1550 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0960 * size, y: 0.1550 * size },
            to: { id: pointId++, x: 0.0999 * size, y: 0.1499 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0999 * size, y: 0.1499 * size },
            to: { id: pointId++, x: 0.1034 * size, y: 0.1438 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1034 * size, y: 0.1438 * size },
            to: { id: pointId++, x: 0.1065 * size, y: 0.1366 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1065 * size, y: 0.1366 * size },
            to: { id: pointId++, x: 0.1087 * size, y: 0.1301 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1087 * size, y: 0.1301 * size },
            to: { id: pointId++, x: 0.1115 * size, y: 0.1206 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1115 * size, y: 0.1206 * size },
            to: { id: pointId++, x: 0.1147 * size, y: 0.1080 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1147 * size, y: 0.1080 * size },
            to: { id: pointId++, x: 0.1186 * size, y: 0.0925 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1186 * size, y: 0.0925 * size },
            to: { id: pointId++, x: 0.1226 * size, y: 0.0767 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1226 * size, y: 0.0767 * size },
            to: { id: pointId++, x: 0.1265 * size, y: 0.0634 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1265 * size, y: 0.0634 * size },
            to: { id: pointId++, x: 0.1304 * size, y: 0.0527 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1304 * size, y: 0.0527 * size },
            to: { id: pointId++, x: 0.1340 * size, y: 0.0446 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1340 * size, y: 0.0446 * size },
            to: { id: pointId++, x: 0.1390 * size, y: 0.0363 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1390 * size, y: 0.0363 * size },
            to: { id: pointId++, x: 0.1445 * size, y: 0.0291 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1445 * size, y: 0.0291 * size },
            to: { id: pointId++, x: 0.1505 * size, y: 0.0231 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1505 * size, y: 0.0231 * size },
            to: { id: pointId++, x: 0.1571 * size, y: 0.0182 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1571 * size, y: 0.0182 * size },
            to: { id: pointId++, x: 0.1642 * size, y: 0.0144 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1642 * size, y: 0.0144 * size },
            to: { id: pointId++, x: 0.1717 * size, y: 0.0116 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1717 * size, y: 0.0116 * size },
            to: { id: pointId++, x: 0.1796 * size, y: 0.0100 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1796 * size, y: 0.0100 * size },
            to: { id: pointId++, x: 0.1880 * size, y: 0.0095 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1880 * size, y: 0.0095 * size },
            to: { id: pointId++, x: 0.1972 * size, y: 0.0101 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1972 * size, y: 0.0101 * size },
            to: { id: pointId++, x: 0.2061 * size, y: 0.0121 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2061 * size, y: 0.0121 * size },
            to: { id: pointId++, x: 0.2147 * size, y: 0.0155 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2147 * size, y: 0.0155 * size },
            to: { id: pointId++, x: 0.2230 * size, y: 0.0201 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2230 * size, y: 0.0201 * size },
            to: { id: pointId++, x: 0.2307 * size, y: 0.0261 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2307 * size, y: 0.0261 * size },
            to: { id: pointId++, x: 0.2374 * size, y: 0.0332 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2374 * size, y: 0.0332 * size },
            to: { id: pointId++, x: 0.2431 * size, y: 0.0416 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2431 * size, y: 0.0416 * size },
            to: { id: pointId++, x: 0.2478 * size, y: 0.0512 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2478 * size, y: 0.0512 * size },
            to: { id: pointId++, x: 0.2515 * size, y: 0.0617 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2515 * size, y: 0.0617 * size },
            to: { id: pointId++, x: 0.2541 * size, y: 0.0728 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2541 * size, y: 0.0728 * size },
            to: { id: pointId++, x: 0.2557 * size, y: 0.0845 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2557 * size, y: 0.0845 * size },
            to: { id: pointId++, x: 0.2563 * size, y: 0.0967 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2563 * size, y: 0.0967 * size },
            to: { id: pointId++, x: 0.2557 * size, y: 0.1101 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2557 * size, y: 0.1101 * size },
            to: { id: pointId++, x: 0.2540 * size, y: 0.1226 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2540 * size, y: 0.1226 * size },
            to: { id: pointId++, x: 0.2513 * size, y: 0.1344 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2513 * size, y: 0.1344 * size },
            to: { id: pointId++, x: 0.2474 * size, y: 0.1453 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2474 * size, y: 0.1453 * size },
            to: { id: pointId++, x: 0.2424 * size, y: 0.1552 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2424 * size, y: 0.1552 * size },
            to: { id: pointId++, x: 0.2364 * size, y: 0.1639 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2364 * size, y: 0.1639 * size },
            to: { id: pointId++, x: 0.2294 * size, y: 0.1714 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2294 * size, y: 0.1714 * size },
            to: { id: pointId++, x: 0.2213 * size, y: 0.1777 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2213 * size, y: 0.1777 * size },
            to: { id: pointId++, x: 0.2124 * size, y: 0.1827 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2124 * size, y: 0.1827 * size },
            to: { id: pointId++, x: 0.2029 * size, y: 0.1864 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2029 * size, y: 0.1864 * size },
            to: { id: pointId++, x: 0.1928 * size, y: 0.1887 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1928 * size, y: 0.1887 * size },
            to: { id: pointId++, x: 0.1822 * size, y: 0.1898 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1822 * size, y: 0.1898 * size },
            to: { id: pointId++, x: 0.1799 * size, y: 0.1584 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1799 * size, y: 0.1584 * size },
            to: { id: pointId++, x: 0.1909 * size, y: 0.1564 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1909 * size, y: 0.1564 * size },
            to: { id: pointId++, x: 0.2005 * size, y: 0.1528 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2005 * size, y: 0.1528 * size },
            to: { id: pointId++, x: 0.2086 * size, y: 0.1478 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2086 * size, y: 0.1478 * size },
            to: { id: pointId++, x: 0.2153 * size, y: 0.1412 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2153 * size, y: 0.1412 * size },
            to: { id: pointId++, x: 0.2206 * size, y: 0.1330 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2206 * size, y: 0.1330 * size },
            to: { id: pointId++, x: 0.2243 * size, y: 0.1231 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2243 * size, y: 0.1231 * size },
            to: { id: pointId++, x: 0.2266 * size, y: 0.1115 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2266 * size, y: 0.1115 * size },
            to: { id: pointId++, x: 0.2273 * size, y: 0.0980 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2273 * size, y: 0.0980 * size },
            to: { id: pointId++, x: 0.2267 * size, y: 0.0842 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2267 * size, y: 0.0842 * size },
            to: { id: pointId++, x: 0.2246 * size, y: 0.0723 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2246 * size, y: 0.0723 * size },
            to: { id: pointId++, x: 0.2212 * size, y: 0.0625 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2212 * size, y: 0.0625 * size },
            to: { id: pointId++, x: 0.2164 * size, y: 0.0547 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2164 * size, y: 0.0547 * size },
            to: { id: pointId++, x: 0.2107 * size, y: 0.0487 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2107 * size, y: 0.0487 * size },
            to: { id: pointId++, x: 0.2044 * size, y: 0.0445 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2044 * size, y: 0.0445 * size },
            to: { id: pointId++, x: 0.1976 * size, y: 0.0419 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1976 * size, y: 0.0419 * size },
            to: { id: pointId++, x: 0.1902 * size, y: 0.0411 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1902 * size, y: 0.0411 * size },
            to: { id: pointId++, x: 0.1838 * size, y: 0.0417 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1838 * size, y: 0.0417 * size },
            to: { id: pointId++, x: 0.1780 * size, y: 0.0435 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1780 * size, y: 0.0435 * size },
            to: { id: pointId++, x: 0.1728 * size, y: 0.0465 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1728 * size, y: 0.0465 * size },
            to: { id: pointId++, x: 0.1682 * size, y: 0.0507 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1682 * size, y: 0.0507 * size },
            to: { id: pointId++, x: 0.1639 * size, y: 0.0573 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1639 * size, y: 0.0573 * size },
            to: { id: pointId++, x: 0.1595 * size, y: 0.0678 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1595 * size, y: 0.0678 * size },
            to: { id: pointId++, x: 0.1550 * size, y: 0.0821 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1550 * size, y: 0.0821 * size },
            to: { id: pointId++, x: 0.1505 * size, y: 0.1002 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1505 * size, y: 0.1002 * size },
            to: { id: pointId++, x: 0.1461 * size, y: 0.1186 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1461 * size, y: 0.1186 * size },
            to: { id: pointId++, x: 0.1421 * size, y: 0.1339 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1421 * size, y: 0.1339 * size },
            to: { id: pointId++, x: 0.1382 * size, y: 0.1460 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1382 * size, y: 0.1460 * size },
            to: { id: pointId++, x: 0.1347 * size, y: 0.1550 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1347 * size, y: 0.1550 * size },
            to: { id: pointId++, x: 0.1294 * size, y: 0.1651 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1294 * size, y: 0.1651 * size },
            to: { id: pointId++, x: 0.1234 * size, y: 0.1738 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1234 * size, y: 0.1738 * size },
            to: { id: pointId++, x: 0.1168 * size, y: 0.1811 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1168 * size, y: 0.1811 * size },
            to: { id: pointId++, x: 0.1094 * size, y: 0.1870 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1094 * size, y: 0.1870 * size },
            to: { id: pointId++, x: 0.1015 * size, y: 0.1915 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1015 * size, y: 0.1915 * size },
            to: { id: pointId++, x: 0.0930 * size, y: 0.1947 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0930 * size, y: 0.1947 * size },
            to: { id: pointId++, x: 0.0839 * size, y: 0.1966 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0839 * size, y: 0.1966 * size },
            to: { id: pointId++, x: 0.0742 * size, y: 0.1973 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0742 * size, y: 0.1973 * size },
            to: { id: pointId++, x: 0.0645 * size, y: 0.1966 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0645 * size, y: 0.1966 * size },
            to: { id: pointId++, x: 0.0550 * size, y: 0.1944 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0550 * size, y: 0.1944 * size },
            to: { id: pointId++, x: 0.0458 * size, y: 0.1909 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0458 * size, y: 0.1909 * size },
            to: { id: pointId++, x: 0.0369 * size, y: 0.1859 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0369 * size, y: 0.1859 * size },
            to: { id: pointId++, x: 0.0287 * size, y: 0.1797 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0287 * size, y: 0.1797 * size },
            to: { id: pointId++, x: 0.0214 * size, y: 0.1721 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0214 * size, y: 0.1721 * size },
            to: { id: pointId++, x: 0.0151 * size, y: 0.1634 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0151 * size, y: 0.1634 * size },
            to: { id: pointId++, x: 0.0097 * size, y: 0.1534 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0097 * size, y: 0.1534 * size },
            to: { id: pointId++, x: 0.0055 * size, y: 0.1425 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0055 * size, y: 0.1425 * size },
            to: { id: pointId++, x: 0.0024 * size, y: 0.1309 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0024 * size, y: 0.1309 * size },
            to: { id: pointId++, x: 0.0006 * size, y: 0.1186 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0006 * size, y: 0.1186 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.1056 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.1056 * size },
            to: { id: pointId++, x: 0.0006 * size, y: 0.0895 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0006 * size, y: 0.0895 * size },
            to: { id: pointId++, x: 0.0025 * size, y: 0.0747 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0025 * size, y: 0.0747 * size },
            to: { id: pointId++, x: 0.0055 * size, y: 0.0613 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0055 * size, y: 0.0613 * size },
            to: { id: pointId++, x: 0.0098 * size, y: 0.0493 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0098 * size, y: 0.0493 * size },
            to: { id: pointId++, x: 0.0153 * size, y: 0.0385 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0153 * size, y: 0.0385 * size },
            to: { id: pointId++, x: 0.0221 * size, y: 0.0290 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0221 * size, y: 0.0290 * size },
            to: { id: pointId++, x: 0.0301 * size, y: 0.0207 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0301 * size, y: 0.0207 * size },
            to: { id: pointId++, x: 0.0393 * size, y: 0.0136 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0393 * size, y: 0.0136 * size },
            to: { id: pointId++, x: 0.0495 * size, y: 0.0079 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0495 * size, y: 0.0079 * size },
            to: { id: pointId++, x: 0.0603 * size, y: 0.0037 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0603 * size, y: 0.0037 * size },
            to: { id: pointId++, x: 0.0717 * size, y: 0.0011 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0717 * size, y: 0.0011 * size },
            to: { id: pointId++, x: 0.0838 * size, y: 0.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0838 * size, y: 0.0000 * size },
            to: { id: pointId++, x: 0.0838 * size, y: 0.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0042 * size, y: 0.2407 * size },
            to: { id: pointId++, x: 0.2520 * size, y: 0.2407 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2520 * size, y: 0.2407 * size },
            to: { id: pointId++, x: 0.2520 * size, y: 0.2735 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2520 * size, y: 0.2735 * size },
            to: { id: pointId++, x: 0.0335 * size, y: 0.2735 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0335 * size, y: 0.2735 * size },
            to: { id: pointId++, x: 0.0335 * size, y: 0.3955 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0335 * size, y: 0.3955 * size },
            to: { id: pointId++, x: 0.0042 * size, y: 0.3955 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0042 * size, y: 0.3955 * size },
            to: { id: pointId++, x: 0.0042 * size, y: 0.2407 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0042 * size, y: 0.2407 * size },
            to: { id: pointId++, x: 0.0042 * size, y: 0.2407 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1249 * size, y: 0.4246 * size },
            to: { id: pointId++, x: 0.1541 * size, y: 0.4267 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1541 * size, y: 0.4267 * size },
            to: { id: pointId++, x: 0.1799 * size, y: 0.4329 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1799 * size, y: 0.4329 * size },
            to: { id: pointId++, x: 0.2024 * size, y: 0.4432 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2024 * size, y: 0.4432 * size },
            to: { id: pointId++, x: 0.2215 * size, y: 0.4577 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2215 * size, y: 0.4577 * size },
            to: { id: pointId++, x: 0.2368 * size, y: 0.4755 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2368 * size, y: 0.4755 * size },
            to: { id: pointId++, x: 0.2477 * size, y: 0.4957 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2477 * size, y: 0.4957 * size },
            to: { id: pointId++, x: 0.2542 * size, y: 0.5183 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2542 * size, y: 0.5183 * size },
            to: { id: pointId++, x: 0.2564 * size, y: 0.5433 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2564 * size, y: 0.5433 * size },
            to: { id: pointId++, x: 0.2554 * size, y: 0.5600 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2554 * size, y: 0.5600 * size },
            to: { id: pointId++, x: 0.2523 * size, y: 0.5759 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2523 * size, y: 0.5759 * size },
            to: { id: pointId++, x: 0.2472 * size, y: 0.5909 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2472 * size, y: 0.5909 * size },
            to: { id: pointId++, x: 0.2400 * size, y: 0.6051 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2400 * size, y: 0.6051 * size },
            to: { id: pointId++, x: 0.2310 * size, y: 0.6181 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2310 * size, y: 0.6181 * size },
            to: { id: pointId++, x: 0.2204 * size, y: 0.6294 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2204 * size, y: 0.6294 * size },
            to: { id: pointId++, x: 0.2082 * size, y: 0.6391 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2082 * size, y: 0.6391 * size },
            to: { id: pointId++, x: 0.1943 * size, y: 0.6471 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1943 * size, y: 0.6471 * size },
            to: { id: pointId++, x: 0.1791 * size, y: 0.6535 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1791 * size, y: 0.6535 * size },
            to: { id: pointId++, x: 0.1630 * size, y: 0.6580 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1630 * size, y: 0.6580 * size },
            to: { id: pointId++, x: 0.1459 * size, y: 0.6607 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1459 * size, y: 0.6607 * size },
            to: { id: pointId++, x: 0.1278 * size, y: 0.6616 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1278 * size, y: 0.6616 * size },
            to: { id: pointId++, x: 0.1094 * size, y: 0.6606 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1094 * size, y: 0.6606 * size },
            to: { id: pointId++, x: 0.0921 * size, y: 0.6578 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0921 * size, y: 0.6578 * size },
            to: { id: pointId++, x: 0.0757 * size, y: 0.6530 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0757 * size, y: 0.6530 * size },
            to: { id: pointId++, x: 0.0603 * size, y: 0.6464 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0603 * size, y: 0.6464 * size },
            to: { id: pointId++, x: 0.0464 * size, y: 0.6380 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0464 * size, y: 0.6380 * size },
            to: { id: pointId++, x: 0.0342 * size, y: 0.6280 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0342 * size, y: 0.6280 * size },
            to: { id: pointId++, x: 0.0238 * size, y: 0.6164 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0238 * size, y: 0.6164 * size },
            to: { id: pointId++, x: 0.0153 * size, y: 0.6033 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0153 * size, y: 0.6033 * size },
            to: { id: pointId++, x: 0.0086 * size, y: 0.5891 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0086 * size, y: 0.5891 * size },
            to: { id: pointId++, x: 0.0038 * size, y: 0.5743 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0038 * size, y: 0.5743 * size },
            to: { id: pointId++, x: 0.0010 * size, y: 0.5590 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0010 * size, y: 0.5590 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.5431 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.5431 * size },
            to: { id: pointId++, x: 0.0011 * size, y: 0.5261 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0011 * size, y: 0.5261 * size },
            to: { id: pointId++, x: 0.0042 * size, y: 0.5100 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0042 * size, y: 0.5100 * size },
            to: { id: pointId++, x: 0.0095 * size, y: 0.4948 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0095 * size, y: 0.4948 * size },
            to: { id: pointId++, x: 0.0169 * size, y: 0.4806 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0169 * size, y: 0.4806 * size },
            to: { id: pointId++, x: 0.0261 * size, y: 0.4676 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0261 * size, y: 0.4676 * size },
            to: { id: pointId++, x: 0.0369 * size, y: 0.4563 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0369 * size, y: 0.4563 * size },
            to: { id: pointId++, x: 0.0492 * size, y: 0.4467 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0492 * size, y: 0.4467 * size },
            to: { id: pointId++, x: 0.0630 * size, y: 0.4388 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0630 * size, y: 0.4388 * size },
            to: { id: pointId++, x: 0.0779 * size, y: 0.4326 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0779 * size, y: 0.4326 * size },
            to: { id: pointId++, x: 0.0931 * size, y: 0.4282 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0931 * size, y: 0.4282 * size },
            to: { id: pointId++, x: 0.1088 * size, y: 0.4255 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1088 * size, y: 0.4255 * size },
            to: { id: pointId++, x: 0.1249 * size, y: 0.4246 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1249 * size, y: 0.4246 * size },
            to: { id: pointId++, x: 0.1249 * size, y: 0.4246 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1244 * size, y: 0.4584 * size },
            to: { id: pointId++, x: 0.1032 * size, y: 0.4599 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1032 * size, y: 0.4599 * size },
            to: { id: pointId++, x: 0.0844 * size, y: 0.4644 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0844 * size, y: 0.4644 * size },
            to: { id: pointId++, x: 0.0679 * size, y: 0.4720 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0679 * size, y: 0.4720 * size },
            to: { id: pointId++, x: 0.0538 * size, y: 0.4825 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0538 * size, y: 0.4825 * size },
            to: { id: pointId++, x: 0.0426 * size, y: 0.4953 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0426 * size, y: 0.4953 * size },
            to: { id: pointId++, x: 0.0345 * size, y: 0.5097 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0345 * size, y: 0.5097 * size },
            to: { id: pointId++, x: 0.0297 * size, y: 0.5255 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0297 * size, y: 0.5255 * size },
            to: { id: pointId++, x: 0.0281 * size, y: 0.5429 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0281 * size, y: 0.5429 * size },
            to: { id: pointId++, x: 0.0297 * size, y: 0.5606 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0297 * size, y: 0.5606 * size },
            to: { id: pointId++, x: 0.0346 * size, y: 0.5767 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0346 * size, y: 0.5767 * size },
            to: { id: pointId++, x: 0.0427 * size, y: 0.5911 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0427 * size, y: 0.5911 * size },
            to: { id: pointId++, x: 0.0541 * size, y: 0.6039 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0541 * size, y: 0.6039 * size },
            to: { id: pointId++, x: 0.0685 * size, y: 0.6143 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0685 * size, y: 0.6143 * size },
            to: { id: pointId++, x: 0.0856 * size, y: 0.6218 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0856 * size, y: 0.6218 * size },
            to: { id: pointId++, x: 0.1054 * size, y: 0.6263 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1054 * size, y: 0.6263 * size },
            to: { id: pointId++, x: 0.1280 * size, y: 0.6278 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1280 * size, y: 0.6278 * size },
            to: { id: pointId++, x: 0.1426 * size, y: 0.6271 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1426 * size, y: 0.6271 * size },
            to: { id: pointId++, x: 0.1563 * size, y: 0.6252 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1563 * size, y: 0.6252 * size },
            to: { id: pointId++, x: 0.1690 * size, y: 0.6220 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1690 * size, y: 0.6220 * size },
            to: { id: pointId++, x: 0.1808 * size, y: 0.6176 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1808 * size, y: 0.6176 * size },
            to: { id: pointId++, x: 0.1914 * size, y: 0.6119 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1914 * size, y: 0.6119 * size },
            to: { id: pointId++, x: 0.2008 * size, y: 0.6050 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2008 * size, y: 0.6050 * size },
            to: { id: pointId++, x: 0.2089 * size, y: 0.5969 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2089 * size, y: 0.5969 * size },
            to: { id: pointId++, x: 0.2158 * size, y: 0.5876 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2158 * size, y: 0.5876 * size },
            to: { id: pointId++, x: 0.2212 * size, y: 0.5775 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2212 * size, y: 0.5775 * size },
            to: { id: pointId++, x: 0.2251 * size, y: 0.5667 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2251 * size, y: 0.5667 * size },
            to: { id: pointId++, x: 0.2274 * size, y: 0.5554 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2274 * size, y: 0.5554 * size },
            to: { id: pointId++, x: 0.2282 * size, y: 0.5434 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2282 * size, y: 0.5434 * size },
            to: { id: pointId++, x: 0.2267 * size, y: 0.5266 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2267 * size, y: 0.5266 * size },
            to: { id: pointId++, x: 0.2222 * size, y: 0.5111 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2222 * size, y: 0.5111 * size },
            to: { id: pointId++, x: 0.2147 * size, y: 0.4967 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2147 * size, y: 0.4967 * size },
            to: { id: pointId++, x: 0.2043 * size, y: 0.4835 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2043 * size, y: 0.4835 * size },
            to: { id: pointId++, x: 0.1903 * size, y: 0.4725 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1903 * size, y: 0.4725 * size },
            to: { id: pointId++, x: 0.1724 * size, y: 0.4647 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1724 * size, y: 0.4647 * size },
            to: { id: pointId++, x: 0.1504 * size, y: 0.4600 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1504 * size, y: 0.4600 * size },
            to: { id: pointId++, x: 0.1244 * size, y: 0.4584 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1244 * size, y: 0.4584 * size },
            to: { id: pointId++, x: 0.1244 * size, y: 0.4584 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0042 * size, y: 0.7471 * size },
            to: { id: pointId++, x: 0.2520 * size, y: 0.6814 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2520 * size, y: 0.6814 * size },
            to: { id: pointId++, x: 0.2520 * size, y: 0.7150 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2520 * size, y: 0.7150 * size },
            to: { id: pointId++, x: 0.0896 * size, y: 0.7527 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0896 * size, y: 0.7527 * size },
            to: { id: pointId++, x: 0.0768 * size, y: 0.7556 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0768 * size, y: 0.7556 * size },
            to: { id: pointId++, x: 0.0641 * size, y: 0.7584 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0641 * size, y: 0.7584 * size },
            to: { id: pointId++, x: 0.0515 * size, y: 0.7609 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0515 * size, y: 0.7609 * size },
            to: { id: pointId++, x: 0.0389 * size, y: 0.7632 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0389 * size, y: 0.7632 * size },
            to: { id: pointId++, x: 0.0566 * size, y: 0.7674 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0566 * size, y: 0.7674 * size },
            to: { id: pointId++, x: 0.0702 * size, y: 0.7707 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0702 * size, y: 0.7707 * size },
            to: { id: pointId++, x: 0.0795 * size, y: 0.7730 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0795 * size, y: 0.7730 * size },
            to: { id: pointId++, x: 0.0847 * size, y: 0.7743 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0847 * size, y: 0.7743 * size },
            to: { id: pointId++, x: 0.2520 * size, y: 0.8215 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2520 * size, y: 0.8215 * size },
            to: { id: pointId++, x: 0.2520 * size, y: 0.8611 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2520 * size, y: 0.8611 * size },
            to: { id: pointId++, x: 0.1266 * size, y: 0.8966 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1266 * size, y: 0.8966 * size },
            to: { id: pointId++, x: 0.1036 * size, y: 0.9028 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1036 * size, y: 0.9028 * size },
            to: { id: pointId++, x: 0.0813 * size, y: 0.9080 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0813 * size, y: 0.9080 * size },
            to: { id: pointId++, x: 0.0598 * size, y: 0.9124 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0598 * size, y: 0.9124 * size },
            to: { id: pointId++, x: 0.0389 * size, y: 0.9158 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0389 * size, y: 0.9158 * size },
            to: { id: pointId++, x: 0.0511 * size, y: 0.9184 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0511 * size, y: 0.9184 * size },
            to: { id: pointId++, x: 0.0641 * size, y: 0.9213 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0641 * size, y: 0.9213 * size },
            to: { id: pointId++, x: 0.0780 * size, y: 0.9245 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0780 * size, y: 0.9245 * size },
            to: { id: pointId++, x: 0.0928 * size, y: 0.9282 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0928 * size, y: 0.9282 * size },
            to: { id: pointId++, x: 0.2520 * size, y: 0.9670 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2520 * size, y: 0.9670 * size },
            to: { id: pointId++, x: 0.2520 * size, y: 1.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2520 * size, y: 1.0000 * size },
            to: { id: pointId++, x: 0.0042 * size, y: 0.9320 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0042 * size, y: 0.9320 * size },
            to: { id: pointId++, x: 0.0042 * size, y: 0.9004 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0042 * size, y: 0.9004 * size },
            to: { id: pointId++, x: 0.1930 * size, y: 0.8482 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1930 * size, y: 0.8482 * size },
            to: { id: pointId++, x: 0.2037 * size, y: 0.8453 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2037 * size, y: 0.8453 * size },
            to: { id: pointId++, x: 0.2121 * size, y: 0.8430 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2121 * size, y: 0.8430 * size },
            to: { id: pointId++, x: 0.2183 * size, y: 0.8414 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2183 * size, y: 0.8414 * size },
            to: { id: pointId++, x: 0.2221 * size, y: 0.8404 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2221 * size, y: 0.8404 * size },
            to: { id: pointId++, x: 0.2139 * size, y: 0.8385 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2139 * size, y: 0.8385 * size },
            to: { id: pointId++, x: 0.2063 * size, y: 0.8367 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2063 * size, y: 0.8367 * size },
            to: { id: pointId++, x: 0.1994 * size, y: 0.8349 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1994 * size, y: 0.8349 * size },
            to: { id: pointId++, x: 0.1930 * size, y: 0.8332 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1930 * size, y: 0.8332 * size },
            to: { id: pointId++, x: 0.0042 * size, y: 0.7806 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0042 * size, y: 0.7806 * size },
            to: { id: pointId++, x: 0.0042 * size, y: 0.7471 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0042 * size, y: 0.7471 * size },
            to: { id: pointId++, x: 0.0042 * size, y: 0.7471 * size },
        });
    } else if (signType === "WordBUS") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0063 * size, y: 0.0000 * size },
            to: { id: pointId++, x: 0.3771 * size, y: 0.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3771 * size, y: 0.0000 * size },
            to: { id: pointId++, x: 0.3771 * size, y: 0.1391 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3771 * size, y: 0.1391 * size },
            to: { id: pointId++, x: 0.3764 * size, y: 0.1593 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3764 * size, y: 0.1593 * size },
            to: { id: pointId++, x: 0.3743 * size, y: 0.1774 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3743 * size, y: 0.1774 * size },
            to: { id: pointId++, x: 0.3708 * size, y: 0.1934 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3708 * size, y: 0.1934 * size },
            to: { id: pointId++, x: 0.3658 * size, y: 0.2073 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3658 * size, y: 0.2073 * size },
            to: { id: pointId++, x: 0.3594 * size, y: 0.2194 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3594 * size, y: 0.2194 * size },
            to: { id: pointId++, x: 0.3515 * size, y: 0.2301 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3515 * size, y: 0.2301 * size },
            to: { id: pointId++, x: 0.3421 * size, y: 0.2395 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3421 * size, y: 0.2395 * size },
            to: { id: pointId++, x: 0.3312 * size, y: 0.2475 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3312 * size, y: 0.2475 * size },
            to: { id: pointId++, x: 0.3194 * size, y: 0.2538 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3194 * size, y: 0.2538 * size },
            to: { id: pointId++, x: 0.3073 * size, y: 0.2584 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3073 * size, y: 0.2584 * size },
            to: { id: pointId++, x: 0.2949 * size, y: 0.2611 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2949 * size, y: 0.2611 * size },
            to: { id: pointId++, x: 0.2822 * size, y: 0.2620 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2822 * size, y: 0.2620 * size },
            to: { id: pointId++, x: 0.2705 * size, y: 0.2612 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2705 * size, y: 0.2612 * size },
            to: { id: pointId++, x: 0.2592 * size, y: 0.2588 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2592 * size, y: 0.2588 * size },
            to: { id: pointId++, x: 0.2482 * size, y: 0.2548 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2482 * size, y: 0.2548 * size },
            to: { id: pointId++, x: 0.2375 * size, y: 0.2491 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2375 * size, y: 0.2491 * size },
            to: { id: pointId++, x: 0.2275 * size, y: 0.2418 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2275 * size, y: 0.2418 * size },
            to: { id: pointId++, x: 0.2185 * size, y: 0.2329 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2185 * size, y: 0.2329 * size },
            to: { id: pointId++, x: 0.2105 * size, y: 0.2224 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2105 * size, y: 0.2224 * size },
            to: { id: pointId++, x: 0.2036 * size, y: 0.2102 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2036 * size, y: 0.2102 * size },
            to: { id: pointId++, x: 0.1978 * size, y: 0.2260 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1978 * size, y: 0.2260 * size },
            to: { id: pointId++, x: 0.1903 * size, y: 0.2399 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1903 * size, y: 0.2399 * size },
            to: { id: pointId++, x: 0.1810 * size, y: 0.2519 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1810 * size, y: 0.2519 * size },
            to: { id: pointId++, x: 0.1700 * size, y: 0.2619 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1700 * size, y: 0.2619 * size },
            to: { id: pointId++, x: 0.1575 * size, y: 0.2698 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1575 * size, y: 0.2698 * size },
            to: { id: pointId++, x: 0.1440 * size, y: 0.2754 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1440 * size, y: 0.2754 * size },
            to: { id: pointId++, x: 0.1295 * size, y: 0.2788 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1295 * size, y: 0.2788 * size },
            to: { id: pointId++, x: 0.1138 * size, y: 0.2800 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1138 * size, y: 0.2800 * size },
            to: { id: pointId++, x: 0.1010 * size, y: 0.2793 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1010 * size, y: 0.2793 * size },
            to: { id: pointId++, x: 0.0887 * size, y: 0.2772 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0887 * size, y: 0.2772 * size },
            to: { id: pointId++, x: 0.0768 * size, y: 0.2738 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0768 * size, y: 0.2738 * size },
            to: { id: pointId++, x: 0.0654 * size, y: 0.2690 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0654 * size, y: 0.2690 * size },
            to: { id: pointId++, x: 0.0548 * size, y: 0.2631 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0548 * size, y: 0.2631 * size },
            to: { id: pointId++, x: 0.0456 * size, y: 0.2567 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0456 * size, y: 0.2567 * size },
            to: { id: pointId++, x: 0.0376 * size, y: 0.2495 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0376 * size, y: 0.2495 * size },
            to: { id: pointId++, x: 0.0309 * size, y: 0.2418 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0309 * size, y: 0.2418 * size },
            to: { id: pointId++, x: 0.0252 * size, y: 0.2332 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0252 * size, y: 0.2332 * size },
            to: { id: pointId++, x: 0.0202 * size, y: 0.2235 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0202 * size, y: 0.2235 * size },
            to: { id: pointId++, x: 0.0160 * size, y: 0.2129 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0160 * size, y: 0.2129 * size },
            to: { id: pointId++, x: 0.0125 * size, y: 0.2012 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0125 * size, y: 0.2012 * size },
            to: { id: pointId++, x: 0.0098 * size, y: 0.1883 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0098 * size, y: 0.1883 * size },
            to: { id: pointId++, x: 0.0079 * size, y: 0.1740 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0079 * size, y: 0.1740 * size },
            to: { id: pointId++, x: 0.0067 * size, y: 0.1584 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0067 * size, y: 0.1584 * size },
            to: { id: pointId++, x: 0.0063 * size, y: 0.1414 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0063 * size, y: 0.1414 * size },
            to: { id: pointId++, x: 0.0063 * size, y: 0.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0063 * size, y: 0.0000 * size },
            to: { id: pointId++, x: 0.0063 * size, y: 0.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2213 * size, y: 0.0491 * size },
            to: { id: pointId++, x: 0.2213 * size, y: 0.1292 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2213 * size, y: 0.1292 * size },
            to: { id: pointId++, x: 0.2216 * size, y: 0.1444 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2216 * size, y: 0.1444 * size },
            to: { id: pointId++, x: 0.2224 * size, y: 0.1572 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2224 * size, y: 0.1572 * size },
            to: { id: pointId++, x: 0.2237 * size, y: 0.1678 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2237 * size, y: 0.1678 * size },
            to: { id: pointId++, x: 0.2256 * size, y: 0.1760 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2256 * size, y: 0.1760 * size },
            to: { id: pointId++, x: 0.2288 * size, y: 0.1848 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2288 * size, y: 0.1848 * size },
            to: { id: pointId++, x: 0.2330 * size, y: 0.1924 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2330 * size, y: 0.1924 * size },
            to: { id: pointId++, x: 0.2381 * size, y: 0.1989 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2381 * size, y: 0.1989 * size },
            to: { id: pointId++, x: 0.2441 * size, y: 0.2042 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2441 * size, y: 0.2042 * size },
            to: { id: pointId++, x: 0.2509 * size, y: 0.2084 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2509 * size, y: 0.2084 * size },
            to: { id: pointId++, x: 0.2586 * size, y: 0.2113 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2586 * size, y: 0.2113 * size },
            to: { id: pointId++, x: 0.2671 * size, y: 0.2131 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2671 * size, y: 0.2131 * size },
            to: { id: pointId++, x: 0.2764 * size, y: 0.2137 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2764 * size, y: 0.2137 * size },
            to: { id: pointId++, x: 0.2854 * size, y: 0.2132 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2854 * size, y: 0.2132 * size },
            to: { id: pointId++, x: 0.2938 * size, y: 0.2115 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2938 * size, y: 0.2115 * size },
            to: { id: pointId++, x: 0.3016 * size, y: 0.2087 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3016 * size, y: 0.2087 * size },
            to: { id: pointId++, x: 0.3089 * size, y: 0.2049 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3089 * size, y: 0.2049 * size },
            to: { id: pointId++, x: 0.3154 * size, y: 0.2000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3154 * size, y: 0.2000 * size },
            to: { id: pointId++, x: 0.3208 * size, y: 0.1941 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3208 * size, y: 0.1941 * size },
            to: { id: pointId++, x: 0.3250 * size, y: 0.1873 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3250 * size, y: 0.1873 * size },
            to: { id: pointId++, x: 0.3281 * size, y: 0.1796 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3281 * size, y: 0.1796 * size },
            to: { id: pointId++, x: 0.3304 * size, y: 0.1699 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3304 * size, y: 0.1699 * size },
            to: { id: pointId++, x: 0.3320 * size, y: 0.1572 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3320 * size, y: 0.1572 * size },
            to: { id: pointId++, x: 0.3330 * size, y: 0.1417 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3330 * size, y: 0.1417 * size },
            to: { id: pointId++, x: 0.3333 * size, y: 0.1232 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3333 * size, y: 0.1232 * size },
            to: { id: pointId++, x: 0.3333 * size, y: 0.0491 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3333 * size, y: 0.0491 * size },
            to: { id: pointId++, x: 0.2213 * size, y: 0.0491 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2213 * size, y: 0.0491 * size },
            to: { id: pointId++, x: 0.2213 * size, y: 0.0491 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0501 * size, y: 0.0491 * size },
            to: { id: pointId++, x: 0.0501 * size, y: 0.1414 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0501 * size, y: 0.1414 * size },
            to: { id: pointId++, x: 0.0502 * size, y: 0.1524 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0502 * size, y: 0.1524 * size },
            to: { id: pointId++, x: 0.0505 * size, y: 0.1616 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0505 * size, y: 0.1616 * size },
            to: { id: pointId++, x: 0.0511 * size, y: 0.1691 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0511 * size, y: 0.1691 * size },
            to: { id: pointId++, x: 0.0518 * size, y: 0.1748 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0518 * size, y: 0.1748 * size },
            to: { id: pointId++, x: 0.0536 * size, y: 0.1829 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0536 * size, y: 0.1829 * size },
            to: { id: pointId++, x: 0.0559 * size, y: 0.1903 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0559 * size, y: 0.1903 * size },
            to: { id: pointId++, x: 0.0587 * size, y: 0.1970 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0587 * size, y: 0.1970 * size },
            to: { id: pointId++, x: 0.0620 * size, y: 0.2031 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0620 * size, y: 0.2031 * size },
            to: { id: pointId++, x: 0.0659 * size, y: 0.2085 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0659 * size, y: 0.2085 * size },
            to: { id: pointId++, x: 0.0707 * size, y: 0.2135 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0707 * size, y: 0.2135 * size },
            to: { id: pointId++, x: 0.0762 * size, y: 0.2179 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0762 * size, y: 0.2179 * size },
            to: { id: pointId++, x: 0.0826 * size, y: 0.2218 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0826 * size, y: 0.2218 * size },
            to: { id: pointId++, x: 0.0896 * size, y: 0.2250 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0896 * size, y: 0.2250 * size },
            to: { id: pointId++, x: 0.0971 * size, y: 0.2273 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0971 * size, y: 0.2273 * size },
            to: { id: pointId++, x: 0.1052 * size, y: 0.2287 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1052 * size, y: 0.2287 * size },
            to: { id: pointId++, x: 0.1138 * size, y: 0.2291 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1138 * size, y: 0.2291 * size },
            to: { id: pointId++, x: 0.1238 * size, y: 0.2285 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1238 * size, y: 0.2285 * size },
            to: { id: pointId++, x: 0.1332 * size, y: 0.2265 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1332 * size, y: 0.2265 * size },
            to: { id: pointId++, x: 0.1419 * size, y: 0.2232 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1419 * size, y: 0.2232 * size },
            to: { id: pointId++, x: 0.1498 * size, y: 0.2185 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1498 * size, y: 0.2185 * size },
            to: { id: pointId++, x: 0.1569 * size, y: 0.2127 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1569 * size, y: 0.2127 * size },
            to: { id: pointId++, x: 0.1629 * size, y: 0.2058 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1629 * size, y: 0.2058 * size },
            to: { id: pointId++, x: 0.1677 * size, y: 0.1980 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1677 * size, y: 0.1980 * size },
            to: { id: pointId++, x: 0.1713 * size, y: 0.1890 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1713 * size, y: 0.1890 * size },
            to: { id: pointId++, x: 0.1741 * size, y: 0.1786 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1741 * size, y: 0.1786 * size },
            to: { id: pointId++, x: 0.1760 * size, y: 0.1661 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1760 * size, y: 0.1661 * size },
            to: { id: pointId++, x: 0.1772 * size, y: 0.1515 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1772 * size, y: 0.1515 * size },
            to: { id: pointId++, x: 0.1775 * size, y: 0.1348 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1775 * size, y: 0.1348 * size },
            to: { id: pointId++, x: 0.1775 * size, y: 0.0491 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1775 * size, y: 0.0491 * size },
            to: { id: pointId++, x: 0.0501 * size, y: 0.0491 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0501 * size, y: 0.0491 * size },
            to: { id: pointId++, x: 0.0501 * size, y: 0.0491 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3771 * size, y: 0.5908 * size },
            to: { id: pointId++, x: 0.3771 * size, y: 0.6399 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3771 * size, y: 0.6399 * size },
            to: { id: pointId++, x: 0.1629 * size, y: 0.6399 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1629 * size, y: 0.6399 * size },
            to: { id: pointId++, x: 0.1364 * size, y: 0.6391 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1364 * size, y: 0.6391 * size },
            to: { id: pointId++, x: 0.1127 * size, y: 0.6367 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1127 * size, y: 0.6367 * size },
            to: { id: pointId++, x: 0.0920 * size, y: 0.6327 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0920 * size, y: 0.6327 * size },
            to: { id: pointId++, x: 0.0741 * size, y: 0.6272 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0741 * size, y: 0.6272 * size },
            to: { id: pointId++, x: 0.0584 * size, y: 0.6196 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0584 * size, y: 0.6196 * size },
            to: { id: pointId++, x: 0.0443 * size, y: 0.6095 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0443 * size, y: 0.6095 * size },
            to: { id: pointId++, x: 0.0317 * size, y: 0.5968 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0317 * size, y: 0.5968 * size },
            to: { id: pointId++, x: 0.0206 * size, y: 0.5816 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0206 * size, y: 0.5816 * size },
            to: { id: pointId++, x: 0.0116 * size, y: 0.5638 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0116 * size, y: 0.5638 * size },
            to: { id: pointId++, x: 0.0052 * size, y: 0.5434 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0052 * size, y: 0.5434 * size },
            to: { id: pointId++, x: 0.0013 * size, y: 0.5205 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0013 * size, y: 0.5205 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.4949 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.4949 * size },
            to: { id: pointId++, x: 0.0011 * size, y: 0.4701 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0011 * size, y: 0.4701 * size },
            to: { id: pointId++, x: 0.0045 * size, y: 0.4476 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0045 * size, y: 0.4476 * size },
            to: { id: pointId++, x: 0.0101 * size, y: 0.4275 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0101 * size, y: 0.4275 * size },
            to: { id: pointId++, x: 0.0180 * size, y: 0.4097 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0180 * size, y: 0.4097 * size },
            to: { id: pointId++, x: 0.0279 * size, y: 0.3943 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0279 * size, y: 0.3943 * size },
            to: { id: pointId++, x: 0.0399 * size, y: 0.3813 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0399 * size, y: 0.3813 * size },
            to: { id: pointId++, x: 0.0539 * size, y: 0.3707 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0539 * size, y: 0.3707 * size },
            to: { id: pointId++, x: 0.0699 * size, y: 0.3624 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0699 * size, y: 0.3624 * size },
            to: { id: pointId++, x: 0.0885 * size, y: 0.3562 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0885 * size, y: 0.3562 * size },
            to: { id: pointId++, x: 0.1102 * size, y: 0.3518 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1102 * size, y: 0.3518 * size },
            to: { id: pointId++, x: 0.1350 * size, y: 0.3491 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1350 * size, y: 0.3491 * size },
            to: { id: pointId++, x: 0.1629 * size, y: 0.3483 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1629 * size, y: 0.3483 * size },
            to: { id: pointId++, x: 0.3771 * size, y: 0.3483 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3771 * size, y: 0.3483 * size },
            to: { id: pointId++, x: 0.3771 * size, y: 0.3973 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3771 * size, y: 0.3973 * size },
            to: { id: pointId++, x: 0.1631 * size, y: 0.3973 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1631 * size, y: 0.3973 * size },
            to: { id: pointId++, x: 0.1406 * size, y: 0.3979 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1406 * size, y: 0.3979 * size },
            to: { id: pointId++, x: 0.1212 * size, y: 0.3996 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1212 * size, y: 0.3996 * size },
            to: { id: pointId++, x: 0.1050 * size, y: 0.4024 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1050 * size, y: 0.4024 * size },
            to: { id: pointId++, x: 0.0919 * size, y: 0.4063 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0919 * size, y: 0.4063 * size },
            to: { id: pointId++, x: 0.0811 * size, y: 0.4116 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0811 * size, y: 0.4116 * size },
            to: { id: pointId++, x: 0.0717 * size, y: 0.4185 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0717 * size, y: 0.4185 * size },
            to: { id: pointId++, x: 0.0635 * size, y: 0.4270 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0635 * size, y: 0.4270 * size },
            to: { id: pointId++, x: 0.0567 * size, y: 0.4372 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0567 * size, y: 0.4372 * size },
            to: { id: pointId++, x: 0.0512 * size, y: 0.4487 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0512 * size, y: 0.4487 * size },
            to: { id: pointId++, x: 0.0474 * size, y: 0.4615 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0474 * size, y: 0.4615 * size },
            to: { id: pointId++, x: 0.0450 * size, y: 0.4754 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0450 * size, y: 0.4754 * size },
            to: { id: pointId++, x: 0.0443 * size, y: 0.4906 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0443 * size, y: 0.4906 * size },
            to: { id: pointId++, x: 0.0458 * size, y: 0.5158 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0458 * size, y: 0.5158 * size },
            to: { id: pointId++, x: 0.0504 * size, y: 0.5370 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0504 * size, y: 0.5370 * size },
            to: { id: pointId++, x: 0.0581 * size, y: 0.5543 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0581 * size, y: 0.5543 * size },
            to: { id: pointId++, x: 0.0688 * size, y: 0.5678 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0688 * size, y: 0.5678 * size },
            to: { id: pointId++, x: 0.0839 * size, y: 0.5778 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0839 * size, y: 0.5778 * size },
            to: { id: pointId++, x: 0.1046 * size, y: 0.5850 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1046 * size, y: 0.5850 * size },
            to: { id: pointId++, x: 0.1311 * size, y: 0.5894 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1311 * size, y: 0.5894 * size },
            to: { id: pointId++, x: 0.1631 * size, y: 0.5908 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1631 * size, y: 0.5908 * size },
            to: { id: pointId++, x: 0.3771 * size, y: 0.5908 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3771 * size, y: 0.5908 * size },
            to: { id: pointId++, x: 0.3771 * size, y: 0.5908 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1254 * size, y: 0.7049 * size },
            to: { id: pointId++, x: 0.1295 * size, y: 0.7511 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1295 * size, y: 0.7511 * size },
            to: { id: pointId++, x: 0.1162 * size, y: 0.7533 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1162 * size, y: 0.7533 * size },
            to: { id: pointId++, x: 0.1042 * size, y: 0.7566 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1042 * size, y: 0.7566 * size },
            to: { id: pointId++, x: 0.0934 * size, y: 0.7610 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0934 * size, y: 0.7610 * size },
            to: { id: pointId++, x: 0.0838 * size, y: 0.7664 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0838 * size, y: 0.7664 * size },
            to: { id: pointId++, x: 0.0754 * size, y: 0.7733 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0754 * size, y: 0.7733 * size },
            to: { id: pointId++, x: 0.0677 * size, y: 0.7818 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0677 * size, y: 0.7818 * size },
            to: { id: pointId++, x: 0.0609 * size, y: 0.7919 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0609 * size, y: 0.7919 * size },
            to: { id: pointId++, x: 0.0550 * size, y: 0.8037 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0550 * size, y: 0.8037 * size },
            to: { id: pointId++, x: 0.0502 * size, y: 0.8168 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0502 * size, y: 0.8168 * size },
            to: { id: pointId++, x: 0.0468 * size, y: 0.8306 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0468 * size, y: 0.8306 * size },
            to: { id: pointId++, x: 0.0447 * size, y: 0.8452 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0447 * size, y: 0.8452 * size },
            to: { id: pointId++, x: 0.0440 * size, y: 0.8606 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0440 * size, y: 0.8606 * size },
            to: { id: pointId++, x: 0.0445 * size, y: 0.8743 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0445 * size, y: 0.8743 * size },
            to: { id: pointId++, x: 0.0461 * size, y: 0.8871 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0461 * size, y: 0.8871 * size },
            to: { id: pointId++, x: 0.0487 * size, y: 0.8991 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0487 * size, y: 0.8991 * size },
            to: { id: pointId++, x: 0.0524 * size, y: 0.9102 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0524 * size, y: 0.9102 * size },
            to: { id: pointId++, x: 0.0569 * size, y: 0.9203 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0569 * size, y: 0.9203 * size },
            to: { id: pointId++, x: 0.0622 * size, y: 0.9290 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0622 * size, y: 0.9290 * size },
            to: { id: pointId++, x: 0.0684 * size, y: 0.9363 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0684 * size, y: 0.9363 * size },
            to: { id: pointId++, x: 0.0752 * size, y: 0.9422 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0752 * size, y: 0.9422 * size },
            to: { id: pointId++, x: 0.0827 * size, y: 0.9468 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0827 * size, y: 0.9468 * size },
            to: { id: pointId++, x: 0.0904 * size, y: 0.9501 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0904 * size, y: 0.9501 * size },
            to: { id: pointId++, x: 0.0985 * size, y: 0.9521 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0985 * size, y: 0.9521 * size },
            to: { id: pointId++, x: 0.1070 * size, y: 0.9527 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1070 * size, y: 0.9527 * size },
            to: { id: pointId++, x: 0.1154 * size, y: 0.9521 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1154 * size, y: 0.9521 * size },
            to: { id: pointId++, x: 0.1233 * size, y: 0.9502 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1233 * size, y: 0.9502 * size },
            to: { id: pointId++, x: 0.1307 * size, y: 0.9470 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1307 * size, y: 0.9470 * size },
            to: { id: pointId++, x: 0.1375 * size, y: 0.9426 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1375 * size, y: 0.9426 * size },
            to: { id: pointId++, x: 0.1437 * size, y: 0.9367 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1437 * size, y: 0.9367 * size },
            to: { id: pointId++, x: 0.1494 * size, y: 0.9292 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1494 * size, y: 0.9292 * size },
            to: { id: pointId++, x: 0.1546 * size, y: 0.9200 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1546 * size, y: 0.9200 * size },
            to: { id: pointId++, x: 0.1593 * size, y: 0.9092 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1593 * size, y: 0.9092 * size },
            to: { id: pointId++, x: 0.1626 * size, y: 0.8995 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1626 * size, y: 0.8995 * size },
            to: { id: pointId++, x: 0.1668 * size, y: 0.8852 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1668 * size, y: 0.8852 * size },
            to: { id: pointId++, x: 0.1717 * size, y: 0.8665 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1717 * size, y: 0.8665 * size },
            to: { id: pointId++, x: 0.1774 * size, y: 0.8432 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1774 * size, y: 0.8432 * size },
            to: { id: pointId++, x: 0.1835 * size, y: 0.8196 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1835 * size, y: 0.8196 * size },
            to: { id: pointId++, x: 0.1893 * size, y: 0.7998 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1893 * size, y: 0.7998 * size },
            to: { id: pointId++, x: 0.1950 * size, y: 0.7838 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1950 * size, y: 0.7838 * size },
            to: { id: pointId++, x: 0.2006 * size, y: 0.7716 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2006 * size, y: 0.7716 * size },
            to: { id: pointId++, x: 0.2079 * size, y: 0.7592 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2079 * size, y: 0.7592 * size },
            to: { id: pointId++, x: 0.2161 * size, y: 0.7485 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2161 * size, y: 0.7485 * size },
            to: { id: pointId++, x: 0.2252 * size, y: 0.7394 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2252 * size, y: 0.7394 * size },
            to: { id: pointId++, x: 0.2351 * size, y: 0.7320 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2351 * size, y: 0.7320 * size },
            to: { id: pointId++, x: 0.2457 * size, y: 0.7263 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2457 * size, y: 0.7263 * size },
            to: { id: pointId++, x: 0.2569 * size, y: 0.7223 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2569 * size, y: 0.7223 * size },
            to: { id: pointId++, x: 0.2688 * size, y: 0.7198 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2688 * size, y: 0.7198 * size },
            to: { id: pointId++, x: 0.2812 * size, y: 0.7190 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2812 * size, y: 0.7190 * size },
            to: { id: pointId++, x: 0.2950 * size, y: 0.7200 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2950 * size, y: 0.7200 * size },
            to: { id: pointId++, x: 0.3084 * size, y: 0.7230 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3084 * size, y: 0.7230 * size },
            to: { id: pointId++, x: 0.3213 * size, y: 0.7280 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3213 * size, y: 0.7280 * size },
            to: { id: pointId++, x: 0.3337 * size, y: 0.7350 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3337 * size, y: 0.7350 * size },
            to: { id: pointId++, x: 0.3452 * size, y: 0.7438 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3452 * size, y: 0.7438 * size },
            to: { id: pointId++, x: 0.3552 * size, y: 0.7546 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3552 * size, y: 0.7546 * size },
            to: { id: pointId++, x: 0.3637 * size, y: 0.7671 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3637 * size, y: 0.7671 * size },
            to: { id: pointId++, x: 0.3708 * size, y: 0.7815 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3708 * size, y: 0.7815 * size },
            to: { id: pointId++, x: 0.3763 * size, y: 0.7972 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3763 * size, y: 0.7972 * size },
            to: { id: pointId++, x: 0.3802 * size, y: 0.8138 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3802 * size, y: 0.8138 * size },
            to: { id: pointId++, x: 0.3826 * size, y: 0.8312 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3826 * size, y: 0.8312 * size },
            to: { id: pointId++, x: 0.3834 * size, y: 0.8495 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3834 * size, y: 0.8495 * size },
            to: { id: pointId++, x: 0.3826 * size, y: 0.8695 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3826 * size, y: 0.8695 * size },
            to: { id: pointId++, x: 0.3801 * size, y: 0.8883 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3801 * size, y: 0.8883 * size },
            to: { id: pointId++, x: 0.3759 * size, y: 0.9059 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3759 * size, y: 0.9059 * size },
            to: { id: pointId++, x: 0.3701 * size, y: 0.9222 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3701 * size, y: 0.9222 * size },
            to: { id: pointId++, x: 0.3627 * size, y: 0.9371 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3627 * size, y: 0.9371 * size },
            to: { id: pointId++, x: 0.3537 * size, y: 0.9501 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3537 * size, y: 0.9501 * size },
            to: { id: pointId++, x: 0.3432 * size, y: 0.9613 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3432 * size, y: 0.9613 * size },
            to: { id: pointId++, x: 0.3311 * size, y: 0.9707 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3311 * size, y: 0.9707 * size },
            to: { id: pointId++, x: 0.3177 * size, y: 0.9782 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3177 * size, y: 0.9782 * size },
            to: { id: pointId++, x: 0.3036 * size, y: 0.9837 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3036 * size, y: 0.9837 * size },
            to: { id: pointId++, x: 0.2885 * size, y: 0.9873 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2885 * size, y: 0.9873 * size },
            to: { id: pointId++, x: 0.2726 * size, y: 0.9889 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2726 * size, y: 0.9889 * size },
            to: { id: pointId++, x: 0.2691 * size, y: 0.9418 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2691 * size, y: 0.9418 * size },
            to: { id: pointId++, x: 0.2856 * size, y: 0.9388 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2856 * size, y: 0.9388 * size },
            to: { id: pointId++, x: 0.2999 * size, y: 0.9335 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2999 * size, y: 0.9335 * size },
            to: { id: pointId++, x: 0.3122 * size, y: 0.9260 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3122 * size, y: 0.9260 * size },
            to: { id: pointId++, x: 0.3222 * size, y: 0.9162 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3222 * size, y: 0.9162 * size },
            to: { id: pointId++, x: 0.3301 * size, y: 0.9039 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3301 * size, y: 0.9039 * size },
            to: { id: pointId++, x: 0.3357 * size, y: 0.8891 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3357 * size, y: 0.8891 * size },
            to: { id: pointId++, x: 0.3390 * size, y: 0.8716 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3390 * size, y: 0.8716 * size },
            to: { id: pointId++, x: 0.3402 * size, y: 0.8515 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3402 * size, y: 0.8515 * size },
            to: { id: pointId++, x: 0.3391 * size, y: 0.8308 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3391 * size, y: 0.8308 * size },
            to: { id: pointId++, x: 0.3361 * size, y: 0.8131 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3361 * size, y: 0.8131 * size },
            to: { id: pointId++, x: 0.3310 * size, y: 0.7984 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3310 * size, y: 0.7984 * size },
            to: { id: pointId++, x: 0.3238 * size, y: 0.7867 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3238 * size, y: 0.7867 * size },
            to: { id: pointId++, x: 0.3153 * size, y: 0.7778 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3153 * size, y: 0.7778 * size },
            to: { id: pointId++, x: 0.3059 * size, y: 0.7714 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3059 * size, y: 0.7714 * size },
            to: { id: pointId++, x: 0.2956 * size, y: 0.7676 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2956 * size, y: 0.7676 * size },
            to: { id: pointId++, x: 0.2845 * size, y: 0.7663 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2845 * size, y: 0.7663 * size },
            to: { id: pointId++, x: 0.2750 * size, y: 0.7672 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2750 * size, y: 0.7672 * size },
            to: { id: pointId++, x: 0.2663 * size, y: 0.7699 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2663 * size, y: 0.7699 * size },
            to: { id: pointId++, x: 0.2585 * size, y: 0.7744 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2585 * size, y: 0.7744 * size },
            to: { id: pointId++, x: 0.2516 * size, y: 0.7807 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2516 * size, y: 0.7807 * size },
            to: { id: pointId++, x: 0.2452 * size, y: 0.7907 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2452 * size, y: 0.7907 * size },
            to: { id: pointId++, x: 0.2386 * size, y: 0.8063 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2386 * size, y: 0.8063 * size },
            to: { id: pointId++, x: 0.2319 * size, y: 0.8277 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2319 * size, y: 0.8277 * size },
            to: { id: pointId++, x: 0.2252 * size, y: 0.8547 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2252 * size, y: 0.8547 * size },
            to: { id: pointId++, x: 0.2187 * size, y: 0.8823 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2187 * size, y: 0.8823 * size },
            to: { id: pointId++, x: 0.2125 * size, y: 0.9051 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2125 * size, y: 0.9051 * size },
            to: { id: pointId++, x: 0.2068 * size, y: 0.9233 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2068 * size, y: 0.9233 * size },
            to: { id: pointId++, x: 0.2016 * size, y: 0.9368 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2016 * size, y: 0.9368 * size },
            to: { id: pointId++, x: 0.1936 * size, y: 0.9519 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1936 * size, y: 0.9519 * size },
            to: { id: pointId++, x: 0.1847 * size, y: 0.9649 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1847 * size, y: 0.9649 * size },
            to: { id: pointId++, x: 0.1747 * size, y: 0.9758 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1747 * size, y: 0.9758 * size },
            to: { id: pointId++, x: 0.1638 * size, y: 0.9846 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1638 * size, y: 0.9846 * size },
            to: { id: pointId++, x: 0.1519 * size, y: 0.9913 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1519 * size, y: 0.9913 * size },
            to: { id: pointId++, x: 0.1391 * size, y: 0.9961 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1391 * size, y: 0.9961 * size },
            to: { id: pointId++, x: 0.1255 * size, y: 0.9990 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1255 * size, y: 0.9990 * size },
            to: { id: pointId++, x: 0.1110 * size, y: 1.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1110 * size, y: 1.0000 * size },
            to: { id: pointId++, x: 0.0964 * size, y: 0.9989 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0964 * size, y: 0.9989 * size },
            to: { id: pointId++, x: 0.0823 * size, y: 0.9958 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0823 * size, y: 0.9958 * size },
            to: { id: pointId++, x: 0.0686 * size, y: 0.9905 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0686 * size, y: 0.9905 * size },
            to: { id: pointId++, x: 0.0553 * size, y: 0.9831 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0553 * size, y: 0.9831 * size },
            to: { id: pointId++, x: 0.0429 * size, y: 0.9737 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0429 * size, y: 0.9737 * size },
            to: { id: pointId++, x: 0.0320 * size, y: 0.9624 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0320 * size, y: 0.9624 * size },
            to: { id: pointId++, x: 0.0225 * size, y: 0.9493 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0225 * size, y: 0.9493 * size },
            to: { id: pointId++, x: 0.0145 * size, y: 0.9344 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0145 * size, y: 0.9344 * size },
            to: { id: pointId++, x: 0.0082 * size, y: 0.9180 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0082 * size, y: 0.9180 * size },
            to: { id: pointId++, x: 0.0036 * size, y: 0.9006 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0036 * size, y: 0.9006 * size },
            to: { id: pointId++, x: 0.0009 * size, y: 0.8823 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0009 * size, y: 0.8823 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.8629 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.8629 * size },
            to: { id: pointId++, x: 0.0009 * size, y: 0.8388 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0009 * size, y: 0.8388 * size },
            to: { id: pointId++, x: 0.0037 * size, y: 0.8167 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0037 * size, y: 0.8167 * size },
            to: { id: pointId++, x: 0.0083 * size, y: 0.7966 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0083 * size, y: 0.7966 * size },
            to: { id: pointId++, x: 0.0147 * size, y: 0.7786 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0147 * size, y: 0.7786 * size },
            to: { id: pointId++, x: 0.0229 * size, y: 0.7625 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0229 * size, y: 0.7625 * size },
            to: { id: pointId++, x: 0.0330 * size, y: 0.7482 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0330 * size, y: 0.7482 * size },
            to: { id: pointId++, x: 0.0450 * size, y: 0.7358 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0450 * size, y: 0.7358 * size },
            to: { id: pointId++, x: 0.0588 * size, y: 0.7252 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0588 * size, y: 0.7252 * size },
            to: { id: pointId++, x: 0.0740 * size, y: 0.7167 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0740 * size, y: 0.7167 * size },
            to: { id: pointId++, x: 0.0902 * size, y: 0.7105 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0902 * size, y: 0.7105 * size },
            to: { id: pointId++, x: 0.1073 * size, y: 0.7065 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1073 * size, y: 0.7065 * size },
            to: { id: pointId++, x: 0.1254 * size, y: 0.7049 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1254 * size, y: 0.7049 * size },
            to: { id: pointId++, x: 0.1254 * size, y: 0.7049 * size },
        });
    } else if (signType === "WordTAXI") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.1118 * size },
            to: { id: pointId++, x: 0.2993 * size, y: 0.1118 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2993 * size, y: 0.1118 * size },
            to: { id: pointId++, x: 0.2993 * size, y: 0.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2993 * size, y: 0.0000 * size },
            to: { id: pointId++, x: 0.3394 * size, y: 0.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3394 * size, y: 0.0000 * size },
            to: { id: pointId++, x: 0.3394 * size, y: 0.2690 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3394 * size, y: 0.2690 * size },
            to: { id: pointId++, x: 0.2993 * size, y: 0.2690 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2993 * size, y: 0.2690 * size },
            to: { id: pointId++, x: 0.2993 * size, y: 0.1567 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2993 * size, y: 0.1567 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.1567 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.1567 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.1118 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.1118 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.1118 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.2778 * size },
            to: { id: pointId++, x: 0.3394 * size, y: 0.4081 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3394 * size, y: 0.4081 * size },
            to: { id: pointId++, x: 0.3394 * size, y: 0.4565 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3394 * size, y: 0.4565 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.5954 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.5954 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.5442 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.5442 * size },
            to: { id: pointId++, x: 0.1028 * size, y: 0.5046 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1028 * size, y: 0.5046 * size },
            to: { id: pointId++, x: 0.1028 * size, y: 0.3627 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1028 * size, y: 0.3627 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.3255 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.3255 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.2778 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.2778 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.2778 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1394 * size, y: 0.3757 * size },
            to: { id: pointId++, x: 0.1394 * size, y: 0.4907 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1394 * size, y: 0.4907 * size },
            to: { id: pointId++, x: 0.2333 * size, y: 0.4553 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2333 * size, y: 0.4553 * size },
            to: { id: pointId++, x: 0.2538 * size, y: 0.4477 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2538 * size, y: 0.4477 * size },
            to: { id: pointId++, x: 0.2723 * size, y: 0.4412 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2723 * size, y: 0.4412 * size },
            to: { id: pointId++, x: 0.2890 * size, y: 0.4357 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2890 * size, y: 0.4357 * size },
            to: { id: pointId++, x: 0.3037 * size, y: 0.4313 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3037 * size, y: 0.4313 * size },
            to: { id: pointId++, x: 0.2874 * size, y: 0.4277 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2874 * size, y: 0.4277 * size },
            to: { id: pointId++, x: 0.2712 * size, y: 0.4234 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2712 * size, y: 0.4234 * size },
            to: { id: pointId++, x: 0.2550 * size, y: 0.4185 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2550 * size, y: 0.4185 * size },
            to: { id: pointId++, x: 0.2389 * size, y: 0.4130 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2389 * size, y: 0.4130 * size },
            to: { id: pointId++, x: 0.1394 * size, y: 0.3757 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1394 * size, y: 0.3757 * size },
            to: { id: pointId++, x: 0.1394 * size, y: 0.3757 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.5968 * size },
            to: { id: pointId++, x: 0.1769 * size, y: 0.7280 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1769 * size, y: 0.7280 * size },
            to: { id: pointId++, x: 0.3394 * size, y: 0.6123 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3394 * size, y: 0.6123 * size },
            to: { id: pointId++, x: 0.3394 * size, y: 0.6657 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3394 * size, y: 0.6657 * size },
            to: { id: pointId++, x: 0.2523 * size, y: 0.7273 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2523 * size, y: 0.7273 * size },
            to: { id: pointId++, x: 0.2396 * size, y: 0.7362 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2396 * size, y: 0.7362 * size },
            to: { id: pointId++, x: 0.2284 * size, y: 0.7438 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2284 * size, y: 0.7438 * size },
            to: { id: pointId++, x: 0.2187 * size, y: 0.7499 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2187 * size, y: 0.7499 * size },
            to: { id: pointId++, x: 0.2106 * size, y: 0.7546 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2106 * size, y: 0.7546 * size },
            to: { id: pointId++, x: 0.2200 * size, y: 0.7606 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2200 * size, y: 0.7606 * size },
            to: { id: pointId++, x: 0.2296 * size, y: 0.7670 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2296 * size, y: 0.7670 * size },
            to: { id: pointId++, x: 0.2393 * size, y: 0.7740 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2393 * size, y: 0.7740 * size },
            to: { id: pointId++, x: 0.2493 * size, y: 0.7815 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2493 * size, y: 0.7815 * size },
            to: { id: pointId++, x: 0.3394 * size, y: 0.8498 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3394 * size, y: 0.8498 * size },
            to: { id: pointId++, x: 0.3394 * size, y: 0.8986 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3394 * size, y: 0.8986 * size },
            to: { id: pointId++, x: 0.1794 * size, y: 0.7794 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1794 * size, y: 0.7794 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.9079 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.9079 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.8523 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.8523 * size },
            to: { id: pointId++, x: 0.1211 * size, y: 0.7669 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1211 * size, y: 0.7669 * size },
            to: { id: pointId++, x: 0.1264 * size, y: 0.7633 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1264 * size, y: 0.7633 * size },
            to: { id: pointId++, x: 0.1319 * size, y: 0.7596 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1319 * size, y: 0.7596 * size },
            to: { id: pointId++, x: 0.1377 * size, y: 0.7559 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1377 * size, y: 0.7559 * size },
            to: { id: pointId++, x: 0.1437 * size, y: 0.7521 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1437 * size, y: 0.7521 * size },
            to: { id: pointId++, x: 0.1352 * size, y: 0.7468 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1352 * size, y: 0.7468 * size },
            to: { id: pointId++, x: 0.1281 * size, y: 0.7424 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1281 * size, y: 0.7424 * size },
            to: { id: pointId++, x: 0.1225 * size, y: 0.7387 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1225 * size, y: 0.7387 * size },
            to: { id: pointId++, x: 0.1183 * size, y: 0.7359 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1183 * size, y: 0.7359 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.6507 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.6507 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.5968 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.5968 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.5968 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.9551 * size },
            to: { id: pointId++, x: 0.3394 * size, y: 0.9551 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3394 * size, y: 0.9551 * size },
            to: { id: pointId++, x: 0.3394 * size, y: 1.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3394 * size, y: 1.0000 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 1.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 1.0000 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.9551 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.9551 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.9551 * size },
        });
    } else if (signType === "WordONLY") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1353 * size, y: 0.0000 * size },
            to: { id: pointId++, x: 0.1669 * size, y: 0.0022 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1669 * size, y: 0.0022 * size },
            to: { id: pointId++, x: 0.1949 * size, y: 0.0090 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1949 * size, y: 0.0090 * size },
            to: { id: pointId++, x: 0.2192 * size, y: 0.0202 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2192 * size, y: 0.0202 * size },
            to: { id: pointId++, x: 0.2399 * size, y: 0.0359 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2399 * size, y: 0.0359 * size },
            to: { id: pointId++, x: 0.2565 * size, y: 0.0551 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2565 * size, y: 0.0551 * size },
            to: { id: pointId++, x: 0.2683 * size, y: 0.0770 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2683 * size, y: 0.0770 * size },
            to: { id: pointId++, x: 0.2754 * size, y: 0.1015 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2754 * size, y: 0.1015 * size },
            to: { id: pointId++, x: 0.2777 * size, y: 0.1285 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2777 * size, y: 0.1285 * size },
            to: { id: pointId++, x: 0.2766 * size, y: 0.1466 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2766 * size, y: 0.1466 * size },
            to: { id: pointId++, x: 0.2733 * size, y: 0.1639 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2733 * size, y: 0.1639 * size },
            to: { id: pointId++, x: 0.2677 * size, y: 0.1802 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2677 * size, y: 0.1802 * size },
            to: { id: pointId++, x: 0.2600 * size, y: 0.1955 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2600 * size, y: 0.1955 * size },
            to: { id: pointId++, x: 0.2502 * size, y: 0.2096 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2502 * size, y: 0.2096 * size },
            to: { id: pointId++, x: 0.2387 * size, y: 0.2218 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2387 * size, y: 0.2218 * size },
            to: { id: pointId++, x: 0.2255 * size, y: 0.2323 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2255 * size, y: 0.2323 * size },
            to: { id: pointId++, x: 0.2105 * size, y: 0.2410 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2105 * size, y: 0.2410 * size },
            to: { id: pointId++, x: 0.1940 * size, y: 0.2479 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1940 * size, y: 0.2479 * size },
            to: { id: pointId++, x: 0.1766 * size, y: 0.2528 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1766 * size, y: 0.2528 * size },
            to: { id: pointId++, x: 0.1580 * size, y: 0.2557 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1580 * size, y: 0.2557 * size },
            to: { id: pointId++, x: 0.1384 * size, y: 0.2567 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1384 * size, y: 0.2567 * size },
            to: { id: pointId++, x: 0.1185 * size, y: 0.2557 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1185 * size, y: 0.2557 * size },
            to: { id: pointId++, x: 0.0997 * size, y: 0.2526 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0997 * size, y: 0.2526 * size },
            to: { id: pointId++, x: 0.0820 * size, y: 0.2474 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0820 * size, y: 0.2474 * size },
            to: { id: pointId++, x: 0.0654 * size, y: 0.2402 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0654 * size, y: 0.2402 * size },
            to: { id: pointId++, x: 0.0502 * size, y: 0.2311 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0502 * size, y: 0.2311 * size },
            to: { id: pointId++, x: 0.0371 * size, y: 0.2203 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0371 * size, y: 0.2203 * size },
            to: { id: pointId++, x: 0.0258 * size, y: 0.2078 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0258 * size, y: 0.2078 * size },
            to: { id: pointId++, x: 0.0166 * size, y: 0.1935 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0166 * size, y: 0.1935 * size },
            to: { id: pointId++, x: 0.0093 * size, y: 0.1781 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0093 * size, y: 0.1781 * size },
            to: { id: pointId++, x: 0.0041 * size, y: 0.1621 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0041 * size, y: 0.1621 * size },
            to: { id: pointId++, x: 0.0010 * size, y: 0.1455 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0010 * size, y: 0.1455 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.1283 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.1283 * size },
            to: { id: pointId++, x: 0.0011 * size, y: 0.1099 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0011 * size, y: 0.1099 * size },
            to: { id: pointId++, x: 0.0046 * size, y: 0.0925 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0046 * size, y: 0.0925 * size },
            to: { id: pointId++, x: 0.0103 * size, y: 0.0760 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0103 * size, y: 0.0760 * size },
            to: { id: pointId++, x: 0.0183 * size, y: 0.0606 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0183 * size, y: 0.0606 * size },
            to: { id: pointId++, x: 0.0283 * size, y: 0.0466 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0283 * size, y: 0.0466 * size },
            to: { id: pointId++, x: 0.0400 * size, y: 0.0344 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0400 * size, y: 0.0344 * size },
            to: { id: pointId++, x: 0.0533 * size, y: 0.0240 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0533 * size, y: 0.0240 * size },
            to: { id: pointId++, x: 0.0683 * size, y: 0.0154 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0683 * size, y: 0.0154 * size },
            to: { id: pointId++, x: 0.0844 * size, y: 0.0087 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0844 * size, y: 0.0087 * size },
            to: { id: pointId++, x: 0.1009 * size, y: 0.0038 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1009 * size, y: 0.0038 * size },
            to: { id: pointId++, x: 0.1179 * size, y: 0.0010 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1179 * size, y: 0.0010 * size },
            to: { id: pointId++, x: 0.1353 * size, y: 0.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1353 * size, y: 0.0000 * size },
            to: { id: pointId++, x: 0.1353 * size, y: 0.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1347 * size, y: 0.0366 * size },
            to: { id: pointId++, x: 0.1118 * size, y: 0.0382 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1118 * size, y: 0.0382 * size },
            to: { id: pointId++, x: 0.0914 * size, y: 0.0431 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0914 * size, y: 0.0431 * size },
            to: { id: pointId++, x: 0.0736 * size, y: 0.0513 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0736 * size, y: 0.0513 * size },
            to: { id: pointId++, x: 0.0583 * size, y: 0.0627 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0583 * size, y: 0.0627 * size },
            to: { id: pointId++, x: 0.0461 * size, y: 0.0766 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0461 * size, y: 0.0766 * size },
            to: { id: pointId++, x: 0.0374 * size, y: 0.0921 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0374 * size, y: 0.0921 * size },
            to: { id: pointId++, x: 0.0321 * size, y: 0.1093 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0321 * size, y: 0.1093 * size },
            to: { id: pointId++, x: 0.0304 * size, y: 0.1282 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0304 * size, y: 0.1282 * size },
            to: { id: pointId++, x: 0.0322 * size, y: 0.1473 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0322 * size, y: 0.1473 * size },
            to: { id: pointId++, x: 0.0374 * size, y: 0.1647 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0374 * size, y: 0.1647 * size },
            to: { id: pointId++, x: 0.0463 * size, y: 0.1803 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0463 * size, y: 0.1803 * size },
            to: { id: pointId++, x: 0.0586 * size, y: 0.1942 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0586 * size, y: 0.1942 * size },
            to: { id: pointId++, x: 0.0742 * size, y: 0.2055 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0742 * size, y: 0.2055 * size },
            to: { id: pointId++, x: 0.0927 * size, y: 0.2136 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0927 * size, y: 0.2136 * size },
            to: { id: pointId++, x: 0.1142 * size, y: 0.2184 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1142 * size, y: 0.2184 * size },
            to: { id: pointId++, x: 0.1386 * size, y: 0.2201 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1386 * size, y: 0.2201 * size },
            to: { id: pointId++, x: 0.1545 * size, y: 0.2194 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1545 * size, y: 0.2194 * size },
            to: { id: pointId++, x: 0.1693 * size, y: 0.2173 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1693 * size, y: 0.2173 * size },
            to: { id: pointId++, x: 0.1831 * size, y: 0.2138 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1831 * size, y: 0.2138 * size },
            to: { id: pointId++, x: 0.1958 * size, y: 0.2090 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1958 * size, y: 0.2090 * size },
            to: { id: pointId++, x: 0.2073 * size, y: 0.2028 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2073 * size, y: 0.2028 * size },
            to: { id: pointId++, x: 0.2175 * size, y: 0.1953 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2175 * size, y: 0.1953 * size },
            to: { id: pointId++, x: 0.2263 * size, y: 0.1866 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2263 * size, y: 0.1866 * size },
            to: { id: pointId++, x: 0.2337 * size, y: 0.1766 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2337 * size, y: 0.1766 * size },
            to: { id: pointId++, x: 0.2396 * size, y: 0.1656 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2396 * size, y: 0.1656 * size },
            to: { id: pointId++, x: 0.2438 * size, y: 0.1540 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2438 * size, y: 0.1540 * size },
            to: { id: pointId++, x: 0.2463 * size, y: 0.1417 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2463 * size, y: 0.1417 * size },
            to: { id: pointId++, x: 0.2472 * size, y: 0.1287 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2472 * size, y: 0.1287 * size },
            to: { id: pointId++, x: 0.2455 * size, y: 0.1105 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2455 * size, y: 0.1105 * size },
            to: { id: pointId++, x: 0.2407 * size, y: 0.0936 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2407 * size, y: 0.0936 * size },
            to: { id: pointId++, x: 0.2326 * size, y: 0.0781 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2326 * size, y: 0.0781 * size },
            to: { id: pointId++, x: 0.2213 * size, y: 0.0638 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2213 * size, y: 0.0638 * size },
            to: { id: pointId++, x: 0.2061 * size, y: 0.0519 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2061 * size, y: 0.0519 * size },
            to: { id: pointId++, x: 0.1867 * size, y: 0.0434 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1867 * size, y: 0.0434 * size },
            to: { id: pointId++, x: 0.1629 * size, y: 0.0383 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1629 * size, y: 0.0383 * size },
            to: { id: pointId++, x: 0.1347 * size, y: 0.0366 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1347 * size, y: 0.0366 * size },
            to: { id: pointId++, x: 0.1347 * size, y: 0.0366 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0046 * size, y: 0.3021 * size },
            to: { id: pointId++, x: 0.2730 * size, y: 0.3021 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2730 * size, y: 0.3021 * size },
            to: { id: pointId++, x: 0.2730 * size, y: 0.3385 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2730 * size, y: 0.3385 * size },
            to: { id: pointId++, x: 0.0622 * size, y: 0.4795 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0622 * size, y: 0.4795 * size },
            to: { id: pointId++, x: 0.2730 * size, y: 0.4795 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2730 * size, y: 0.4795 * size },
            to: { id: pointId++, x: 0.2730 * size, y: 0.5135 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2730 * size, y: 0.5135 * size },
            to: { id: pointId++, x: 0.0046 * size, y: 0.5135 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0046 * size, y: 0.5135 * size },
            to: { id: pointId++, x: 0.0046 * size, y: 0.4771 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0046 * size, y: 0.4771 * size },
            to: { id: pointId++, x: 0.2155 * size, y: 0.3361 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2155 * size, y: 0.3361 * size },
            to: { id: pointId++, x: 0.0046 * size, y: 0.3361 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0046 * size, y: 0.3361 * size },
            to: { id: pointId++, x: 0.0046 * size, y: 0.3021 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0046 * size, y: 0.3021 * size },
            to: { id: pointId++, x: 0.0046 * size, y: 0.3021 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0046 * size, y: 0.5718 * size },
            to: { id: pointId++, x: 0.2730 * size, y: 0.5718 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2730 * size, y: 0.5718 * size },
            to: { id: pointId++, x: 0.2730 * size, y: 0.6073 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2730 * size, y: 0.6073 * size },
            to: { id: pointId++, x: 0.0363 * size, y: 0.6073 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0363 * size, y: 0.6073 * size },
            to: { id: pointId++, x: 0.0363 * size, y: 0.7395 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0363 * size, y: 0.7395 * size },
            to: { id: pointId++, x: 0.0046 * size, y: 0.7395 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0046 * size, y: 0.7395 * size },
            to: { id: pointId++, x: 0.0046 * size, y: 0.5718 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0046 * size, y: 0.5718 * size },
            to: { id: pointId++, x: 0.0046 * size, y: 0.5718 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0046 * size, y: 0.8574 * size },
            to: { id: pointId++, x: 0.1183 * size, y: 0.8574 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1183 * size, y: 0.8574 * size },
            to: { id: pointId++, x: 0.2730 * size, y: 0.7539 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2730 * size, y: 0.7539 * size },
            to: { id: pointId++, x: 0.2730 * size, y: 0.7971 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2730 * size, y: 0.7971 * size },
            to: { id: pointId++, x: 0.1921 * size, y: 0.8501 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1921 * size, y: 0.8501 * size },
            to: { id: pointId++, x: 0.1807 * size, y: 0.8573 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1807 * size, y: 0.8573 * size },
            to: { id: pointId++, x: 0.1694 * size, y: 0.8642 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1694 * size, y: 0.8642 * size },
            to: { id: pointId++, x: 0.1580 * size, y: 0.8709 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1580 * size, y: 0.8709 * size },
            to: { id: pointId++, x: 0.1466 * size, y: 0.8773 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1466 * size, y: 0.8773 * size },
            to: { id: pointId++, x: 0.1575 * size, y: 0.8837 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1575 * size, y: 0.8837 * size },
            to: { id: pointId++, x: 0.1690 * size, y: 0.8907 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1690 * size, y: 0.8907 * size },
            to: { id: pointId++, x: 0.1812 * size, y: 0.8983 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1812 * size, y: 0.8983 * size },
            to: { id: pointId++, x: 0.1941 * size, y: 0.9066 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1941 * size, y: 0.9066 * size },
            to: { id: pointId++, x: 0.2730 * size, y: 0.9586 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2730 * size, y: 0.9586 * size },
            to: { id: pointId++, x: 0.2730 * size, y: 1.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2730 * size, y: 1.0000 * size },
            to: { id: pointId++, x: 0.1183 * size, y: 0.8929 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1183 * size, y: 0.8929 * size },
            to: { id: pointId++, x: 0.0046 * size, y: 0.8929 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0046 * size, y: 0.8929 * size },
            to: { id: pointId++, x: 0.0046 * size, y: 0.8574 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0046 * size, y: 0.8574 * size },
            to: { id: pointId++, x: 0.0046 * size, y: 0.8574 * size },
        });
    } else if (signType === "ParkingTMark") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9500 * size, y: 0.1000 * size },
            to: { id: pointId++, x: 0.9500 * size, y: 0.9000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9500 * size, y: 0.9000 * size },
            to: { id: pointId++, x: 0.8000 * size, y: 0.9000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.8000 * size, y: 0.9000 * size },
            to: { id: pointId++, x: 0.8000 * size, y: 0.5750 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.8000 * size, y: 0.5750 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.5750 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.5750 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.4250 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.4250 * size },
            to: { id: pointId++, x: 0.8000 * size, y: 0.4250 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.8000 * size, y: 0.4250 * size },
            to: { id: pointId++, x: 0.8000 * size, y: 0.1000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.8000 * size, y: 0.1000 * size },
            to: { id: pointId++, x: 0.9500 * size, y: 0.1000 * size },
        });
    } else if (signType === "ParkingLMark") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.1000 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.9000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.9000 * size },
            to: { id: pointId++, x: 0.2500 * size, y: 0.9000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2500 * size, y: 0.9000 * size },
            to: { id: pointId++, x: 0.2500 * size, y: 0.2500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2500 * size, y: 0.2500 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.2500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.2500 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.1000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.1000 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.1000 * size },
        });
    } else if (signType === "HandicapBox") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 0.0000 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 1.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0000 * size, y: 1.0000 * size },
            to: { id: pointId++, x: 1.0000 * size, y: 1.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 1.0000 * size, y: 1.0000 * size },
            to: { id: pointId++, x: 1.0000 * size, y: 0.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 1.0000 * size, y: 0.0000 * size },
            to: { id: pointId++, x: 0.0000 * size, y: 0.0000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0500 * size, y: 0.0500 * size },
            to: { id: pointId++, x: 0.0500 * size, y: 0.9500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0500 * size, y: 0.9500 * size },
            to: { id: pointId++, x: 0.9500 * size, y: 0.9500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9500 * size, y: 0.9500 * size },
            to: { id: pointId++, x: 0.9500 * size, y: 0.0500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9500 * size, y: 0.0500 * size },
            to: { id: pointId++, x: 0.0500 * size, y: 0.0500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.9000 * size },
            to: { id: pointId++, x: 0.5148 * size, y: 0.8772 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5148 * size, y: 0.8772 * size },
            to: { id: pointId++, x: 0.6121 * size, y: 0.8121 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6121 * size, y: 0.8121 * size },
            to: { id: pointId++, x: 0.6772 * size, y: 0.7148 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6772 * size, y: 0.7148 * size },
            to: { id: pointId++, x: 0.7000 * size, y: 0.6000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7000 * size, y: 0.6000 * size },
            to: { id: pointId++, x: 0.6772 * size, y: 0.4852 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6772 * size, y: 0.4852 * size },
            to: { id: pointId++, x: 0.6121 * size, y: 0.3879 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6121 * size, y: 0.3879 * size },
            to: { id: pointId++, x: 0.5148 * size, y: 0.3228 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5148 * size, y: 0.3228 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.3000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.3000 * size },
            to: { id: pointId++, x: 0.2852 * size, y: 0.3228 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2852 * size, y: 0.3228 * size },
            to: { id: pointId++, x: 0.1879 * size, y: 0.3879 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1879 * size, y: 0.3879 * size },
            to: { id: pointId++, x: 0.1228 * size, y: 0.4852 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1228 * size, y: 0.4852 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.6000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.6000 * size },
            to: { id: pointId++, x: 0.1228 * size, y: 0.7148 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1228 * size, y: 0.7148 * size },
            to: { id: pointId++, x: 0.1879 * size, y: 0.8121 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1879 * size, y: 0.8121 * size },
            to: { id: pointId++, x: 0.2852 * size, y: 0.8772 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2852 * size, y: 0.8772 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.9000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.9000 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.9000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.8000 * size },
            to: { id: pointId++, x: 0.3235 * size, y: 0.7848 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3235 * size, y: 0.7848 * size },
            to: { id: pointId++, x: 0.2586 * size, y: 0.7414 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2586 * size, y: 0.7414 * size },
            to: { id: pointId++, x: 0.2152 * size, y: 0.6765 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2152 * size, y: 0.6765 * size },
            to: { id: pointId++, x: 0.2000 * size, y: 0.6000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2000 * size, y: 0.6000 * size },
            to: { id: pointId++, x: 0.2152 * size, y: 0.5235 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2152 * size, y: 0.5235 * size },
            to: { id: pointId++, x: 0.2586 * size, y: 0.4586 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2586 * size, y: 0.4586 * size },
            to: { id: pointId++, x: 0.3235 * size, y: 0.4152 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3235 * size, y: 0.4152 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.4000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.4000 * size },
            to: { id: pointId++, x: 0.4765 * size, y: 0.4152 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4765 * size, y: 0.4152 * size },
            to: { id: pointId++, x: 0.5414 * size, y: 0.4586 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5414 * size, y: 0.4586 * size },
            to: { id: pointId++, x: 0.5848 * size, y: 0.5235 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5848 * size, y: 0.5235 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.6000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.6000 * size },
            to: { id: pointId++, x: 0.5848 * size, y: 0.6765 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5848 * size, y: 0.6765 * size },
            to: { id: pointId++, x: 0.5414 * size, y: 0.7414 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5414 * size, y: 0.7414 * size },
            to: { id: pointId++, x: 0.4765 * size, y: 0.7848 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4765 * size, y: 0.7848 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.8000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.8000 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.8000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7000 * size, y: 0.4000 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.4000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.4000 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.7000 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7000 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.7000 * size, y: 0.8000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7000 * size, y: 0.8000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.8000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.8000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.3000 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3000 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.3000 * size, y: 0.4000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3000 * size, y: 0.4000 * size },
            to: { id: pointId++, x: 0.7000 * size, y: 0.4000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9500 * size, y: 0.5500 * size },
            to: { id: pointId++, x: 1.0207 * size, y: 0.5207 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 1.0207 * size, y: 0.5207 * size },
            to: { id: pointId++, x: 1.0500 * size, y: 0.4500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 1.0500 * size, y: 0.4500 * size },
            to: { id: pointId++, x: 1.0207 * size, y: 0.3793 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 1.0207 * size, y: 0.3793 * size },
            to: { id: pointId++, x: 0.9500 * size, y: 0.3500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9500 * size, y: 0.3500 * size },
            to: { id: pointId++, x: 0.8793 * size, y: 0.3793 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.8793 * size, y: 0.3793 * size },
            to: { id: pointId++, x: 0.8500 * size, y: 0.4500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.8500 * size, y: 0.4500 * size },
            to: { id: pointId++, x: 0.8793 * size, y: 0.5207 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.8793 * size, y: 0.5207 * size },
            to: { id: pointId++, x: 0.9500 * size, y: 0.5500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9500 * size, y: 0.5500 * size },
            to: { id: pointId++, x: 0.9500 * size, y: 0.5500 * size },
        });
    } else if (signType === "BicycleOutline") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2500 * size, y: 0.4500 * size },
            to: { id: pointId++, x: 0.3500 * size, y: 0.4232 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3500 * size, y: 0.4232 * size },
            to: { id: pointId++, x: 0.4232 * size, y: 0.3500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4232 * size, y: 0.3500 * size },
            to: { id: pointId++, x: 0.4500 * size, y: 0.2500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4500 * size, y: 0.2500 * size },
            to: { id: pointId++, x: 0.4232 * size, y: 0.1500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4232 * size, y: 0.1500 * size },
            to: { id: pointId++, x: 0.3500 * size, y: 0.0768 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3500 * size, y: 0.0768 * size },
            to: { id: pointId++, x: 0.2500 * size, y: 0.0500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2500 * size, y: 0.0500 * size },
            to: { id: pointId++, x: 0.1500 * size, y: 0.0768 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1500 * size, y: 0.0768 * size },
            to: { id: pointId++, x: 0.0768 * size, y: 0.1500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0768 * size, y: 0.1500 * size },
            to: { id: pointId++, x: 0.0500 * size, y: 0.2500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0500 * size, y: 0.2500 * size },
            to: { id: pointId++, x: 0.0768 * size, y: 0.3500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0768 * size, y: 0.3500 * size },
            to: { id: pointId++, x: 0.1500 * size, y: 0.4232 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1500 * size, y: 0.4232 * size },
            to: { id: pointId++, x: 0.2500 * size, y: 0.4500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2500 * size, y: 0.4500 * size },
            to: { id: pointId++, x: 0.2500 * size, y: 0.4500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2500 * size, y: 0.4000 * size },
            to: { id: pointId++, x: 0.1750 * size, y: 0.3799 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1750 * size, y: 0.3799 * size },
            to: { id: pointId++, x: 0.1201 * size, y: 0.3250 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1201 * size, y: 0.3250 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.2500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.2500 * size },
            to: { id: pointId++, x: 0.1201 * size, y: 0.1750 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1201 * size, y: 0.1750 * size },
            to: { id: pointId++, x: 0.1750 * size, y: 0.1201 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1750 * size, y: 0.1201 * size },
            to: { id: pointId++, x: 0.2500 * size, y: 0.1000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2500 * size, y: 0.1000 * size },
            to: { id: pointId++, x: 0.3250 * size, y: 0.1201 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3250 * size, y: 0.1201 * size },
            to: { id: pointId++, x: 0.3799 * size, y: 0.1750 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3799 * size, y: 0.1750 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.2500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.2500 * size },
            to: { id: pointId++, x: 0.3799 * size, y: 0.3250 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3799 * size, y: 0.3250 * size },
            to: { id: pointId++, x: 0.3250 * size, y: 0.3799 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3250 * size, y: 0.3799 * size },
            to: { id: pointId++, x: 0.2500 * size, y: 0.4000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2500 * size, y: 0.4000 * size },
            to: { id: pointId++, x: 0.2500 * size, y: 0.4000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2500 * size, y: 0.9500 * size },
            to: { id: pointId++, x: 0.3500 * size, y: 0.9232 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3500 * size, y: 0.9232 * size },
            to: { id: pointId++, x: 0.4232 * size, y: 0.8500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4232 * size, y: 0.8500 * size },
            to: { id: pointId++, x: 0.4500 * size, y: 0.7500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4500 * size, y: 0.7500 * size },
            to: { id: pointId++, x: 0.4232 * size, y: 0.6500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4232 * size, y: 0.6500 * size },
            to: { id: pointId++, x: 0.3500 * size, y: 0.5768 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3500 * size, y: 0.5768 * size },
            to: { id: pointId++, x: 0.2500 * size, y: 0.5500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2500 * size, y: 0.5500 * size },
            to: { id: pointId++, x: 0.1500 * size, y: 0.5768 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1500 * size, y: 0.5768 * size },
            to: { id: pointId++, x: 0.0768 * size, y: 0.6500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0768 * size, y: 0.6500 * size },
            to: { id: pointId++, x: 0.0500 * size, y: 0.7500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0500 * size, y: 0.7500 * size },
            to: { id: pointId++, x: 0.0768 * size, y: 0.8500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.0768 * size, y: 0.8500 * size },
            to: { id: pointId++, x: 0.1500 * size, y: 0.9232 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1500 * size, y: 0.9232 * size },
            to: { id: pointId++, x: 0.2500 * size, y: 0.9500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2500 * size, y: 0.9500 * size },
            to: { id: pointId++, x: 0.2500 * size, y: 0.9500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2500 * size, y: 0.9000 * size },
            to: { id: pointId++, x: 0.1750 * size, y: 0.8799 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1750 * size, y: 0.8799 * size },
            to: { id: pointId++, x: 0.1201 * size, y: 0.8250 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1201 * size, y: 0.8250 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.7500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.7500 * size },
            to: { id: pointId++, x: 0.1201 * size, y: 0.6750 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1201 * size, y: 0.6750 * size },
            to: { id: pointId++, x: 0.1750 * size, y: 0.6201 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1750 * size, y: 0.6201 * size },
            to: { id: pointId++, x: 0.2500 * size, y: 0.6000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2500 * size, y: 0.6000 * size },
            to: { id: pointId++, x: 0.3250 * size, y: 0.6201 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3250 * size, y: 0.6201 * size },
            to: { id: pointId++, x: 0.3799 * size, y: 0.6750 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3799 * size, y: 0.6750 * size },
            to: { id: pointId++, x: 0.4000 * size, y: 0.7500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.4000 * size, y: 0.7500 * size },
            to: { id: pointId++, x: 0.3799 * size, y: 0.8250 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3799 * size, y: 0.8250 * size },
            to: { id: pointId++, x: 0.3250 * size, y: 0.8799 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3250 * size, y: 0.8799 * size },
            to: { id: pointId++, x: 0.2500 * size, y: 0.9000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2500 * size, y: 0.9000 * size },
            to: { id: pointId++, x: 0.2500 * size, y: 0.9000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2500 * size, y: 0.2500 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.4000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.4000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.7000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.7000 * size },
            to: { id: pointId++, x: 0.2500 * size, y: 0.7500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2500 * size, y: 0.7500 * size },
            to: { id: pointId++, x: 0.2500 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.2500 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.4000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.4000 * size },
            to: { id: pointId++, x: 0.2500 * size, y: 0.2500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.3500 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.4500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.4500 * size },
            to: { id: pointId++, x: 0.7000 * size, y: 0.4500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7000 * size, y: 0.4500 * size },
            to: { id: pointId++, x: 0.7000 * size, y: 0.3500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.7000 * size, y: 0.3500 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.3500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.7000 * size },
            to: { id: pointId++, x: 0.8000 * size, y: 0.6000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.8000 * size, y: 0.6000 * size },
            to: { id: pointId++, x: 0.8000 * size, y: 0.6500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.8000 * size, y: 0.6500 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.7500 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6000 * size, y: 0.7500 * size },
            to: { id: pointId++, x: 0.6000 * size, y: 0.7000 * size },
        });
    } else if (signType === "NoParkingCross") {
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.1000 * size },
            to: { id: pointId++, x: 0.5000 * size, y: 0.4000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5000 * size, y: 0.4000 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.1000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.1000 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.3000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.3000 * size },
            to: { id: pointId++, x: 0.3500 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.3500 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.7000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.7000 * size },
            to: { id: pointId++, x: 0.1000 * size, y: 0.9000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.1000 * size, y: 0.9000 * size },
            to: { id: pointId++, x: 0.5000 * size, y: 0.6000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.5000 * size, y: 0.6000 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.9000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.9000 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.7000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.7000 * size },
            to: { id: pointId++, x: 0.6500 * size, y: 0.5000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.6500 * size, y: 0.5000 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.3000 * size },
        });
        lines.push({
            id: `rs-${lineId++}`, label: "Stroke", layer: "marking", width: 0.1,
            from: { id: pointId++, x: 0.9000 * size, y: 0.3000 * size },
            to: { id: pointId++, x: 0.9000 * size, y: 0.1000 * size },
        });
    }
    return lines;
}
