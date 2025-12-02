import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

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
  return (
    <TouchableOpacity
      style={styleCard}
      onPress={onPress}
    >
      <View style={styleIconBox}>{icon}</View>

      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}
