import React, { useState } from "react";
import { Outlet, useLocation } from "react-router";

import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ROUTE_PATHS } from "@/routes/paths";

import {
  StyledContentContainer,
  StyledLayoutRoot,
  StyledMainWrapper,
} from "./MainLayout.styles";

/**
 * MainLayout Component
 *
 * @description Layout chuẩn của toàn bộ hệ thống ChessHH, kết hợp Sidebar điều hướng bên trái, Header ở trên và Content Container bên phải.
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
  const location = useLocation();

  const isPlayPage =
    location.pathname === ROUTE_PATHS.PLAY ||
    location.pathname.startsWith("/game/");

  return (
    <StyledLayoutRoot>
      {/* Sidebar Navigation */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main App Container */}
      <StyledMainWrapper>
        {/* App Header */}
        <Header />

        {/* Dynamic Page Outlet */}
        <StyledContentContainer $noPadding={isPlayPage}>
          <Outlet />
        </StyledContentContainer>
      </StyledMainWrapper>
    </StyledLayoutRoot>
  );
};

