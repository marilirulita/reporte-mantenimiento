import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, ScrollView, Text, TextStyle, View } from "react-native";
import { useReporte } from "../../context/ReporteContext";
import { useNextSection } from "../../hooks/useNextSection";
import { layoutStyles as styles } from "../../styles/layout";
import { commonStyles } from "@/styles/common";
import { RootStackParamList } from "../../types/navigation"; // importa tus tipos
import BotonFinalizar from "../BotonFinalizar";
import { Botton } from "../ui/button";
import { useTheme } from "@/theme";

type FirmaScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Firma"
>;

export default function Firma() {
  const { colors } = useTheme();
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
        backgroundColor: colors.surface,
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[commonStyles.section, {borderBottomColor: colors.border,}]}>
        <Text style={[commonStyles.sectionTitle as TextStyle, {color: colors.textPrimary}]}>Firma del Cliente</Text>
        <Text style={[commonStyles.sectionSubtitle as TextStyle, {color: colors.textSecondary}]}>
          Presione el boton para abrir el panel de firma
        </Text>

        <View
          style={{
            backgroundColor: colors.surfaceSoft,
            padding: 15,
            borderRadius: 8,
            marginTop: 12,
            borderColor: colors.border,
            borderWidth: 1,
          }}
        >
          {signature && (
            <Image
              source={{ uri: signature }}
              style={[styles.signaturePreview, {borderColor: colors.border,}]}
            />
          )}
          {/* check / uncheck firma */}
          <Text style={[styles.counterText, {color: colors.textMuted,}]}>
            {signatureStatusText}
          </Text>
          <Botton
            classname={styles.buttonInfo}
            variant="info"
            onPress={() => openSignaturePanel()}
          >
            <Text style={[styles.buttonInfoText, {color: colors.background}]}>
              {signature ? "Volver a firmar" : "Abrir panel de firma"}
            </Text>
          </Botton>
        </View>
        <View style={commonStyles.buttonContainer}>
          <Botton
            classname={commonStyles.buttonSecondary}
            variant="secondary"
            onPress={() => setReporte({ ...reporte, activeTab: "fotos" })}
          >
            <Text style={[commonStyles.textSecondary, {color: colors.accent}]}>Anterior</Text>
          </Botton>
          <BotonFinalizar />
        </View>
      </View>
    </ScrollView>
  );
}
