import { useCallback } from "react";

import { DEFAULT_INITIAL_POSITION } from "../components/board/Board.constants";
import type { PieceColor, PieceType } from "../components/piece/Piece";

import type { MoveHistoryItem } from "./useChessGame";

interface UseResetGameParams {
  setPosition: (
    position: Record<
      string,
      { type: PieceType; color: PieceColor } | undefined
    >,
  ) => void;
  setTurn: (turn: PieceColor) => void;
  setSelectedSquare: (square: string | null) => void;
  setValidMoves: (moves: string[]) => void;
  setLastMove: (lastMove: [string, string] | null) => void;
  setHistory: (history: MoveHistoryItem[]) => void;
}

export const useResetGame = ({
  setPosition,
  setTurn,
  setSelectedSquare,
  setValidMoves,
  setLastMove,
  setHistory,
}: UseResetGameParams) => {
  const resetGame = useCallback(() => {
    setPosition(DEFAULT_INITIAL_POSITION);
    setTurn("white");
    setSelectedSquare(null);
    setValidMoves([]);
    setLastMove(null);
    setHistory([]);
  }, [
    setHistory,
    setLastMove,
    setPosition,
    setSelectedSquare,
    setTurn,
    setValidMoves,
  ]);

  return {
    resetGame,
  };
};
