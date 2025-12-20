import { StyleSheet } from "react-native";

export const clienteStyles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  section: {
    marginBottom: 32, // mb-8
    borderBottomColor: "#9ca3af", // border-b-gray-400
    borderBottomWidth: 1,
    paddingBottom: 24, // pb-6
  },
  sectionTitle: {
    color: "#414650ff", // text-blue-700
    fontSize: 16, // text-base
    fontWeight: "600", // font-semibold
    marginBottom: 12, // mb-3
  },
  subtitle: {
    color: "#374151", // text-gray-700
    fontSize: 14, // text-sm
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
  row: {
    flexDirection: "row",
    gap: 12, // gap-3
    alignItems: "flex-end",
  },
  column: {
    flex: 1, // flex-1
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
  label: {
    marginTop: 12,
    color: "#374151", // text-gray-700
    marginBottom: 4, // mb-1
    fontSize: 14, // text-sm
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
   // Contenedor de botones
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonPrimary: {
    backgroundColor: "#171717", 
    paddingVertical: 12, 
    paddingHorizontal: 24, 
    borderRadius: 8, 
    alignSelf: "flex-end", 
    shadowColor: "#737373", 
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, 
  },
  textPrimary: {
    color: "#fff", // text-white
    fontWeight: "600", // font-semibold
    fontSize: 14, // text-sm
  },

  buttonSecundary: {
    borderWidth: 1,
    borderColor: "#D1D5DB", // border-gray-300
    paddingVertical: 12, // py-3
    paddingHorizontal: 24, // px-6
    borderRadius: 8, // rounded-md
    alignSelf: "flex-end", // self-end
    shadowColor: "#737373", // shadow-neutral-500
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    backgroundColor: "#FFF", // fondo blanco por defecto
  },
  textSecundary: {
    color: "#000",
    fontWeight: "600",
    fontSize: 14, // text-sm
  },
});