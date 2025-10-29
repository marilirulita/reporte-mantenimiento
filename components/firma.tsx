import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation"; // importa tus tipos
import { Botton } from "./ui/button";

type FirmaScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Firma"
>;

export default function Firma() {
  const navigation = useNavigation<FirmaScreenNavigationProp>();
  const [signature, setSignature] = useState<string | null>(null);

  const handleSaveSignature = (uri: string) => {
    setSignature(uri);
  };

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
            {signature
              ? "✓ Firma capturada"
              : "No se ha capturado ninguna firma"}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("PanelFirma", { onSave: handleSaveSignature })
            }
          >
            <Text style={styles.buttonText}>
              {signature ? "Volver a firmar" : "Abrir panel de firma"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Botton classname={styles.buttonSecundary} onPress={() => {}}>
            <Text style={styles.textSecundary}>Anterior</Text>
          </Botton>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainSection: {
    borderBottomColor: "#9ca3af", // border-b-gray-400
    borderBottomWidth: 1,
    marginBottom: 32, // mb-8
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
  counterText: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 8,
  },
  signaturePreview: {
    width: 250,
    height: 150,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginBottom: 20,
    alignSelf: "center"
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
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
