import React from "react";
import { Text, TextStyle, View } from "react-native";
import { commonStyles } from "../../styles/common";
import { Botton } from "../ui/button";
import CustomInput from "../ui/custom-input";

const DetServicioForm = ({
  detallesServicio,
  setDetallesServicio,
  saveTecnico,
  reporte,
  setReporte,
}: any) => {
  return (
    <View style={[commonStyles.section, { marginBottom: 50 }]}>
      <Text style={commonStyles.sectionTitle as TextStyle}>Detalles del Servicio</Text>

      <Text style={commonStyles.label}>Trabajo Realizado *</Text>
      <CustomInput
        placeholder="Descripción detallada del trabajo realizado..."
        value={detallesServicio.trabajoRealizado}
        setValue={(text) =>
          setDetallesServicio({
            ...detallesServicio,
            trabajoRealizado: text,
          })
        }
        multiline={true}
      />

      <Text style={commonStyles.label}>Observaciones</Text>
      <CustomInput
        placeholder="Observaciones adicionales..."
        value={detallesServicio.observaciones}
        setValue={(text) =>
          setDetallesServicio({ ...detallesServicio, observaciones: text })
        }
        multiline={true}
      />

      <Text style={commonStyles.label}>Observaciones adicionales...</Text>
      <CustomInput
        placeholder="Recomendaciones para el cliente..."
        value={detallesServicio.observacionesAdicionales}
        setValue={(text) =>
          setDetallesServicio({
            ...detallesServicio,
            observacionesAdicionales: text,
          })
        }
        multiline={true}
      />

      <View style={commonStyles.buttonContainer}>
        <Botton
          classname={commonStyles.buttonSecondary}
          variant="secondary"
          onPress={() => setReporte({ ...reporte, activeTab: "cliente" })}
        >
          <Text style={commonStyles.textSecondary}>Anterior</Text>
        </Botton>
        <Botton classname={commonStyles.buttonPrimary} onPress={() => saveTecnico()}>
          <Text style={commonStyles.textButtonPrimary}>Siguiente</Text>
        </Botton>
      </View>
    </View>
  );
};

export default DetServicioForm;
