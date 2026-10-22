import type { PieceColor, PieceType } from "../../Piece";

export const PROMOTION_PIECE_TYPE: PieceType[] = ["q", "r", "b", "n"];

export const isPawnPromote = (targetSq: string, pieceColor: PieceColor) => {
  const targetRow = parseInt(targetSq[1], 10);
  const isWhite = pieceColor === "white";

  return isWhite ? targetRow === 8 : targetRow === 1;
};
