
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Lab08() {
  const [attendance, setAttendance] = useState([
    { id: 1, name: "Jade Olacao", status: "Absent" },
    { id: 2, name: "Mike Airon Iroy", status: "Absent" },
    { id: 3, name: "John Denver Descartin", status: "Absent" },
    { id: 4, name: "Edieson Malintad", status: "Absent" },
    { id: 5, name: "Lhindex Khim Gamones", status: "Absent" },
    { id: 6, name: "Dwayne Lee Gonzales", status: "Absent" },
  ]);

  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);

  useEffect(() => {
    setPresent(
      attendance.filter((student) => student.status === "Present").length
    );

    setAbsent(
      attendance.filter((student) => student.status === "Absent").length
    );
  }, [attendance]);

  const toggleAttendance = (id: number) => {
    setAttendance(
      attendance.map((student) =>
        student.id === id
          ? {
              ...student,
              status:
                student.status === "Present" ? "Absent" : "Present",
            }
          : student
      )
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.contentCard}>
        <Text style={styles.title}>Attendance List</Text>

        <Text style={styles.subtitle}>
          Check the box if the student is present
        </Text>

        <View style={styles.summary}>
          <View style={styles.summaryCard}>
            <Text style={styles.presentNumber}>{present}</Text>
            <Text style={styles.label}>Present</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.absentNumber}>{absent}</Text>
            <Text style={styles.label}>Absent</Text>
          </View>
        </View>

        {attendance.map((student) => (
          <View style={styles.studentCard} key={student.id}>
            <View style={styles.studentInfo}>
              <Text style={styles.name}>{student.name}</Text>

              <Text
                style={[
                  styles.status,
                  student.status === "Present"
                    ? styles.presentStatus
                    : styles.absentStatus,
                ]}
              >
                {student.status}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.checkbox,
                student.status === "Present" && styles.checkedBox,
              ]}
              onPress={() => toggleAttendance(student.id)}
            >
              {student.status === "Present" && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
  },

  scrollContent: {
    padding: 20,
    alignItems: "center",
  },

  contentCard: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    marginTop: 20,
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
    marginBottom: 20,
    textAlign: "center",
  },

  summary: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },

  presentNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#28A745",
  },

  absentNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#DC3545",
  },

  label: {
    fontSize: 15,
    color: "#666",
    marginTop: 5,
  },

  studentCard: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  studentInfo: {
    flex: 1,
    paddingRight: 15,
  },

  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },

  status: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "600",
  },

  presentStatus: {
    color: "#28A745",
  },

  absentStatus: {
    color: "#DC3545",
  },

  checkbox: {
    width: 34,
    height: 34,
    borderWidth: 2,
    borderColor: "#999",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  checkedBox: {
    backgroundColor: "#28A745",
    borderColor: "#28A745",
  },

  checkmark: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "bold",
  },
});

