import React from 'react';
import { TouchableOpacity } from 'react-native';

type BottonProps = {
  onPress?: () => void;
  classname: object;
  children: React.ReactNode;
};

export const Botton: React.FC<BottonProps> = ({ onPress, classname, children }) => (
  <TouchableOpacity
  activeOpacity={0.8}
  style={classname}
  onPress={onPress}>
    {children}
  </TouchableOpacity>
);
