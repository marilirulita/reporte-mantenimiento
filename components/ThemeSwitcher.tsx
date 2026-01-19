import { View, Text, Pressable } from "react-native";
import { useTheme } from "@/theme/ThemeContext";

export function ThemeSwitcher() {
  const { mode, setMode, colors } = useTheme();
  const value = mode;
  const nextMode =
    value === "system" ? "light" : value === "light" ? "dark" : "system";

  return (
    <View style={{ flexDirection: "row", gap: 1 }}>
      <Pressable
          onPress={() => setMode(nextMode)}
          style={{
            padding: 4,
            borderRadius: 10,
            backgroundColor: colors.accent,
            borderWidth: 1,
            borderColor: colors.accent,
          }}
        >
          <Text>
            {value === "system" && "⚙️"}
            {value === "light" && "🌞"}
            {value === "dark" && "🌙"}
          </Text>
        </Pressable>
    </View>
  );
}
