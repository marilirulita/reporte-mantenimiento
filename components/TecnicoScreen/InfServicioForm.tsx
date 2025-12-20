import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Text, TextStyle, View } from "react-native";
import { layoutStyles as styles } from "../../styles/layout";
import { commonStyles } from "../../styles/common";
import CustomInput from "../ui/custom-input";

const InfServicioForm = ({ infServicio, setInfServicio }: any) => {
  return (
    <View style={commonStyles.section}>
      <Text style={commonStyles.sectionTitle as TextStyle}>Información del Servicio</Text>

      <View style={commonStyles.row}>
        <View style={commonStyles.column}>
          <Text style={commonStyles.label}>Fecha de Servicio *</Text>
          <CustomInput
            placeholder="25/10/2025"
            value={infServicio.fechaServicio}
            setValue={(text) =>
              setInfServicio({ ...infServicio, fechaServicio: text })
            }
          />
        </View>

        <View style={commonStyles.column}>
          <Text style={commonStyles.label}>Nombre del Técnico *</Text>
          <CustomInput
            placeholder="Carlos López"
            value={infServicio.nombreTecnico}
            setValue={(text) =>
              setInfServicio({ ...infServicio, nombreTecnico: text })
            }
          />
        </View>
      </View>

      <Text style={commonStyles.label}>Estado del Equipo *</Text>
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
