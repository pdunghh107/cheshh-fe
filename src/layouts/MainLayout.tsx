import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";

import { Button } from "@/components/Button";
import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "@/features/auth/AuthContext";
import { ROUTE_PATHS } from "@/routes/paths";

import {
  StyledContentContainer,
  StyledHeader,
  StyledHeaderTitle,
  StyledLayoutRoot,
  StyledMainWrapper,
  StyledRatingBadge,
  StyledUserBadge,
  StyledUserControls,
} from "./MainLayout.styles";

/**
 * MainLayout Component
 *
 * @description Layout chuẩn của toàn bộ hệ thống ChessHH, kết hợp Sidebar điều hướng bên trái và Content Container bên phải.
 *
 * @example
 * // Trong React Router configuration:
 * {
 *   element: <MainLayout />,
 *   children: [
 *     { path: ROUTE_PATHS.PLAY, element: <PlayChessPage /> }
 *   ]
 * }
 */
export const MainLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
      navigate(ROUTE_PATHS.HOME);
    } else {
      navigate(ROUTE_PATHS.LOGIN);
    }
  };

  return (
    <StyledLayoutRoot>
      {/* Sidebar Navigation */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main App Container */}
      <StyledMainWrapper>
        <StyledHeader>
          <StyledHeaderTitle>ChessHH Arena</StyledHeaderTitle>

          <StyledUserControls>
            {isAuthenticated && user && (
              <StyledUserBadge>
                <span>👤</span>
                <strong>{user.username}</strong>
                <StyledRatingBadge>Elo {user.rating}</StyledRatingBadge>
              </StyledUserBadge>
            )}

            <Button
              variant={isAuthenticated ? "outline" : "primary"}
              size="sm"
              onClick={handleAuthAction}
            >
              {isAuthenticated ? "Đăng xuất" : "Đăng nhập"}
            </Button>
          </StyledUserControls>
        </StyledHeader>

        {/* Dynamic Page Outlet */}
        <StyledContentContainer>
          <Outlet />
        </StyledContentContainer>
      </StyledMainWrapper>
    </StyledLayoutRoot>
  );
};
