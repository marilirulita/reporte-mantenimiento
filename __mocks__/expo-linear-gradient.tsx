import React, { ReactNode, CSSProperties } from 'react';

type LinearGradientProps = {
  children?: ReactNode;
  style?: CSSProperties | any; // React Native usa "ViewStyle", pero en tests puedes dejarlo flexible
};

const MockLinearGradient = ({ children, style }: LinearGradientProps) => (
  <div data-testid="mock-linear-gradient" style={style}>
    {children}
  </div>
);

export const LinearGradient = MockLinearGradient;
