import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const tasks = [
  {
    id: "1",
    title: "Create React Native App",
    subject: "Mobile Development",
    dueDate: "September 18, 2026",
    status: "Completed",
  },
  {
    id: "2",
    title: "Study HCI Principles",
    subject: "Human Computer Interaction",
    dueDate: "September 19, 2026",
    status: "Pending",
  },
  {
    id: "3",
    title: "Database ERD",
    subject: "Database Management",
    dueDate: "September 20, 2026",
    status: "Pending",
  },
  {
    id: "4",
    title: "Finish UML Diagram",
    subject: "Systems Analysis",
    dueDate: "September 21, 2026",
    status: "Completed",
  },
  {
    id: "5",
    title: "Prepare Presentation",
    subject: "IT Project",
    dueDate: "September 22, 2026",
    status: "Pending",
  },
];

export default function TaskDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const task = tasks.find((item) => item.id === id);

  const [status, setStatus] = useState(
    task?.status ?? "Pending"
  );

  if (!task) {
    return (
      <View style={styles.invalidContainer}>
        <Text style={styles.invalidTitle}>
          Task Not Found
        </Text>

        <Text style={styles.invalidText}>
          The task ID "{id}" does not match any task.
        </Text>

        <Pressable
          onPress={() => router.back()}
          style={styles.primaryButton}
        >
          <Text style={styles.buttonText}>
            Go Back
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace("/(tabs)")}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>
            Go Home
          </Text>
        </Pressable>
      </View>
    );
  }

  const toggleStatus = () => {
    setStatus((current) =>
      current === "Completed" ? "Pending" : "Completed"
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{task.title}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Subject</Text>
          <Text style={styles.value}>{task.subject}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Due Date</Text>
          <Text style={styles.value}>{task.dueDate}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Task ID</Text>
          <Text style={styles.value}>{task.id}</Text>
        </View>

        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>
            Current Status
          </Text>

          <Text
            style={[
              styles.status,
              status === "Completed"
                ? styles.completed
                : styles.pending,
            ]}
          >
            {status}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={toggleStatus}
        style={({ pressed }) => [
          styles.primaryButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.buttonText}>
          Mark as{" "}
          {status === "Completed"
            ? "Pending"
            : "Completed"}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => [
          styles.secondaryButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.secondaryButtonText}>
          Back to Tasks
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 22,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 25,
  },

  infoRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingVertical: 14,
  },

  label: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },

  statusBox: {
    marginTop: 20,
    alignItems: "center",
  },

  statusLabel: {
    color: "#64748B",
    marginBottom: 8,
  },

  status: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    fontWeight: "bold",
  },

  completed: {
    backgroundColor: "#DCFCE7",
    color: "#166534",
  },

  pending: {
    backgroundColor: "#FEF3C7",
    color: "#92400E",
  },

  primaryButton: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },

  secondaryButton: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2563EB",
  },

  pressed: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  secondaryButtonText: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "bold",
  },

  invalidContainer: {
    flex: 1,
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
  },

  invalidTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#DC2626",
    marginBottom: 10,
  },

  invalidText: {
    textAlign: "center",
    color: "#64748B",
    marginBottom: 25,
  },
});