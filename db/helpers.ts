export const parseFotos = (fotos: unknown): string[] => {
  if (typeof fotos === "string") {
    try {
      return JSON.parse(fotos);
    } catch {
      return [];
    }
  }
  return Array.isArray(fotos) ? fotos : [];
};