import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import CustomInput from "./ui/custom-input";
import { Botton } from "./ui/button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNextSection } from "../hooks/useNextSection";
import { useReporte } from "../context/ReporteContext";
import { Picker } from "@react-native-picker/picker";

export default function Equipo() {
  const dateToday = new Date().toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const [infServicio, setInfServicio] = useState({
    fechaServicio: dateToday,
    nombreTecnico: "",
    estadoEquipo: "",
  });

  const [medicionesTécnicas, setMedicionesTécnicas] = useState({
    tipoRefrigerante: "",
    presion: "",
    temperaturaAmbiente: "",
    temperaturaEquipo: "",
    voltaje: "",
    amperaje: "",
  });

  const [detallesServicio, setDetallesServicio] = useState({
    trabajoRealizado: "",
    observaciones: "",
    observacionesAdicionales: "",
  });

  const { handleNext } = useNextSection("fotos");
  const { reporte, setReporte } = useReporte();
  const saveTecnico = () => {
    if (
      !infServicio.fechaServicio.trim() ||
      !infServicio.nombreTecnico.trim() ||
      !infServicio.estadoEquipo.trim() ||
      !detallesServicio.trabajoRealizado.trim()
    ) {
      Alert.alert(
        "Campos requeridos",
        "Por favor, completa fecha, nombre del tecnico y observaciones."
      );
      return;
    }
    // 🧩 3. Guardar en el contexto global
    handleNext("tecnico", {
      ...infServicio,
      ...medicionesTécnicas,
      ...detallesServicio,
    });
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "#f5f5f5" }}
      enableOnAndroid={true}
      extraScrollHeight={60} // sube un poco más el último input
    >
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Servicio</Text>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Fecha de Servicio *</Text>
              <CustomInput
                placeholder="25/10/2025"
                value={infServicio.fechaServicio}
                setValue={(text) =>
                  setInfServicio({ ...infServicio, fechaServicio: text })
                }
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Nombre del Técnico *</Text>
              <CustomInput
                placeholder="Carlos López"
                value={infServicio.nombreTecnico}
                setValue={(text) =>
                  setInfServicio({ ...infServicio, nombreTecnico: text })
                }
              />
            </View>
          </View>

          <Text style={styles.label}>Estado del Equipo *</Text>
          <View style={styles.containerPicker}>
            <Picker
              selectedValue={infServicio.estadoEquipo}
              onValueChange={(text) =>
                setInfServicio({ ...infServicio, estadoEquipo: text })
              }
              style={styles.picker}
            >
              <Picker.Item label="Seleccione una opción" value="" />
              <Picker.Item label="Excelente" value="Excelente" />
              <Picker.Item label="Bueno" value="Bueno" />
              <Picker.Item label="Regular" value="Regular" />
              <Picker.Item label="Malo" value="Malo" />
              <Picker.Item label="Crítico" value="Crítico" />
            </Picker>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mediciones Técnicas</Text>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Tipo de Refrigerante</Text>
              <CustomInput
                placeholder="R-22; R-134a; R-404A..."
                value={medicionesTécnicas.tipoRefrigerante}
                setValue={(text) =>
                  setMedicionesTécnicas({
                    ...medicionesTécnicas,
                    tipoRefrigerante: text,
                  })
                }
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Presión (PSI)</Text>
              <CustomInput
                placeholder="65 PSI"
                value={medicionesTécnicas.presion}
                setValue={(text) =>
                  setMedicionesTécnicas({
                    ...medicionesTécnicas,
                    presion: text,
                  })
                }
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Temperatura Ambiente (°C)</Text>
              <CustomInput
                placeholder="25°C"
                value={medicionesTécnicas.temperaturaAmbiente}
                setValue={(text) =>
                  setMedicionesTécnicas({
                    ...medicionesTécnicas,
                    temperaturaAmbiente: text,
                  })
                }
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Temperatura del Equipo (°C)</Text>
              <CustomInput
                placeholder="4°C"
                value={medicionesTécnicas.temperaturaEquipo}
                setValue={(text) =>
                  setMedicionesTécnicas({
                    ...medicionesTécnicas,
                    temperaturaEquipo: text,
                  })
                }
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Voltaje (V)</Text>
              <CustomInput
                placeholder="220V"
                value={medicionesTécnicas.voltaje}
                setValue={(text) =>
                  setMedicionesTécnicas({
                    ...medicionesTécnicas,
                    voltaje: text,
                  })
                }
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Amperaje (A)</Text>
              <CustomInput
                placeholder="5.2A"
                value={medicionesTécnicas.amperaje}
                setValue={(text) =>
                  setMedicionesTécnicas({
                    ...medicionesTécnicas,
                    amperaje: text,
                  })
                }
              />
            </View>
          </View>
        </View>

        <View style={[styles.section, { marginBottom: 50 }]}>
          <Text style={styles.sectionTitle}>Detalles del Servicio</Text>

          <Text style={styles.label}>Trabajo Realizado *</Text>
          <CustomInput
            placeholder="Descripción detallada del trabajo realizado..."
            value={detallesServicio.trabajoRealizado}
            setValue={(text) =>
              setDetallesServicio({
                ...detallesServicio,
                trabajoRealizado: text,
              })
            }
            multiline={true}
          />

          <Text style={styles.label}>Observaciones</Text>
          <CustomInput
            placeholder="Observaciones adicionales..."
            value={detallesServicio.observaciones}
            setValue={(text) =>
              setDetallesServicio({ ...detallesServicio, observaciones: text })
            }
            multiline={true}
          />

          <Text style={styles.label}>Observaciones adicionales...</Text>
          <CustomInput
            placeholder="Recomendaciones para el cliente..."
            value={detallesServicio.observacionesAdicionales}
            setValue={(text) =>
              setDetallesServicio({
                ...detallesServicio,
                observacionesAdicionales: text,
              })
            }
            multiline={true}
          />

          <View style={styles.buttonContainer}>
            <Botton
              classname={styles.buttonSecundary}
              onPress={() => setReporte({ ...reporte, activeTab: "cliente" })}
            >
              <Text style={styles.textSecundary}>Anterior</Text>
            </Botton>
            <Botton
              classname={styles.buttonPrimary}
              onPress={() => saveTecnico()}
            >
              <Text style={styles.textPrimary}>Siguiente</Text>
            </Botton>
          </View>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  containerPicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    color: "#333",
  },
  picker: {
    color: "#333",
  },
  section: {
    marginBottom: 32, // mb-8
    borderBottomColor: "#9ca3af", // border-b-gray-400
    borderBottomWidth: 1,
    paddingBottom: 32, // pb-4
  },
  sectionTitle: {
    color: "#414650ff", // text-blue-700
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
  // Contenedor de botones
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 16, // space-y-4
    marginTop: 20,
  },
  buttonPrimary: {
    backgroundColor: "#171717", // bg-neutral-900
    paddingVertical: 12, // py-3
    paddingHorizontal: 24, // px-6
    borderRadius: 8, // rounded-md
    alignSelf: "flex-end", // self-end
    shadowColor: "#737373", // shadow-neutral-500
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // para Android
  },
  textPrimary: {
    color: "#fff", // text-white
    fontWeight: "600", // font-semibold
    fontSize: 14, // text-sm
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
