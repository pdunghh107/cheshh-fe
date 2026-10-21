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

interface User {
  id: string;
  username: string;
  rating: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "chesshh_auth_state";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });

  const [user, setUser] = useState<User | null>(() => {
    return isAuthenticated
      ? { id: "u_1", username: "Grandmaster_HH", rating: 1850 }
      : null;
  });

  const login = (username: string = "Grandmaster_HH") => {
    setIsAuthenticated(true);
    setUser({ id: "u_1", username, rating: 1850 });
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
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
