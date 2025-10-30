import { useReporte } from "../context/ReporteContext";
import { generarPDF } from "../utils/generarPDF";
import { Text, StyleSheet } from "react-native";
import { Botton } from "./ui/button";

const BotonFinalizar = () => {
  const { reporte } = useReporte();

  const handleFinalizar = async () => {
    await generarPDF(reporte);
  };

  return (
    <Botton
      onPress={handleFinalizar}
      classname={styles.buttonPrimary}
    >
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