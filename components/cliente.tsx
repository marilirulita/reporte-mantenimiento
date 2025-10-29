import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "./ui/custom-input";
import { Botton } from "./ui/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNextSection } from "../hooks/useNextSection";

const Cliente = () => {
  const [cliente, setCliente] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    correo: "",
    empresa: "",
  });

  const [equipo, setEquipo] = useState({
    marca: "",
    modelo: "",
    numeroSerie: "",
    tipoEquipo: "",
    ubicacion: "",
  });
  const { handleNext } = useNextSection("DireccionScreen");

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "#f5f5f5" }}
      enableOnAndroid={true}
      extraScrollHeight={60} // sube un poco más el último input
    >
      <ScrollView contentContainerStyle={{padding: 10}}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos del Cliente</Text>

          {/* Nombre y Teléfono */}
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Nombre Completo *</Text>
              <CustomInput
                placeholder="Juan Pérez"
                value={cliente.nombre}
                setValue={(text) => setCliente({ ...cliente, nombre: text })}
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Teléfono *</Text>
              <CustomInput
                placeholder="555-1234-5678"
                value={cliente.telefono}
                setValue={(text) => setCliente({ ...cliente, telefono: text })}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Dirección */}
          <Text style={styles.label}>Dirección *</Text>
          <CustomInput
            placeholder="Calle Principal #123, Ciudad"
            value={cliente.direccion}
            setValue={(text) => setCliente({ ...cliente, direccion: text })}
          />

          <Text style={styles.label}>Email</Text>
          <CustomInput
            placeholder="cliente@email.com"
            value={cliente.correo}
            setValue={(text) => setCliente({ ...cliente, correo: text })}
            keyboardType="email-address"
          />
        </View>

        <View style={[styles.section, { marginBottom: 50 }]}>
          <Text style={styles.sectionTitle}>Datos del Equipo</Text>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Marca *</Text>
              <CustomInput
                placeholder="Samsung, LG, etc."
                value={equipo.marca}
                setValue={(text) => setEquipo({ ...equipo, marca: text })}
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Modelo *</Text>
              <CustomInput
                placeholder="ABC-123"
                value={equipo.modelo}
                setValue={(text) => setEquipo({ ...equipo, modelo: text })}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Número de Serie</Text>
              <CustomInput
                placeholder="SN123456789"
                value={equipo.numeroSerie}
                setValue={(text) => setEquipo({ ...equipo, numeroSerie: text })}
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Tipo de Equipo *</Text>
              <CustomInput
                placeholder="Aire Acondicionado, Refrigerador, etc."
                value={equipo.tipoEquipo}
                setValue={(text) => setEquipo({ ...equipo, tipoEquipo: text })}
              />
            </View>
          </View>

          <Text style={styles.label}>Ubicación del Equipo</Text>
          <CustomInput
            placeholder="Cocina, Almacén, etc."
            value={equipo.ubicacion}
            setValue={(text) => setEquipo({ ...equipo, ubicacion: text })}
          />

          <Botton 
          classname={styles.button} 
          onPress={() => handleNext("cliente", {...cliente, ...equipo})}>
            <Text style={styles.text}>Siguiente</Text>
          </Botton>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 32, // mb-8
    borderBottomColor: "#9ca3af", // border-b-gray-400
    borderBottomWidth: 1,
    paddingBottom: 24, // pb-6
  },
  sectionTitle: {
    color: "#1d4ed8", // text-blue-700
    fontSize: 16, // text-base
    fontWeight: "600", // font-semibold
    marginBottom: 12, // mb-3
  },
  row: {
    flexDirection: "row",
    gap: 12, // gap-3
    alignItems: "flex-end",
  },
  column: {
    flex: 1, // flex-1
  },
  label: {
    marginTop: 12,
    color: "#374151", // text-gray-700
    marginBottom: 4, // mb-1
    fontSize: 14, // text-sm
  },
  button: {
    backgroundColor: "#171717", // bg-neutral-900
    paddingVertical: 12, // py-3
    paddingHorizontal: 24, // px-6
    borderRadius: 8, // rounded-md
    alignSelf: "flex-end", // self-end
    marginTop: 20, // my-5
    shadowColor: "#737373", // shadow-neutral-500
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // para Android
  },
  text: {
    color: "#fff", // text-white
    fontWeight: "600", // font-semibold
    fontSize: 14, // text-sm
  },
});

export default Cliente;
