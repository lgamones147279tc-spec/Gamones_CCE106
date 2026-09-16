import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TaskCard from "../../components/TaskCard";

type TaskStatus = "Pending" | "Completed";

type Task = {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: TaskStatus;
};

const tasks: Task[] = [
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

type Filter = "All" | "Pending" | "Completed";

export default function Tasks() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("All");

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <Text style={styles.subtitle}>
          Manage your school activities
        </Text>
      </View>

      <View style={styles.filterContainer}>
        {(["All", "Pending", "Completed"] as Filter[]).map(
          (item) => (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              style={({ pressed }) => [
                styles.filterButton,
                filter === item && styles.activeFilter,
                pressed && styles.filterPressed,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === item && styles.activeFilterText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )
        )}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TaskCard
            title={item.title}
            subject={item.subject}
            dueDate={item.dueDate}
            status={item.status}
            onPress={() =>
              router.push({
                pathname: "/task/[id]",
                params: { id: item.id },
              })
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No {filter.toLowerCase()} tasks found.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B",
  },

  subtitle: {
    marginTop: 5,
    color: "#64748B",
  },

  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 8,
  },

  filterButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
  },

  activeFilter: {
    backgroundColor: "#2563EB",
  },

  filterPressed: {
    opacity: 0.7,
  },

  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
  },

  activeFilterText: {
    color: "#FFFFFF",
  },

  list: {
    padding: 20,
    paddingTop: 5,
    paddingBottom: 30,
  },

  empty: {
    alignItems: "center",
    padding: 40,
  },

  emptyText: {
    color: "#64748B",
    fontSize: 16,
  },
});