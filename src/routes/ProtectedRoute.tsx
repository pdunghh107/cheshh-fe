import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";

import { ROUTE_PATHS } from "@/routes/paths";
import { useAppSelector } from "@/store";

/**
 * ProtectedRoute Component
 *
 * @description Route bảo vệ, kiểm tra trạng thái xác thực người dùng từ Redux Toolkit.
 * Nếu chưa đăng nhập, tự động chuyển hướng về `/login?redirect=true` kèm theo đường dẫn trang đang muốn vào qua state.
 *
 * @example
 * // Sử dụng bọc các private route trong Router:
 * <Route element={<ProtectedRoute />}>
 *   <Route path="/play" element={<PlayChessPage />} />
 * </Route>
 */

export const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Chuyển hướng người dùng về /login?redirect=true và lưu lại pathname nguồn để quay lại sau khi login
    return (
      <Navigate
        to={ROUTE_PATHS.LOGIN_REDIRECT}
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
