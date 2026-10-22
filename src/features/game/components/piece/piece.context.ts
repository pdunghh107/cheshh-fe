import type { BoardPosition } from "../../utils/chessRules";

import type { PieceColor, PieceType } from "./Piece";

export interface PieceMoveContext {
  square: string;
  col: number;
  row: number;
  piece: { type: PieceType; color: PieceColor };
  position: BoardPosition;
  lastMove?: [string, string] | null;
}
