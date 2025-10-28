import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <LinearGradient
        colors={["#eff6ff", "#f1f5f9"]} // from-blue-50 to-slate-100
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="reporte" options={{ title: "Nuevo Reporte" }} />
        <Stack.Screen
          name="historial"
          options={{ title: "Historial de Reportes" }}
        />
      </LinearGradient>
    </Stack>
  );
}

const styles = StyleSheet.create({
  // Contenedor principal con gradiente
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
  },
});
