import React, { useState } from "react";
import { Outlet } from "react-router";

import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

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
        <StyledContentContainer>
          <Outlet />
        </StyledContentContainer>
      </StyledMainWrapper>
    </StyledLayoutRoot>
  );
};

