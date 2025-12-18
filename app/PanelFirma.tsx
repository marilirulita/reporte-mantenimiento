import { useRef } from "react";
import { View, Text } from "react-native";
import Signature from "react-native-signature-canvas";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Botton } from "@/components/ui/button";
import { PanelFirmaStyles as styles } from "@/styles/panelFirmaStyles";

type PanelFirmaNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PanelFirma"
>;
type PanelFirmaRouteProp = RouteProp<RootStackParamList, "PanelFirma">;

export default function PanelFirma() {
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
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Solicite al cliente que firme en el recuadro con su dedo o stylus
      </Text>
      <Signature
        ref={signatureRef}
        onOK={handleOK}
        onEmpty={() => console.log("Firma vacía")}
        backgroundColor="#F9FAFB"
        penColor="black"
        descriptionText="Firme aquí"
        clearText="Limpiar"
        confirmText="Guardar"
        androidLayerType="software"
        style={styles.signature}
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
  return (
    <View style={styles.buttons}>
      <Botton classname={styles.buttonSecundary} onPress={onClear}>
        <Text style={styles.textSecundary}>Limpiar</Text>
      </Botton>
      <Botton classname={styles.buttonSecundary} onPress={onSave}>
        <Text style={styles.textSecundary}>Guardar</Text>
      </Botton>
    </View>
  );
}
