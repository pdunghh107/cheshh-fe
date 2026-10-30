import { apiClient } from "@/services/api";
import { wsService } from "@/services/websocket";

import type { MatchmakingStatusResponse } from "./matchmaking.types";

/**
 * 1. REST API: Gọi POST /chess/matchmaking/join qua Kong Gateway (prefix /api/v1)
 */
export const joinMatchmakingApi = async (): Promise<MatchmakingStatusResponse> => {
  const response = await apiClient.post<MatchmakingStatusResponse>(
    "/chess/matchmaking/join",
  );
  return response.data;
};

/**
 * 2. REST API: Gọi POST /chess/matchmaking/cancel
 */
export const cancelMatchmakingApi = async (): Promise<MatchmakingStatusResponse> => {
  const response = await apiClient.post<MatchmakingStatusResponse>(
    "/chess/matchmaking/cancel",
  );
  return response.data;
};

/**
 * 3. WebSocket STOMP: Gửi action tham gia hàng chờ qua WebSocket
 * Endpoint: /app/matchmaking/join
 */
export const sendWsJoinQueue = (): void => {
  wsService.publish("/app/matchmaking/join");
};

/**
 * 4. WebSocket STOMP: Gửi action hủy tìm trận qua WebSocket
 * Endpoint: /app/matchmaking/cancel
 */
export const sendWsCancelQueue = (): void => {
  wsService.publish("/app/matchmaking/cancel");
};

/**
 * 5. WebSocket STOMP: Đăng ký nhận thông báo trạng thái Matchmaking theo User
 * Destination: /user/queue/matchmaking/status
 */
export const subscribeMatchmakingStatus = (
  callback: (response: MatchmakingStatusResponse) => void,
): (() => void) => {
  return wsService.subscribe<MatchmakingStatusResponse>(
    "/user/queue/matchmaking/status",
    callback,
  );
};
