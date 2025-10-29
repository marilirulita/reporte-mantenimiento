import { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import Signature from "react-native-signature-canvas";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Botton } from "@/components/ui/button";

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
    signatureRef.current?.clearSignature();
  };

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
        webStyle={`
          .m-signature-pad--footer {display: none; margin: 0;}
          body,html {margin:0; padding:0; overflow:hidden;}
        `}
      />

      <View style={styles.buttons}>
        
        <Botton classname={styles.buttonSecundary} onPress={handleClear}>
          <Text style={styles.textSecundary}>Limpiar</Text>
        </Botton>
        <Botton
          onPress={() => signatureRef.current?.readSignature()}
          classname={styles.buttonSecundary}
        >
          <Text style={styles.textSecundary}>Guardar</Text>
        </Botton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 180,
    borderColor: "#d1d5db",
    borderWidth: 1,
  },
  subtitle: {
    color: "#374151", // text-gray-700
    fontSize: 14, // text-sm
    marginVertical: 5,
    padding: 15,
  },
  signature: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderStyle: "dashed",
    borderRadius: 12,
  },
  buttons: {
    marginTop: 30,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonSecundary: {
    borderWidth: 1,
    borderColor: "#D1D5DB", // border-gray-300
    paddingVertical: 12, // py-3
    paddingHorizontal: 24, // px-6
    borderRadius: 8, // rounded-md
    alignSelf: "flex-end", // self-end
    shadowColor: "#737373", // shadow-neutral-500
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    backgroundColor: "#FFF", // fondo blanco por defecto
  },
  textSecundary: {
    color: "#000",
    fontWeight: "600",
    fontSize: 14, // text-sm
  },
});
