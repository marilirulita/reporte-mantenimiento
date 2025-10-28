import React from 'react';
import { TouchableOpacity } from 'react-native';

type BottonProps = {
  onPress?: () => void;
  classname: string;
  children: React.ReactNode;
};

export const Botton: React.FC<BottonProps> = ({ onPress, classname, children }) => (
  <TouchableOpacity
  activeOpacity={0.8}
  className={classname}
  onPress={onPress}>
    {children}
  </TouchableOpacity>
);
