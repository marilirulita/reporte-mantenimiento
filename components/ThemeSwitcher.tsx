import { Switch } from "react-native";
import { useState } from "react";
import { useTheme } from "@/theme/ThemeContext";

export function ThemeSwitcher() {
  const { mode, setMode, colors } = useTheme();
  const [isSwitchOn, setIsSwitchOn] = useState(mode === "light" ? false : true);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    if (isSwitchOn === true) {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  return <Switch 
  value={isSwitchOn} 
  onValueChange={onToggleSwitch}
  thumbColor={colors.textSecondary}
  trackColor={{ false: colors.textSecondary, true: colors.textSecondary }} />;
}
