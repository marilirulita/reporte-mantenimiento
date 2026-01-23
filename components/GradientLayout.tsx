import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/theme/ThemeContext";

export function GradientLayout({ children, style }: { children: React.ReactNode, style?: object }) {
  const { colors } = useTheme();

  return (
    <LinearGradient
      colors={[colors.border, colors.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
}
