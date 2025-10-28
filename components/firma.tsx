import React, { useRef, useState } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";
import { Botton } from "./ui/button";

export default function Signature() {
  const ref = useRef<SignatureViewRef>(null);
  const [signature, setSignature] = useState<string>("");

  const check = "✓ Firma capturada";
  const uncheck = "Firme con su dedo o stylus";

  const handleOK = (signature: string) => {
    // signature es un base64 de la firma
    console.log(signature);
    setSignature(signature);
    Alert.alert("Firma guardada!");
  };

  const handleEmpty = () => {
    Alert.alert("Por favor firme antes de continuar");
  };

  const handleClear = () => {
    ref.current?.clearSignature();
  };

  return (
    <View style={[styles.section, { marginBottom: 50 }]}>
      <Text style={styles.title}>Información del Servicio</Text>
      <Text style={styles.subtitle}>
        Solicite al cliente que firme en el recuadro con su dedo o stylus
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
        <SignatureScreen
          ref={ref}
          onOK={handleOK}
          onEmpty={handleEmpty}
          style={styles.container}
          descriptionText="Firme con su dedo o stylus"
          clearText="Limpiar"
          confirmText="Guardar"
          webStyle={`.m-signature-pad--footer {display: none; margin: 0px;}`}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          {/* check / uncheck firma */}
          <Text style={styles.counterText}>{signature ? check : uncheck}</Text>
          <Botton classname={styles.buttonSecundary} onPress={handleClear}>
            <Text style={styles.textSecundary}>Limpiar</Text>
          </Botton>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Botton classname={styles.buttonSecundary} onPress={() => {}}>
          <Text style={styles.textSecundary}>Anterior</Text>
        </Botton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 32, // mb-8
    borderBottomColor: "#9ca3af", // border-b-gray-400
    borderBottomWidth: 1,
  },
  title: {
    color: "#1D4ED8", // azul-700
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 12, // mb-3
  },
  subtitle: {
    color: "#374151", // text-gray-700
    fontSize: 14, // text-sm
  },
  container: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderStyle: "dashed",
    borderRadius: 12,
    height: 180,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
  counterText: {
    flex: 1,
    marginTop: 8,
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
  },
  // Contenedor de botones
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 16, // space-y-4
    marginVertical: 20, // my-5
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
