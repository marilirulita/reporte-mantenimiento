import { StyleSheet } from "react-native";

export const fotosStyles = StyleSheet.create({
  section: {
    borderBottomColor: "#9ca3af", // border-b-gray-400
    borderBottomWidth: 1,
    paddingBottom: 32, // pb-4
  },
  title: {
    color: "#414650ff", // azul-700
    fontWeight: "600",
    fontSize: 16,
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
  button: {
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
  buttonText: {
    color: "#414650ff", // azul-600
    fontWeight: "500",
    fontSize: 13,
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
    marginTop: 8,
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "500",
  },
  // Contenedor de botones
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 16, // space-y-4
  },
  buttonPrimary: {
    backgroundColor: "#171717", // bg-neutral-900
    paddingVertical: 12, // py-3
    paddingHorizontal: 24, // px-6
    borderRadius: 8, // rounded-md
    alignSelf: "flex-end", // self-end
    shadowColor: "#737373", // shadow-neutral-500
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // para Android
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