import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { ClipboardList, History, Snowflake } from "lucide-react-native";
import { GradientLayout } from "@/components/GradientLayout";
import { indexStyles as styles } from "@/styles/indexStyles";
import { MenuCard } from "@/components/MenuCard";

type RutaValida = "/reporte" | "/historial" | "/";

export default function PantallaInicio() {
  const menuItems: { title: string; subtitle: string; path: RutaValida, icon: React.ReactNode, styleCard: object, styleIconBox: object }[] = [
    {
      title: "Nuevo Reporte",
      subtitle: "Crear un nuevo reporte de mantenimiento",
      icon: <ClipboardList color="#414650ff" size={28} />,
      path: "/reporte",
      styleCard: [styles.card, styles.cardActive],
      styleIconBox: [styles.iconBox, styles.iconBoxBlue],
    },
    {
      title: "Historial",
      subtitle: "Ver reportes anteriores guardados",
      icon: <History color="#334155" size={28} />,
      path: "/historial",
      styleCard: styles.card,
      styleIconBox: [styles.iconBox, styles.iconBoxGray],
    },
  ];
  const router = useRouter();
  return (
    <GradientLayout style={styles.container}>
      {/* Ícono principal */}
      <View style={styles.iconContainer}>
        <Snowflake color="white" size={50} />
      </View>

      {/* Título */}
      <Text style={styles.title}>App de Mantenimiento</Text>
      <Text style={styles.subtitle}>Sistema de Reportes de Mantenimiento</Text>

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
      <Text style={styles.versionText}>
        Versión 1.0 - Optimizado para dispositivos móviles
      </Text>
    </GradientLayout>
  );
}
