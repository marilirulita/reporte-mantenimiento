import { deleteReporte, getReportesConCliente } from "@/db/databaseActions";
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
import { filtrarReportes } from "@/hooks/useHistorial";
import { ReporteCard } from "@/components/ReporteCard";
import { EmptyState } from "@/components/EmptyState";
import { historialStyles as styles } from "@/styles/historialStyles";
import { GradientLayout } from "@/components/GradientLayout";

export default function HistorialScreen() {
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
    //setReportes((prev) => prev.filter((r) => r.id !== id));
    alert("Reporte Eliminado");
  };

  return (
    <GradientLayout>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <FileText size={40} color="white" />
        </View>
        <View>
          <Text style={styles.headerTitulo}>Historial de Reportes</Text>
          <Text style={styles.headerSubtitulo}>
            {reportes.length} {reportes.length === 1 ? "reporte" : "reportes"}
          </Text>
        </View>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <Search size={24} color="#94a3b8" style={{ marginRight: 6 }} />
        <TextInput
          placeholder="Buscar por cliente, técnico, marca..."
          value={busqueda}
          onChangeText={setBusqueda}
          placeholderTextColor="#94a3b8"
          style={styles.searchInput}
        />
      </View>

      {/* Lista o vacío */}
      {reportes.length === 0 ? (
        <EmptyState onPress={() => router.push("./reporte")} />
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
