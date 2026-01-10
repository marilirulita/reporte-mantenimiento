import React from "react";
import { Text, TextStyle, TouchableOpacity, View } from "react-native";
import { commonStyles } from "../../styles/common";
import CustomInput from "../ui/custom-input";
import { useTheme } from "@/theme/ThemeContext";

const ClienteForm = ({ form }: { form: any }) => {
  const { colors } = useTheme();
  return (
    <View style={[commonStyles.section, {borderColor: colors.border}]}>
      <Text style={[commonStyles.sectionTitle as TextStyle, {color: colors.textPrimary}]}>Datos del Cliente</Text>

      <Text style={[commonStyles.label, {color: colors.textSecondary}]}>
        Busca por nombre de cliente o guarda uno nuevo
      </Text>
      {/* Nombre y Teléfono */}
      <View style={{ marginBottom: 12 }}>
        <Text style={[commonStyles.label, {color: colors.textSecondary}]}>Nombre Completo *</Text>
        <CustomInput
          placeholder="Juan Pérez"
          value={form.cliente.nombre}
          setValue={(text) => {
            form.setCliente({ ...form.cliente, nombre: text });
            form.setBusqueda(text);
          }}
        />
        {form.resultados.length > 0 && (
          <View
            style={{
              backgroundColor: colors.accentHover,
              borderRadius: 8,
              marginTop: 4,
            }}
          >
            {form.resultados.map((item: any) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  form.setCliente(item);
                  form.cargarEquipos(item.id);
                  form.setBusqueda("");
                }}
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ fontWeight: "500", color: colors.white }}>
                  {item.nombre}
                </Text>
                <Text style={{ fontSize: 12, color: colors.white }}>
                  {item.direccion}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <Text style={[commonStyles.label, {color: colors.textSecondary}]}>Teléfono *</Text>
      <CustomInput
        placeholder="555-123-4567"
        value={form.cliente.telefono ?? ""}
        setValue={(text) =>
          form.setCliente({ ...form.cliente, telefono: text })
        }
        keyboardType="phone-pad"
      />

      {/* Dirección */}
      <Text style={[commonStyles.label, {color: colors.textSecondary}]}>Dirección *</Text>
      <CustomInput
        placeholder="Calle Principal #123, Ciudad"
        value={form.cliente.direccion}
        setValue={(text) =>
          form.setCliente({ ...form.cliente, direccion: text })
        }
      />

      <Text style={[commonStyles.label, {color: colors.textSecondary}]}>Email</Text>
      <CustomInput
        placeholder="cliente@email.com"
        value={form.cliente.email ?? ""}
        setValue={(text) => form.setCliente({ ...form.cliente, email: text })}
        keyboardType="email-address"
      />
    </View>
  );
};

export default ClienteForm;
