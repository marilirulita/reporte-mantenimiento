import {
  deleteReporte,
  getReportesConCliente,
  updateReporte,
} from "@/db/databaseActions";
import { Reporte } from "@/models/interfaces";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Calendar,
  ClipboardList,
  Download,
  FileText,
  Search,
  Trash2,
  User,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../types/navigation"; // importa tus tipos
import { generarPDF } from "../utils/generarPDF";

type FirmaScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Firma"
>;

export default function HistorialScreen() {
  const router = useRouter();
  const navigation = useNavigation<FirmaScreenNavigationProp>();
  const [reportes, setReportes] = useState<any[]>([]);
  const [resultados, setResultados] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarReportes();
  }, []);

  useEffect(() => {
    if (busqueda.trim().length > 1) {
      const query = busqueda.toLowerCase();
      const filtrados = reportes.filter(
        (r) =>
          (r.nombre && r.nombre.toLowerCase().includes(query)) ||
          (r.serie && r.serie.toLowerCase().includes(query)) ||
          (r.tecnico_nombre &&
            r.tecnico_nombre.toLowerCase().includes(query)) ||
          (r.reporte_numero &&
            r.reporte_numero.toLowerCase().includes(query)) ||
          (r.fecha_ejecucion && r.fecha_ejecucion.includes(query))
      );
      setResultados(filtrados);
    } else {
      setResultados(reportes);
    }
  }, [busqueda, reportes]);

  const cargarReportes = async () => {
    const data = await getReportesConCliente();
    setReportes(data);
    setResultados(data);
  };

  const handleSaveSignature = async (id: number, uri: string) => {
    await updateReporte(id, uri);
    const data = await getReportesConCliente();
    const reporte = data.find((r) => r.id === id);
    await generarPDF(reporte, true);
    cargarReportes();
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
    setReportes((prev) => prev.filter((r) => r.id !== id));
    alert("Reporte Eliminado");
  };

  const renderReporte = ({ item }: { item: Reporte | any }) => (
    <View style={styles.reporteCard}>
      <View style={styles.reporteInfo}>
        <Text style={styles.reporteCliente}>{item.nombre}</Text>

        <View style={styles.reporteDetalle}>
          <Calendar size={16} color="#475569" />
          <Text style={styles.reporteTexto}>{item.fecha_ejecucion}</Text>
        </View>

        <View style={styles.reporteDetalle}>
          <User size={16} color="#475569" />
          <Text style={styles.reporteTexto}>
            Técnico: {item.tecnico_nombre}
          </Text>
        </View>

        <View style={styles.reporteDetalle}>
          <FileText size={16} color="#475569" />
          <Text style={styles.reporteTexto}>
            {item.marca} - {item.modelo}
          </Text>
        </View>
      </View>

      <View style={styles.reporteBotones}>
        {item.pendiente === 1 ? (
          <TouchableOpacity
            style={{ backgroundColor: "gray" }}
            onPress={() =>
              navigation.navigate("PanelFirma", {
                onSave: (uri: string) => handleSaveSignature(item.id!, uri),
              })
            }
          >
            <Text style={{ color: "red" }}>Completar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.btnDescargar}
            onPress={() => descargarPDF(item.id!)}
          >
            <Download size={18} color="#1e293b" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.btnEliminar}
          onPress={() => handleEliminar(item.id!)}
        >
          <Trash2 size={18} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#eff6ff", "#f1f5f9"]} // from-blue-50 to-slate-100
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
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
          onChangeText={(text) => setBusqueda(text)}
          placeholderTextColor="#94a3b8"
          style={styles.searchInput}
        />
      </View>

      {/* Lista o vacío */}
      {reportes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBox}>
            <FileText color="#94a3b8" size={40} />
          </View>
          <Text style={styles.emptyTitle}>No hay reportes guardados</Text>
          <Text style={styles.emptySubtitle}>
            Los reportes se guardarán automáticamente cuando los generes
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.replace("./reporte")}
          >
            <ClipboardList color="white" size={24} style={{ marginRight: 8 }} />
            <Text style={styles.primaryButtonText}>Crear Primer Reporte</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={resultados}
          renderItem={renderReporte}
          keyExtractor={(item) => item.id!.toString()}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  headerIcon: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    padding: 10,
  },
  headerTitulo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2563eb",
  },
  headerSubtitulo: {
    fontSize: 14,
    color: "#64748b",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#1e293b",
  },
  emptyContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  emptyIconBox: {
    backgroundColor: "#f1f5f9",
    padding: 18,
    borderRadius: 50,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#1e293b",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 20,
  },
  primaryButton: {
    flexDirection: "row",
    backgroundColor: "#0f172a",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  reporteCard: {
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  reporteInfo: {
    flex: 1,
  },
  reporteCliente: {
    fontWeight: "600",
    fontSize: 16,
    textTransform: "capitalize",
    marginBottom: 6,
    color: "#1e293b",
  },
  reporteDetalle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  reporteTexto: {
    color: "#475569",
    fontSize: 13,
  },
  reporteBotones: {
    alignItems: "center",
    gap: 12,
  },
  btnDescargar: {
    backgroundColor: "#f1f5f9",
    padding: 8,
    borderRadius: 8,
    width: 50,
    alignItems: "center",
  },
  btnEliminar: {
    backgroundColor: "#fee2e2",
    padding: 8,
    borderRadius: 8,
    width: 50,
    alignItems: "center",
  },
  sinReportes: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  sinReportesTexto: {
    fontSize: 16,
    fontWeight: "500",
    color: "#475569",
    marginTop: 10,
  },
  sinReportesSub: {
    color: "#94a3b8",
    fontSize: 13,
    textAlign: "center",
    marginVertical: 10,
  },
  btnCrear: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginTop: 8,
    gap: 6,
  },
  btnCrearTexto: {
    color: "white",
    fontWeight: "500",
  },
});
