// Type shape only — classification itself runs server-side (web's lib/sajuType.ts,
// wired into /api/saju and /api/verification-code) so the client just displays
// whatever archetype/mode/code the API already computed. Keep these keys in sync
// with web's lib/sajuType.ts.
export type ElementKey = "wood" | "fire" | "earth" | "metal" | "water";

export type ArchetypeKey =
  | "oak" | "vine" | "sun" | "flame" | "mountain"
  | "field" | "steel" | "gem" | "ocean" | "dew";

export type ModeKey = "rooted" | "voice" | "harvest" | "order" | "well";

export interface SajuType {
  archetype: ArchetypeKey;
  mode: ModeKey;
  code: string;
  dayMasterElement: ElementKey;
  dominantElement: ElementKey;
}
