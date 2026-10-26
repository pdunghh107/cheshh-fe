import React, { type ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

import { AUTH_MESSAGES } from "@/commons/messages";
import { Loading } from "@/components/Loading";
import { setAccessToken } from "@/services/api";
import { handleApiError, handleApiSuccess } from "@/utils/toast";

import { logoutApi, refreshTokenSilent } from "./authApi";
import { AuthContext, type User } from "./useAuth";

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

  const setAuthContext = (user: User, token: string): void => {
    setIsAuthenticated(true);
    setUser(user);
    setAccessToken(token);
  };

  const removeAuthContext = (): void => {
    setIsAuthenticated(false);
    setUser(null);
    setAccessToken(null);
  };

  useEffect(() => {
    let isMounted = true;

    const safeRun = (fn: () => void): void => {
      if (isMounted) fn();
    };

    const restoreSession = async () => {
      try {
        const response = await refreshTokenSilent();
        setAccessToken(response.accessToken);

        safeRun(() => {
          setUser(response.user);
          setIsAuthenticated(true);
        });
      } catch {
        safeRun(removeAuthContext);
      } finally {
        safeRun(() => setIsLoading(false));
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = (user: User, token: string) => {
    setAuthContext(user, token);
  };

  const logout = async () => {
    try {
      const message = await logoutApi();
      handleApiSuccess(message || AUTH_MESSAGES.LOGOUT_SUCCESS);
    } catch (err) {
      handleApiError(err, AUTH_MESSAGES.LOGOUT_FAILED);
    } finally {
      removeAuthContext();
    }
  };

  if (isLoading) {
    return (
      <LoadingWrapper>
        <Loading size={40} />
      </LoadingWrapper>
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

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f8fafc;
`;
