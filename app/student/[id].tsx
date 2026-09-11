import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function StudentDetails() {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>LG</Text>
        </View>

        <Text style={styles.name}>Lhindex Khim T. Gamones</Text>
        <Text style={styles.id}>Student ID: {id}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Student Information</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>
            Lhindex Khim T. Gamones
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Age</Text>
          <Text style={styles.value}>23</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Program</Text>
          <Text style={styles.value}>BSIT</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Year Level</Text>
          <Text style={styles.value}>3rd Year</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>Active Student</Text>
        </View>
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
    alignItems: "center",
    backgroundColor: "#2563EB",
    padding: 25,
    borderRadius: 16,
    marginBottom: 20,
  },

  avatar: {
    width: 85,
    height: 85,
    borderRadius: 43,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  avatarText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2563EB",
  },

  name: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },

  id: {
    color: "#DBEAFE",
    marginTop: 6,
    fontSize: 14,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 15,
  },

  row: {
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "600",
  },
});