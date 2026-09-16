import { Pressable, StyleSheet, Text, View } from "react-native";

type TaskCardProps = {
  title: string;
  subject: string;
  dueDate: string;
  status: "Pending" | "Completed";
  onPress: () => void;
};

export default function TaskCard({
  title,
  subject,
  dueDate,
  status,
  onPress,
}: TaskCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subject}>{subject}</Text>
        <Text style={styles.due}>Due: {dueDate}</Text>
      </View>

      <View
        style={[
          styles.status,
          status === "Completed"
            ? styles.completed
            : styles.pending,
        ]}
      >
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  content: {
    flex: 1,
    marginRight: 10,
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1E293B",
  },

  subject: {
    marginTop: 5,
    fontSize: 14,
    color: "#475569",
  },

  due: {
    marginTop: 5,
    fontSize: 13,
    color: "#64748B",
  },

  status: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
  },

  pending: {
    backgroundColor: "#FEF3C7",
  },

  completed: {
    backgroundColor: "#DCFCE7",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});