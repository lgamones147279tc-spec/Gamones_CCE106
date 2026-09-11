import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome Back! 👋</Text>
        <Text style={styles.subtitle}>
          Manage your student information and courses.
        </Text>
      </View>

      {/* Student Summary */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Student Summary</Text>

        <Text style={styles.name}>Lhindex Khim T. Gamones</Text>
        <Text style={styles.info}>Student ID: 2026-001</Text>
        <Text style={styles.info}>Program: BSIT</Text>
        <Text style={styles.info}>Year Level: 3rd Year</Text>
      </View>

      {/* Courses */}
      <Text style={styles.sectionTitle}>My Courses</Text>

      <TouchableOpacity
        style={styles.courseCard}
        onPress={() => router.push("/course/IT101")}
      >
        <View>
          <Text style={styles.courseCode}>IT101</Text>
          <Text style={styles.courseName}>Introduction to IT</Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.courseCard}
        onPress={() => router.push("/course/WEB101")}
      >
        <View>
          <Text style={styles.courseCode}>WEB101</Text>
          <Text style={styles.courseName}>Web Development</Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.courseCard}
        onPress={() => router.push("/course/DB101")}
      >
        <View>
          <Text style={styles.courseCode}>DB101</Text>
          <Text style={styles.courseName}>Database Management</Text>
        </View>

        <Text style={styles.arrow}>›</Text>
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

  header: {
    marginTop: 20,
    marginBottom: 20,
  },

  welcome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 12,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },

  info: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
  },

  courseCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  courseCode: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 4,
  },

  courseName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },

  arrow: {
    fontSize: 30,
    color: "#2563EB",
  },
});