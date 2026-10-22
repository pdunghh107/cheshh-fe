import { useCallback } from "react";

import type { PieceColor, PieceType } from "../components/piece/Piece";
import { getPossibleMoves } from "../utils/chessRules";

interface UseSquareClickParams {
  position: Record<string, { type: PieceType; color: PieceColor } | undefined>;
  turn: PieceColor;
  selectedSquare: string | null;
  validMoves: string[];
  setSelectedSquare: (square: string | null) => void;
  setValidMoves: (moves: string[]) => void;
  makeMove: (from: string, to: string) => void;
}

export const useSquareClick = ({
  position,
  turn,
  selectedSquare,
  validMoves,
  setSelectedSquare,
  setValidMoves,
  makeMove,
}: UseSquareClickParams) => {
  const handleCaseClickSameSquare = useCallback(
    (square: string) => {
      if (selectedSquare === square) {
        setSelectedSquare(null);
        setValidMoves([]);
        return true;
      }
      return false;
    },
    [selectedSquare, setSelectedSquare, setValidMoves],
  );

  const handleCaseChooseValidMove = useCallback(
    (square: string) => {
      if (validMoves.includes(square)) {
        makeMove(selectedSquare!, square);
        return true;
      }
      return false;
    },
    [validMoves, makeMove, selectedSquare],
  );

  const handleCaseChooseAnotherPiece = useCallback(
    (square: string) => {
      const clickedPiece = position[square];

      if (clickedPiece && clickedPiece.color === turn) {
        setSelectedSquare(square);
        const moves = getPossibleMoves(square, position);
        setValidMoves(moves);
        return true;
      }

      return false;
    },
    [position, setSelectedSquare, setValidMoves, turn],
  );

  const handleCaseChooseInvalidSquare = useCallback(() => {
    setSelectedSquare(null);
    setValidMoves([]);
  }, [setSelectedSquare, setValidMoves]);

  const handleCaseAlreadyChooseSquare = useCallback(
    (square: string) => {
      if (selectedSquare) {
        if (handleCaseClickSameSquare(square)) return;
        if (handleCaseChooseValidMove(square)) return;
        if (handleCaseChooseAnotherPiece(square)) return;
        handleCaseChooseInvalidSquare();
        return true;
      }
      return false;
    },
    [
      handleCaseChooseAnotherPiece,
      handleCaseChooseInvalidSquare,
      handleCaseChooseValidMove,
      handleCaseClickSameSquare,
      selectedSquare,
    ],
  );

  const handleCaseNotChooseSquare = useCallback(
    (square: string) => {
      const clickedPiece = position[square];

      if (clickedPiece && clickedPiece.color === turn) {
        setSelectedSquare(square);
        const moves = getPossibleMoves(square, position);
        setValidMoves(moves);
      }
    },
    [position, setSelectedSquare, setValidMoves, turn],
  );

  const handleSquareClick = useCallback(
    (square: string) => {
      if (handleCaseAlreadyChooseSquare(square)) return;
      handleCaseNotChooseSquare(square);
    },
    [handleCaseAlreadyChooseSquare, handleCaseNotChooseSquare],
  );

  return {
    handleSquareClick,
  };
};
