import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ReporteProvider } from "@/context/ReporteContext";
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { createTables } from "../db/database";

function ProtectedStack() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const currentRoute = segments[0];

    if (!user) {
      // Si no hay usuario, redirigir al login
      if (currentRoute !== "LoginScreen") {
        router.push("/LoginScreen");
      }
    } else if (user && currentRoute === "LoginScreen") {
      // Redirigir al home si está autenticado y está en login
      router.replace("/");
    }
  }, [user, loading, segments, router]);

  if (loading) return null; // opcional: pantalla de splash

  const unauthenticatedScreens = [
    { name: "LoginScreen", options: { title: "Login" } },
  ];

  const authenticatedScreens = [
    { name: "index", options: { title: "Home" } },
    { name: "reporte", options: { title: "Nuevo Reporte" } },
    { name: "historial", options: { title: "Historial de Reportes" } },
    {
      name: "UserManagementScreen",
      options: { title: "Administracion de Usuarios" },
    },
    { name: "PanelFirma", options: { title: "Panel para firma" } },
  ];

  const screensToRender = user ? authenticatedScreens : unauthenticatedScreens;

  return (
    <Stack>
      {screensToRender.map((screen) => (
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    createTables();
  }, []);

  return (
    <AuthProvider>
      <ReporteProvider>
        <ProtectedStack />
      </ReporteProvider>
    </AuthProvider>
  );
}
