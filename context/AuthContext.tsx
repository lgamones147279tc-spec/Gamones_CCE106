
import * as SecureStore from 'expo-secure-store';
import { createContext, useEffect, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';

export type User = {
  id?: string | number;
  name?: string;
  email?: string;
  role?: string;
};

type AuthContextValue = {
  token: string | null;
  user: User | null;
  authLoading: boolean;
  login: (accessToken: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

const TOKEN_KEY = 'access_token';
const USER_KEY = 'user_data';

const PLACEHOLDER_TOKEN = 'placeholder-token-12345';

const PLACEHOLDER_USER: User = {
  id: 1,
  name: 'Lhindex Khim T. Gamones',
  email: 'student@example.com',
  role: 'Student',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const login = async (
    accessToken: string,
    userData: User
  ) => {
    setToken(accessToken);
    setUser(userData);

    try {
      if (Platform.OS === 'web') {
        // Temporary web storage for testing only.
        localStorage.setItem(TOKEN_KEY, accessToken);
        localStorage.setItem(
          USER_KEY,
          JSON.stringify(userData)
        );
      } else {
        await SecureStore.setItemAsync(
          TOKEN_KEY,
          accessToken
        );

        await SecureStore.setItemAsync(
          USER_KEY,
          JSON.stringify(userData)
        );
      }
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);

    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      } else {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(USER_KEY);
      }
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  };

  const restoreSession = async () => {
    setAuthLoading(true);

    try {
      let savedToken: string | null = null;
      let savedUser: string | null = null;

      if (Platform.OS === 'web') {
        savedToken = localStorage.getItem(TOKEN_KEY);
        savedUser = localStorage.getItem(USER_KEY);
      } else {
        savedToken =
          await SecureStore.getItemAsync(TOKEN_KEY);

        savedUser =
          await SecureStore.getItemAsync(USER_KEY);
      }

      if (savedToken) {
        setToken(savedToken);
      }

      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Failed to restore session:', error);

      setToken(null);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        authLoading,
        login,
        logout,
        restoreSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

