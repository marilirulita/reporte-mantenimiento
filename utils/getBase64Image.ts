import * as FileSystem from "expo-file-system/legacy";

// Convierte una ruta local (file://) a base64
const getBase64Image = async (uri: string) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });
    console.log(base64);
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error("Error al convertir imagen:", error);
    return null;
  }
};

export default getBase64Image;