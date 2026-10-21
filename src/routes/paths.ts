/**
 * ChessHH Route Path Constants
 *
 * Định nghĩa tập trung toàn bộ đường dẫn trong ứng dụng theo chuẩn AGENTS.md
 */

export const ROUTE_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  LOGIN_REDIRECT: "/login?redirect=true",
  PLAY: "/play",
  GAME: (gameId: string = ":gameId") => `/game/${gameId}`,
  LEADERBOARD: "/leaderboard",
  PROFILE: "/profile",
  NOT_FOUND: "*",
} as const;
