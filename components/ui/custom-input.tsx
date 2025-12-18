import React, { useState, useMemo } from "react";
import { TextInput, StyleSheet, Animated, ViewStyle } from "react-native";

type KeyboardType =
  | "default"
  | "email-address"
  | "numeric"
  | "phone-pad";

type CustomInputProps = {
  placeholder: string;
  value: string;
  //onChange: (text: string) => void;
  setValue: (text: string) => void;
  keyboardType?: KeyboardType;
  multiline?: boolean;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  testID?: string;
};

export default function CustomInput({
  placeholder,
  value,
  setValue,
  keyboardType = "default",
  multiline = false,
  disabled = false,
  containerStyle,
  testID,
}: CustomInputProps) {
  const [focused, setFocused] = useState(false);

  const animatedBorder = useMemo(
    () => new Animated.Value(0),
    []
  );

  const animateFocus = (toValue: number) => {
    Animated.timing(animatedBorder, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = () => {
    if (disabled) return;
    setFocused(true);
    animateFocus(1);
  };

  const handleBlur = () => {
    setFocused(false);
    animateFocus(0);
  };

  const containerAnimatedStyle = {
    borderColor: animatedBorder.interpolate({
      inputRange: [0, 1],
      outputRange: ["#d1d5db", "#6b737cff"],
    }),
    borderWidth: focused ? 2 : 1,
    backgroundColor: focused ? "#f3f4f6" : "#f9fafb",
  };

  return (
    <Animated.View
      style={[
        styles.container,
        containerAnimatedStyle,
        disabled && styles.disabled,
        containerStyle,
      ]}
    >
      <TextInput
        testID={testID}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={!disabled}
        keyboardType={keyboardType}
        multiline={multiline}
        style={styles.input}
        placeholderTextColor="#9ca3af"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 12,
  },
  input: {
    color: "#374151",
    fontSize: 16,
    minHeight: 36,
  },
  disabled: {
    opacity: 0.6,
  },
});
