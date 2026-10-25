import React, { type ReactNode, useEffect, useState } from "react";

import { Loading } from "@/components/Loading";
import { setAccessToken } from "@/services/api";

import { logoutApi, refreshSilentToken } from "./authApi";
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
 * Áp dụng chuẩn bảo mật In-Memory Token + HttpOnly Cookie:
 * - Access Token chỉ lưu trong RAM.
 * - Khi người dùng F5 hoặc mở lại tab, ứng dụng tự động gọi Silent Refresh để khôi phục phiên từ Cookie.
 *
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  // Silent Refresh khi ứng dụng khởi chạy lần đầu (F5 hoặc mở tab mới)
  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        const response = await refreshSilentToken();
        const token = response.accessToken || response.token;

        if (token) {
          setAccessToken(token);
        }

        const currentUser: User = response.user || {
          id: response.userId || "u_user",
          username: response.username || "Kỳ thủ ChessHH",
          email: response.email,
          rating: response.rating || 1200,
        };

        if (isMounted) {
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      } catch (err) {
        // Chưa đăng nhập hoặc Refresh Token trong cookie đã hết hạn
        console.warn("Silent refresh failed (chưa đăng nhập hoặc cookie hết hạn):", err);
        if (isMounted) {
          setIsAuthenticated(false);
          setUser(null);
          setAccessToken(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

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

    // Lưu Access Token duy nhất vào RAM
    if (token) {
      setAccessToken(token);
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error("Lỗi khi gọi API logout:", error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      setAccessToken(null);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#f8fafc",
        }}
      >
        <Loading size={40} />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

