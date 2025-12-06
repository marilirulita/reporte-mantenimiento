import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export const indexStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  iconContainer: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 50,
    marginBottom: 16,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.primary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
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
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  cardActive: {
    backgroundColor: "#f0f7ff",
    borderColor: "#d7e4f3ff",
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
    backgroundColor: "#dbeafe",
  },
  iconBoxGray: {
    backgroundColor: "#f1f5f9",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#64748b",
  },
  versionText: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 40,
    textAlign: "center",
  },
});
