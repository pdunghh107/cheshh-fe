import { createContext, useContext } from "react";

export interface User {
  id: string;
  username: string;
  email?: string;
  rating: number;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData?: Partial<User> | string, token?: string) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AUTH_STORAGE_KEY = "chesshh_auth_state";
export const USER_STORAGE_KEY = "chesshh_user_data";

/**
 * useAuth Hook
 *
 * @description Hook truy cập AuthContext để lấy thông tin đăng nhập, token và hàm login/logout.
 *
 * @example
 * const { user, isAuthenticated, login, logout } = useAuth();
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
