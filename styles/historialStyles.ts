import { StyleSheet } from "react-native";
import { radius } from "./tokens";

export const historialStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  headerIcon: {
    borderRadius: radius.lg,
    padding: 10,
  },
  headerTitulo: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerSubtitulo: {
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.lg,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  emptyContainer: {
    borderWidth: 1,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  emptyIconBox: {
    padding: 18,
    borderRadius: 50,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: "center",
    marginBottom: 20,
  },
  primaryButton: {
    flexDirection: "row",
    borderRadius: radius.md,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  primaryButtonText: {
    fontWeight: "600",
    fontSize: 14,
  },
  reporteCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  reporteInfo: {
    flex: 1,
  },
  reporteCliente: {
    fontWeight: "600",
    fontSize: 16,
    textTransform: "capitalize",
    marginBottom: 6,
  },
  reporteDetalle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  reporteTexto: {
    fontSize: 13,
  },
  reporteBotones: {
    alignItems: "center",
    gap: 12,
  },
  btnDescargar: {
    borderWidth: 1,
    padding: 4,
    borderRadius: radius.md,
    width: 50,
    alignItems: "center",
  },
  btnEliminar: {
    borderWidth: 1,
    padding: 4,
    borderRadius: radius.md,
    width: 50,
    alignItems: "center",
  },
  sinReportes: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  sinReportesTexto: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
  sinReportesSub: {
    fontSize: 13,
    textAlign: "center",
    marginVertical: 10,
  },
  btnCrear: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: radius.md,
    marginTop: 8,
    gap: 6,
  },
  btnCrearTexto: {
    fontWeight: "500",
  },
});