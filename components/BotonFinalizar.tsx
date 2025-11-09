import { useReporte } from "../context/ReporteContext";
import { generarPDF } from "../utils/generarPDF";
import { Text, StyleSheet, Alert } from "react-native";
import { Botton } from "./ui/button";
import { addReporte } from "@/db/databaseActions";
import { Reporte } from "@/models/Reporte";
import { useState } from "react";

const BotonFinalizar = () => {
  const { reporte } = useReporte();
  const [reporteCompleto, setReporteCompleto] = useState<Reporte>();

  const handleFinalizar = async () => {
    if (reporte.firma === null) {
      Alert.alert("Requisito Firma", "Nesesita agregar una firma");
      return;
    }

    if (!reporte.cliente?.cliente?.id || !reporte.cliente?.equipo?.id ) {;
      Alert.alert("Requisito Reporte", "Faltan datos del cliente y equipo");
      return;
    }

    if (!reporte.tecnico?.fechaServicio) {;
      Alert.alert("Requisito Reporte", "Faltan datos del area tecnica");
      return;
    }

    if (reporte.fotos.length <= 0) {;
      Alert.alert("Requisito Reporte", "Faltan fotos");
      return;
    }

    const PDFuri = await generarPDF(reporte, false);

    setReporteCompleto({
      idCliente: reporte.cliente.cliente.id,
      idEquipo: reporte.cliente.equipo.id,
      fecha: reporte.tecnico.fechaServicio,
      tecnico: reporte.tecnico.nombreTecnico,
      estadoEquipo: reporte.tecnico.estadoEquipo,
      tipoRefrigerante: reporte.tecnico.tipoRefrigerante,
      presion: reporte.tecnico.presion,
      temperaturaAmbiente: reporte.tecnico.temperaturaAmbiente,
      temperaturaEquipo: reporte.tecnico.temperaturaEquipo,
      voltaje: reporte.tecnico.voltaje,
      amperaje: reporte.tecnico.amperaje,
      trabajoRealizado: reporte.tecnico.trabajoRealizado,
      observaciones: reporte.tecnico.observaciones,
      recomendaciones: reporte.tecnico.observacionesAdicionales,
      fotos: reporte.fotos,
      firma: reporte.firma,
      pdfUri: PDFuri,
    });
    await addReporte(reporteCompleto!);
    
    alert("Reporte guardado con éxito ✅");
  };

  return (
    <Botton onPress={handleFinalizar} classname={styles.buttonPrimary}>
      <Text style={styles.textPrimary}>Finalizar</Text>
    </Botton>
  );
};

const styles = StyleSheet.create({
  buttonPrimary: {
    backgroundColor: "#171717", // bg-neutral-900
    paddingVertical: 12, // py-3
    paddingHorizontal: 24, // px-6
    borderRadius: 8, // rounded-md
    shadowColor: "#737373", // shadow-neutral-500
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // para Android
  },
  textPrimary: {
    color: "#fff", // text-white
    fontWeight: "600", // font-semibold
    fontSize: 14, // text-sm
  },
});

export default BotonFinalizar;
