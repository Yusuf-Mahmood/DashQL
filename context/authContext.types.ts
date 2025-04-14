export type AuthContextType = {
  token: string | null;
  setToken: (token: string) => void;
  data: any;
  setData: (data: any) => void;
  logout: () => void;
};