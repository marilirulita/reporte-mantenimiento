import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { useTheme } from "@/theme/ThemeContext";

const Loading = () => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.loadingContainer,
        { backgroundColor: colors.surface, opacity: 0.7 },
      ]}
    >
      <Text style={{ marginTop: 12, color: colors.textPrimary }}>Cargando documento…</Text>
      <ActivityIndicator size="large" color={colors.textPrimary} />
    </View>
  );
};

export default Loading;

export const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
