import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { clienteStyles as styles } from "../../styles/clienteStyles";
import { Botton } from "../ui/button";
import CustomInput from "../ui/custom-input";

const EquipoForm = ({ form, handleSave }: { form: any; handleSave: any }) => {
  return (
    <View style={[styles.section, { marginBottom: 50 }]}>
      <Text style={styles.sectionTitle}>Datos del Equipo</Text>

      <Text style={styles.label}>Selecciona un equipo o guarda uno nuevo</Text>
      {form.equipos.length > 0 && (
        <View
          style={{
            backgroundColor: "#d3dffdff",
            borderRadius: 8,
            marginTop: 4,
          }}
        >
          {form.equipos.map((item: any) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                form.setEquipo(item);
                form.setEquipos([]);
              }}
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderColor: "#eee",
              }}
            >
              <Text style={{ fontWeight: "500" }}>{item.numeroSerie}</Text>
              <Text style={{ fontSize: 12, color: "#666" }}>
                {item.tipoEquipo} - {item.marca} - {item.modelo}
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
            value={form.equipo.marca}
            setValue={(text) => form.setEquipo({ ...form.equipo, marca: text })}
          />
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>Modelo *</Text>
          <CustomInput
            placeholder="ABC-123"
            value={form.equipo.modelo}
            setValue={(text) =>
              form.setEquipo({ ...form.equipo, modelo: text })
            }
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Número de Serie</Text>
          <CustomInput
            placeholder="SN123456789"
            value={form.equipo.numeroSerie ?? ""}
            setValue={(text) =>
              form.setEquipo({ ...form.equipo, numeroSerie: text })
            }
          />
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>Tipo de Equipo *</Text>
          <CustomInput
            placeholder="Aire Acondicionado, Refrigerador, etc."
            value={form.equipo.tipoEquipo}
            setValue={(text) =>
              form.setEquipo({ ...form.equipo, tipoEquipo: text })
            }
          />
        </View>
      </View>

      <Text style={styles.label}>Ubicación del Equipo</Text>
      <CustomInput
        placeholder="Cocina, Almacén, etc."
        value={form.equipo.ubicacionEquipo ?? ""}
        setValue={(text) =>
          form.setEquipo({ ...form.equipo, ubicacionEquipo: text })
        }
      />

    <View style={styles.buttonContainer}></View>
      <Botton classname={styles.buttonPrimary} onPress={() => handleSave()} variant="primary">
        <Text style={styles.textPrimary}>Siguiente</Text>
      </Botton>
    </View>
  );
};

export default EquipoForm;
