import { TouchableOpacity, Text } from "react-native";
import { colorsDark } from "@/styles/tokens";
import { reporteStyles as styles } from "@/styles/reporteStyles";
import { useTheme } from "@/theme";

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
  const { colors } = useTheme();
  const Icon = tab.icon;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tabButton, active && styles.tabButtonActive, {backgroundColor: active ? colors.accentHover : colors.accent, shadowColor: colors.icon}]}
    >
      <Icon
        size={20}
        color={active ? colorsDark.white : colorsDark.textSecondary}
        strokeWidth={2}
      />
      <Text
        style={[styles.tabText, {color: active ? colorsDark.white : colorsDark.textSecondary}]}
      >
        {tab.name}
      </Text>
    </TouchableOpacity>
  );
}
