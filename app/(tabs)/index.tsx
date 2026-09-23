import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ============================================================
// CONFIGURATION
// ============================================================

// Replace this with your actual backend URL.
// Example:
// const API_URL = "http://192.168.1.10:3000/api";

const API_URL = "https://your-api-url.com/api";

const TOKEN_KEY = "student_auth_token";



type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  studentId?: string;
  course?: string;
};



export default function Index() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");

  

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    try {
      const savedToken = await SecureStore.getItemAsync(TOKEN_KEY);

      if (!savedToken) {
        setCheckingSession(false);
        return;
      }

      setToken(savedToken);

      
      const profile = await getProfile(savedToken);

      if (profile) {
        setUser(profile);
      } else {
        
        await logout(false);
      }
    } catch (err) {
      console.log("Session restore error:", err);
      await logout(false);
    } finally {
      setCheckingSession(false);
    }
  }

  

  async function handleLogin() {
    setError("");

    
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setError("Invalid email or password.");
        } else {
          setError(data.message || "Login failed. Please try again.");
        }

        return;
      }

      if (!data.token) {
        setError("Login succeeded but no token was received.");
        return;
      }

      
      await SecureStore.setItemAsync(TOKEN_KEY, data.token);

      setToken(data.token);

      
      const profile = await getProfile(data.token);

      if (!profile) {
        await logout(false);
        setError("Unable to load your profile.");
        return;
      }

      setUser(profile);
    } catch (err) {
      console.log("Login error:", err);
      setError(
        "Unable to connect to the server. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  }

  

  async function getProfile(authToken: string): Promise<User | null> {
    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      
      if (response.status === 401) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setToken(null);
        setUser(null);

        return null;
      }

      if (response.status === 403) {
        Alert.alert(
          "Access denied",
          "You do not have permission to access this profile."
        );

        return null;
      }

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

     

      return data.user || data;
    } catch (err) {
      console.log("Profile request error:", err);
      return null;
    }
  }

  

  async function logout(showMessage = true) {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);

      setToken(null);
      setUser(null);
      setEmail("");
      setPassword("");
      setError("");

      if (showMessage) {
        Alert.alert("Logged out", "Your session has been cleared.");
      }
    } catch (err) {
      console.log("Logout error:", err);
    }
  }



  async function refreshProfile() {
    if (!token) return;

    setLoading(true);

    const profile = await getProfile(token);

    if (profile) {
      setUser(profile);
    } else {
      await logout(false);
      setError("Your session has expired. Please log in again.");
    }

    setLoading(false);
  }

 

  if (checkingSession) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Restoring session...</Text>
      </SafeAreaView>
    );
  }


  if (!token || !user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.loginContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>S</Text>
          </View>

          <Text style={styles.title}>Student Portal</Text>

          <Text style={styles.subtitle}>
            Sign in to access your student account
          </Text>

          <View style={styles.card}>
            <Text style={styles.label}>Email</Text>

            <TextInput
              style={styles.input}
              placeholder="student@example.com"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                setError("");
              }}
            />

            <Text style={styles.label}>Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#9ca3af"
              secureTextEntry
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setError("");
              }}
            />

            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <TouchableOpacity
              style={[
                styles.loginButton,
                loading && styles.disabledButton,
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>
            Authenticated Student Portal
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.dashboard}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.smallText}>Welcome back</Text>
            <Text style={styles.headerName}>{user.name}</Text>
          </View>

          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>
              {user.role || "Student"}
            </Text>
          </View>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.name
                ? user.name.charAt(0).toUpperCase()
                : "S"}
            </Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
        </View>

        {/* Student Information */}
        <Text style={styles.sectionTitle}>Profile Information</Text>

        <View style={styles.infoCard}>
          <InfoRow label="Student ID" value={user.studentId || "N/A"} />

          <InfoRow
            label="Course"
            value={user.course || "N/A"}
          />

          <InfoRow
            label="Role"
            value={user.role || "Student"}
          />

          <InfoRow
            label="Email"
            value={user.email}
          />
        </View>

        {/* Role-aware interface */}
        <Text style={styles.sectionTitle}>Dashboard</Text>

        <View style={styles.dashboardCard}>
          {user.role?.toLowerCase() === "admin" ? (
            <>
              <Text style={styles.dashboardTitle}>
                Administrator Access
              </Text>

              <Text style={styles.dashboardDescription}>
                You have administrator permissions and can access
                protected administrative features.
              </Text>

              <View style={styles.featureBox}>
                <Text style={styles.featureText}>
                  ✓ User Management
                </Text>
              </View>

              <View style={styles.featureBox}>
                <Text style={styles.featureText}>
                  ✓ Student Records
                </Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.dashboardTitle}>
                Student Dashboard
              </Text>

              <Text style={styles.dashboardDescription}>
                Your authenticated student account is active.
                Protected information is available below.
              </Text>

              <View style={styles.featureBox}>
                <Text style={styles.featureText}>
                  ✓ Profile Protected
                </Text>
              </View>

              <View style={styles.featureBox}>
                <Text style={styles.featureText}>
                  ✓ Authenticated Session
                </Text>
              </View>

              <View style={styles.featureBox}>
                <Text style={styles.featureText}>
                  ✓ Secure Token Storage
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Protected API */}
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={refreshProfile}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#2563eb" />
          ) : (
            <Text style={styles.refreshText}>
              Refresh Protected Profile
            </Text>
          )}
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => logout(true)}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.securityText}>
          Your session token is stored securely on this device.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}



function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f3f6fb",
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f6fb",
  },

  loadingText: {
    marginTop: 12,
    color: "#6b7280",
    fontSize: 15,
  },

  loginContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  logoCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#2563eb",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  logoText: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "800",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 8,
    marginBottom: 28,
    fontSize: 15,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 22,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 7,
    marginTop: 12,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#ffffff",
  },

  errorBox: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 9,
    padding: 12,
    marginTop: 14,
  },

  errorText: {
    color: "#dc2626",
    fontSize: 14,
  },

  loginButton: {
    height: 52,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  disabledButton: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  footerText: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 24,
  },

  dashboard: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  smallText: {
    color: "#6b7280",
    fontSize: 13,
  },

  headerName: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "800",
    marginTop: 3,
  },

  roleBadge: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  roleText: {
    color: "#1d4ed8",
    fontWeight: "700",
    fontSize: 12,
  },

  profileCard: {
    backgroundColor: "#2563eb",
    borderRadius: 18,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#2563eb",
    fontSize: 24,
    fontWeight: "800",
  },

  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },

  profileName: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "800",
  },

  profileEmail: {
    color: "#dbeafe",
    marginTop: 4,
    fontSize: 13,
  },

  sectionTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },

  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 18,
    marginBottom: 26,
  },

  infoRow: {
    minHeight: 55,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    justifyContent: "center",
  },

  infoLabel: {
    color: "#6b7280",
    fontSize: 12,
  },

  infoValue: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 3,
  },

  dashboardCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
  },

  dashboardTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
  },

  dashboardDescription: {
    color: "#6b7280",
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 15,
  },

  featureBox: {
    backgroundColor: "#f0fdf4",
    borderRadius: 9,
    padding: 12,
    marginTop: 8,
  },

  featureText: {
    color: "#15803d",
    fontWeight: "600",
  },

  refreshButton: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  refreshText: {
    color: "#2563eb",
    fontWeight: "700",
  },

  logoutButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#dc2626",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },

  securityText: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 18,
  },
});
