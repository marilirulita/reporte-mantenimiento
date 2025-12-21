import { StyleSheet } from "react-native";
import { colorsDark } from "./tokens";

export const reporteStyles = StyleSheet.create({
  header: {
    backgroundColor: colorsDark.surface,
    padding: 14,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: colorsDark.white,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colorsDark.textPrimary,
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: colorsDark.textSecondary,
  },

  // Tabs
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    backgroundColor: colorsDark.surface,
    padding: 4, 
    borderRadius: 50,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 50,
  },
  tabButtonActive: {
    backgroundColor: colorsDark.accent,
    shadowColor: colorsDark.white,
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "500",
  },
  tabTextActive: {
    color: colorsDark.white,
  },
  tabTextInactive: {
    color: colorsDark.textSecondary,
  },
});