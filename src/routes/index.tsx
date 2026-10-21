import { createBrowserRouter, Navigate } from "react-router";
import { LoginPage } from "@/features/auth/LoginPage";
import { PlayChessPage } from "@/features/game/PlayChessPage";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { ROUTE_PATHS } from "@/routes/paths";


/**
 * App Router Configuration
 *
 * @description Định nghĩa tập trung toàn bộ cây Route cho ứng dụng ChessHH theo chuẩn React Router v7/v8.
 *
 * @example
 * import { router } from '@/routes';
 * <RouterProvider router={router} />
 */

export const router = createBrowserRouter([
  // Public Route: Đăng nhập (hỗ trợ cả Initial View và Redirected View khi có query ?redirect=true)
  {
    path: ROUTE_PATHS.LOGIN,
    element: <LoginPage />,
  },

  // Protected Routes: Bắt buộc đăng nhập
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTE_PATHS.HOME,
        element: <Navigate to={ROUTE_PATHS.PLAY} replace />,
      },
      {
        path: ROUTE_PATHS.PLAY,
        element: <PlayChessPage />,
      },
      {
        path: ROUTE_PATHS.GAME(":gameId"),
        element: <PlayChessPage />,
      },
    ],
  },

  // Fallback Route: 404
  {
    path: ROUTE_PATHS.NOT_FOUND,
    element: <Navigate to={ROUTE_PATHS.PLAY} replace />,
  },
]);
