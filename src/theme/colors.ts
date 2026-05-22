export interface Palette {
  background: string;
  foreground: string;
  panel: string;
  border: string;
  muted: string;
  mutedForeground: string;
  primary: string;
  primaryForeground: string;
  emerald: string;
  amber: string;
  crimson: string;
}

export const lightPalette: Palette = {
  background: "#FAFAFA",
  foreground: "#18181B",
  panel: "#FFFFFF",
  border: "#E4E4E7",
  muted: "#F4F4F5",
  mutedForeground: "#71717A",
  primary: "#18181B",
  primaryForeground: "#FAFAFA",
  emerald: "#059669",
  amber: "#D97706",
  crimson: "#DC2626",
};

export const darkPalette: Palette = {
  background: "#09090B",
  foreground: "#FAFAFA",
  panel: "#18181B",
  border: "#27272A",
  muted: "#27272A",
  mutedForeground: "#A1A1AA",
  primary: "#FAFAFA",
  primaryForeground: "#18181B",
  emerald: "#059669",
  amber: "#D97706",
  crimson: "#DC2626",
};
