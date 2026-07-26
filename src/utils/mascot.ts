export function getMascotImage(progress: number) {
  if (progress >= 120) return "/progress/dead.png";
  if (progress >= 100) return "/progress/golden-tree.png";
  if (progress >= 75) return "/progress/fruit-tree.png";
  if (progress >= 50) return "/progress/tree.png";
  if (progress >= 25) return "/progress/sprout.png";

  return "/progress/seed.png";
}