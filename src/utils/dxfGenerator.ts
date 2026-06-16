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
