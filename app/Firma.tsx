import React, { useRef, useState } from "react";
import { View, StyleSheet, Image, ScrollView, Alert, Text } from "react-native";
import SignatureCanvas from "react-native-signature-canvas";
import { Botton } from "../components/ui/button";

const Firma = () => {
  const signatureRef = useRef<any>(null);
  const [signature, setSignature] = useState<string | null>(null);

  const check = "✓ Firma capturada";
  const uncheck = "Firme con su dedo o stylus";

  const handleSignature = (signature: string) => {
    setSignature(signature); // Save the signature as Base64
    Alert.alert("Firma guardada!");
  };

  const clearSignature = () => {
    signatureRef.current?.clearSignature();
    setSignature(null);
  };

  const getSignature = () => {
    const signature = signatureRef.current?.readSignature();
    setSignature(signature); // Save the signature as Base64
  };

  /* const handleEmpty = () => {
    Alert.alert("Por favor firme antes de continuar");
  };*/

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
          <View style={styles.section}>
            {/* Signature Pad */}
            <SignatureCanvas
              ref={signatureRef}
              onOK={handleSignature} // Called when user completes signature
              onEmpty={() => alert("Please provide a signature")}
              descriptionText="Sign here"
              clearText="Clear"
              confirmText="Save"
              autoClear={true}
              style={styles.signature}
              webStyle={`.m-signature-pad--footer {display: none;}`} // Custom styling
            />
            {/* Display saved signature */}
            {signature && (
              <Image source={{ uri: signature }} style={styles.image} />
            )}
            {/* Action Buttons */}
            <View
              style={{
                marginTop: 10,
              }}
            >
              {/* check / uncheck firma */}
              <Text style={styles.counterText}>
                {signature ? check : uncheck}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Botton
                  onPress={getSignature}
                  classname={styles.buttonSecundary}
                >
                  <Text style={styles.textSecundary}>Guardar</Text>
                </Botton>
                <Botton
                  classname={styles.buttonSecundary}
                  onPress={clearSignature}
                >
                  <Text style={styles.textSecundary}>Limpiar</Text>
                </Botton>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Botton classname={styles.buttonSecundary} onPress={() => {}}>
            <Text style={styles.textSecundary}>Anterior</Text>
          </Botton>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainSection: {
    borderBottomColor: "#9ca3af", // border-b-gray-400
    borderBottomWidth: 1,
    marginBottom: 32, // mb-8
  },
  section: {
    flexGrow: 1,
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
  signature: {
    height: 250,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderStyle: "dashed",
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
  },
  counterText: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 8,
  },
  image: {
    height: 300,
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

export default Firma;
