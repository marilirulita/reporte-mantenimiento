import React from "react";
import { Image } from "expo-image";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { ClipboardList, History, } from "lucide-react-native";
import { GradientLayout } from "@/components/GradientLayout";
import { indexStyles as styles } from "@/styles/indexStyles";
import { MenuCard } from "@/components/MenuCard";
import { Images } from "@/constants/assets";
import { useTheme } from "@/theme";

type RutaValida = "/reporte" | "/historial" | "/";

export default function PantallaInicio() {
  const { colors } = useTheme();

  const menuItems: { title: string; subtitle: string; path: RutaValida, icon: React.ReactNode, styleCard: object, styleIconBox: object }[] = [
    {
      title: "Nuevo Reporte",
      subtitle: "Crear un nuevo reporte de mantenimiento",
      icon: <ClipboardList 
      color={colors.accent} size={28} />,
      path: "/reporte",
      styleCard: [styles.card, { backgroundColor: colors.surface, borderColor: colors.border }],
      styleIconBox: [styles.iconBox, { backgroundColor: colors.textPrimary }],
    },
    {
      title: "Historial",
      subtitle: "Ver reportes anteriores guardados",
      icon: <History 
      color={colors.accent} size={28} />,
      path: "/historial",
      styleCard: [styles.card, { backgroundColor: colors.surfaceSoft, borderColor: colors.border }],
      styleIconBox: [styles.iconBox, { backgroundColor: colors.textSecondary }],
    },
  ];
  const router = useRouter();
  return (
    <GradientLayout style={styles.container}>
      {/* Ícono principal */}
      <View style={[styles.iconContainer, {backgroundColor: colors.white, shadowColor: colors.icon}]}>
        <Image
            source={Images.logo}
            style={{ width: 90, height: 90, borderRadius: 30 }}
          />
      </View>

      {/* Título */}
      <Text style={[styles.title, {color: colors.textPrimary}]}>App de Mantenimiento</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary}]}>Sistema de Reportes de Mantenimiento</Text>

      <View style={styles.cardsContainer}>
        {menuItems.map((item, index) => (
          <MenuCard
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            onPress={() => router.push(item.path)}
            styles={styles}
            styleCard={item.styleCard}
            styleIconBox={item.styleIconBox}
          />
        ))}
      </View>

      {/* Versión */}
      <Text style={[styles.versionText, {color: colors.textMuted}]}>
        Versión 1.0 - Optimizado para dispositivos móviles
      </Text>
    </GradientLayout>
  );
}
