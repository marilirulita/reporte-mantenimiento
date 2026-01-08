import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useReporte } from "../../context/ReporteContext";
import { useNextSection } from "../../hooks/useNextSection";
import DetServicioForm from "./DetServicioForm";
import InfServicioForm from "./InfServicioForm";
import MedTecnicasForm from "./MedTecnicasForm";
import { useTheme } from "@/theme";

const TecnicoScreen = () => {
  const { colors } = useTheme();
  const dateToday = new Date().toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const [infServicio, setInfServicio] = useState({
    fechaServicio: dateToday,
    nombreTecnico: "",
    estadoEquipo: "",
  });

  const [medicionesTécnicas, setMedicionesTécnicas] = useState({
    tipoRefrigerante: "",
    presion: "",
    temperaturaAmbiente: "",
    temperaturaEquipo: "",
    voltaje: "",
    amperaje: "",
  });

  const [detallesServicio, setDetallesServicio] = useState({
    trabajoRealizado: "",
    observaciones: "",
    observacionesAdicionales: "",
  });

  const { handleNext } = useNextSection("fotos");
  const { reporte, setReporte } = useReporte();
  const saveTecnico = () => {
    if (!isValid()) {
      Alert.alert("Campos requeridos", "Por favor, completa fecha, nombre del tecnico y observaciones.");
      return;
    }
    // 🧩 3. Guardar en el contexto global
    handleNext("tecnico", {
      ...infServicio,
      ...medicionesTécnicas,
      ...detallesServicio,
    });
  };

  const isValid = () =>
    infServicio.fechaServicio.trim() &&
    infServicio.nombreTecnico.trim() &&
    infServicio.estadoEquipo.trim() &&
    detallesServicio.trabajoRealizado.trim();

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: colors.surface }}
      enableOnAndroid={true}
      extraScrollHeight={60} // sube un poco más el último input
    >
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <InfServicioForm
          infServicio={infServicio}
          setInfServicio={setInfServicio}
        />
        
        <MedTecnicasForm
          medicionesTécnicas={medicionesTécnicas}
          setMedicionesTécnicas={setMedicionesTécnicas}
        />
        
        <DetServicioForm
          detallesServicio={detallesServicio}
          setDetallesServicio={setDetallesServicio}
          saveTecnico={saveTecnico}
          reporte={reporte}
          setReporte={setReporte}
        />
        
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};
export default TecnicoScreen;
