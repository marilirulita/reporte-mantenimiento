import { LinearGradient } from "expo-linear-gradient";

export function GradientLayout({ children, style }: { children: React.ReactNode, style?: object }) {
  return (
    <LinearGradient
      colors={["#eff6ff", "#f1f5f9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
}
