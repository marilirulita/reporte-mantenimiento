import * as FileSystem from "expo-file-system/legacy";

export type Base64Image = string;

const getMimeType = (uri: string): string => {
  if (uri.endsWith(".png")) return "image/png";
  if (uri.endsWith(".jpg") || uri.endsWith(".jpeg")) return "image/jpeg";
  return "image/jpeg"; // fallback
};

// Convierte una ruta local (file://) a base64
const getBase64Image = async (uri: string): Promise<Base64Image> => {
  try {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: "base64",
  });

  const mimeType = getMimeType(uri);
  return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error("Error al convertir imagen:", error);
    throw error;
  }
};

export default getBase64Image;
