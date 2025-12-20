import { StyleSheet } from "react-native";

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
    borderColor: "#D1D5DB", // gris-300
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  icon: {
    marginRight: 6,
  },
  buttonSubirText: {
    color: "#414650ff", // azul-600
    fontWeight: "500",
    fontSize: 13,
  },
 
  containerPicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    color: "#333",
  },
  picker: {
    color: "#333",
  },
  
  photoBox: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderStyle: "dashed",
    borderRadius: 12,
    height: 180,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
  },
  emptyText: {
    color: "#6B7280",
    fontWeight: "500",
    marginTop: 6,
  },
  emptySubtext: {
    color: "#9CA3AF",
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
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "500",
  },
  signaturePreview: {
    width: 250,
    height: 150,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginBottom: 10,
    alignSelf: "center",
  },
  buttonInfo: {
    backgroundColor: "#414650ff",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonInfoText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});