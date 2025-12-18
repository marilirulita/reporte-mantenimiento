import React, { useRef } from "react";
import {
  TouchableOpacity,
  Animated,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";

type BottonProps = TouchableOpacityProps & {
  classname?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

export const Botton: React.FC<BottonProps> = ({
  onPress,
  classname,
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
        style={classname}
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
