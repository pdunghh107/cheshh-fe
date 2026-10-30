import { apiClient } from "@/services/api";
import { wsService } from "@/services/websocket";

import type {
  GameErrorResponse,
  GameRoomState,
  MakeMoveRequest,
  MoveSuccessResponse,
} from "../types/gameRealtime.types";

/**
 * 1. REST API: Lấy trạng thái phòng đấu khi Reconnect hoặc F5 trang
 * Endpoint: GET /api/v1/chess/game/{roomId}
 */
export const getGameRoomStateApi = async (
  roomId: string,
): Promise<GameRoomState> => {
  const response = await apiClient.get<GameRoomState>(
    `/chess/game/${roomId}`,
  );
  return response.data;
};

/**
 * 2. WebSocket STOMP: Gửi nước đi lên server
 * Destination: /app/game/{roomId}/move
 */
export const sendMoveWs = (
  roomId: string,
  request: MakeMoveRequest,
): void => {
  wsService.publish(`/app/game/${roomId}/move`, request);
};

/**
 * 3. WebSocket STOMP: Subscribe nhận nước đi thành công trong phòng
 * Destination: /topic/game/{roomId}/move
 */
export const subscribeGameMove = (
  roomId: string,
  callback: (response: MoveSuccessResponse) => void,
): (() => void) => {
  return wsService.subscribe<MoveSuccessResponse>(
    `/topic/game/${roomId}/move`,
    callback,
  );
};

/**
 * 4. WebSocket STOMP: Subscribe nhận thông báo kết thúc trận (Hết giờ / Đầu hàng / Checkmate)
 * Destination: /topic/game/{roomId}/game-over
 */
export const subscribeGameOver = (
  roomId: string,
  callback: (message: string) => void,
): (() => void) => {
  return wsService.subscribe<string>(
    `/topic/game/${roomId}/game-over`,
    callback,
  );
};

/**
 * 5. WebSocket STOMP: Subscribe nhận lỗi nước đi cá nhân của kỳ thủ
 * Destination: /user/queue/game/errors
 */
export const subscribeGameErrors = (
  callback: (error: GameErrorResponse) => void,
): (() => void) => {
  return wsService.subscribe<GameErrorResponse>(
    "/user/queue/game/errors",
    callback,
  );
};

