import { View, ActivityIndicator, StyleSheet, Modal } from "react-native";

type LoadingModalProps = {
  visible: boolean;
};

export default function LoadingModal({ visible }: LoadingModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});
