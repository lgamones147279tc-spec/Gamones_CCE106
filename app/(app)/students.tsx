import StudentCard, { type Student } from '@/components/StudentCard';
import { API_BASE_URL } from '@/constants/api';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function StudentsScreen() {
  const { token, logout } = useAuth();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const loadStudents = async () => {
    // 1. Set loading and clear previous errors
    setLoading(true);
    setError('');

    try {
      // 2. GET /students
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
        },
      });

      // 4. Handle unauthorized
      if (response.status === 401) {
        await logout();
        return;
      }

      // Check other HTTP errors
      if (!response.ok) {
        throw new Error(
          `Failed to load students. Server returned ${response.status}.`
        );
      }

      // 5. Parse JSON
      const data = await response.json();

      // Support either:
      // [ ...students ]
      // or { students: [ ...students ] }
      const studentList = Array.isArray(data)
        ? data
        : Array.isArray(data?.students)
          ? data.students
          : [];

      setStudents(studentList);
    } catch (err) {
      // 6. Handle errors
      console.error('Failed to load students:', err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unable to load students. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Call loadStudents when screen loads
    loadStudents();
  }, [token]);

  // Search/filter students by name
  const filteredStudents = students.filter((student) =>
    (student.name || '')
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students</Text>

      <TextInput
        style={styles.input}
        accessibilityLabel="Search students"
        placeholder="Search by name"
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
      />

      {loading ? (
        <View style={styles.state}>
          <ActivityIndicator
            size="large"
            color="#245bb2"
          />

          <Text style={styles.text}>
            Loading students…
          </Text>
        </View>
      ) : error ? (
        <View
          style={styles.state}
          accessibilityLiveRegion="polite"
        >
          <Text style={styles.error}>{error}</Text>

          <Pressable
            accessibilityRole="button"
            onPress={loadStudents}
          >
            <Text style={styles.link}>Try Again</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={filteredStudents}
          keyExtractor={(item, index) =>
            String(item.id ?? index)
          }
          renderItem={({ item }) => (
            <StudentCard student={item} />
          )}
          ListEmptyComponent={
            <View style={styles.state}>
              <Text style={styles.text}>
                {search.trim()
                  ? 'No students match your search.'
                  : 'No students found.'}
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f2f5fa',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#17324d',
    marginBottom: 20,
  },

  input: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#c6d2e1',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    color: '#17324d',
    marginBottom: 20,
  },

  state: {
    padding: 24,
    gap: 12,
    alignItems: 'center',
  },

  text: {
    color: '#536579',
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
});