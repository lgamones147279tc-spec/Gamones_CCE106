import { Link, useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import StatCard from "../../components/StatCard";

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

export default function Dashboard() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const isWideScreen = width >= 600;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.title}>StudyFlow</Text>

        <Text style={styles.subtitle}>
          Stay organized. Stay productive.
        </Text>
      </View>

      <View style={styles.welcomeBox}>
        <Text style={styles.welcomeTitle}>
          Welcome back, Lhindex! 
        </Text>

        <Text style={styles.welcomeText}>
          Keep track of your school tasks and stay on top
          of your deadlines.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Your Progress</Text>

      <View
        style={[
          styles.statsContainer,
          isWideScreen && styles.wideStats,
        ]}
      >
        <StatCard label="Total Tasks" value={totalTasks} />
        <StatCard label="Completed" value={completedTasks} />
        <StatCard label="Pending" value={pendingTasks} />
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <Link href="/(tabs)/tasks" asChild>
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>
            View All Tasks
          </Text>
        </Pressable>
      </Link>

      <Pressable
        onPress={() => router.push("/(tabs)/profile")}
        style={({ pressed }) => [
          styles.secondaryButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.secondaryButtonText}>
          Edit Profile
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
    paddingBottom: 40,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563EB",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 15,
    color: "#64748B",
  },

  welcomeBox: {
    padding: 20,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    marginBottom: 25,
  },

  welcomeTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  welcomeText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: "#DBEAFE",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 12,
  },

  statsContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 28,
  },

  wideStats: {
    maxWidth: 800,
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

  buttonPressed: {
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
});