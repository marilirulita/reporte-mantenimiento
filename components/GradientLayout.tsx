import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/constants/colors";

export function GradientLayout({ children, style }: { children: React.ReactNode, style?: object }) {
  return (
    <LinearGradient
      colors={[COLORS.blueBg, COLORS.slateBg]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
}
