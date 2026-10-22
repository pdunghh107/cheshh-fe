import { coordsToSquare } from "@/features/game/utils/translateDirection";

import type { PieceMoveContext } from "../../piece.context";

export const handlePawnCapture = (context: PieceMoveContext): string[] => {
  const { col, row, piece, position } = context;
  const moves: string[] = [];
  const dir = piece.color === "white" ? 1 : -1;

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
