export type PlanLayer = "boundary" | "marking" | "center";
export type SidebarPanel = "import" | "details" | "mission" | "view" | "positioning" | "settings";
export type MarkingStyle = "straight" | "dotted" | "dashed";

export interface PlanPoint {
  id: number;
  x: number;
  y: number;
}

export interface PlanLine {
  id: string;
  label: string;
  layer: PlanLayer;
  from: PlanPoint;
  to: PlanPoint;
  width: number;
}

export interface ImportedPlan {
  fileName: string;
  uri: string;
  fileType: "csv" | "dxf" | "waypoints";
  source?: "imported" | "generated" | "builtin";
}

export interface LayerVisibility {
  boundary: boolean;
  marking: boolean;
  center: boolean;
}
