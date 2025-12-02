import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ClipboardList, History, Snowflake } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function PantallaInicio() {
  const router = useRouter();
  return (
    <LinearGradient
      colors={["#eff6ff", "#f1f5f9"]} // from-blue-50 to-slate-100
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Ícono principal */}
      <View style={styles.iconContainer}>
        <Snowflake color="white" size={50} />
      </View>

      {/* Título */}
      <Text style={styles.title}>App de Mantenimiento</Text>
      <Text style={styles.subtitle}>Sistema de Reportes de Mantenimiento</Text>

      {/* Botones */}
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={[styles.card, styles.cardActive]}
          onPress={() => router.push("./reporte")}
        >
          <View style={[styles.iconBox, styles.iconBoxBlue]}>
            <ClipboardList color="#414650ff" size={28} />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.cardTitle}>Nuevo Reporte</Text>
            <Text style={styles.cardSubtitle}>
              Crear un nuevo reporte de mantenimiento
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("./historial")}
        >
          <View style={[styles.iconBox, styles.iconBoxGray]}>
            <History color="#334155" size={28} />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.cardTitle}>Historial</Text>
            <Text style={styles.cardSubtitle}>
              Ver reportes anteriores guardados
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Versión */}
      <Text style={styles.versionText}>
        Versión 1.0 - Optimizado para dispositivos móviles
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  iconContainer: {
    backgroundColor: "#414650ff",
    padding: 20,
    borderRadius: 50,
    marginBottom: 16,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#414650ff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 32,
  },
  cardsContainer: {
    width: "100%",
    gap: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardActive: {
    backgroundColor: "#f0f7ff",
    borderColor: "#d7e4f3ff",
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  iconBoxBlue: {
    backgroundColor: "#dbeafe",
  },
  iconBoxGray: {
    backgroundColor: "#f1f5f9",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#64748b",
  },
  versionText: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 40,
    textAlign: "center",
  },
});
