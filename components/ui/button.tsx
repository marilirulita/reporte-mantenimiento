import React, { useRef } from "react";
import {
  TouchableOpacity,
  Animated,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";
import { useTheme } from "@/theme/ThemeContext";

const Variant = () => {
  const { colors } = useTheme();

  const variants = {
  primary: {
    backgroundColor: colors.accent,
    shadowColor: colors.icon,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, 
  },
  info: {
    backgroundColor: colors.textSecondary,
    shadowColor: colors.icon,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, 
  },
  secondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.accent,
    shadowColor: colors.icon,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
};
  return variants;
}

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
        style={[classname, Variant()[variant || "primary"]]}
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
