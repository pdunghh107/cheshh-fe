import { type Dispatch, type SetStateAction, useCallback } from "react";

import type { PieceColor, PieceType } from "../components/piece/Piece";
import { isPawnPromote } from "../components/piece/utils/pawn/pawn.constants";

import type { MoveHistoryItem } from "./useChessGame";

export type BoardPosition = Record<
  string,
  { type: PieceType; color: PieceColor } | undefined
>;

interface UseMakeMoveParams {
  position: BoardPosition;
  setPosition: Dispatch<SetStateAction<BoardPosition>>;
  setTurn: Dispatch<SetStateAction<PieceColor>>;
  setLastMove: Dispatch<SetStateAction<[string, string] | null>>;
  setHistory: Dispatch<SetStateAction<MoveHistoryItem[]>>;
  setSelectedSquare: Dispatch<SetStateAction<string | null>>;
  setValidMoves: Dispatch<SetStateAction<string[]>>;
}

export const useMakeMove = ({
  position,
  setPosition,
  setTurn,
  setLastMove,
  setHistory,
  setSelectedSquare,
  setValidMoves,
}: UseMakeMoveParams) => {
  const makeMove = useCallback(
    (from: string, to: string, promotionPieceType?: PieceType) => {
      const piece = position[from];
      if (!piece) return;

      let captured = position[to];
      let finalPiece = piece;

      // Xử lý ăn Tốt qua đường (En Passant): Tốt đi chéo nhưng ô đích trống
      let enPassantCapturedSquare: string | null = null;
      if (piece.type === "p" && !captured && from[0] !== to[0]) {
        enPassantCapturedSquare = `${to[0]}${from[1]}`;
        captured = position[enPassantCapturedSquare];
      }

      if (piece.type === "p" && isPawnPromote(to, piece.color)) {
        finalPiece = { type: promotionPieceType, color: piece.color };
      }

      // Cập nhật vị trí mới trên bàn cờ
      setPosition((prev) => {
        const next = { ...prev };
        delete next[from]; // Xóa quân ở ô cũ
        if (enPassantCapturedSquare) {
          delete next[enPassantCapturedSquare]; // Xóa quân Tốt bị ăn qua đường
        }
        next[to] = finalPiece; // Đặt quân vào ô mới
        return next;
      });

      // Cập nhật highlight nước vừa đi
      setLastMove([from, to]);

      // Ghi lại lịch sử
      setHistory((prev) => [...prev, { from, to, piece, captured }]);

      // Đổi lượt sang đối phương
      setTurn((prev) => (prev === "white" ? "black" : "white"));

      // Reset vùng chọn
      setSelectedSquare(null);
      setValidMoves([]);
    },
    [
      position,
      setPosition,
      setLastMove,
      setHistory,
      setTurn,
      setSelectedSquare,
      setValidMoves,
    ],
  );

  return {
    makeMove,
  };
};
