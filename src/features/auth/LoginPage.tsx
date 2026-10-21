import React from "react";
import { useSearchParams } from "react-router";

import { InitialLoginView } from "@/features/auth/components/InitialLoginView";
import { RedirectedLoginView } from "@/features/auth/components/RedirectedLoginView";


/**
 * LoginPage Component
 *
 * @description Trang Đăng nhập thông minh, tự động chuyển đổi giữa Initial View và Redirected View dựa theo URL query param (?redirect=true).
 *
 * @example
 * // Sử dụng trực tiếp trong Route:
 * import { LoginPage } from '@/features/auth/LoginPage';
 *
 * <Route path="/login" element={<LoginPage />} />
 */

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isRedirected = searchParams.get("redirect") === "true";

  return isRedirected ? <RedirectedLoginView /> : <InitialLoginView />;
};

export default LoginPage;
