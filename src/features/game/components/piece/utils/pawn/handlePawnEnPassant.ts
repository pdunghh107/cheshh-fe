import { coordsToSquare } from "@/features/game/utils/translateDirection";

import type { PieceMoveContext } from "../../piece.context";

import { getPawnConfig } from "./pawn.constants";

export const handlePawnEnPassant = (context: PieceMoveContext): string[] => {
  const { col, row, piece, position, lastMove } = context;
  const moves: string[] = [];
  if (!lastMove) return moves;

  const { dir, enPassantRow } = getPawnConfig(piece.color);

  if (row !== enPassantRow) return moves;

  const [lastFrom, lastTo] = lastMove;
  const enemyPiece = position[lastTo];

  if (!enemyPiece || enemyPiece.type != "p" || enemyPiece.color === piece.color)
    return moves;

  const fromRow = parseInt(lastFrom[1], 10);
  const toRow = parseInt(lastTo[1], 10);
  const toCol = lastTo.charCodeAt(0) - 96;

  const isTwoStepMove = Math.abs(toRow - fromRow) == 2;
  const isAdjacentCol = Math.abs(toCol - col) == 1;

  if (isTwoStepMove && isAdjacentCol && toRow == row) {
    const targetSq = coordsToSquare(toCol, row + dir);
    if (targetSq) {
      moves.push(targetSq);
    }
  }

  return moves;
};
