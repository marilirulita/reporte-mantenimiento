import { LinearGradient } from "expo-linear-gradient";
import { historialStyles as styles } from "@/styles/historialStyles";

export function GradientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LinearGradient
      colors={["#eff6ff", "#f1f5f9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
}
