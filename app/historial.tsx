import { EmptyState } from "@/components/EmptyState";
import { GradientLayout } from "@/components/GradientLayout";
import { ReporteCard } from "@/components/ReporteCard";
import { deleteReporte, getReportesConCliente } from "@/db/reportes.repo";
import { filtrarReportes } from "@/hooks/useHistorial";
import { historialStyles as styles } from "@/styles/historialStyles";
import { useRouter } from "expo-router";
import { FileText, Search } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";
import { generarPDF } from "../utils/generarPDF";
import { useTheme } from "@/theme/ThemeContext";

export default function HistorialScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [reportes, setReportes] = useState<any[]>([]);
  const [resultados, setResultados] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarReportes();
  }, []);

  useEffect(() => {
    setResultados(filtrarReportes(reportes, busqueda));
  }, [busqueda, reportes]);

  const cargarReportes = async () => {
    const data = await getReportesConCliente();
    setReportes(data);
    setResultados(data);
  };

  const descargarPDF = async (id: number) => {
    const reporte = reportes.find((r) => r.id === id);
    if (!reporte) return alert("Reporte no encontrado");
    await generarPDF(reporte, true);
    alert("PDF generado con éxito ✅");
  };

  const handleEliminar = async (id: number) => {
    await deleteReporte(id);
    cargarReportes();
    alert("Reporte Eliminado");
  };

  return (
    <GradientLayout style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <FileText size={40} color={colors.icon} />
        </View>
        <View>
          <Text style={[styles.headerTitulo, {color: colors.textPrimary}]}>Historial de Reportes</Text>
          <Text style={[styles.headerSubtitulo, {color: colors.textSecondary}]}>
            {reportes.length} {reportes.length === 1 ? "reporte" : "reportes"}
          </Text>
        </View>
      </View>

      {/* Barra de búsqueda */}
      <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.accent}]}>
        <Search size={24} color={colors.textSecondary} style={{ marginRight: 6 }} />
        <TextInput
          placeholder="Buscar Reporte..."
          value={busqueda}
          onChangeText={setBusqueda}
          placeholderTextColor={colors.textSecondary}
          style={[styles.searchInput, {color: colors.textSecondary}]}
        />
      </View>

      {/* Lista o vacío */}
      {reportes.length === 0 ? (
        <EmptyState onPress={() => router.replace("./reporte")} />
      ) : (
        <FlatList
          data={resultados}
          renderItem={({ item }) => (
            <ReporteCard
              item={item}
              onDownload={descargarPDF}
              onDelete={handleEliminar}
            />
          )}
          keyExtractor={(item) => item.id!.toString()}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </GradientLayout>
  );
}
