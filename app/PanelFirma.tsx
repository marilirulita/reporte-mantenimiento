import { useRef } from "react";
import { View, Text } from "react-native";
import Signature from "react-native-signature-canvas";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Botton } from "@/components/ui/button";
import { PanelFirmaStyles as styles } from "@/styles/panelFirmaStyles";
import { colorsDark } from "@/styles/tokens";
import { useTheme } from "@/theme";

type PanelFirmaNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PanelFirma"
>;
type PanelFirmaRouteProp = RouteProp<RootStackParamList, "PanelFirma">;

export default function PanelFirma() {
  const { colors } = useTheme();
  const navigation = useNavigation<PanelFirmaNavigationProp>();
  const route = useRoute<PanelFirmaRouteProp>();
  const signatureRef = useRef<any>(null);
  const { onSave } = route.params || {};

  const handleOK = (signature: string) => {
    if (onSave) onSave(signature);
    navigation.goBack();
  };

  const handleClear = () => {
    try {
    signatureRef.current?.clearSignature();
    } catch (err) {
      console.log("Error al limpiar la firma:", err);
    }
  };

  const handleSave = () => {
    try {
      signatureRef.current?.readSignature();
    } catch (err) {
      console.log("Error al guardar la firma:", err);
    }
  };

  const webStyle = `
  .m-signature-pad--footer {display: none; margin: 0;}
  body,html {margin:0; padding:0; overflow:hidden;}
`;

  return (
    <View style={[styles.container, {backgroundColor: colors.surfaceSoft, borderColor: colors.accent,}]}>
      <Text style={[styles.subtitle, {color: colors.textSecondary}]}>
        Solicite al cliente que firme en el recuadro con su dedo o stylus
      </Text>
      <Signature
        ref={signatureRef}
        onOK={handleOK}
        onEmpty={() => console.log("Firma vacía")}
        backgroundColor={colors.white}
        penColor={colors.black}
        descriptionText="Firme aquí"
        clearText="Limpiar"
        confirmText="Guardar"
        androidLayerType="software"
        style={[styles.signature, {borderColor: colors.border}]}
        webStyle={webStyle}
      />
      <SignatureButtons onClear={handleClear} onSave={handleSave} />
    </View>
  );
}

function SignatureButtons({
  onClear,
  onSave,
}: {
  onClear: () => void;
  onSave: () => void;
}) {
  const { colors } = useTheme();
  return (
    <View style={styles.buttons}>
      <Botton classname={[styles.buttonSecundary, {borderColor: colors.accent, shadowColor: colors.icon, backgroundColor: colors.white}]} variant="secondary" onPress={onClear}>
        <Text style={[styles.textSecundary, {color: colorsDark.accent}]}>Limpiar</Text>
      </Botton>
      <Botton classname={[styles.buttonSecundary, {borderColor: colors.accent, shadowColor: colors.icon, backgroundColor: colors.white}]} variant="secondary" onPress={onSave}>
        <Text style={[styles.textSecundary, {color: colorsDark.accent}]}>Guardar</Text>
      </Botton>
    </View>
  );
}
