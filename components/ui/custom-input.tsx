import React, { useState } from "react";
import { TextInput, StyleSheet, Animated } from "react-native";

export default function CustomInput({
  placeholder,
  value,
  setValue,
  keyboardType = "default",
  multiline = false,
}: {placeholder: string; value: string; setValue: (text: string) => void; keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad'; multiline?: true | false}) {
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
    ...styles.inputContainer,
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
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType={keyboardType}
        multiline={multiline}
        style={styles.textInput}
        placeholderTextColor="#9ca3af" // gris-400
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 8,
    borderRadius: 12,
    //transition: "all 0.3s", // sólo efecto visual en web, no afecta mobile
  },
  textInput: {
    color: "#374151", // text-gray-700
    borderWidth: 0,
    outlineWidth: 0,
    fontSize: 16,
    minHeight: 36,
  },
});
