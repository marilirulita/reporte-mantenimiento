import React from "react";
import { View, Text } from "react-native";
import CustomInput from "../ui/custom-input";
import { TecnicoStyles as styles } from "../../styles/tecnicoStyles";

const MedTecnicasForm = ({
  medicionesTécnicas,
  setMedicionesTécnicas,
}: any) => {
  return (
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
  );
};

export default MedTecnicasForm;
