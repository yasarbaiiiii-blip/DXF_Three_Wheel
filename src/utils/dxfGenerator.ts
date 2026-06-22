import type { PlanLine } from "../types/plan";

export function generateDXF(lines: PlanLine[]): string {
  let dxf = "";

  // HEADER section (minimal)
  dxf += "  0\nSECTION\n  2\nHEADER\n  0\nENDSEC\n";

  // TABLES section (minimal)
  dxf += "  0\nSECTION\n  2\nTABLES\n  0\nENDSEC\n";

  // BLOCKS section (minimal)
  dxf += "  0\nSECTION\n  2\nBLOCKS\n  0\nENDSEC\n";

  // ENTITIES section
  dxf += "  0\nSECTION\n  2\nENTITIES\n";

  for (const line of lines) {
    if (!line.from || !line.to) continue;

    // Use n,e as x,y or vice versa depending on your coordinate system. 
    // PlanLine typically uses x=North, y=East in this app's domain context.
    const startX = line.from.x; // North
    const startY = line.from.y; // East
    const endX = line.to.x;
    const endY = line.to.y;

    dxf += "  0\nLINE\n";
    dxf += "  8\n" + (line.layer === "boundary" ? "boundary" : "marking") + "\n";
    // Start point
    dxf += " 10\n" + startX.toFixed(6) + "\n";
    dxf += " 20\n" + startY.toFixed(6) + "\n";
    dxf += " 30\n0.0\n";
    // End point
    dxf += " 11\n" + endX.toFixed(6) + "\n";
    dxf += " 21\n" + endY.toFixed(6) + "\n";
    dxf += " 31\n0.0\n";
  }

  dxf += "  0\nENDSEC\n";

  // EOF
  dxf += "  0\nEOF\n";

  return dxf;
}

export function linesToDxf(lines: PlanLine[], name: string): string {
  const layers = Array.from(new Set(lines.map((line) => line.layer.toUpperCase())));
  const layerTable = layers
    .map((layer) => [
      "0",
      "LAYER",
      "2",
      layer,
      "70",
      "0",
      "62",
      layer === "BOUNDARY" ? "7" : layer === "CENTER" ? "3" : "4",
      "6",
      "CONTINUOUS",
    ].join("\n"))
    .join("\n");

  const entities = lines
    .map((entry) => [
      "0",
      "LINE",
      "8",
      entry.layer.toUpperCase(),
      "370",
      String(mmLineweight(entry.width)),
      "10",
      String(entry.from.x),
      "20",
      String(entry.from.y),
      "11",
      String(entry.to.x),
      "21",
      String(entry.to.y),
    ].join("\n"))
    .join("\n");

  return [
    "0", "SECTION", "2", "HEADER", "0", "ENDSEC",
    "0", "SECTION", "2", "TABLES",
    "0", "TABLE", "2", "LAYER", "70", String(layers.length),
    layerTable,
    "0", "ENDTAB", "0", "ENDSEC",
    "0", "SECTION", "2", "ENTITIES",
    entities,
    "0", "ENDSEC", "0", "EOF",
  ].join("\n");
}

export function mmLineweight(widthMeters: number): number {
  const mm = Math.round(widthMeters * 1000);
  if (mm <= 0) return -1;
  return Math.min(211, Math.max(0, mm));
}
