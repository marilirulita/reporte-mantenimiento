import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export async function pickImage(tipo: "camara" | "galeria", setFotos: React.Dispatch<React.SetStateAction<string[]>>, fotos: string[]) {
  if (fotos.length >= 4) {
        Alert.alert("Límite alcanzado", "Solo puedes agregar 4 fotos.");
        return;
      }
  
      // Solicitar permisos
      let permissionResult;
      if (tipo === "camara") {
        permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      } else {
        permissionResult =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
      }
  
      if (!permissionResult.granted) {
        Alert.alert(
          "Permiso denegado",
          "Debes otorgar permiso para acceder a la cámara o galería."
        );
        return;
      }
  
      // Elegir fuente (cámara o galería)
      let result;
      if (tipo === "camara") {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ["images", "videos"],
          allowsEditing: true,
          quality: 0.8,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images", "videos"],
          allowsEditing: true,
          quality: 0.8,
        });
      }
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const nuevaFoto = result.assets[0].uri;
        setFotos((prev) => [...prev, nuevaFoto]);
      }
  // permisos
  // picker
  // return uri | null
}