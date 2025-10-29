import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const HistorialScreen = () => {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#eff6ff", "#f1f5f9"]} // from-blue-50 to-slate-100
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text style={styles.title}>Historial de Descargas</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.push("./")}
          style={[styles.button, styles.primaryButton]}
        >
          <Text style={styles.primaryText}>Atras</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  // Contenedor principal con gradiente
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
  },

  // Título
  title: {
    fontSize: 24, // text-2xl
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2563eb", // text-blue-600
  },

  // Contenedor de botones
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: 16,
    paddingHorizontal: 32, // px-8
    gap: 16, // space-y-4
  },

  // Botón base
  button: {
    width: "100%",
    borderRadius: 12, // rounded-xl
    paddingVertical: 12, // py-3
    paddingHorizontal: 20, // px-5
    alignItems: "flex-start",
    alignSelf: "flex-start", // w-fit
  },

  // Botón azul
  primaryButton: {
    backgroundColor: "#444",
  },
  primaryText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default HistorialScreen;
