export type MatchmakingStatus =
  | "IDLE"
  | "QUEUED"
  | "MATCHED"
  | "CANCELLED"
  | "ERROR";

export interface OpponentInfo {
  id: string;
  username: string;
  rating: number;
  avatarUrl?: string | null;
}

export interface MatchmakingStatusResponse {
  status: MatchmakingStatus;
  message?: string;
  gameId?: string;
  opponent?: OpponentInfo;
  color?: "WHITE" | "BLACK";
}
