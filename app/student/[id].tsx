import { type Student } from '@/components/StudentCard';
import { API_BASE_URL } from '@/constants/api';
import { useAuth } from '@/hooks/useAuth';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function StudentDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { token, logout } = useAuth();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStudent = async () => {
    // Validate the ID
    if (!id || id.trim() === '') {
      setStudent(null);
      setError('Student ID is missing.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    setStudent(null);

    try {
      // GET /students/{id}
      const response = await fetch(
        `${API_BASE_URL}/students/${encodeURIComponent(id)}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
        }
      );

      // Handle expired/invalid token
      if (response.status === 401) {
        await logout();
        return;
      }

      // Handle missing student
      if (response.status === 404) {
        setError('Student record not found.');
        return;
      }

      // Handle other server errors
      if (!response.ok) {
        throw new Error(
          `Failed to load student. Server returned ${response.status}.`
        );
      }

      const data = await response.json();

      // Some APIs return the student directly,
      // while others may return { student: {...} }.
      const studentData: Student =
        data?.student ?? data;

      if (!studentData || typeof studentData !== 'object') {
        throw new Error('Invalid student data received from the server.');
      }

      setStudent(studentData);
    } catch (err) {
      console.error('Failed to load student:', err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unable to load student details.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudent();
  }, [id, token]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Student Details</Text>

      {loading ? (
        <View style={styles.state}>
          <ActivityIndicator
            size="large"
            color="#245bb2"
          />
          <Text style={styles.text}>
            Loading student…
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
            onPress={loadStudent}
          >
            <Text style={styles.link}>Try Again</Text>
          </Pressable>
        </View>
      ) : !student ? (
        <View style={styles.state}>
          <Text style={styles.text}>
            No student record available.
          </Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.text}>
            ID: {student.id ?? id}
          </Text>

          <Text style={styles.text}>
            Name: {student.name || '—'}
          </Text>

          <Text style={styles.text}>
            Email: {student.email || '—'}
          </Text>

          <Text style={styles.text}>
            Course: {student.course || '—'}
          </Text>
        </View>
      )}

      <Pressable
        accessibilityRole="button"
        style={styles.button}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Back</Text>
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
    fontSize: 28,
    fontWeight: '700',
  },

  state: {
    gap: 12,
    alignItems: 'center',
    padding: 24,
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