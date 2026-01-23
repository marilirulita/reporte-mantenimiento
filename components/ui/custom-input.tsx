import React, { useState, useMemo } from "react";
import { TextInput, StyleSheet, Animated, ViewStyle } from "react-native";
import { useTheme } from "@/theme/ThemeContext";

type KeyboardType =
  | "default"
  | "email-address"
  | "numeric"
  | "phone-pad";

type CustomInputProps = {
  placeholder: string;
  value: string;
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
  const { colors } = useTheme();
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
      outputRange: [colors.accent, colors.accentHover],
    }),
    borderWidth: focused ? 2 : 1,
    backgroundColor: focused ? colors.surface : colors.surfaceSoft,
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
        style={[styles.input, {color: colors.textPrimary,}]}
        placeholderTextColor={colors.textMuted}
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
    fontSize: 16,
    minHeight: 36,
  },
  disabled: {
    opacity: 0.6,
  },
});
