import { useAuth } from "@/context/AuthContext";
import { useReporte } from "@/context/ReporteContext";
import shortenText from "@/utils/shortenText";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ClipboardList, History } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PantallaInicio() {
  const router = useRouter();
  const { setReporte } = useReporte();
  const { user, profile, isAdmin, logout } = useAuth();

  return (
    <LinearGradient
      colors={["#eff6ff", "#f1f5f9"]} // from-blue-50 to-slate-100
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 10, flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={60} // sube un poco más el último input
      >
        {/* Ícono superior */}
        <View style={styles.iconContainer}>
          <Image
            source={require("../assets/images/logo-icon-mant-blanco.png")}
            style={styles.icon}
          />
        </View>

        {/* Título */}
        <Text style={styles.title}>App de Mantenimiento</Text>
        <Text style={styles.subtitle}>
          Sistema de Reportes de Mantenimiento
        </Text>

        {/* Encabezado rol */}
        <View style={styles.roleContainer}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#5A48FF" />
          <Text style={styles.roleText}>{shortenText(profile?.name || user?.email || "", 13)}</Text>
          <Text style={styles.roleBadge}>{profile?.role === "Administrador" ? "Admin" : "Tecnico"}</Text>
        </View>

        {/* Botones */}
        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={[styles.card, styles.cardActive]}
            onPress={() => {
              setReporte({
                activeTab: "cliente",
                pendiente: 1,
                cliente: {},
                equipo: {},
                tecnico: {},
                fotos: [],
                firma: null,
              });
              router.push("./reporte");
            }}
          >
            <View style={[styles.iconBox, styles.iconBoxBlue]}>
              <ClipboardList color="#2563eb" size={28} />
            </View>
            <View style={{ flex: 1 }}>
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
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Historial</Text>
              <Text style={styles.cardSubtitle}>
                Ver reportes anteriores guardados
              </Text>
            </View>
          </TouchableOpacity>

          {/* --- BOTÓN NUEVO: Gestión de Usuarios --- */}
          {isAdmin && (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("./UserManagementScreen")}
          >
            <View style={[styles.iconBox, styles.iconContainerPurple]}>
              <Ionicons name="people-outline" size={28} color="#9B59B6" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Gestión de Usuarios</Text>
              <Text style={styles.cardSubtitle}>
                Administrar usuarios del sistema
              </Text>
            </View>
          </TouchableOpacity>
          )}

          {/* --- BOTÓN NUEVO: Cerrar Sesión --- */}
          <TouchableOpacity
            style={styles.card}
            onPress={async () => {
              await logout();
            }}
          >
            <View style={[styles.iconBox, styles.iconContainerRed]}>
              <Ionicons name="log-out-outline" size={30} color="#E74C3C" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Cerrar Sesión</Text>
              <Text style={styles.cardSubtitle}>Salir del sistema</Text>
            </View>
          </TouchableOpacity>

        </View>

        {/* Versión */}
        <Text style={styles.versionText}>
          Versión 1.0 - Optimizado para dispositivos móviles
        </Text>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  iconContainer: {
    alignItems: "center",
  },
  icon: {
    backgroundColor: "#1B64F2",
    padding: 20,
    borderRadius: 100,
    marginBottom: 10,
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#2563eb",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 10,
  },
  roleContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 30,
    marginBottom: 20,
    elevation: 2,
  },
  roleText: {
    marginLeft: 6,
    fontSize: 14,
  },
  roleBadge: {
    backgroundColor: "black",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
    marginLeft: 8,
    fontSize: 11,
    fontWeight: "bold",
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
    borderColor: "#bfdbfe",
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
  iconContainerPurple: {
    backgroundColor: "#F0D9FF",
  },
  iconContainerRed: {
    backgroundColor: "#FFE1DE",
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
