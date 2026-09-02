import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const emptyProfile = {
  fullName: "",
  program: "",
  biography: "",
  email: "",
  phone: "",
};

export default function App() {
  const [profile, setProfile] = useState(emptyProfile);
  const [form, setForm] = useState(emptyProfile);
  const [editing, setEditing] = useState(true);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const updateField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }

    setMessage("");
  };

  const validateForm = () => {
    const validationErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.fullName.trim()) {
      validationErrors.fullName = "Full name is required.";
    }

    if (!form.program.trim()) {
      validationErrors.program = "Program is required.";
    }

    if (!form.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!emailPattern.test(form.email.trim())) {
      validationErrors.email = "Please enter a valid email address.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const saveProfile = () => {
    if (!validateForm()) {
      setMessage("Please complete the required fields.");
      return;
    }

    const savedProfile = {
      fullName: form.fullName.trim(),
      program: form.program.trim(),
      biography: form.biography.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    };

    setProfile(savedProfile);
    setForm(savedProfile);
    setEditing(false);
    setMessage("✓ Profile saved successfully!");
  };

  const editProfile = () => {
    setForm(profile);
    setErrors({});
    setMessage("");
    setEditing(true);
  };

  const cancelEdit = () => {
    setForm(profile);
    setErrors({});
    setMessage("");
    setEditing(false);
  };

  const renderInput = (
    label,
    field,
    placeholder,
    options = {}
  ) => {
    const value = form[field];
    const error = errors[field];

    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>{label}</Text>

        <TextInput
          style={[
            styles.input,
            error && styles.inputError,
            options.multiline && styles.bioInput,
          ]}
          value={value}
          onChangeText={(text) => updateField(field, text)}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          {...options}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F5F7FB"
      />

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Personal Profile</Text>

          <Text style={styles.subtitle}>
            Enter and manage your personal information
          </Text>
        </View>

        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>
              PHOTO
            </Text>
          </View>

          <Text style={styles.imageHint}>Profile Image</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.card}>
          {editing ? (
            <>
              {renderInput(
                "Full Name *",
                "fullName",
                "Enter your full name",
                {
                  autoCapitalize: "words",
                }
              )}

              {renderInput(
                "Program *",
                "program",
                "Enter your program"
              )}

              {renderInput(
                "Short Biography",
                "biography",
                "Write a short biography about yourself",
                {
                  multiline: true,
                  textAlignVertical: "top",
                }
              )}

              {/* Contact Information */}
              <View style={styles.contactSection}>
                <Text style={styles.sectionTitle}>
                  Contact Information
                </Text>

                {renderInput(
                  "Email *",
                  "email",
                  "Enter your email",
                  {
                    keyboardType: "email-address",
                    autoCapitalize: "none",
                    autoCorrect: false,
                  }
                )}

                {renderInput(
                  "Phone Number",
                  "phone",
                  "Enter your phone number",
                  {
                    keyboardType: "phone-pad",
                  }
                )}
              </View>

              {/* Buttons */}
              <View style={styles.buttonRow}>
                {profile.fullName !== "" && (
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={cancelEdit}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.cancelButtonText}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[
                    styles.saveButton,
                    profile.fullName === "" && styles.fullButton,
                  ]}
                  onPress={saveProfile}
                  activeOpacity={0.8}
                >
                  <Text style={styles.saveButtonText}>
                    Save Profile
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Full Name *</Text>
                <Text style={styles.value}>
                  {profile.fullName}
                </Text>
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Program *</Text>
                <Text style={styles.value}>
                  {profile.program}
                </Text>
              </View>

              <View style={styles.fieldContainer}>
                <Text style={styles.label}>
                  Short Biography
                </Text>

                <Text style={styles.bioText}>
                  {profile.biography ||
                    "No biography provided."}
                </Text>
              </View>

              <View style={styles.contactSection}>
                <Text style={styles.sectionTitle}>
                  Contact Information
                </Text>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Email *</Text>
                  <Text style={styles.value}>
                    {profile.email}
                  </Text>
                </View>

                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>
                    Phone Number
                  </Text>

                  <Text style={styles.value}>
                    {profile.phone ||
                      "No phone number provided."}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.editButton}
                onPress={editProfile}
                activeOpacity={0.8}
              >
                <Text style={styles.editButtonText}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Message */}
        {message && (
          <View
            style={[
              styles.messageBox,
              message.startsWith("✓")
                ? styles.successBox
                : styles.warningBox,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                message.startsWith("✓")
                  ? styles.successText
                  : styles.warningText,
              ]}
            >
              {message}
            </Text>
          </View>
        )}

        {/* Saved Result */}
        {!editing && profile.fullName !== "" && (
          <View style={styles.savedResult}>
            <Text style={styles.savedTitle}>
              ✓ Saved Profile
            </Text>

            <Text style={styles.savedText}>
              Your information has been successfully saved
              and is displayed above.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EEF4FF",
  },

  container: {
    padding: 18,
    paddingBottom: 50,
  },

  // Header
  header: {
    marginBottom: 24,
    paddingTop: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#172554",
    letterSpacing: 0.3,
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 6,
    lineHeight: 20,
  },

  // Profile Image
  imageContainer: {
    alignItems: "center",
    marginBottom: 24,
  },

  imagePlaceholder: {
    width: 105,
    height: 105,
    borderRadius: 53,
    backgroundColor: "#DBEAFE",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#1E3A8A",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  imagePlaceholderText: {
    color: "#2563EB",
    fontSize: 20,
    fontWeight: "800",
  },

  imageHint: {
    marginTop: 10,
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },

  // Main Card
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,

    shadowColor: "#0F172A",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  // Fields
  fieldContainer: {
    marginBottom: 22,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 9,
  },

  value: {
    fontSize: 17,
    color: "#0F172A",
    fontWeight: "600",
    paddingVertical: 5,
  },

  input: {
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    borderRadius: 13,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 16,
    color: "#0F172A",
    backgroundColor: "#F8FAFC",
  },

  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },

  bioInput: {
    minHeight: 110,
    paddingTop: 14,
  },

  bioText: {
    fontSize: 15,
    lineHeight: 23,
    color: "#475569",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 14,
  },

  errorText: {
    color: "#DC2626",
    fontSize: 12,
    marginTop: 6,
    fontWeight: "500",
  },

  // Contact Section
  contactSection: {
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 20,
    marginTop: 2,
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#172554",
    marginBottom: 17,
  },

  // Buttons
  buttonRow: {
    flexDirection: "row",
    marginTop: 5,
  },

  cancelButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    borderRadius: 13,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
    backgroundColor: "#FFFFFF",
  },

  cancelButtonText: {
    color: "#475569",
    fontSize: 16,
    fontWeight: "700",
  },

  saveButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    borderRadius: 13,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,

    shadowColor: "#2563EB",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 4,
  },

  fullButton: {
    flex: 1,
    marginLeft: 0,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  editButton: {
    backgroundColor: "#2563EB",
    borderRadius: 13,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,

    shadowColor: "#2563EB",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 4,
  },

  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  // Feedback
  messageBox: {
    marginTop: 16,
    padding: 15,
    borderRadius: 13,
  },

  successBox: {
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },

  warningBox: {
    backgroundColor: "#FFFBEB",
    borderWidth: 1,
    borderColor: "#FDE68A",
  },

  messageText: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },

  successText: {
    color: "#047857",
  },

  warningText: {
    color: "#B45309",
  },

  // Saved Profile
  savedResult: {
    marginTop: 16,
    padding: 18,
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },

  savedTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1D4ED8",
    marginBottom: 6,
  },

  savedText: {
    fontSize: 13,
    color: "#3B82F6",
    lineHeight: 20,
  },
});