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
  is_mark?: boolean;
  entity?: DxfEntity;
}

export interface DxfPoint {
  north: number;
  east: number;
}

export interface DxfEntity {
  entity_id: string;
  entity_type: string;
  layer: string;
  color: number;
  is_mark: boolean;
  length_m: number;
  geometry: any;
  preview_points: DxfPoint[];
}

export interface DxfEntitiesResponse {
  name: string;
  frame: string;
  num_entities: number;
  bounds: {
    north_min: number;
    north_max: number;
    east_min: number;
    east_max: number;
  };
  entities: DxfEntity[];
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
