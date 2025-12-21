import React from "react";
import { Text, TextStyle, TouchableOpacity, View } from "react-native";
import { commonStyles } from "../../styles/common";
import { Botton } from "../ui/button";
import CustomInput from "../ui/custom-input";
import { colorsDark } from "@/styles/tokens";

const EquipoForm = ({ form, handleSave }: { form: any; handleSave: any }) => {
  return (
    <View style={[commonStyles.section, { marginBottom: 50 }]}>
      <Text style={commonStyles.sectionTitle as TextStyle}>Datos del Equipo</Text>

      <Text style={commonStyles.label}>Selecciona un equipo o guarda uno nuevo</Text>
      {form.equipos.length > 0 && (
        <View
          style={{
            backgroundColor: colorsDark.accentHover,
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
                borderColor: colorsDark.border,
              }}
            >
              <Text style={{ fontWeight: "500", color: colorsDark.textPrimary }}>{item.tipoEquipo} - {item.marca} - {item.modelo}</Text>
              <Text style={{ fontSize: 12, color: colorsDark.textPrimary }}>{item.numeroSerie}
                
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={commonStyles.row}>
        <View style={commonStyles.column}>
          <Text style={commonStyles.label}>Marca *</Text>
          <CustomInput
            placeholder="Samsung, LG, etc."
            value={form.equipo.marca}
            setValue={(text) => form.setEquipo({ ...form.equipo, marca: text })}
          />
        </View>

        <View style={commonStyles.column}>
          <Text style={commonStyles.label}>Modelo *</Text>
          <CustomInput
            placeholder="ABC-123"
            value={form.equipo.modelo}
            setValue={(text) =>
              form.setEquipo({ ...form.equipo, modelo: text })
            }
          />
        </View>
      </View>

      <View style={commonStyles.row}>
        <View style={commonStyles.column}>
          <Text style={commonStyles.label}>Número de Serie</Text>
          <CustomInput
            placeholder="SN123456789"
            value={form.equipo.numeroSerie ?? ""}
            setValue={(text) =>
              form.setEquipo({ ...form.equipo, numeroSerie: text })
            }
          />
        </View>

        <View style={commonStyles.column}>
          <Text style={commonStyles.label}>Tipo de Equipo *</Text>
          <CustomInput
            placeholder="Aire Acondicionado, Refrigerador, etc."
            value={form.equipo.tipoEquipo}
            setValue={(text) =>
              form.setEquipo({ ...form.equipo, tipoEquipo: text })
            }
          />
        </View>
      </View>

      <Text style={commonStyles.label}>Ubicación del Equipo</Text>
      <CustomInput
        placeholder="Cocina, Almacén, etc."
        value={form.equipo.ubicacionEquipo ?? ""}
        setValue={(text) =>
          form.setEquipo({ ...form.equipo, ubicacionEquipo: text })
        }
      />

    <View style={commonStyles.buttonContainer}></View>
      <Botton classname={commonStyles.buttonPrimary} onPress={() => handleSave()} variant="primary">
        <Text style={commonStyles.textButtonPrimary}>Siguiente</Text>
      </Botton>
    </View>
  );
};

export default EquipoForm;
