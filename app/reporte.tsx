import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { ClipboardList, Wrench, Camera, PenLine } from "lucide-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Cliente from "../components/cliente";
import Equipo from "../components/equipo";

export default function NuevoReporteScreen() {
  const [activeTab, setActiveTab] = useState("Cliente");

  const tabs = [
    { name: "Cliente", icon: ClipboardList },
    { name: "Tecnico", icon: Wrench },
    { name: "Fotos", icon: Camera },
    { name: "Firma", icon: PenLine },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reporte de Mantenimiento</Text>
        <Text style={styles.headerSubtitle}>Servicio de Refrigeración</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          const Icon = tab.icon; // 👈 componente del ícono
          return (
            <TouchableOpacity
              key={tab.name}
              onPress={() => setActiveTab(tab.name)}
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
      <KeyboardAwareScrollView
        style={{ backgroundColor: "#f5f5f5" }}
        enableOnAndroid={true}
        extraScrollHeight={60} // sube un poco más el último input
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {activeTab === "Cliente" && <Cliente />}
          {activeTab === "Tecnico" && <Equipo />}

          {activeTab === "Fotos" && (
            <View style={styles.section}>
              <Text style={styles.sectionText}>
                Aquí podrás cargar las fotos del equipo
              </Text>
              <TouchableOpacity style={styles.photoButton}>
                <Text style={styles.photoButtonText}>Tomar o Subir Foto</Text>
              </TouchableOpacity>
            </View>
          )}

          {activeTab === "Firma" && (
            <View style={styles.section}>
              <Text style={styles.sectionText}>
                Captura la firma del cliente
              </Text>
              <View style={styles.signatureBox}></View>
            </View>
          )}
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Contenedor principal
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6", // bg-gray-100
  },

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
    marginTop: 16,
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
    fontSize: 14,
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#2563eb", // text-blue-600
  },
  tabTextInactive: {
    color: "#4b5563", // text-gray-600
  },

  // Scroll contenido
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  // Secciones (Fotos / Firma)
  section: {
    marginTop: 40,
    alignItems: "center",
  },
  sectionText: {
    marginBottom: 12,
    color: "#4b5563", // text-gray-600
  },

  // Botón azul
  photoButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  photoButtonText: {
    fontWeight: "600",
    color: "#fff",
  },

  // Caja de firma
  signatureBox: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db", // border-gray-300
    backgroundColor: "#fff",
  },
});
