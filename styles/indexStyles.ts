import { StyleSheet } from "react-native";
import { colorsDark } from "./tokens";

export const indexStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  iconContainer: {
    backgroundColor: colorsDark.white,
    color: colorsDark.accent,
    padding: 0,
    borderRadius: 30,
    marginBottom: 16,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: colorsDark.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colorsDark.textSecondary,
    textAlign: "center",
    marginBottom: 32,
  },
  cardsContainer: {
    width: "100%",
    gap: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colorsDark.surfaceSoft,
    padding: 16,
    borderRadius: 14,
    elevation: 2,
    borderWidth: 1,
    borderColor: colorsDark.border,
  },
  cardActive: {
    backgroundColor: colorsDark.surface,
    borderColor: colorsDark.border,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  iconBoxBlue: {
    backgroundColor: colorsDark.textPrimary,
  },
  iconBoxGray: {
    backgroundColor: colorsDark.textSecondary,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colorsDark.textPrimary,
  },
  cardSubtitle: {
    fontSize: 13,
    color: colorsDark.textSecondary,
  },
  versionText: {
    fontSize: 12,
    color: colorsDark.textMuted,
    marginTop: 40,
    textAlign: "center",
  },
});
