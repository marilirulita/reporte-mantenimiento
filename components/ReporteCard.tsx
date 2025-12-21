import { Reporte } from "@/models/Reporte";
import { View, TouchableOpacity, Text } from "react-native";
import {
  Calendar,
  Download,
  FileText,
  Trash2,
  User,
} from "lucide-react-native";
import { historialStyles as styles } from "@/styles/historialStyles";
import React from "react";
import { colorsDark } from "@/styles/tokens";

const Icon = ({ children }: any) => React.cloneElement(children, {
  size: 16,
  color: colorsDark.textSecondary,
});

export function ReporteCard({ item, onDownload, onDelete }: { item: Reporte | any, onDownload: (id: number) => void; onDelete: (id: number) => void }) {
  return (
    <View style={styles.reporteCard}>
      <View style={styles.reporteInfo}>
        <Text style={styles.reporteCliente}>{item.nombre}</Text>

        <View style={styles.reporteDetalle}>
          <Icon><Calendar /></Icon>
          <Text style={styles.reporteTexto}>{item.fecha}</Text>
        </View>

        <View style={styles.reporteDetalle}>
          <Icon><User /></Icon>
          <Text style={styles.reporteTexto}>Técnico: {item.tecnico}</Text>
        </View>

        <View style={styles.reporteDetalle}>
          <Icon><FileText /></Icon>
          <Text style={styles.reporteTexto}>
            {item.tipoEquipo}- {item.marca} - {item.modelo}
          </Text>
        </View>
      </View>

      <View style={styles.reporteBotones}>
        <TouchableOpacity
          testID={`btn-descargar-${item.id}`}
          style={styles.btnDescargar}
          onPress={() => onDownload(item.id)}
        >
          <Download size={28} color={colorsDark.success} />
        </TouchableOpacity>

        <TouchableOpacity
          testID={`btn-eliminar-${item.id}`}
          style={styles.btnEliminar}
          onPress={() => onDelete(item.id)}
        >
          <Trash2 size={28} color={colorsDark.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
