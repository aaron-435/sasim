// Readable column for wide screens (iPad, large Android tablets, desktop web).
// Phones are narrower than the cap, so this changes nothing there; on wider windows the
// content stops stretching and sits centered with the background showing on both sides.
// Spread into a ScrollView's contentContainerStyle (or any full-width wrapper).
export const READABLE_MAX_WIDTH = 640;

export const readableColumn = {
  width: "100%",
  maxWidth: READABLE_MAX_WIDTH,
  alignSelf: "center",
} as const;
