import { AuthProvider } from '@/context/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import { Redirect, Stack, useSegments } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

function RootNavigator() {
  const { token, authLoading } = useAuth();
  const segments = useSegments();

  // TODO EXAM: Check authentication state and wait for session restoration.
  if (authLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#245bb2" />
      </View>
    );
  }

  const firstSegment = segments[0];

  const isSignIn = firstSegment === 'sign-in';
  const isProtectedRoute =
    firstSegment === '(app)' || firstSegment === 'student';

  // TODO EXAM: Protect (app) AND student/[id]; redirect unauthenticated users to /sign-in.
  if (!token && isProtectedRoute && !isSignIn) {
    return <Redirect href="/sign-in" />;
  }

  if (token && isSignIn) {
    return <Redirect href="/(app)" />;
  }

  return (
    <Stack screenOptions={{ headerTintColor: '#17324d' }}>
      <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen name="student/[id]" options={{ title: 'Student Details' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f5fa',
  },
});