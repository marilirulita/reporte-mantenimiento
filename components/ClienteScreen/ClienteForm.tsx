import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { clienteStyles as styles } from "../../styles/clienteStyles";
import CustomInput from "../ui/custom-input";

const ClienteForm = ({ form }: { form: any }) => {
  return (
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
          value={form.cliente.nombre}
          setValue={(text) => {
            form.setCliente({ ...form.cliente, nombre: text });
            form.setBusqueda(text);
          }}
        />
        {form.resultados.length > 0 && (
          <View
            style={{
              backgroundColor: "#d3dffdff",
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
        value={form.cliente.telefono ?? ""}
        setValue={(text) =>
          form.setCliente({ ...form.cliente, telefono: text })
        }
        keyboardType="phone-pad"
      />

      {/* Dirección */}
      <Text style={styles.label}>Dirección *</Text>
      <CustomInput
        placeholder="Calle Principal #123, Ciudad"
        value={form.cliente.direccion}
        setValue={(text) =>
          form.setCliente({ ...form.cliente, direccion: text })
        }
      />

      <Text style={styles.label}>Email</Text>
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
