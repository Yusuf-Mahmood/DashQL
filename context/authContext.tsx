import { createContext, useState, ReactNode, useContext } from 'react';
import { useRouter } from 'expo-router';
import { loginUser, fetchProfileData } from '@/services/auth';

type AuthContextType = {
  token: string | null;
  setToken: (token: string) => void;
  data: any;
  setData: (data: any) => void;
  logout: () => void;
};

export const useLogin = () => {
  const [error, setError] = useState('');
  const { setToken, setData } = useAuth();
  const router = useRouter();
  
  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return false;
    }
    
    const token = await loginUser(email, password);
    if (!token) {
      setError('Invalid credentials');
      return false;
    }
    
    setToken(token);
    const profileData = await fetchProfileData(token);
    if (!profileData) {
      setError('Failed to fetch profile data');
      return false;
    }
    
    setData(profileData);
    setError('');
    router.replace('/dashboard');
    return true;
  };
  
  return { handleLogin, error };
};

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
