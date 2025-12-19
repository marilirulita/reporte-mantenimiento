import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, ScrollView, Text, View } from "react-native";
import { useReporte } from "../../context/ReporteContext";
import { useNextSection } from "../../hooks/useNextSection";
import { firmaStyles as styles } from "../../styles/firmaStyles";
import { RootStackParamList } from "../../types/navigation"; // importa tus tipos
import BotonFinalizar from "../BotonFinalizar";
import { Botton } from "../ui/button";

type FirmaScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Firma"
>;

export default function Firma() {
  const navigation = useNavigation<FirmaScreenNavigationProp>();
  const { reporte, setReporte } = useReporte();
  const signature = reporte.firma;

  const handleSaveSignature = (uri: string) => {
  setReporte({ ...reporte, firma: uri });
  handleNext("firma", uri);
};

  const { handleNext } = useNextSection("firma");

  const openSignaturePanel = () => {
  navigation.navigate("PanelFirma", { onSave: handleSaveSignature });
};

const signatureStatusText = signature
  ? "✓ Firma capturada"
  : "No se ha capturado ninguna firma";
  
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 10,
        backgroundColor: "#f5f5f5",
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainSection}>
        <Text style={styles.title}>Firma del Cliente</Text>
        <Text style={styles.subtitle}>
          Presione el boton para abrir el panel de firma
        </Text>

        <View
          style={{
            backgroundColor: "#f1f5f9",
            padding: 15,
            borderRadius: 8,
            marginTop: 12,
            borderColor: "#d1d5db",
            borderWidth: 1,
          }}
        >
          {signature && (
            <Image
              source={{ uri: signature }}
              style={styles.signaturePreview}
            />
          )}
          {/* check / uncheck firma */}
          <Text style={styles.counterText}>
            {signatureStatusText}
          </Text>
          <Botton
            classname={styles.button}
            onPress={() => openSignaturePanel()}
          >
            <Text style={styles.buttonText}>
              {signature ? "Volver a firmar" : "Abrir panel de firma"}
            </Text>
          </Botton>
        </View>
        <View style={styles.buttonContainer}>
          <Botton
            classname={styles.buttonSecundary}
            onPress={() => setReporte({ ...reporte, activeTab: "fotos" })}
          >
            <Text style={styles.textSecundary}>Anterior</Text>
          </Botton>
          <BotonFinalizar />
        </View>
      </View>
    </ScrollView>
  );
}
