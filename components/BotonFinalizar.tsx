import { addReporte } from "@/db/databaseActions";
import { Alert, StyleSheet, Text } from "react-native";
import { useReporte } from "../context/ReporteContext";
import { generarPDF } from "../utils/generarPDF";
import { Botton } from "./ui/button";

const BotonFinalizar = () => {
  const { reporte, setReporte } = useReporte();

  const handleFinalizar = async () => {
    if (!reporte.cliente?.id || !reporte.equipo?.id ) {;
      Alert.alert("Requisito Reporte", "Faltan datos del cliente y equipo");
      return;
    }

    if (!reporte.tecnico?.cobro_servicio) {;
      Alert.alert("Requisito Reporte", "Faltan datos del area tecnica");
      return;
    }

    if (reporte.fotos.length <= 0) {;
      Alert.alert("Requisito Reporte", "Faltan fotos");
      return;
    }

    const reporteCompleto = {
      cliente_id: reporte.cliente.id,
      equipo_id: reporte.equipo.id,
      reporte_numero: reporte.tecnico.reporte_numero,
      tecnico_id: reporte.tecnico.tecnico_id,
      tecnico_nombre: reporte.tecnico.tecnico_nombre,
      fecha_ejecucion: reporte.tecnico.fecha_ejecucion,
      pendiente: reporte.pendiente,
      compresor1_amps: reporte.tecnico.compresor1_amps,
      compresor1_referencia: reporte.tecnico.compresor1_referencia,
      compresor1_baja: reporte.tecnico.compresor1_baja,
      compresor1_alta: reporte.tecnico.compresor1_alta,
      compresor1_aceite: reporte.tecnico.compresor1_aceite,
      compresor2_amps: reporte.tecnico.compresor2_amps ?? null,
      compresor2_referencia: reporte.tecnico.compresor2_referencia ?? null,
      compresor2_baja: reporte.tecnico.compresor2_baja ?? null,
      compresor2_alta: reporte.tecnico.compresor2_alta ?? null,
      compresor2_aceite: reporte.tecnico.compresor2_aceite ?? null,
      compresor3_amps: reporte.tecnico.compresor3_amps ?? null,
      compresor3_referencia: reporte.tecnico.compresor3_referencia ?? null,
      compresor3_baja: reporte.tecnico.compresor3_baja ?? null,
      compresor3_alta: reporte.tecnico.compresor3_alta ?? null,
      compresor3_aceite: reporte.tecnico.compresor3_aceite ?? null,
      motor1_amps: reporte.tecnico.motor1_amps,
      motor2_amps: reporte.tecnico.motor2_amps ?? null,
      motor3_amps: reporte.tecnico.motor3_amps ?? null,
      motor4_amps: reporte.tecnico.motor4_amps ?? null,
      motor5_amps: reporte.tecnico.motor5_amps ?? null,
      motor6_amps: reporte.tecnico.motor6_amps ?? null,
      linea_motor1_referencia: reporte.tecnico.linea_motor1_referencia ?? null,
      linea_motor2_referencia: reporte.tecnico.linea_motor2_referencia ?? null,
      evaporador_amps: reporte.tecnico.evaporador_amps,
      evaporador_referencia: reporte.tecnico.evaporador_referencia,
      evaporador_banda: reporte.tecnico.evaporador_banda,
      evaporador_medida: reporte.tecnico.evaporador_medida,
      evaporador_filtro_retorno: reporte.tecnico.evaporador_filtro_retorno,
      voltaje: reporte.tecnico.voltaje,
      temp_int: reporte.tecnico.temp_int,
      temp_ext: reporte.tecnico.temp_ext,
      ruidos_extranos: reporte.tecnico.ruidos_extranos,
      actividades_realizadas: reporte.tecnico.actividades_realizadas,
      recomendaciones: reporte.tecnico.recomendaciones,
      cobro_servicio: reporte.tecnico.cobro_servicio,
      fotos: reporte.fotos,
      firma: reporte.firma ?? "",   
    };
    // se guarda el reporte en la base de datos
    await addReporte(reporteCompleto!);

    // si el pendiente es 0 se crea PDF, si es 1 solo se guarda como pendiente
    if (reporte?.pendiente === 0) {
      const PDFuri = await generarPDF(reporte, false);
      alert("Reporte creado con éxito ✅");
      console.log("PDF creado correctamente", PDFuri);
    } else {
      alert("Reporte guardado como pendiente ✅");
    }

    setReporte({
      activeTab: "cliente",
      pendiente: 1,
      cliente: {},
      equipo: {},
      tecnico: {},
      fotos: [],
      firma: null,
    });
  };

  return (
    <>
      <Botton onPress={handleFinalizar} classname={styles.buttonPrimary}>
        <Text style={styles.textPrimary}>
          {reporte?.pendiente === 1 ? "Pendiente" : "Finalizar"}
        </Text>
      </Botton>
    </>
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
