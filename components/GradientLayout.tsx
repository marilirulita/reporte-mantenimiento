import { LinearGradient } from "expo-linear-gradient";
import { colorsDark } from "@/styles/tokens";

export function GradientLayout({ children, style }: { children: React.ReactNode, style?: object }) {
  return (
    <LinearGradient
      colors={[colorsDark.border, colorsDark.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
}
