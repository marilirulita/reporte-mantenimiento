import { Stack } from "expo-router";
import { ReporteProvider } from "@/context/ReporteContext";
import React, { useEffect } from "react";
import { createTables } from "../db/database";
import { useColorScheme } from "react-native";
import { lightColors, colorsDark } from "../styles/tokens";

export default function RootLayout() {
  const scheme = useColorScheme();
  const colors = scheme === "dark" ? colorsDark : lightColors;
  
  useEffect(() => {
    createTables();
  }, []);

  return (
    <ReporteProvider>
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          color: colors.textPrimary,
        },
        headerTintColor: colors.accent, // flecha back y acciones
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}>
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="reporte"
          options={{
            title: "Nuevo Reporte",
          }}
        />
        <Stack.Screen
          name="historial"
          options={{
            title: "Historial de Reportes",
          }}
        />
        <Stack.Screen
          name="PanelFirma"
          options={{
            title: "Panel para firma",
          }}
        />
      </Stack>
    </ReporteProvider>
  );
}
