import { View, Text, TouchableOpacity } from "react-native";
import { FileText, ClipboardList } from "lucide-react-native";
import { historialStyles as styles } from "@/styles/historialStyles";

export function EmptyState({ onPress }: { onPress: () => void }) {
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconBox}>
        <FileText color="#94a3b8" size={40} />
      </View>
      <Text style={styles.emptyTitle}>No hay reportes guardados</Text>
      <Text style={styles.emptySubtitle}>
        Los reportes se guardarán automáticamente cuando los generes
      </Text>

      <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
        <ClipboardList color="white" size={24} style={{ marginRight: 8 }} />
        <Text style={styles.primaryButtonText}>Crear Primer Reporte</Text>
      </TouchableOpacity>
    </View>
  );
}
