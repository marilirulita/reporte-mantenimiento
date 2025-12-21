import { useColorScheme } from "react-native";
import { lightColors, colorsDark } from "../styles/tokens";

export type ThemeColors = typeof lightColors;

export function useTheme() {
  const scheme = useColorScheme(); // 'light' | 'dark' | null

  const colors: ThemeColors =
    scheme === "dark" ? colorsDark : lightColors;

  return {
    scheme,
    colors,
  };
}
