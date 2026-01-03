import { StyleSheet, TextStyle } from "react-native";
import { buttonSizes, colorsDark, spacing, text } from "./tokens";

export const commonStyles = StyleSheet.create({
  section: {
    marginBottom: spacing.xl,
    borderBottomWidth: 1,
    paddingBottom: spacing.xl,
  },

  sectionTitle: {
    ...text.title,
    marginBottom: spacing.md,
  },

  sectionSubtitle: {
    ...text.subtitle,
  },

  row: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "flex-end",
  },
  column: {
    flex: 1,
  },

  label: {
    ...text.subtitle,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.lg,
  },

  buttonPrimary: {
    ...buttonSizes.medium,
    alignSelf: "flex-end",
  },

  textButtonPrimary: {
    color: colorsDark.white,
    ...text.textButton as TextStyle,
  },

  buttonSecondary: {
    ...buttonSizes.medium,
    borderWidth: 1,
  },

  textSecondary: {
    color: colorsDark.accent,
    ...text.textButton as TextStyle,
  },
});
