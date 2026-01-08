import React from "react";
import { Text, TextStyle, View } from "react-native";
import { commonStyles } from "../../styles/common";
import CustomInput from "../ui/custom-input";
import { useTheme } from "@/theme";

const MedTecnicasForm = ({
  medicionesTécnicas,
  setMedicionesTécnicas,
}: any) => {
  const { colors } = useTheme();
  return (
    <View style={[commonStyles.section, {borderColor: colors.border}]}>
      <Text style={[commonStyles.sectionTitle as TextStyle, {color: colors.textPrimary}]}>Mediciones Técnicas</Text>

      <View style={commonStyles.row}>
        <View style={commonStyles.column}>
          <Text style={[commonStyles.label, {color: colors.textSecondary}]}>Tipo de Refrigerante</Text>
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

        <View style={commonStyles.column}>
          <Text style={[commonStyles.label, {color: colors.textSecondary}]}>Presión (PSI)</Text>
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

      <View style={commonStyles.row}>
        <View style={commonStyles.column}>
          <Text style={[commonStyles.label, {color: colors.textSecondary}]}>Temperatura Ambiente (°C)</Text>
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

        <View style={commonStyles.column}>
          <Text style={[commonStyles.label, {color: colors.textSecondary}]}>Temperatura del Equipo (°C)</Text>
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

      <View style={commonStyles.row}>
        <View style={commonStyles.column}>
          <Text style={[commonStyles.label, {color: colors.textSecondary}]}>Voltaje (V)</Text>
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

        <View style={commonStyles.column}>
          <Text style={[commonStyles.label, {color: colors.textSecondary}]}>Amperaje (A)</Text>
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
