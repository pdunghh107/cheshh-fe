import { createBrowserRouter, Navigate, type RouteObject } from "react-router";

import { LoginPage } from "@/features/auth/LoginPage";
import { RegisterPage } from "@/features/auth/RegisterPage";
import { MainPage } from "@/features/dashboard";
import { ComponentShowcasePage } from "@/features/dev";
import { PlayChessPage } from "@/features/game/PlayChessPage";
import { MainLayout } from "@/layouts";
import { HomeEntryPage } from "@/routes/HomeEntryPage";
import { ROUTE_PATHS } from "@/routes/paths";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

/**
 * App Router Configuration
 *
 * @description Định nghĩa tập trung toàn bộ cây Route cho ứng dụng ChessHH theo chuẩn React Router v7/v8.
 * Bao gồm cơ chế kích hoạt route kiểm thử UI Components (/dev/components) chỉ khi ở môi trường Development (NODE_ENV=development).
 *
 * @example
 * import { router } from '@/routes';
 * <RouterProvider router={router} />
 */

const devRoutes: RouteObject[] = import.meta.env.DEV
  ? [
      {
        path: ROUTE_PATHS.DEV_COMPONENTS,
        element: <ComponentShowcasePage />,
      },
    ]
  : [];

export const router = createBrowserRouter([
  // Public Route: Đăng nhập
  {
    path: ROUTE_PATHS.LOGIN,
    element: <LoginPage />,
  },
  // Public Route: Đăng ký
  {
    path: ROUTE_PATHS.REGISTER,
    element: <RegisterPage />,
  },

  // Development Only Routes: Component Showcase
  ...devRoutes,

  // Layout bao bọc ứng dụng (Sidebar + Header + Container)
  {
    element: <MainLayout />,
    children: [
      // Route gốc `/`: Onboarding khi chưa login, MainPage khi đã login
      {
        path: ROUTE_PATHS.HOME,
        element: <HomeEntryPage />,
      },
      // Protected Routes: Bắt buộc đăng nhập
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTE_PATHS.PLAY,
            element: <PlayChessPage />,
          },
          {
            path: ROUTE_PATHS.GAME(":gameId"),
            element: <PlayChessPage />,
          },
          {
            path: ROUTE_PATHS.LEADERBOARD,
            element: <MainPage />,
          },
          {
            path: ROUTE_PATHS.PROFILE,
            element: <MainPage />,
          },
        ],
      },
    ],
  },

  // Fallback Route: 404
  {
    path: ROUTE_PATHS.NOT_FOUND,
    element: <Navigate to={ROUTE_PATHS.HOME} replace />,
  },
]);
