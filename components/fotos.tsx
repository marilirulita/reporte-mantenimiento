import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { Camera, Upload, Image as ImageIcon } from "lucide-react-native";
import { Botton } from "./ui/button";
import { useNextSection } from "../hooks/useNextSection";
import { useReporte } from "../context/ReporteContext";
import { fotosStyles as styles } from "../styles/fotosStyles";
import { pickImage } from "./FotosScreen/pickImage";

export default function Fotos() {
  const [fotos, setFotos] = useState<string[]>([]);
 
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
    if (!validarFotos(fotos)) {
      Alert.alert("Requisito Fotos","Nesesita agregar al menos 2 fotos");
      return;
    }
    handleNext("fotos", fotos)
  };
  
  const validarFotos = (fotos: string[]) => fotos.length >= 2;
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
            onPress={() => pickImage("camara", setFotos, fotos)}
          >
            <Camera size={18} color="#414650ff" style={styles.icon} />
            <Text style={styles.buttonText}>Tomar Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => pickImage("galeria", setFotos, fotos)}
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
