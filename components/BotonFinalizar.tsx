import { addReporte } from "@/db/reportes.repo";
import { validarReporte } from "@/utils/validarReporte";
import { Alert, StyleSheet, Text } from "react-native";
import { useReporte } from "../context/ReporteContext";
import { generarPDF } from "../utils/generarPDF";
import { Botton } from "./ui/button";

const BotonFinalizar = () => {
  const { reporte } = useReporte();

  const handleFinalizar = async () => {

    if (!validarReporte(reporte)) return;

    const PDFuri = await generarPDF(reporte, false);

    const reporteCompleto = {
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
      firma: reporte.firma ?? "",
      pdfUri: PDFuri,
    };
    await addReporte(reporteCompleto);
    
    Alert.alert("Reporte guardado con éxito ✅");
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
