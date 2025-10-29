import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="reporte" options={{ title: "Nuevo Reporte" }} />
      <Stack.Screen
        name="historial"
        options={{ title: "Historial de Reportes" }}
      />
      <Stack.Screen
        name="PanelFirma"
        options={{ title: "Panel para firma" }}
      />
    </Stack>
  );
}
