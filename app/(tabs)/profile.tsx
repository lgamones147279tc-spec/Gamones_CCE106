import { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function Profile() {
  const [name, setName] = useState("Lhindex Khim T. Gamones");
  const [program, setProgram] = useState(
    "Bachelor of Science in Information Technology"
  );

  const [nameError, setNameError] = useState("");
  const [saved, setSaved] = useState(false);

  const saveProfile = () => {
    if (name.trim() === "") {
      setNameError("Full Name is required.");
      setSaved(false);
      return;
    }

    setNameError("");
    setSaved(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileTitle}>
          My Profile
        </Text>

        <Text style={styles.profileSubtitle}>
          Manage your student information
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>

        <TextInput
          value={name}
          onChangeText={(text) => {
            setName(text);
            setSaved(false);

            if (text.trim() !== "") {
              setNameError("");
            }
          }}
          placeholder="Enter your full name"
          style={[
            styles.input,
            nameError !== "" && styles.inputError,
          ]}
        />

        {nameError !== "" && (
          <Text style={styles.errorText}>
            {nameError}
          </Text>
        )}

        <Text style={styles.label}>Program / Course</Text>

        <TextInput
          value={program}
          onChangeText={(text) => {
            setProgram(text);
            setSaved(false);
          }}
          placeholder="Enter your program"
          style={styles.input}
        />

        <Pressable
          disabled={name.trim() === ""}
          onPress={saveProfile}
          style={({ pressed }) => [
            styles.saveButton,
            name.trim() === "" && styles.disabledButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.saveButtonText}>
            Save Profile
          </Text>
        </Pressable>

        {saved && (
          <View style={styles.successBox}>
            <Text style={styles.successText}>
              ✓ Profile saved successfully!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },

  profileHeader: {
    alignItems: "center",
    marginBottom: 25,
    marginTop: 20,
  },

  profileTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1E293B",
  },

  profileSubtitle: {
    marginTop: 6,
    color: "#64748B",
    textAlign: "center",
    fontSize: 15,
  },

  form: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#334155",
    marginBottom: 7,
    marginTop: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: "#1E293B",
    backgroundColor: "#F8FAFC",
  },

  inputError: {
    borderColor: "#DC2626",
  },

  errorText: {
    color: "#DC2626",
    fontSize: 13,
    marginTop: 5,
  },

  saveButton: {
    marginTop: 22,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#2563EB",
    alignItems: "center",
  },

  disabledButton: {
    backgroundColor: "#94A3B8",
  },

  pressed: {
    opacity: 0.7,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  successBox: {
    marginTop: 15,
    padding: 13,
    borderRadius: 12,
    backgroundColor: "#DCFCE7",
  },

  successText: {
    textAlign: "center",
    color: "#166534",
    fontWeight: "600",
  },
});