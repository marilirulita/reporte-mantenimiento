import { Stack } from "expo-router";
import { ReporteProvider } from "@/context/ReporteContext";
import { ThemeProvider, useTheme } from "@/theme/ThemeContext";
import React, { useEffect } from "react";
import { createTables } from "../db/database";

function RootStack() {
  const { colors } = useTheme();

  useEffect(() => {
    createTables();
  }, []);

  return (
    <>
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
    </>
  );
}

export default function RootLayout() {
  return (
    <ReporteProvider>
      <ThemeProvider>
        <RootStack />
      </ThemeProvider>
    </ReporteProvider>
  );
}
