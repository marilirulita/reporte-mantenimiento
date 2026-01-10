import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useTheme } from "@/theme/ThemeContext";

interface MenuCardProps {
  onPress: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  styles: any;
  styleCard?: any;
  styleIconBox?: any;
}

export function MenuCard({
  onPress,
  icon,
  title,
  subtitle,
  styles,
  styleCard,
  styleIconBox,
}: MenuCardProps) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={styleCard}
      onPress={onPress}
    >
      <View style={styleIconBox}>{icon}</View>

      <View style={{ flex: 1 }}>
        <Text style={[styles.cardTitle, {color: colors.textPrimary}]}>{title}</Text>
        <Text style={[styles.cardSubtitle, { color: colors.textSecondary}]}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}
