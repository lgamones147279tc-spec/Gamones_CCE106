import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>👋 Self Introduction</Text>
        <Text style={styles.subtitle}>Get to know me</Text>
      </View>

      {/* Personal Information Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>👤 Name</Text>
          <Text style={styles.nameText}>Lhindex Khim T. Gamones</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🎂 Age</Text>
          <Text style={styles.ageText}>23 years old</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🎓 Program</Text>
          <Text style={styles.programText}>BSIT</Text>
        </View>
      </View>

      {/* Hobbies Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>My Hobbies</Text>

        <View style={styles.hobbiesContainer}>
          <View style={styles.hobbyBox}>
            <Text style={styles.hobbyEmoji}>🏀</Text>
            <Text style={styles.hobbyText}>Basketball</Text>
          </View>

          <View style={styles.hobbyBox}>
            <Text style={styles.hobbyEmoji}>🎮</Text>
            <Text style={styles.hobbyText}>Gaming</Text>
          </View>
        </View>
      </View>

      {/* About Me Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>About Me</Text>

        <Text style={styles.descriptionText}>
          Hello! My name is Lhindex Khim T. Gamones. I am 23 years old and
          currently taking Bachelor of Science in Information Technology. I
          enjoy playing basketball and gaming during my free time.
        </Text>
      </View>

      {/* App Idea Card */}
      <View style={styles.ideaCard}>
        <Text style={styles.ideaTitle}>💰 My App Idea</Text>

        <Text style={styles.ideaText}>
          My app idea is to create a personal budget application. I want to
          make this app because I sometimes find it difficult to manage and
          budget my money. The app will help users track their expenses, manage
          their budget, and understand where their money goes.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F1F5F9",
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  appTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1E293B",
  },

  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,

    // Shadow for Android
    elevation: 4,

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 15,
  },

  infoRow: {
    marginBottom: 15,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  infoLabel: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },

  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },

  ageText: {
    fontSize: 17,
    fontStyle: "italic",
    color: "#7C3AED",
  },

  programText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#059669",
  },

  hobbiesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  hobbyBox: {
    width: "48%",
    backgroundColor: "#EFF6FF",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },

  hobbyEmoji: {
    fontSize: 35,
    marginBottom: 8,
  },

  hobbyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E40AF",
  },

  descriptionText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 24,
    textAlign: "justify",
  },

  ideaCard: {
    backgroundColor: "#DCFCE7",
    borderRadius: 18,
    padding: 20,

    elevation: 4,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  ideaTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#166534",
    marginBottom: 12,
  },

  ideaText: {
    fontSize: 15,
    color: "#166534",
    lineHeight: 24,
    textAlign: "justify",
  },
});