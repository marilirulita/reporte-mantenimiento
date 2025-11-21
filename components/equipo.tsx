import { useAuth } from "@/context/AuthContext";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import uuid from "react-native-uuid";
import { useReporte } from "../context/ReporteContext";
import { useNextSection } from "../hooks/useNextSection";
import { Botton } from "./ui/button";
import CustomInput from "./ui/custom-input";

export default function Equipo() {
  const { reporte, setReporte } = useReporte();
  const { user, profile } = useAuth();
  const dateToday = new Date().toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const folio = `R-${uuid.v4().slice(0, 6).toUpperCase()}`; // R-9A2FBC
  const [numCompresores, setNumCompresores] = useState(1);

  const [infServicio, setInfServicio] = useState({
    reporte_numero: folio,
    fecha_ejecucion: dateToday,
    tecnico_nombre: profile?.name || user?.email || "",
    tecnico_id: user?.id || "",
  });

  const [compresores, setCompresores] = useState({
    compresor1_amps: "",
    compresor1_referencia: "",
    compresor1_baja: "",
    compresor1_alta: "",
    compresor1_aceite: "",

    compresor2_amps: "",
    compresor2_referencia: "",
    compresor2_baja: "",
    compresor2_alta: "",
    compresor2_aceite: "",

    compresor3_amps: "",
    compresor3_referencia: "",
    compresor3_baja: "",
    compresor3_alta: "",
    compresor3_aceite: "",
  });

  const [motores, setMotores] = useState({
    motor1_amps: "",
    motor2_amps: "",
    motor3_amps: "",
    motor4_amps: "",
    motor5_amps: "",
    motor6_amps: "",
    linea_motor1_referencia: "",
    linea_motor2_referencia: "",
  });

  const [evaporador, setEvaporador] = useState({
    evaporador_amps: "",
    evaporador_referencia: "",
    evaporador_banda: "",
    evaporador_medida: "",
    evaporador_filtro_retorno: "",
  });

  const [medicionesGenerales, setMedicionesGenerales] = useState({
    temp_int: "",
    temp_ext: "",
    voltaje: "",
    ruidos_extranos: "",
  });

  const [detallesServicio, setDetallesServicio] = useState({
    actividades_realizadas: "",
    recomendaciones: "",
    cobro_servicio: "",
  });

  const { handleNext } = useNextSection("fotos");

  const saveTecnico = () => {
    if (
      !compresores.compresor1_aceite.trim() ||
      !compresores.compresor1_alta.trim() ||
      !compresores.compresor1_amps.trim() ||
      !compresores.compresor1_baja.trim() ||
      !compresores.compresor1_referencia.trim() ||
      !motores.motor1_amps.trim() ||
      !evaporador.evaporador_amps.trim() ||
      !evaporador.evaporador_banda.trim() ||
      !evaporador.evaporador_filtro_retorno.trim() ||
      !evaporador.evaporador_medida.trim() ||
      !evaporador.evaporador_referencia.trim() ||
      !medicionesGenerales.ruidos_extranos.trim() ||
      !medicionesGenerales.temp_ext.trim() ||
      !medicionesGenerales.temp_int.trim() ||
      !medicionesGenerales.voltaje.trim() ||
      !detallesServicio.cobro_servicio.trim() ||
      !detallesServicio.recomendaciones.trim() ||
      !detallesServicio.actividades_realizadas.trim()
    ) {
      Alert.alert(
        "Campos requeridos",
        "Por favor, completa infomracion del servicio, observaciones..."
      );
      return;
    }
    // 🧩 3. Guardar en el contexto global
    handleNext("tecnico", {
      ...infServicio,
      ...compresores,
      ...motores,
      ...evaporador,
      ...medicionesGenerales,
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
                value={infServicio.fecha_ejecucion}
                setValue={(text) =>
                  setInfServicio({ ...infServicio, fecha_ejecucion: text })
                }
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Precio del Servicio *</Text>
              <CustomInput
                placeholder="$1,000"
                value={detallesServicio.cobro_servicio}
                setValue={(text) =>
                  setDetallesServicio({
                    ...detallesServicio,
                    cobro_servicio: text,
                  })
                }
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compresores</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center", // Alinea verticalmente al centro
              justifyContent: "space-between",
              width: "100%",
              paddingVertical: 6,
            }}
          >
            <Text style={[styles.label, { marginRight: 10 }]}>
              No. de compresores *
            </Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={numCompresores}
                onValueChange={(value) => setNumCompresores(value)}
                style={{ color: "#333" }}
              >
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
              </Picker>
            </View>
          </View>

          {Array.from({ length: numCompresores }, (_, i) => (
            <View key={i}>
              <Text style={styles.label}>Compresor {i + 1}</Text>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>Amps {i === 0 && "*"}</Text>
                  <CustomInput
                    placeholder="Amps"
                    value={
                      compresores[
                        `compresor${i + 1}_amps` as keyof typeof compresores
                      ]
                    }
                    setValue={(text) =>
                      setCompresores({
                        ...compresores,
                        [`compresor${i + 1}_amps`]: text,
                      })
                    }
                  />
                </View>

                <View style={styles.column}>
                  <Text style={styles.label}>Baja {i === 0 && "*"}</Text>
                  <CustomInput
                    placeholder="Psi"
                    value={
                      compresores[
                        `compresor${i + 1}_baja` as keyof typeof compresores
                      ]
                    }
                    setValue={(text) =>
                      setCompresores({
                        ...compresores,
                        [`compresor${i + 1}_baja`]: text,
                      })
                    }
                  />
                </View>

                <View style={styles.column}>
                  <Text style={styles.label}>Alta {i === 0 && "*"}</Text>
                  <CustomInput
                    placeholder="Psi"
                    value={
                      compresores[
                        `compresor${i + 1}_alta` as keyof typeof compresores
                      ]
                    }
                    setValue={(text) =>
                      setCompresores({
                        ...compresores,
                        [`compresor${i + 1}_alta`]: text,
                      })
                    }
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>Referencia {i === 0 && "*"}</Text>
                  <CustomInput
                    placeholder="Psi"
                    value={
                      compresores[
                        `compresor${
                          i + 1
                        }_referencia` as keyof typeof compresores
                      ]
                    }
                    setValue={(text) =>
                      setCompresores({
                        ...compresores,
                        [`compresor${i + 1}_referencia`]: text,
                      })
                    }
                  />
                </View>

                <View style={styles.column}>
                  <Text style={styles.label}>Aceite {i === 0 && "*"}</Text>
                  <CustomInput
                    placeholder="..."
                    value={
                      compresores[
                        `compresor${i + 1}_aceite` as keyof typeof compresores
                      ]
                    }
                    setValue={(text) =>
                      setCompresores({
                        ...compresores,
                        [`compresor${i + 1}_aceite`]: text,
                      })
                    }
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Motores de Condensador</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Motor 1 *</Text>
              <CustomInput
                placeholder="Amps"
                value={motores.motor1_amps}
                setValue={(text) =>
                  setMotores({
                    ...motores,
                    motor1_amps: text,
                  })
                }
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Motor 2</Text>
              <CustomInput
                placeholder="Amps"
                value={motores.motor2_amps}
                setValue={(text) =>
                  setMotores({
                    ...motores,
                    motor2_amps: text,
                  })
                }
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Motor 3</Text>
              <CustomInput
                placeholder="Amps"
                value={motores.motor3_amps}
                setValue={(text) =>
                  setMotores({
                    ...motores,
                    motor3_amps: text,
                  })
                }
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Motor 4</Text>
              <CustomInput
                placeholder="Amps"
                value={motores.motor4_amps}
                setValue={(text) =>
                  setMotores({
                    ...motores,
                    motor4_amps: text,
                  })
                }
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Motor 5</Text>
              <CustomInput
                placeholder="Amps"
                value={motores.motor5_amps}
                setValue={(text) =>
                  setMotores({
                    ...motores,
                    motor5_amps: text,
                  })
                }
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Motor 6</Text>
              <CustomInput
                placeholder="Amps"
                value={motores.motor6_amps}
                setValue={(text) =>
                  setMotores({
                    ...motores,
                    motor6_amps: text,
                  })
                }
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Referencia 1</Text>
              <CustomInput
                placeholder="Amps"
                value={motores.linea_motor1_referencia}
                setValue={(text) =>
                  setMotores({
                    ...motores,
                    linea_motor1_referencia: text,
                  })
                }
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Referencia 2</Text>
              <CustomInput
                placeholder="Amps"
                value={motores.linea_motor2_referencia}
                setValue={(text) =>
                  setMotores({
                    ...motores,
                    linea_motor2_referencia: text,
                  })
                }
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Evaporador</Text>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Amps *</Text>
              <CustomInput
                placeholder="Amps"
                value={evaporador.evaporador_amps}
                setValue={(text) =>
                  setEvaporador({
                    ...evaporador,
                    evaporador_amps: text,
                  })
                }
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Banda *</Text>
              <CustomInput
                placeholder="..."
                value={evaporador.evaporador_banda}
                setValue={(text) =>
                  setEvaporador({
                    ...evaporador,
                    evaporador_banda: text,
                  })
                }
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Medida *</Text>
              <CustomInput
                placeholder="..."
                value={evaporador.evaporador_medida}
                setValue={(text) =>
                  setEvaporador({
                    ...evaporador,
                    evaporador_medida: text,
                  })
                }
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Referencia *</Text>
              <CustomInput
                placeholder="..."
                value={evaporador.evaporador_referencia}
                setValue={(text) =>
                  setEvaporador({
                    ...evaporador,
                    evaporador_referencia: text,
                  })
                }
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Filtro Retorno *</Text>
              <CustomInput
                placeholder="..."
                value={evaporador.evaporador_filtro_retorno}
                setValue={(text) =>
                  setEvaporador({
                    ...evaporador,
                    evaporador_filtro_retorno: text,
                  })
                }
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mediciones Generales</Text>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Temp. Int *</Text>
              <CustomInput
                placeholder="..."
                value={medicionesGenerales.temp_int}
                setValue={(text) =>
                  setMedicionesGenerales({
                    ...medicionesGenerales,
                    temp_int: text,
                  })
                }
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Temp. Ext *</Text>
              <CustomInput
                placeholder="..."
                value={medicionesGenerales.temp_ext}
                setValue={(text) =>
                  setMedicionesGenerales({
                    ...medicionesGenerales,
                    temp_ext: text,
                  })
                }
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Voltaje *</Text>
              <CustomInput
                placeholder="..."
                value={medicionesGenerales.voltaje}
                setValue={(text) =>
                  setMedicionesGenerales({
                    ...medicionesGenerales,
                    voltaje: text,
                  })
                }
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Ruidos Extraños *</Text>
              <CustomInput
                placeholder="..."
                value={medicionesGenerales.ruidos_extranos}
                setValue={(text) =>
                  setMedicionesGenerales({
                    ...medicionesGenerales,
                    ruidos_extranos: text,
                  })
                }
              />
            </View>
          </View>
        </View>

        <View style={[styles.section, { marginBottom: 50 }]}>
          <Text style={styles.sectionTitle}>Detalles del Servicio</Text>

          <Text style={styles.label}>Actividades Realizadas *</Text>
          <CustomInput
            placeholder="Descripción detallada del trabajo realizado..."
            value={detallesServicio.actividades_realizadas}
            setValue={(text) =>
              setDetallesServicio({
                ...detallesServicio,
                actividades_realizadas: text,
              })
            }
            multiline={true}
          />

          <Text style={styles.label}>Recomendaciones *</Text>
          <CustomInput
            placeholder="Observaciones adicionales..."
            value={detallesServicio.recomendaciones}
            setValue={(text) =>
              setDetallesServicio({
                ...detallesServicio,
                recomendaciones: text,
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
  picker: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 12,
    flex: 0.8,
    color: "#333",
  },
  section: {
    marginBottom: 32, // mb-8
    borderBottomColor: "#9ca3af", // border-b-gray-400
    borderBottomWidth: 1,
    paddingBottom: 32, // pb-4
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
