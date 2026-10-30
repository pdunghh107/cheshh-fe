export interface MakeMoveRequest {
  from: string;
  to: string;
  promotion: string | null;
  expectedPly: number;
}

export interface MoveSuccessResponse {
  roomId: string;
  from: string;
  to: string;
  promotion: string | null;
  fen: string;
  turn: "WHITE" | "BLACK";
  plyCount: number;
  whiteTimeRemainingMs: number;
  blackTimeRemainingMs: number;
  status: "ONGOING" | "WHITE_WON" | "BLACK_WON" | "DRAW";
  timestamp?: string;
}

export interface GameErrorResponse {
  roomId?: string;
  error: string;
  currentFen?: string;
  currentPly?: number;
}

export interface GameRoomState {
  roomId: string;
  whiteUserId: string;
  blackUserId: string;
  fen: string;
  turn: "WHITE" | "BLACK";
  whiteTimeRemainingMs: number;
  blackTimeRemainingMs: number;
  lastMoveTimestamp: number;
  plyCount: number;
  status: "ONGOING" | "WHITE_WON" | "BLACK_WON" | "DRAW";
}

