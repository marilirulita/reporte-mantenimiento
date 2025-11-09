import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ClipboardList, Wrench, Camera, PenLine } from "lucide-react-native";
import Cliente from "../components/cliente";
import Equipo from "../components/equipo";
import Fotos from "../components/fotos";
import Signature from "../components/firma";
import { LinearGradient } from "expo-linear-gradient";
import { useReporte } from "@/context/ReporteContext";

export default function NuevoReporteScreen() {
  const { reporte, setReporte } = useReporte();

  const tabs = [
    { name: "cliente", icon: ClipboardList },
    { name: "tecnico", icon: Wrench },
    { name: "fotos", icon: Camera },
    { name: "firma", icon: PenLine },
  ];

  return (
    <LinearGradient
      colors={["#eff6ff", "#f1f5f9"]} // from-blue-50 to-slate-100
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ height: "100%", width: "100%", padding: 10 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reporte de Mantenimiento</Text>
        <Text style={styles.headerSubtitle}>Servicio de Refrigeración</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => {
          const isActive = reporte.activeTab === tab.name;
          const Icon = tab.icon; // 👈 componente del ícono
          return (
            <TouchableOpacity
              key={tab.name}
              onPress={() => setReporte({...reporte, activeTab: tab.name})}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
            >
              <Icon
                size={22}
                color={isActive ? "#2563EB" : "#6B7280"} // azul o gris
                strokeWidth={2}
              />
              <Text
                style={[
                  styles.tabText,
                  isActive ? styles.tabTextActive : styles.tabTextInactive,
                ]}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Contenido principal */}
      {reporte.activeTab === "cliente" && <Cliente />}
      {reporte.activeTab === "tecnico" && <Equipo />}
      {reporte.activeTab === "fotos" && <Fotos />}
      {reporte.activeTab === "firma" && (
        <View style={{ flex: 1 }}>
          <Signature />
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // Header
  header: {
    backgroundColor: "#2563eb", // bg-blue-600
    padding: 24, // p-6
    borderBottomLeftRadius: 24, // rounded-b-3xl
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20, // text-xl
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#bfdbfe", // text-blue-100
  },

  // Tabs
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    backgroundColor: "#e5e7eb", // bg-gray-200
    padding: 4, // p-1
    borderRadius: 9999, // rounded-full
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 9999,
  },
  tabButtonActive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#2563eb", // text-blue-600
  },
  tabTextInactive: {
    color: "#4b5563", // text-gray-600
  },
});
