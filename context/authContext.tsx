import { createContext, useState, ReactNode, useContext } from 'react';
import { AuthContextType } from './authContext.types';
import { useRouter } from 'expo-router';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const router = useRouter();

  const logout = () => {
    setToken(null);
    setData(null);
    router.replace('/');
  };

  return (
    <AuthContext.Provider value={{ token, setToken, data, setData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
