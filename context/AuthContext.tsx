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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const isSecureStoreAvailable = async () => {
    if (Platform.OS === 'web') {
      return false;
    }

    return await SecureStore.isAvailableAsync();
  };

  const login = async (
    accessToken: string,
    userData: User
  ) => {
    try {
      const available = await isSecureStoreAvailable();

      if (available) {
        await SecureStore.setItemAsync(
          'access_token',
          accessToken
        );
      }

      setToken(accessToken);
      setUser(userData);
    } catch (error) {
      console.error(
        'Failed to save authentication session:',
        error
      );

      throw new Error(
        'Unable to save your login session.'
      );
    }
  };

  const logout = async () => {
    try {
      const available = await isSecureStoreAvailable();

      if (available) {
        await SecureStore.deleteItemAsync('access_token');
      }
    } catch (error) {
      console.error(
        'Failed to clear authentication session:',
        error
      );
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  const restoreSession = async () => {
    setAuthLoading(true);

    try {
      const available = await isSecureStoreAvailable();

      // SecureStore is unavailable on web.
      if (!available) {
        setToken(null);
        setUser(null);
        return;
      }

      const savedToken =
        await SecureStore.getItemAsync('access_token');

      if (!savedToken) {
        setToken(null);
        setUser(null);
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/profile`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${savedToken}`,
          },
        }
      );

      if (response.status === 401) {
        await SecureStore.deleteItemAsync('access_token');
        setToken(null);
        setUser(null);
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Failed to restore session. Server returned ${response.status}.`
        );
      }

      const data = await response.json();

      const restoredUser: User =
        data?.user ?? data;

      setToken(savedToken);
      setUser(restoredUser);
    } catch (error) {
      console.error(
        'Failed to restore authentication session:',
        error
      );

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