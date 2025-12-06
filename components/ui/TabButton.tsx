import { TouchableOpacity, Text } from "react-native";
import { COLORS } from "@/constants/colors";
import { reporteStyles as styles } from "@/styles/reporteStyles";

/* ⭐ COMPONENTE REUTILIZABLE DE TABS */
export default function TabButton({
  tab,
  active,
  onPress,
}: {
  tab: { name: string; icon: any };
  active: boolean;
  onPress: () => void;
}) {
  const Icon = tab.icon;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tabButton, active && styles.tabButtonActive]}
    >
      <Icon
        size={22}
        color={active ? COLORS.primary : COLORS.gray}
        strokeWidth={2}
      />
      <Text
        style={[styles.tabText, active ? styles.tabTextActive : styles.tabTextInactive]}
      >
        {tab.name}
      </Text>
    </TouchableOpacity>
  );
}
