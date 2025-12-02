import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { Camera, Upload, Image as ImageIcon } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { Botton } from "./ui/button";
import { useNextSection } from "../hooks/useNextSection";
import { useReporte } from "../context/ReporteContext";

export default function Fotos() {
  const [fotos, setFotos] = useState<string[]>([]);

  const handleAgregarFoto = async (tipo: string) => {
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
  };

  const handleEliminarFoto = (uri: string) => {
    Alert.alert("Eliminar foto", "¿Deseas eliminar esta foto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        onPress: () => setFotos(fotos.filter((f) => f !== uri)),
      },
    ]);
  };

  const { handleNext } = useNextSection("firma");
  const { reporte, setReporte } = useReporte();

  const saveFotos = () => {
    if (fotos.length < 2) {
      Alert.alert("Requisito Fotos","Nesesita agregar al menos 2 fotos");
      return;
    }
    handleNext("fotos", fotos)
  };
  return (
    <ScrollView
      contentContainerStyle={{ padding: 10, backgroundColor: "#f5f5f5" }}
    >
      <View style={[styles.section, { marginBottom: 50 }]}>
        {/* Título */}
        <Text style={styles.title}>Fotografías del Equipo</Text>
        <Text style={styles.subtitle}>
          Agregue fotos del equipo para incluirlas en el reporte
        </Text>
        <Text style={[styles.subtitle, { fontStyle: "italic", marginTop: 4 }]}>
          (máximo 4 fotos)
        </Text>

        {/* Botones */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAgregarFoto("camara")}
          >
            <Camera size={18} color="#414650ff" style={styles.icon} />
            <Text style={styles.buttonText}>Tomar Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAgregarFoto("galeria")}
          >
            <Upload size={18} color="#414650ff" style={styles.icon} />
            <Text style={styles.buttonText}>Subir Imagen</Text>
          </TouchableOpacity>
        </View>

        {/* Cuadro de fotos */}
        <View style={styles.photoBox}>
          {fotos.length === 0 ? (
            <View style={styles.emptyState}>
              <ImageIcon size={48} color="#9CA3AF" />
              <Text style={styles.emptyText}>No hay fotos agregadas</Text>
              <Text style={styles.emptySubtext}>
                Toque los botones de arriba para agregar fotos
              </Text>
            </View>
          ) : (
            <View style={styles.fotosGrid}>
              {fotos.map((foto, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => handleEliminarFoto(foto)}
                  style={styles.photoButton}
                >
                  <Image source={{ uri: foto }} style={styles.foto} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Conteo */}
        <Text style={styles.counterText}>
          {fotos.length} de 4 fotos agregadas
        </Text>
        <View style={styles.buttonContainer}>
          <Botton
            classname={styles.buttonSecundary}
            onPress={() => setReporte({ ...reporte, activeTab: "tecnico" })}
          >
            <Text style={styles.textSecundary}>Anterior</Text>
          </Botton>
          <Botton
            classname={styles.buttonPrimary}
            onPress={() => saveFotos()}
          >
            <Text style={styles.textPrimary}>Siguiente</Text>
          </Botton>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    borderBottomColor: "#9ca3af", // border-b-gray-400
    borderBottomWidth: 1,
    paddingBottom: 32, // pb-4
  },
  title: {
    color: "#414650ff", // azul-700
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 12, // mb-3
  },
  subtitle: {
    color: "#374151", // text-gray-700
    fontSize: 14, // text-sm
  },
  buttonRow: {
    flexDirection: "row",

    marginVertical: 16,
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB", // gris-300
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  icon: {
    marginRight: 6,
  },
  buttonText: {
    color: "#414650ff", // azul-600
    fontWeight: "500",
    fontSize: 13,
  },
  photoBox: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderStyle: "dashed",
    borderRadius: 12,
    height: 180,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
  },
  emptyText: {
    color: "#6B7280",
    fontWeight: "500",
    marginTop: 6,
  },
  emptySubtext: {
    color: "#9CA3AF",
    fontSize: 12,
    textAlign: "center",
  },
  fotosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    height: "100%",
    gap: "2%",
  },
  foto: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  photoButton: {
    width: "49%", // la mitad del ancho
    height: "49%", // la mitad del alto
  },
  counterText: {
    marginTop: 8,
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "500",
  },
  // Contenedor de botones
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 16, // space-y-4
  },
  buttonPrimary: {
    backgroundColor: "#171717", // bg-neutral-900
    paddingVertical: 12, // py-3
    paddingHorizontal: 24, // px-6
    borderRadius: 8, // rounded-md
    alignSelf: "flex-end", // self-end
    shadowColor: "#737373", // shadow-neutral-500
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // para Android
  },
  textPrimary: {
    color: "#fff", // text-white
    fontWeight: "600", // font-semibold
    fontSize: 14, // text-sm
  },
  buttonSecundary: {
    borderWidth: 1,
    borderColor: "#D1D5DB", // border-gray-300
    paddingVertical: 12, // py-3
    paddingHorizontal: 24, // px-6
    borderRadius: 8, // rounded-md
    alignSelf: "flex-end", // self-end
    shadowColor: "#737373", // shadow-neutral-500
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    backgroundColor: "#FFF", // fondo blanco por defecto
  },
  textSecundary: {
    color: "#000",
    fontWeight: "600",
    fontSize: 14, // text-sm
  },
});
