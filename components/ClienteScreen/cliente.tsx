import React from "react";
import { Alert, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useClienteForm } from "../../hooks/useClienteForm";
import { useNextSection } from "../../hooks/useNextSection";
import { validateCliente, validateEquipo } from "../../utils/validarCliente";
import ClienteForm from "./ClienteForm";
import EquipoForm from "./EquipoForm";
import { colorsDark } from "@/styles/tokens";

const ClienteScreen = () => {
  const { handleNext } = useNextSection("tecnico");
  const form = useClienteForm();

  const handleSave = async () => {
    const clienteError = validateCliente(form.cliente);
    if (clienteError) return Alert.alert("Cliente", clienteError);

    const equipoError = validateEquipo(form.equipo);
    if (equipoError) return Alert.alert("Equipo", equipoError);

    try {
      const clienteId = await form.saveCliente();
      const equipoId = await form.saveEquipo(clienteId);

      handleNext("cliente", {
        cliente: { ...form.cliente, id: clienteId },
        equipo: { ...form.equipo, id: equipoId, idCliente: clienteId },
      });
    } catch {
      Alert.alert("Error", "No se pudo guardar la información.");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: colorsDark.surface }}
      enableOnAndroid={true}
      extraScrollHeight={60} // sube un poco más el último input
    >
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <ClienteForm form={form} />
        <EquipoForm form={form} handleSave={handleSave} />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default ClienteScreen;
