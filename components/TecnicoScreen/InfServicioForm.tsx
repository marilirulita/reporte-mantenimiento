import React from "react";
import { View, Text } from "react-native";
import CustomInput from "../ui/custom-input";
import { Picker } from "@react-native-picker/picker";
import { clienteStyles as styles } from "../../styles/clienteStyles";

const InfServicioForm = ({ infServicio, setInfServicio }: any) => {
  return (
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
  );
};

export default InfServicioForm;
