import { coordsToSquare } from "@/features/game/utils/translateDirection";

import type { PieceMoveContext } from "../../piece.context";

import { getPawnConfig } from "./pawn.constants";

export const handlePawnCapture = (context: PieceMoveContext): string[] => {
  const { col, row, piece, position } = context;
  const moves: string[] = [];
  const { dir } = getPawnConfig(piece.color);

  for (const dCol of [-1, 1]) {
    const diagSq = coordsToSquare(col + dCol, row + dir);
    if (diagSq) {
      const targetPiece = position[diagSq];
      if (targetPiece && targetPiece.color !== piece.color) {
        moves.push(diagSq);
      }
    }
  }

  return moves;
};
