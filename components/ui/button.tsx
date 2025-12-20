import { colors } from "@/styles/tokens";
import React, { useRef } from "react";
import {
  TouchableOpacity,
  Animated,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";

const variants = {
  primary: {
    backgroundColor: colors.primary,
  },
  info: {
    backgroundColor: colors.secondary,
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
  },
};

type BottonProps = TouchableOpacityProps & {
  classname?: StyleProp<ViewStyle>;
  variant?: "primary" | "secondary" | "info";
  disabled?: boolean;
  children: React.ReactNode;
};

export const Botton: React.FC<BottonProps> = ({
  onPress,
  classname,
  variant,
  children,
  disabled,
  ...props
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled) return;
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 8,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        testID="botton-touchable"
        activeOpacity={0.8}
        style={[classname, variants[variant || "primary"]]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        {...props}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

Botton.displayName = "Botton";
