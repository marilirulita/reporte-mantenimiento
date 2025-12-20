import { StyleSheet } from "react-native";
import { colors, spacing, radius, text } from "./tokens";

export const commonStyles = StyleSheet.create({
  section: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.lg,
  },

  title: {
    ...text.title,
    marginBottom: spacing.sm,
  },

  subtitle: {
    ...text.subtitle,
    marginBottom: spacing.sm,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.lg,
  },
});
