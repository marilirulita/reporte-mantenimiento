import { StyleSheet } from "react-native";

export const indexStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 15,
  },
  iconContainer: {
    padding: 0,
    borderRadius: 30,
    marginBottom: 16,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
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
    padding: 16,
    borderRadius: 14,
    elevation: 2,
    borderWidth: 1,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardSubtitle: {
    fontSize: 13,
  },
  versionText: {
    fontSize: 12,
    marginTop: 40,
    textAlign: "center",
  },
});
