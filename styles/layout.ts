import { StyleSheet } from "react-native";
import { colorsDark } from "./tokens";

export const layoutStyles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 16,
    justifyContent: "space-between",
  },
  buttonSubir: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colorsDark.border,
    borderRadius: 8,
    padding: 8,
    backgroundColor: colorsDark.white,
    shadowColor: colorsDark.white,
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 6,
  },
  buttonSubirText: {
    color: colorsDark.border,
    fontWeight: "500",
    fontSize: 13,
  },
 
  containerPicker: {
    borderWidth: 1,
    borderColor: colorsDark.border,
    borderRadius: 12,
    color: colorsDark.textPrimary,
  },
  picker: {
    color: colorsDark.textPrimary,
  },
  
  photoBox: {
    borderWidth: 1,
    borderColor: colorsDark.border,
    borderStyle: "dashed",
    borderRadius: 12,
    height: 180,
    backgroundColor: colorsDark.surfaceSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
  },
  emptyText: {
    color: colorsDark.textSecondary,
    fontWeight: "500",
    marginTop: 6,
  },
  emptySubtext: {
    color: colorsDark.textMuted,
    fontSize: 12,
    textAlign: "center",
  },
  fotosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    height: "100%",
    gap: "2%",
  },
  foto: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  photoButton: {
    width: "49%", // la mitad del ancho
    height: "49%", // la mitad del alto
  },
  counterText: {
    margin: 8,
    color: colorsDark.textMuted,
    fontSize: 13,
    fontWeight: "500",
  },
  signaturePreview: {
    width: 250,
    height: 150,
    borderWidth: 1,
    borderColor: colorsDark.border,
    marginBottom: 10,
    alignSelf: "center",
  },
  buttonInfo: {
    backgroundColor: colorsDark.textMuted,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonInfoText: {
    color: colorsDark.accentMuted,
    fontWeight: "bold",
    textAlign: "center",
  },
});