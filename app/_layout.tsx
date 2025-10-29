import { Stack } from "expo-router";
import { ReporteProvider } from "@/context/ReporteContext"; 

export default function RootLayout() {
  return (
    <ReporteProvider>
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
    </ReporteProvider>
  );
}
