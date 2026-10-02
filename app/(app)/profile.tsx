import { API_BASE_URL } from '@/constants/api';
import type { User } from '@/context/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const { user, token, logout, login } = useAuth();

  const [profile, setProfile] = useState<User | null>(user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProfile = async () => {
    if (!token) {
      setProfile(null);
      setError('You are not authenticated.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle expired/invalid session
      if (response.status === 401) {
        await logout();
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Failed to load profile. Server returned ${response.status}.`
        );
      }

      const data = await response.json();

      // Support either:
      // { id, name, email, role }
      // or { user: { id, name, email, role } }
      const profileData: User = data?.user ?? data;

      setProfile(profileData);

      // Keep AuthContext user information updated
      await login(token, profileData);
    } catch (err) {
      console.error('Failed to load profile:', err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unable to load your profile.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [token]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>MY PROFILE</Text>

      {loading ? (
        <View style={styles.state}>
          <ActivityIndicator
            size="large"
            color="#245bb2"
          />

          <Text style={styles.text}>
            Loading profile…
          </Text>
        </View>
      ) : error ? (
        <View style={styles.state}>
          <Text
            style={styles.error}
            accessibilityLiveRegion="polite"
          >
            {error}
          </Text>

          <Pressable
            accessibilityRole="button"
            onPress={loadProfile}
          >
            <Text style={styles.link}>Try Again</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.text}>
            Name: {profile?.name || '—'}
          </Text>

          <Text style={styles.text}>
            Email: {profile?.email || '—'}
          </Text>

          <Text style={styles.text}>
            Role: {profile?.role || '—'}
          </Text>

          {!profile && (
            <Text style={styles.note}>
              No profile information available.
            </Text>
          )}
        </View>
      )}

      <Text style={styles.text}>
        Session Status:{' '}
        {token ? 'Authenticated' : 'Not Available'}
      </Text>

      <Pressable
        accessibilityRole="button"
        style={styles.button}
        onPress={logout}
      >
        <Text style={styles.buttonText}>LOGOUT</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    gap: 20,
    backgroundColor: '#f2f5fa',
  },

  title: {
    color: '#17324d',
    fontSize: 24,
    fontWeight: '700',
  },

  state: {
    padding: 24,
    gap: 12,
    alignItems: 'center',
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 16,
    borderRadius: 12,
  },

  text: {
    color: '#536579',
    fontSize: 16,
  },

  note: {
    color: '#536579',
    fontSize: 12,
  },

  error: {
    color: '#b42318',
    textAlign: 'center',
  },

  link: {
    color: '#245bb2',
    padding: 12,
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#245bb2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});