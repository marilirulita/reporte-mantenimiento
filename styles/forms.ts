import { StyleSheet } from "react-native";
import { colors, spacing, radius } from "./tokens";

export const formStyles = StyleSheet.create({
  label: {
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: radius.sm,
    padding: spacing.sm,
  },
});
