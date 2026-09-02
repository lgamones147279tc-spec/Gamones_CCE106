import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [name, setName] = useState("");
  const [program, setProgram] = useState("");
  const [bio, setBio] = useState("");

  const [savedName, setSavedName] = useState("");
  const [savedProgram, setSavedProgram] = useState("");
  const [savedBio, setSavedBio] = useState("");

  const [message, setMessage] = useState("");

  // SAVE PROFILE
  const saveProfile = () => {
    if (name.trim() === "") {
      setMessage("Please enter your full name.");
      return;
    }

    if (program.trim() === "") {
      setMessage("Please enter your program.");
      return;
    }

    if (bio.trim() === "") {
      setMessage("Please enter your biography.");
      return;
    }

    // Save the information
    setSavedName(name);
    setSavedProgram(program);
    setSavedBio(bio);

    setMessage("✓ Profile saved successfully!");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* TITLE */}
      <Text style={styles.title}>
        Personal Profile
      </Text>

      <Text style={styles.subtitle}>
        Create and edit your profile
      </Text>

      {/* PROFILE CONTAINER */}
      <View style={styles.profileCard}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/300",
          }}
          style={styles.image}
        />

        <Text style={styles.profileName}>
          {savedName || "Your Name"}
        </Text>

        <Text style={styles.profileProgram}>
          {savedProgram || "Your Program"}
        </Text>
      </View>

      {/* PERSONAL INFORMATION CONTAINER */}
      <View style={styles.card}>
        <Text style={styles.heading}>
          Personal Information
        </Text>

        {/* FULL NAME */}
        <Text style={styles.label}>
          Full Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#94A3B8"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setMessage("");
          }}
        />

        {/* PROGRAM */}
        <Text style={styles.label}>
          Program
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your program"
          placeholderTextColor="#94A3B8"
          value={program}
          onChangeText={(text) => {
            setProgram(text);
            setMessage("");
          }}
        />

        {/* BIO */}
        <Text style={styles.label}>
          Short Biography
        </Text>

        <TextInput
          style={styles.bioInput}
          placeholder="Write a short biography"
          placeholderTextColor="#94A3B8"
          value={bio}
          onChangeText={(text) => {
            setBio(text);
            setMessage("");
          }}
          multiline
        />
      </View>

      {/* SEPARATE SAVE CONTAINER */}
      <View style={styles.saveContainer}>
        <Text style={styles.saveTitle}>
          Save Profile
        </Text>

        <Text style={styles.saveDescription}>
          Save your information when you are finished.
        </Text>

        <Pressable
          style={styles.saveButton}
          onPress={saveProfile}
        >
          <Text style={styles.buttonText}>
            Save Profile
          </Text>
        </Pressable>

        {/* MESSAGE */}
        {message !== "" && (
          <Text
            style={[
              styles.message,
              message.includes("Please") &&
                styles.errorMessage,
            ]}
          >
            {message}
          </Text>
        )}
      </View>

      {/* ABOUT ME */}
      <View style={styles.aboutCard}>
        <Text style={styles.aboutTitle}>
          About Me
        </Text>

        <Text style={styles.aboutText}>
          {savedBio || "No biography added yet."}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  content: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },

  /* TITLE */
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1E293B",
  },

  subtitle: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 5,
    marginBottom: 20,
  },

  /* PROFILE */
  profileCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 20,
  },

  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
  },

  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E293B",
  },

  profileProgram: {
    fontSize: 16,
    color: "#2563EB",
    marginTop: 5,
  },

  /* PERSONAL INFORMATION */
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#334155",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: "#1E293B",
    marginBottom: 15,
  },

  bioInput: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    padding: 12,
    height: 100,
    fontSize: 15,
    color: "#1E293B",
    textAlignVertical: "top",
  },

  /* SAVE CONTAINER */
  saveContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#2563EB",
  },

  saveTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 6,
  },

  saveDescription: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 15,
  },

  saveButton: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  message: {
    textAlign: "center",
    marginTop: 12,
    color: "#166534",
    fontWeight: "bold",
  },

  errorMessage: {
    color: "#DC2626",
  },

  /* ABOUT */
  aboutCard: {
    backgroundColor: "#EFF6FF",
    padding: 20,
    borderRadius: 15,
  },

  aboutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 8,
  },

  aboutText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },
});
