import { Alert } from "react-native";

export function validarReporte(reporte: any): boolean {
  if (!reporte.firma) {
    Alert.alert("Requisito Firma", "Nesesita agregar una firma");
    return false;
  }

  if (!reporte.cliente?.cliente?.id || !reporte.cliente?.equipo?.id) {
    Alert.alert("Requisito Reporte", "Faltan datos del cliente y equipo");
    return false;
  }

  if (!reporte.tecnico?.fechaServicio) {
    Alert.alert("Requisito Reporte", "Faltan datos del area tecnica");
    return false;
  }

  if (!reporte.fotos || reporte.fotos.length === 0) {
    Alert.alert("Requisito Reporte", "Faltan fotos");
    return false;
  }

  return true;
}
