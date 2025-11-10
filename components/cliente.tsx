import {
  addCliente,
  addEquipo,
  buscarClientesPorNombre,
  getEquiposByClienteId,
  getAllReportes,
} from "@/db/databaseActions";
import { Cliente, Equipo } from "@/models/interfaces";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNextSection } from "../hooks/useNextSection";
import { Botton } from "./ui/button";
import CustomInput from "./ui/custom-input";

const ClienteScreen = () => {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState<Cliente[]>([]);
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nombre: "",
    direccion: "",
    telefono: "",
    referencia: "",
  });

  const [equipo, setEquipo] = useState<Equipo>({
    id: 0,
    cliente_id: 0,
    marca: "",
    modelo: "",
    serie: "",
    descripcion: "",
    ton_volt: "",
    area: "",
  });

  useEffect(() => {
    const fetchClientes = async () => {
      if (busqueda.trim().length > 1) {
        const data = await buscarClientesPorNombre(busqueda);
        setResultados(data as Cliente[]);
      } else {
        setResultados([]);
      }
    };
    fetchClientes();
  }, [busqueda]);

  const { handleNext } = useNextSection("tecnico");

  const saveClienteEquipo = async () => {
    if (
      !cliente.nombre.trim() ||
      !cliente.direccion.trim() ||
      !cliente.telefono?.trim()
    ) {
      Alert.alert(
        "Campos requeridos",
        "Por favor, completa nombre, telefono y dirección del cliente."
      );
      return;
    }

    if (!equipo.marca.trim() || !equipo.modelo.trim() || !equipo.serie.trim()) {
      Alert.alert(
        "Campos requeridos",
        "Por favor, completa datos del equipo: marca, modelo, serie del equipo."
      );
      return;
    }

    let clienteId = cliente.id;

    try {
      // 🧩 1. Crear cliente si es nuevo
      if (!clienteId || clienteId === 0) {
        clienteId = await addCliente(cliente); // addCliente debe retornar el ID
        setCliente((prev) => ({ ...prev, id: clienteId }));
      } else {
        console.log("Cliente existente, usando ID:", clienteId);
      }

      // 🧩 2. Crear equipo asociado al cliente
      const equipoId = await saveEquipo(equipo, clienteId);

      // 🧩 3. Guardar en contexto global
      handleNext("cliente", { ...cliente, id: clienteId }
      );
      handleNext("equipo", { ...equipo, id: equipoId, cliente_id: clienteId });

    } catch (error) {
      console.error("Error al guardar cliente/equipo:", error);
      Alert.alert("Error", "No se pudo guardar la información.");
    }
  };

  const saveEquipo = async (
    equipo: Equipo,
    clienteId: number
  ): Promise<number> => {
    let equipoId = equipo.id;
    console.log("equipo y cliente ID al guardar equipo:", equipo, clienteId)
    try {
      if (!equipoId || equipoId === 0) {
        // 🧩 Insertar nuevo equipo en la base de datos
        equipoId = await addEquipo(equipo, clienteId);

        // Actualizar el estado local (sin depender de él)
        setEquipo((prev) => ({ ...prev, id: equipoId }));
      } else {
        console.log("Equipo existente, usando ID:", equipoId);
      }

      // ✅ Retornar el ID para que la función llamante pueda usarlo
      return equipoId!;
    } catch (error) {
      console.error("Error al guardar equipo:", error);
      Alert.alert("Error", "No se pudo guardar el equipo.");
      throw error;
    }
  };

  const cargarEquipos = async (clienteId: number | undefined) => {
    console.log("cliente id:", clienteId)
    // 🔹 Cargar equipos del cliente
    if (clienteId !== undefined) {
      const equiposCliente = await getEquiposByClienteId(clienteId!);
      setEquipos(equiposCliente);
      console.log(equipos);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "#f5f5f5" }}
      enableOnAndroid={true}
      extraScrollHeight={60} // sube un poco más el último input
    >
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos del Cliente</Text>

          <Text style={styles.label}>
            Busca por nombre de cliente o guarda uno nuevo
          </Text>
          {/* Nombre y Teléfono */}
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.label}>Nombre Completo *</Text>
            <CustomInput
              placeholder="Juan Pérez"
              value={cliente.nombre}
              setValue={(text) => {
                setCliente({ ...cliente, nombre: text });
                setBusqueda(text);
              }}
            />
            {resultados.length > 0 && (
              <View
                style={{
                  backgroundColor: "#d3dffdff",
                  borderRadius: 8,
                  marginTop: 4,
                }}
              >
                {resultados.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      setCliente(item);
                      cargarEquipos(item.id);
                      setBusqueda("");
                      setResultados([]);
                    }}
                    style={{
                      padding: 10,
                      borderBottomWidth: 1,
                      borderColor: "#eee",
                    }}
                  >
                    <Text style={{ fontWeight: "500", color: "#333" }}>
                      {item.nombre}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#666" }}>
                      {item.direccion}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <Text style={styles.label}>Teléfono *</Text>
          <CustomInput
            placeholder="555-123-4567"
            value={cliente.telefono ?? ""}
            setValue={(text) => setCliente({ ...cliente, telefono: text })}
            keyboardType="phone-pad"
          />

          {/* Dirección */}
          <Text style={styles.label}>Dirección *</Text>
          <CustomInput
            placeholder="Calle Principal #123, Ciudad"
            value={cliente.direccion}
            setValue={(text) => setCliente({ ...cliente, direccion: text })}
          />

          <Text style={styles.label}>Referencia</Text>
          <CustomInput
            placeholder="Indicaciones para llegar"
            value={cliente.referencia ?? ""}
            setValue={(text) => setCliente({ ...cliente, referencia: text })}
          />
        </View>

        <View style={[styles.section, { marginBottom: 50 }]}>
          <Text style={styles.sectionTitle}>Datos del Equipo</Text>

          <Text style={styles.label}>
            Selecciona un equipo o guarda uno nuevo
          </Text>
          {equipos.length > 0 && (
            <View
              style={{
                backgroundColor: "#d3dffdff",
                borderRadius: 8,
                marginTop: 4,
              }}
            >
              {equipos.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setEquipo(item);
                    setEquipos([]);
                  }}
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderColor: "#eee",
                  }}
                >
                  <Text style={{ fontWeight: "500" }}>{item.serie}</Text>
                  <Text style={{ fontSize: 12, color: "#666" }}>
                    {item.area} - {item.marca} - {item.modelo}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

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
                value={equipo.serie ?? ""}
                setValue={(text) => setEquipo({ ...equipo, serie: text })}
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Tonelada / Voltaje *</Text>
              <CustomInput
                placeholder="Tonelada / Voltaje"
                value={equipo.ton_volt}
                setValue={(text) => setEquipo({ ...equipo, ton_volt: text })}
              />
            </View>
          </View>

          <Text style={styles.label}>Area</Text>
          <CustomInput
            placeholder="Cocina, Almacén, etc."
            value={equipo.area ?? ""}
            setValue={(text) => setEquipo({ ...equipo, area: text })}
          />

          <Text style={styles.label}>Descripcion</Text>
          <CustomInput
            placeholder="Descricion del equipo"
            value={equipo.descripcion ?? ""}
            setValue={(text) => setEquipo({ ...equipo, descripcion: text })}
          />

          <Botton classname={styles.button} onPress={() => saveClienteEquipo()}>
            <Text style={styles.text}>Siguiente</Text>
          </Botton>
          <Botton classname={styles.button} onPress={() => {
            const equipos = getAllReportes();
            console.log(equipos);
            //console.log("pending...");
            //deleteEquipo(1)
          } }>
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

export default ClienteScreen;
