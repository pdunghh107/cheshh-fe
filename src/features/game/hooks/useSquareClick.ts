import { useCallback } from "react";

import type { PieceColor, PieceType } from "../components/piece/Piece";
import { isPawnPromote } from "../components/piece/utils/pawn/pawn.constants";
import { getLegalMoves } from "../utils/chessRules";

import type { PendingPromotion } from "./useChessGame";

interface UseSquareClickParams {
  position: Record<string, { type: PieceType; color: PieceColor } | undefined>;
  turn: PieceColor;
  selectedSquare: string | null;
  validMoves: string[];
  lastMove?: [string, string] | null;
  setSelectedSquare: (square: string | null) => void;
  setValidMoves: (moves: string[]) => void;
  makeMove: (from: string, to: string, promotionPieceType?: PieceType) => void;
  setPendingPromotion?: (pending: PendingPromotion | null) => void;
}

export const useSquareClick = ({
  position,
  turn,
  selectedSquare,
  validMoves,
  lastMove,
  setSelectedSquare,
  setValidMoves,
  makeMove,
  setPendingPromotion,
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
      if (validMoves.includes(square) && selectedSquare) {
        const piece = position[selectedSquare];

        // Nếu là quân Tốt đi tới hàng cuối cùng -> Kích hoạt chọn phong cấp (Promotion)
        if (piece?.type === "p" && isPawnPromote(square, piece.color)) {
          setPendingPromotion?.({
            from: selectedSquare,
            to: square,
            color: piece.color,
          });
          setSelectedSquare(null);
          setValidMoves([]);
          return true;
        }

        makeMove(selectedSquare, square);
        return true;
      }
      return false;
    },
    [
      validMoves,
      selectedSquare,
      position,
      setPendingPromotion,
      setSelectedSquare,
      setValidMoves,
      makeMove,
    ],
  );

  const handleCaseChooseAnotherPiece = useCallback(
    (square: string) => {
      const clickedPiece = position[square];

      if (clickedPiece && clickedPiece.color === turn) {
        setSelectedSquare(square);
        const moves = getLegalMoves(square, position, lastMove);
        setValidMoves(moves);
        return true;
      }

      return false;
    },
    [position, setSelectedSquare, setValidMoves, turn, lastMove],
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
        const moves = getLegalMoves(square, position, lastMove);
        setValidMoves(moves);
      }
    },
    [position, setSelectedSquare, setValidMoves, turn, lastMove],
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
