import { StyleSheet } from "react-native";

export const PanelFirmaStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 180,
    borderWidth: 1,
  },
  subtitle: {
    fontSize: 14,
    marginVertical: 5,
    padding: 15,
  },
  signature: {
    borderWidth: 1,
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
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "flex-end",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  textSecundary: {
    fontWeight: "600",
    fontSize: 14,
  },
});