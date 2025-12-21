import { StyleSheet } from "react-native";
import { colorsDark } from "../styles/tokens";

export const PanelFirmaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsDark.textPrimary,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 180,
    borderColor: colorsDark.border,
    borderWidth: 1,
  },
  subtitle: {
    color: colorsDark.background,
    fontSize: 14,
    marginVertical: 5,
    padding: 15,
  },
  signature: {
    borderWidth: 1,
    borderColor: colorsDark.border,
    borderStyle: "dashed",
    borderRadius: 12,
  },
  buttons: {
    marginTop: 30,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonSecundary: {
    borderWidth: 1,
    borderColor: colorsDark.accent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "flex-end",
    shadowColor: colorsDark.black,
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: colorsDark.white,
  },
  textSecundary: {
    color: colorsDark.accent,
    fontWeight: "600",
    fontSize: 14,
  },
});