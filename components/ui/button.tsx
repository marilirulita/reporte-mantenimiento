import React, { useState } from "react";
import { TouchableOpacity, Animated } from "react-native";

type BottonProps = {
  onPress?: () => void;
  classname: object;
  children: React.ReactNode;
};

export const Botton: React.FC<BottonProps> = ({
  onPress,
  classname,
  children,
}) => {
  const scale = useState(new Animated.Value(1))[0];

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95, // active:scale-95
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
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
      activeOpacity={0.8} 
      style={classname} 
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};
