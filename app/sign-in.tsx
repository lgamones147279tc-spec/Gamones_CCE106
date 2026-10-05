
import { API_BASE_URL } from '@/constants/api';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function SignInScreen() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('LOGIN API:', `${API_BASE_URL}/login`);

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      console.log('LOGIN STATUS:', response.status);

      const data = await response.json();

      console.log('LOGIN RESPONSE:', data);

      if (!response.ok) {
        throw new Error(
          data?.message || `Login failed. Server returned ${response.status}.`
        );
      }

      const accessToken =
        data?.access_token ||
        data?.accessToken ||
        data?.token;

      if (!accessToken) {
        throw new Error(
          'Login succeeded, but the API did not return an access token.'
        );
      }

      const userData = data?.user || {
        id: data?.id,
        name: data?.name || email.trim(),
        email: data?.email || email.trim(),
        role: data?.role || 'Student',
      };

      console.log('TOKEN:', accessToken);
      console.log('USER:', userData);

      await login(accessToken, userData);

      console.log('AUTH LOGIN COMPLETE');

      router.replace('/(app)');
    } catch (err) {
      console.error('LOGIN ERROR:', err);

      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError(
          'Cannot connect to the Mock API. Make sure node service.js is running.'
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unable to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Text style={styles.eyebrow}>
          CCE106 • PRACTICAL EXAMINATION
        </Text>

        <Text style={styles.title}>
          Student Service Portal
        </Text>

        <Text style={styles.subtitle}>
          Sign in to access student services.
        </Text>

        <Text style={styles.label}>Email</Text>

        <TextInput
          style={styles.input}
          placeholder="student@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />

        <Text style={styles.label}>Password</Text>

        <TextInput
          style={styles.input}
          placeholder="student123"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!loading}
        />

        <View style={styles.feedback}>
          {loading && (
            <ActivityIndicator
              size="small"
              color="#245bb2"
            />
          )}

          {error ? (
            <Text style={styles.error}>
              {error}
            </Text>
          ) : null}
        </View>

        <Pressable
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Signing in...' : 'Login'}
          </Text>
        </Pressable>

        <Text style={styles.credentials}>
          Test Account{'\n'}
          Email: student@example.com{'\n'}
          Password: student123
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f2f5fa',
  },

  card: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#245bb2',
    marginBottom: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#17324d',
  },

  subtitle: {
    color: '#536579',
    marginTop: 8,
    marginBottom: 24,
  },

  label: {
    color: '#17324d',
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#c6d2e1',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    color: '#17324d',
  },

  feedback: {
    minHeight: 40,
    justifyContent: 'center',
    marginBottom: 8,
  },

  error: {
    color: '#b42318',
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#245bb2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },

  credentials: {
    marginTop: 20,
    color: '#536579',
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
  },
});

