import { addReporte } from "@/db/reportes.repo";
import { validarReporte } from "@/utils/validarReporte";
import { Alert, StyleSheet, Text } from "react-native";
import { useReporte } from "../context/ReporteContext";
import { generarPDF } from "../utils/generarPDF";
import { Botton } from "./ui/button";
import { useRouter } from "expo-router";
import { useTheme } from "@/theme";

const BotonFinalizar = () => {
  const { colors } = useTheme();
  const { reporte, setReporte } = useReporte();
  const router = useRouter();

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

    setReporte({
      activeTab: "cliente",
      cliente: {},
      tecnico: {},
      fotos: [],
      firma: null,
    });

    Alert.alert("Reporte guardado con éxito ✅");
    router.push("/");
  };

  return (
    <Botton onPress={handleFinalizar} classname={styles.buttonPrimary} variant='primary'>
      <Text style={[styles.textPrimary, {color: colors.white}]}>Finalizar</Text>
    </Botton>
  );
};

const styles = StyleSheet.create({
  buttonPrimary: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  textPrimary: {
    fontWeight: "600", // font-semibold
    fontSize: 14, // text-sm
  },
});

export default BotonFinalizar;
