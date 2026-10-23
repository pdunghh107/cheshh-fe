import React, { type ReactNode, useState } from "react";

import { setAccessToken } from "@/services/api";

import { logoutApi } from "./authApi";
import {
  AUTH_STORAGE_KEY,
  AuthContext,
  type User,
  USER_STORAGE_KEY,
} from "./useAuth";

/**
 * AuthProvider Component
 *
 * @description Quản lý trạng thái xác thực và lưu trữ phiên đăng nhập người dùng.
 *
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
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

  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      // Dù API logout có lỗi mạng hay token hết hạn thì vẫn clear client auth state
      console.error("Lỗi khi gọi API logout:", error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      setAccessToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
