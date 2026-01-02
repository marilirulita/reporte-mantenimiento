import { View, Text } from "react-native";
import { FileText, ClipboardList } from "lucide-react-native";
import { historialStyles as styles } from "@/styles/historialStyles";
import { Botton } from "./ui/button";
import { useTheme } from "@/theme";

export function EmptyState({ onPress }: { onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.emptyContainer, {backgroundColor: colors.surface, borderColor: colors.accent}]}>
      <View style={[styles.emptyIconBox, {backgroundColor: colors.accent}]}>
        <FileText color={colors.white} size={40} />
      </View>
      <Text style={[styles.emptyTitle, {color: colors.textPrimary}]}>No hay reportes guardados</Text>
      <Text style={[styles.emptySubtitle, {color: colors.textSecondary}]}>
        Los reportes se guardarán automáticamente cuando los generes
      </Text>

      <Botton classname={styles.primaryButton} variant="info" onPress={onPress}>
        <ClipboardList color={colors.background} size={24} style={{ marginRight: 8 }} />
        <Text style={[styles.primaryButtonText, {color: colors.background}]}>Crear Primer Reporte</Text>
      </Botton>
    </View>
  );
}
