import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <Text style={styles.subtitle}>
        Manage your preferences and account.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.settingRow}>
          <View>
            <Text style={styles.settingTitle}>Notifications</Text>
            <Text style={styles.description}>
              Receive student portal notifications
            </Text>
          </View>

          <Switch
            value={notifications}
            onValueChange={setNotifications}
          />
        </View>

        <View style={styles.settingRow}>
          <View>
            <Text style={styles.settingTitle}>Dark Mode</Text>
            <Text style={styles.description}>
              Change the appearance of the app
            </Text>
          </View>

          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity
          style={styles.accountButton}
          onPress={() =>
            Alert.alert("Account", "Edit Profile selected.")
          }
        >
          <Text style={styles.accountText}>Edit Profile</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.accountButton}
          onPress={() =>
            Alert.alert("Password", "Change Password selected.")
          }
        >
          <Text style={styles.accountText}>Change Password</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 20,
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 5,
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 15,
  },

  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },

  description: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
    maxWidth: 230,
  },

  accountButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  accountText: {
    fontSize: 16,
    color: "#374151",
  },

  arrow: {
    fontSize: 25,
    color: "#2563EB",
  },

  logoutButton: {
    marginTop: 20,
    backgroundColor: "#FEE2E2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  logoutText: {
    color: "#DC2626",
    fontSize: 16,
    fontWeight: "bold",
  },
});