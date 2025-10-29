import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#eff6ff", "#f1f5f9"]} // from-blue-50 to-slate-100
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text style={styles.title}>App de Mantenimiento</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.push("./reporte")}
          style={[styles.button, styles.primaryButton]}
        >
          <Text style={styles.primaryText}>Nuevo reporte</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("./historial")}
          style={[styles.button, styles.primaryButton]}
        >
          <Text style={styles.primaryText}>Historial</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#3b82f6", // bg-blue-500
  },
  primaryText: {
    color: "#fff",
    fontWeight: "600",
  },
});
