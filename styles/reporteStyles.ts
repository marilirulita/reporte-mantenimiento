import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const reporteStyles = StyleSheet.create({
  // Header
  header: {
    backgroundColor: COLORS.primary, // bg-blue-600
    padding: 24, // p-6
    borderBottomLeftRadius: 24, // rounded-b-3xl
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20, // text-xl
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#f1f5faff", // text-blue-100
  },

  // Tabs
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    backgroundColor: "#e5e7eb", // bg-gray-200
    padding: 4, // p-1
    borderRadius: 9999, // rounded-full
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 9999,
  },
  tabButtonActive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#414650ff", // text-blue-600
  },
  tabTextInactive: {
    color: "#4b5563", // text-gray-600
  },
});