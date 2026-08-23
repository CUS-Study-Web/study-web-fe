import { createContext, useContext, useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUserQuery } from "../hooks/queries/useAuth";
import { ROUTES } from "../utils/routes";
import { parseJwt } from "../utils/jwt";
import { authService } from "../services/authService";
import type { AuthResponse, UserResponse } from "../types/api/auth.api";

type UserInfo = UserResponse & {
  coursesCount?: number;
  isVip?: boolean;
};

type AuthContextValue = {
  user: UserInfo | null;
  role: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (authData: AuthResponse, redirectPath?: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");
  const isLoggedIn = !!token;

  // We only fetch the user if the token exists
  const { data: userResponse, isLoading } = useUserQuery(isLoggedIn);
  const user = userResponse?.data || null;

  const { role, isVipFromToken } = useMemo(() => {
    if (!token) return { role: null, isVipFromToken: false };
    const decoded = parseJwt(token);
    return {
      role: decoded?.role?.toLowerCase() || 'learner',
      isVipFromToken: !!decoded?.isVip
    };
  }, [token]);

  // Cast to UserInfo to include optional fields that should come from Backend (coursesCount, isVip)
  const userInfo = user ? ({
    ...user,
    isVip: (user as any).isVip ?? isVipFromToken
  } as UserInfo) : null;

  const login = useCallback(
    (authData: AuthResponse, redirectPath?: string) => {
      localStorage.setItem("accessToken", authData.accessToken);
      localStorage.setItem("refreshToken", authData.refreshToken);
      
      // Update query cache immediately so it doesn't need to refetch instantly
      queryClient.setQueryData(['currentUser'], { data: authData.user });
      
      if (redirectPath) {
        navigate(redirectPath);
        return;
      }
      
      let role = 'learner';
      const decodedToken = parseJwt(authData.accessToken);
      if (decodedToken && decodedToken.role) {
        role = decodedToken.role.toLowerCase();
      }
      
      if (role === 'admin') {
        navigate(ROUTES.ADMIN.DASHBOARD);
      } else if (role === 'assistant') {
        navigate(ROUTES.ASSISTANT.DASHBOARD);
      } else {
        navigate(ROUTES.LEARNER.MY_COURSES);
      }
    },
    [navigate, queryClient]
  );

  const logout = useCallback(async () => {
    try {
      await authService.signout();
    } catch (error) {
      console.error("Signout failed", error);
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    queryClient.removeQueries({ queryKey: ['currentUser'] });
    navigate(ROUTES.AUTH.LOGIN);
  }, [navigate, queryClient]);

  return (
    <AuthContext.Provider value={{ user: userInfo, role, isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
