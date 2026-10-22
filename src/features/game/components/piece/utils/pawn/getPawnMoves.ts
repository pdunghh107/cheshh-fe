import type { PieceMoveContext } from "../../piece.context";

import { handlePawnCapture } from "./handlePawnCapture";
import { handlePawnEnPassant } from "./handlePawnEnPassant";
import { handlePawnMove } from "./handlePawnMove";

export const getPawnMoves = (context: PieceMoveContext): string[] => {
  return [
    ...handlePawnMove(context),
    ...handlePawnCapture(context),
    ...handlePawnEnPassant(context),
  ];
};
