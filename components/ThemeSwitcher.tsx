import { View, Text, Pressable } from "react-native";
import { useTheme } from "@/theme/ThemeContext";

export function ThemeSwitcher() {
  const { mode, setMode, colors } = useTheme();

  return (
    <View style={{ flexDirection: "row", gap: 1 }}>

      {(["system", "light", "dark"] as const).map((value) => (
        <Pressable
          key={value}
          onPress={() => setMode(value)}
          style={{
            padding: 4,
            borderRadius: 10,
            backgroundColor:
              mode === value ? colors.accent : colors.black,
            borderWidth: 1,
            borderColor:
              mode === value ? colors.accent : colors.border,
          }}
        >
          <Text>
            {value === "system" && "⚙️"}
            {value === "light" && "🌞"}
            {value === "dark" && "🌙"}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
