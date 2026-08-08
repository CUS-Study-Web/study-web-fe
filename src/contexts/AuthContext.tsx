import { createContext, useContext, useState, useCallback } from "react";

type UserInfo = {
  name: string;
  email: string;
  phone: string;
  birthday: string;
  gender: string;
  school: string;
  coursesCount: number;
  isVip: boolean;
};

type AuthContextValue = {
  user: UserInfo | null;
  isLoggedIn: boolean;
  login: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const MOCK_USER: UserInfo = {
  name: "Nguyễn Văn An",
  email: "an.nguyen@email.com",
  phone: "0912 345 678",
  birthday: "15/08/2006",
  gender: "Nam",
  school: "THPT Chu Văn An, Hà Nội",
  coursesCount: 2,
  isVip: false,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);

  const login = useCallback((_email: string) => {
    setUser(MOCK_USER);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
