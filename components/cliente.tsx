import React from "react";
import { View, Text } from "react-native";
import CustomInput from "./ui/custom-input";
import { Botton } from "./ui/button";

const Cliente = () => {
  const [cliente, setCliente] = React.useState({ nombre: "" });
  
  return (
    <View>
      <Text>Esta es la seccion de cliente</Text>
      <CustomInput
        placeholder="Juan Pérez"
        value={cliente.nombre}
        setValue={(text) => setCliente({ ...cliente, nombre: text })}
      />
      <Botton
        classname="bg-blue-500 px-4 py-2 rounded-md mt-4"
        onPress={() => console.log("Cliente guardado:", cliente)} 
      >
        <Text className="text-white font-semibold">Guardar Cliente</Text>
      </Botton>
    </View>
  );
};

export default Cliente;
