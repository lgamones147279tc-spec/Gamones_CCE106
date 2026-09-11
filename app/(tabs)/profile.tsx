import { router } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>LG</Text>
        </View>

        <Text style={styles.name}>Lhindex Khim T. Gamones</Text>
        <Text style={styles.program}>
          Bachelor of Science in Information Technology
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Student Information</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Student ID</Text>
          <Text style={styles.value}>2026-001</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Age</Text>
          <Text style={styles.value}>23</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Year Level</Text>
          <Text style={styles.value}>3rd Year</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>Active</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/student/2026-001")}
      >
        <Text style={styles.buttonText}>View Student Details</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 20,
  },

  profileHeader: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 25,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
  },

  program: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  label: {
    color: "#6B7280",
    fontSize: 15,
  },

  value: {
    color: "#1F2937",
    fontSize: 15,
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});