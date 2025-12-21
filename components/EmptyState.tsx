import { View, Text } from "react-native";
import { FileText, ClipboardList } from "lucide-react-native";
import { historialStyles as styles } from "@/styles/historialStyles";
import { Botton } from "./ui/button";
import { colorsDark } from "@/styles/tokens";

export function EmptyState({ onPress }: { onPress: () => void }) {
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconBox}>
        <FileText color={colorsDark.white} size={40} />
      </View>
      <Text style={styles.emptyTitle}>No hay reportes guardados</Text>
      <Text style={styles.emptySubtitle}>
        Los reportes se guardarán automáticamente cuando los generes
      </Text>

      <Botton classname={styles.primaryButton} variant="info" onPress={onPress}>
        <ClipboardList color={colorsDark.background} size={24} style={{ marginRight: 8 }} />
        <Text style={styles.primaryButtonText}>Crear Primer Reporte</Text>
      </Botton>
    </View>
  );
}
