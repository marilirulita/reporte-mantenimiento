import React from "react";
import { View, Text } from "react-native";
import CustomInput from "../ui/custom-input";
import { Botton } from "../ui/button";
import { clienteStyles as styles } from "../../styles/clienteStyles";

const DetServicioForm = ({
  detallesServicio,
  setDetallesServicio,
  saveTecnico,
  reporte,
  setReporte,
}: any) => {
  return (
    <View style={[styles.section, { marginBottom: 50 }]}>
      <Text style={styles.sectionTitle}>Detalles del Servicio</Text>

      <Text style={styles.label}>Trabajo Realizado *</Text>
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

      <Text style={styles.label}>Observaciones</Text>
      <CustomInput
        placeholder="Observaciones adicionales..."
        value={detallesServicio.observaciones}
        setValue={(text) =>
          setDetallesServicio({ ...detallesServicio, observaciones: text })
        }
        multiline={true}
      />

      <Text style={styles.label}>Observaciones adicionales...</Text>
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

      <View style={styles.buttonContainer}>
        <Botton
          classname={styles.buttonSecundary}
          variant="secondary"
          onPress={() => setReporte({ ...reporte, activeTab: "cliente" })}
        >
          <Text style={styles.textSecundary}>Anterior</Text>
        </Botton>
        <Botton classname={styles.buttonPrimary} onPress={() => saveTecnico()}>
          <Text style={styles.textPrimary}>Siguiente</Text>
        </Botton>
      </View>
    </View>
  );
};

export default DetServicioForm;
