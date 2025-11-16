import React, { useEffect, useState } from "react";
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type DropdownProps = {
  initialRole?: string;
  onSelectRole: (role: string) => void;
};

export default function Dropdown({ initialRole, onSelectRole }: DropdownProps) {
  const [selected, setSelected] = useState(initialRole || "Seleccionar rol");
  const [open, setOpen] = useState(false);

  // Actualizar el estado cuando initialRole cambia desde el componente padre
  useEffect(() => {
    if (initialRole) {
      setSelected(initialRole);
    } else {
      setSelected("Seleccionar rol");
    }
  }, [initialRole]);

  const handleSelect = (role: string) => {
    setSelected(role);
    onSelectRole(role);
    setOpen(false);
    handleBlur();
  };

  const [focused, setFocused] = useState(false);
  const animatedShadow = useState(new Animated.Value(0))[0];

  // Animación de foco (opcional)
  const handleFocus = () => {
    setFocused(true);
    Animated.timing(animatedShadow, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setFocused(false);
    Animated.timing(animatedShadow, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const containerStyle = {
    ...styles.dropdown,
    borderColor: focused ? "#60a5fa" : "#d1d5db", // azul-400 o gris-300
    borderWidth: focused ? 2 : 1,
    backgroundColor: focused ? "#f3f4f6" : "#f9fafb", // gris-100 / gris-50
    shadowColor: focused ? "#93c5fd" : "#000", // sombra azul suave o estándar
    shadowOpacity: focused ? 0.6 : 0.1,
    shadowRadius: focused ? 6 : 2,
    shadowOffset: { width: 0, height: focused ? 3 : 1 },
    elevation: focused ? 6 : 2,
  };

  return (
    <Animated.View style={containerStyle}>
      {/* Botón del dropdown */}
      <TouchableOpacity onPress={() => {
        setOpen(true);
        handleFocus();
        }}>
        <Text style={styles.dropdownText}>{selected}</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Seleccionar rol</Text>

            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect("Administrador")}
            >
              <Text style={styles.optionText}>Administrador</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect("Tecnico")}
            >
              <Text style={styles.optionText}>Técnico</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 12,
    padding: 15,
    color: "#374151", // text-gray-700
  },
  dropdownText: {
    fontSize: 16,
    color: "#374151", // text-gray-700
    minHeight: 36,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#374151", // text-gray-700
    minHeight: 36,
  },
  option: {
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#374151", // text-gray-700
    minHeight: 36,
  },
});
