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
import { useTheme } from "@/theme/ThemeContext";

export function ReporteCard({
  item,
  onDownload,
  onDelete,
}: {
  item: Reporte | any;
  onDownload: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const { colors } = useTheme();

  const Icon = ({ children }: any) =>
    React.cloneElement(children, {
      size: 16,
      color: colors.textSecondary,
    });

  return (
    <View
      style={[
        styles.reporteCard,
        {
          backgroundColor: colors.surfaceSoft,
          borderColor: colors.accent,
          shadowColor: colors.icon,
        },
      ]}
    >
      <View style={styles.reporteInfo}>
        <Text style={[styles.reporteCliente, { color: colors.textPrimary }]}>
          {item.nombre}
        </Text>

        <View style={styles.reporteDetalle}>
          <Icon>
            <Calendar />
          </Icon>
          <Text style={[styles.reporteTexto, { color: colors.textSecondary }]}>
            {item.fecha}
          </Text>
        </View>

        <View style={styles.reporteDetalle}>
          <Icon>
            <User />
          </Icon>
          <Text style={[styles.reporteTexto, { color: colors.textSecondary }]}>
            Técnico: {item.tecnico}
          </Text>
        </View>

        <View style={styles.reporteDetalle}>
          <Icon>
            <FileText />
          </Icon>
          <Text style={[styles.reporteTexto, { color: colors.textSecondary }]}>
            {item.tipoEquipo}- {item.marca} - {item.modelo}
          </Text>
        </View>
      </View>

      <View style={styles.reporteBotones}>
        <TouchableOpacity
          testID={`btn-descargar-${item.id}`}
          style={[styles.btnDescargar, {borderColor: colors.success}]}
          onPress={() => onDownload(item.id)}
        >
          <Download size={28} color={colors.success} />
        </TouchableOpacity>

        <TouchableOpacity
          testID={`btn-eliminar-${item.id}`}
          style={[styles.btnEliminar, {borderColor: colors.error}]}
          onPress={() => onDelete(item.id)}
        >
          <Trash2 size={28} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
