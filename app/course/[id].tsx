import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function CourseDetails() {
  const { id } = useLocalSearchParams();

  const courseInfo: Record<string, { name: string; instructor: string }> = {
    IT101: {
      name: "Introduction to IT",
      instructor: "Mr. John Smith",
    },

    WEB101: {
      name: "Web Development",
      instructor: "Ms. Maria Santos",
    },

    DB101: {
      name: "Database Management",
      instructor: "Mr. Alex Cruz",
    },
  };

  const course = courseInfo[String(id)] || {
    name: "Unknown Course",
    instructor: "Not available",
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.code}>{id}</Text>
        <Text style={styles.name}>{course.name}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Instructor</Text>
        <Text style={styles.value}>{course.instructor}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Course Description</Text>
        <Text style={styles.description}>
          This course provides students with fundamental knowledge
          and practical skills related to information technology.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Schedule</Text>
        <Text style={styles.value}>Monday & Wednesday</Text>
        <Text style={styles.description}>9:00 AM - 10:30 AM</Text>
      </View>
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
    backgroundColor: "#2563EB",
    padding: 25,
    borderRadius: 16,
    marginBottom: 20,
  },

  code: {
    color: "#DBEAFE",
    fontSize: 14,
    fontWeight: "bold",
  },

  name: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 8,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 6,
  },

  value: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1F2937",
  },

  description: {
    fontSize: 15,
    lineHeight: 23,
    color: "#4B5563",
  },
});