import { useReporte } from "../context/ReporteContext";
import { generarPDF } from "../utils/generarPDF";
import { TouchableOpacity, Text } from "react-native";

const BotonFinalizar = () => {
  const { reporte } = useReporte();

  const handleFinalizar = async () => {
    await generarPDF(reporte);
  };

  return (
    <TouchableOpacity
      onPress={handleFinalizar}
      style={{
        backgroundColor: "#2563eb",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold" }}>Finalizar</Text>
    </TouchableOpacity>
  );
};

export default BotonFinalizar;