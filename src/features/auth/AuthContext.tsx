import React, {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from "react";

/**
 * Auth Context & Mock Provider
 *
 * @description Quản lý trạng thái đăng nhập cho toàn bộ ứng dụng (giả lập Redux / Session token).
 *
 * @example
 * // Usage trong component con:
 * import { useAuth } from '@/features/auth/AuthContext';
 *
 * const { isAuthenticated, login, logout, user } = useAuth();
 * <button onClick={login}>Đăng nhập</button>
 */
import { setAccessToken } from "@/services/api";

export interface User {
  id: string;
  username: string;
  email?: string;
  rating: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData?: Partial<User> | string, token?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "chesshh_auth_state";
const USER_STORAGE_KEY = "chesshh_user_data";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });

  const [user, setUser] = useState<User | null>(() => {
    if (!isAuthenticated) return null;
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        // Fallback
      }
    }
    return { id: "u_1", username: "Grandmaster_HH", rating: 1850 };
  });

  const login = (userData?: Partial<User> | string, token?: string) => {
    setIsAuthenticated(true);
    let currentUser: User;

    if (typeof userData === "string") {
      currentUser = { id: "u_1", username: userData, rating: 1850 };
    } else if (userData) {
      currentUser = {
        id: userData.id || "u_1",
        username: userData.username || "Grandmaster_HH",
        email: userData.email,
        rating: userData.rating || 1800,
      };
    } else {
      currentUser = { id: "u_1", username: "Grandmaster_HH", rating: 1850 };
    }

    setUser(currentUser);
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));

    if (token) {
      setAccessToken(token);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
