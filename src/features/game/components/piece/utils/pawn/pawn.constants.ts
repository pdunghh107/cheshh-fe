import type { PieceColor, PieceType } from "../../Piece";

export const PROMOTION_PIECE_TYPE: PieceType[] = ["q", "r", "b", "n"];

export interface PawnConfig {
  isWhite: boolean;
  dir: 1 | -1;
  startRow: number; // 2 (trắng) hoặc 7 (đen)
  enPassantRow: number; // 5 (trắng) hoặc 4 (đen)
  promotionRow: number; // 8 (trắng) hoặc 1 (đen)
}

export const getPawnConfig = (color: PieceColor): PawnConfig => {
  const isWhite = color === "white";
  return {
    isWhite,
    dir: isWhite ? 1 : -1,
    startRow: isWhite ? 2 : 7,
    enPassantRow: isWhite ? 5 : 4,
    promotionRow: isWhite ? 8 : 1,
  };
};

export const isPawnPromote = (targetSq: string, pieceColor: PieceColor) => {
  const targetRow = parseInt(targetSq[1], 10);
  const { promotionRow } = getPawnConfig(pieceColor);
  return targetRow === promotionRow;
};
