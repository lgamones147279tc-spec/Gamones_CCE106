
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

const PLACEHOLDER_EMAIL = 'student@example.com';
const PLACEHOLDER_PASSWORD = 'student123';

const PLACEHOLDER_TOKEN = 'placeholder-token-12345';

const PLACEHOLDER_USER = {
  id: 1,
  name: 'Lhindex Khim T. Gamones',
  email: 'student@example.com',
  role: 'Student',
};

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
      if (
        email.trim().toLowerCase() !== PLACEHOLDER_EMAIL ||
        password !== PLACEHOLDER_PASSWORD
      ) {
        throw new Error('Invalid email or password.');
      }

      await login(
        PLACEHOLDER_TOKEN,
        PLACEHOLDER_USER
      );

      router.replace('/(app)');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unable to sign in.');
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
            <ActivityIndicator color="#245bb2" />
          )}

          {error ? (
            <Text style={styles.error}>{error}</Text>
          ) : null}
        </View>

        <Pressable
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Signing in…' : 'Login'}
          </Text>
        </Pressable>

        <View style={styles.testBox}>
          <Text style={styles.testTitle}>
            Test Account
          </Text>

          <Text style={styles.testText}>
            Email: student@example.com
          </Text>

          <Text style={styles.testText}>
            Password: student123
          </Text>
        </View>
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
    minHeight: 30,
  },

  error: {
    color: '#b42318',
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

  testBox: {
    marginTop: 20,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#f2f5fa',
  },

  testTitle: {
    fontWeight: '700',
    color: '#17324d',
    marginBottom: 5,
  },

  testText: {
    color: '#536579',
    fontSize: 13,
  },
});

