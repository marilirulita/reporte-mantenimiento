import { Stack } from "expo-router";
import { ReporteProvider } from "@/context/ReporteContext"; 
import React, { useEffect } from "react";
import { createTables } from "../db/database";

export default function RootLayout() {
  useEffect(() => {
    createTables();
  }, []);
  
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
