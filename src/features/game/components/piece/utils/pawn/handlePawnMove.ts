import { coordsToSquare } from "../../../../utils/translateDirection";
import type { PieceMoveContext } from "../../piece.context";

const goOneStep = (
  col: number,
  row: number,
  dir: number,
  position: PieceMoveContext["position"],
): string | null => {
  const oneStep = coordsToSquare(col, row + dir);

  if (oneStep && !position[oneStep]) return oneStep;

  return null;
};

const goTwoStep = (
  col: number,
  row: number,
  dir: number,
  position: PieceMoveContext["position"],
  startRow: number,
  hasOneStep: boolean,
): string | null => {
  if (!hasOneStep || row !== startRow) return null;

  const twoStep = coordsToSquare(col, row + dir * 2);

  if (twoStep && !position[twoStep]) return twoStep;

  return null;
};

export const handlePawnMove = (context: PieceMoveContext): string[] => {
  const { col, row, piece, position } = context;
  const moves: string[] = [];

  const isWhite = piece.color === "white";
  const dir = isWhite ? 1 : -1;
  const startRow = isWhite ? 2 : 7;

  const oneStep = goOneStep(col, row, dir, position);
  if (oneStep) moves.push(oneStep);

  const twoStep = goTwoStep(col, row, dir, position, startRow, true);
  if (twoStep) moves.push(twoStep);

  return moves;
};
