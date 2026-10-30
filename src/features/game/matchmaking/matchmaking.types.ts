export type MatchmakingStatus =
  | "IDLE"
  | "QUEUED"
  | "MATCHED"
  | "CANCELLED"
  | "ERROR";

export interface MatchmakingPlayerInfo {
  userId: string;
  elo: number;
}

/**
 * Payload WebSocket STOMP backend gửi về khi ghép trận thành công
 * Destination: /user/queue/matchmaking
 */
export interface MatchFoundResponse {
  roomId: string;
  whitePlayer: MatchmakingPlayerInfo;
  blackPlayer: MatchmakingPlayerInfo;
  matchedAt: string;
}

/**
 * Response trả về khi gọi REST API POST /api/v1/chess/matchmaking/join hoặc cancel
 */
export interface MatchmakingStatusResponse {
  status: MatchmakingStatus;
  message?: string;
}
