import { useState } from 'react';
import { loginUser, fetchProfileData } from '@/services/auth';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/authContext';

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
