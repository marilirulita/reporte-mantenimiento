import { StyleSheet } from "react-native";

export const reporteStyles = StyleSheet.create({
  header: {
    padding: 14,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
  },

  // Tabs
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
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
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "500",
  },
});