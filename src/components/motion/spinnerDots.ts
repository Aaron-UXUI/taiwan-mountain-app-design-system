export const SPINNER_DOTS = Array.from({ length: 8 }, (_, i) => ({
  rotation: i * 45,
  delay: -((8 - i) / 8),
}));
