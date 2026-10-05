import { API_BASE_URL } from '@/constants/api';
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const saveSession = async (accessToken: string, userData: User) => {
    if (Platform.OS === 'web') {
      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      return;
    }

    const available = await SecureStore.isAvailableAsync();

    if (available) {
      await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(userData));
    }
  };

  const getSavedToken = async () => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(TOKEN_KEY);
    }

    const available = await SecureStore.isAvailableAsync();

    if (!available) {
      return null;
    }

    return SecureStore.getItemAsync(TOKEN_KEY);
  };

  const getSavedUser = async () => {
    if (Platform.OS === 'web') {
      const savedUser = localStorage.getItem(USER_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    }

    const available = await SecureStore.isAvailableAsync();

    if (!available) {
      return null;
    }

    const savedUser = await SecureStore.getItemAsync(USER_KEY);

    return savedUser ? JSON.parse(savedUser) : null;
  };

  const clearSession = async () => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      return;
    }

    const available = await SecureStore.isAvailableAsync();

    if (available) {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
    }
  };

  const login = async (accessToken: string, userData: User) => {
    try {
      await saveSession(accessToken, userData);

      setToken(accessToken);
      setUser(userData);
    } catch (error) {
      console.error('Failed to save authentication session:', error);
      throw new Error('Unable to save your login session.');
    }
  };

  const logout = async () => {
    try {
      await clearSession();
    } catch (error) {
      console.error('Failed to clear authentication session:', error);
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  const restoreSession = async () => {
    setAuthLoading(true);

    try {
      const savedToken = await getSavedToken();
      const savedUser = await getSavedUser();

      if (!savedToken) {
        setToken(null);
        setUser(null);
        return;
      }

      // Validate the saved token with the API.
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${savedToken}`,
        },
      });

      if (response.status === 401) {
        await clearSession();
        setToken(null);
        setUser(null);
        return;
      }

      if (!response.ok) {
        throw new Error(`Profile request failed: ${response.status}`);
      }

      const data = await response.json();

      const profileData: User =
        data?.user ?? data ?? savedUser ?? {};

      setToken(savedToken);
      setUser(profileData);
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