import { createContext, useState, ReactNode, useContext } from 'react';

// Define the type for the context values
type AuthContextType = {
  token: string | null;
  setToken: (token: string) => void;
  data: any;
  setData: (data: any) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  return (
    <AuthContext.Provider value={{ token, setToken, data, setData }}>
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
