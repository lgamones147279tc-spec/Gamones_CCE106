import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  getCurrentUser,
  loginUser,
} from "../services/authService";

import {
  deleteToken,
  getToken,
  saveToken,
} from "../storage/tokenStorage";

type Profile = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image?: string;
};

type LoginViewProps = {
  username: string;
  password: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  handleLogin: () => Promise<void>;
  loading: boolean;
  error: string;
};

type ProfileViewProps = {
  profile: Profile;
  handleLogout: () => Promise<void>;
};

type ProfileRowProps = {
  label: string;
  value: string;
};

export default function Index() {
  const [username, setUsername] = useState<string>("emilys");
  const [password, setPassword] = useState<string>("emilyspass");

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    try {
      setLoading(true);

      const token = await getToken();

      if (!token) {
        return;
      }

      try {
        const user = await getCurrentUser(token);
        setProfile(user);
      } catch {
        await deleteToken();
        setProfile(null);
      }
    } catch {
      setError("Unable to restore your session.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin() {
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter your username and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(
        username.trim(),
        password
      );

      if (!data.accessToken) {
        throw new Error("No access token received.");
      }

      await saveToken(data.accessToken);

      const user = await getCurrentUser(data.accessToken);

      setProfile(user);
    } catch {
      setProfile(null);
      setError(
        "Login failed. Check your username and password."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await deleteToken();

      setProfile(null);
      setError("");
    } catch {
      setError("Unable to log out. Please try again.");
    }
  }

  if (loading) {
    return <LoadingView />;
  }

  if (!profile) {
    return (
      <LoginView
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
        loading={loading}
        error={error}
      />
    );
  }

  return (
    <ProfileView
      profile={profile}
      handleLogout={handleLogout}
    />
  );
}

function LoadingView() {
  return (
    <SafeAreaView style={styles.loadingContainer}>
      <ActivityIndicator size="large" />

      <Text style={styles.loadingText}>
        Checking your session...
      </Text>
    </SafeAreaView>
  );
}

function LoginView({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
  loading,
  error,
}: LoginViewProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.loginContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.loginCard}>
          <View style={styles.iconCircle}>
            <Text style={styles.lockIcon}>🔐</Text>
          </View>

          <Text style={styles.title}>
            Secure Profile
          </Text>

          <Text style={styles.subtitle}>
            Sign in to view your protected profile
          </Text>

          <Text style={styles.label}>
            Username
          </Text>

          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            autoCapitalize="none"
            editable={!loading}
          />

          <Text style={styles.label}>
            Password
          </Text>

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry={true}
            autoCapitalize="none"
            editable={!loading}
          />

          {error !== "" && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>
                {error}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              Login
            </Text>
          </TouchableOpacity>

          <Text style={styles.testAccount}>
            Practice account: emilys
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileView({
  profile,
  handleLogout,
}: ProfileViewProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.profileContent}
      >
        <View style={styles.profileHeader}>
          <Text style={styles.profileTitle}>
            My Profile
          </Text>

          <Text style={styles.profileSubtitle}>
            Protected account information
          </Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.imageContainer}>
            <Text style={styles.imageEmoji}>
              👤
            </Text>
          </View>

          <Text style={styles.name}>
            {profile.firstName} {profile.lastName}
          </Text>

          <Text style={styles.username}>
            @{profile.username}
          </Text>

          <View style={styles.divider} />

          <ProfileRow
            label="First Name"
            value={profile.firstName}
          />

          <ProfileRow
            label="Last Name"
            value={profile.lastName}
          />

          <ProfileRow
            label="Username"
            value={profile.username}
          />

          <ProfileRow
            label="Email"
            value={profile.email}
          />

          <ProfileRow
            label="User ID"
            value={String(profile.id)}
          />
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileRow({
  label,
  value,
}: ProfileRowProps) {
  return (
    <View style={styles.profileRow}>
      <Text style={styles.rowLabel}>
        {label}
      </Text>

      <Text style={styles.rowValue}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F7FB",
  },

  loadingText: {
    marginTop: 14,
    fontSize: 16,
    color: "#555",
  },

  loginContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  loginCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 28,
    elevation: 5,
  },

  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E8F0FF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 18,
  },

  lockIcon: {
    fontSize: 32,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    color: "#172033",
  },

  subtitle: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 15,
    marginTop: 8,
    marginBottom: 28,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D6DAE1",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
    marginBottom: 18,
    backgroundColor: "#FAFAFA",
  },

  loginButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  errorBox: {
    backgroundColor: "#FEECEC",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },

  errorText: {
    color: "#B42318",
    fontSize: 14,
    lineHeight: 20,
  },

  testAccount: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 12,
    color: "#8A8F98",
  },

  profileContent: {
    padding: 24,
    paddingBottom: 40,
  },

  profileHeader: {
    marginBottom: 24,
  },

  profileTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#172033",
  },

  profileSubtitle: {
    color: "#6B7280",
    marginTop: 6,
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    elevation: 4,
  },

  imageContainer: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#E8F0FF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 14,
  },

  imageEmoji: {
    fontSize: 38,
  },

  name: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "800",
    color: "#172033",
  },

  username: {
    textAlign: "center",
    fontSize: 15,
    color: "#6B7280",
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 22,
  },

  profileRow: {
    marginBottom: 18,
  },

  rowLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8A8F98",
    textTransform: "uppercase",
    marginBottom: 4,
  },

  rowValue: {
    fontSize: 16,
    color: "#172033",
    fontWeight: "500",
  },

  logoutButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});