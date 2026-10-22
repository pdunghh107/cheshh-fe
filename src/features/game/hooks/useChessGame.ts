import { useMemo, useState } from "react";

import { DEFAULT_INITIAL_POSITION } from "../components/board/Board.constants";
import type { PieceColor, PieceType } from "../components/piece/Piece";
import {
  getKingSquare,
  hasAnyLegalMoves,
  isKingInCheck,
} from "../utils/chessRules";

import { useMakeMove } from "./useMakeMove";
import { useResetGame } from "./useResetGame";
import { useSquareClick } from "./useSquareClick";

/**
 * MoveHistoryItem Interface
 * Lưu lại thông tin từng nước đi trong ván đấu
 */
export interface MoveHistoryItem {
  from: string;
  to: string;
  piece: { type: PieceType; color: PieceColor };
  captured?: { type: PieceType; color: PieceColor };
}

export interface PendingPromotion {
  from: string;
  to: string;
  color: PieceColor;
}

/**
 * useChessGame Custom Hook
 *
 * @description Quản lý toàn bộ State và Logic di chuyển quân cờ của ChessHH mà không dùng thư viện ngoài.
 *
 * @example
 * import { useChessGame } from '@/features/game/hooks/useChessGame';
 *
 * const {
 *   position,
 *   selectedSquare,
 *   validMoves,
 *   lastMove,
 *   turn,
 *   handleSquareClick,
 *   resetGame,
 * } = useChessGame();
 *
 * <Board
 *   position={position}
 *   selectedSquare={selectedSquare}
 *   validMoves={validMoves}
 *   lastMove={lastMove}
 *   onSquareClick={handleSquareClick}
 * />
 */

export const useChessGame = () => {
  // 1. Trạng thái vị trí 64 ô cờ
  const [position, setPosition] = useState<
    Record<string, { type: PieceType; color: PieceColor } | undefined>
  >(DEFAULT_INITIAL_POSITION);

  // 2. Lượt đi hiện tại ('white' luôn đi trước)
  const [turn, setTurn] = useState<PieceColor>("white");

  // 3. Ô cờ đang được chọn
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  // 4. Danh sách các ô có thể đi tới của quân cờ đang chọn
  const [validMoves, setValidMoves] = useState<string[]>([]);

  // 5. Nước đi vừa thực hiện gần nhất: [ô_xuất_phát, ô_đích_đến]
  const [lastMove, setLastMove] = useState<[string, string] | null>(null);

  // 6. Lịch sử các nước đi (để hiển thị Notation)
  const [history, setHistory] = useState<MoveHistoryItem[]>([]);

  // 7. Trạng thái phong cấp đang chờ người chơi chọn quân
  const [pendingPromotion, setPendingPromotion] = useState<PendingPromotion | null>(null);

  const { makeMove } = useMakeMove({
    position,
    setPosition,
    setTurn,
    setLastMove,
    setHistory,
    setSelectedSquare,
    setValidMoves,
  });

  const { handleSquareClick } = useSquareClick({
    position,
    turn,
    selectedSquare,
    validMoves,
    lastMove,
    setSelectedSquare,
    setValidMoves,
    makeMove,
    setPendingPromotion,
  });

  const { resetGame } = useResetGame({
    setPosition,
    setTurn,
    setSelectedSquare,
    setValidMoves,
    setLastMove,
    setHistory,
  });

  // Kiểm tra trạng thái Chiếu (Check), Chiếu hết (Checkmate), Cờ bí (Stalemate)
  const isCheck = useMemo(() => isKingInCheck(turn, position), [turn, position]);

  const checkSquare = useMemo(() => {
    return isCheck ? getKingSquare(turn, position) : null;
  }, [isCheck, turn, position]);

  const hasMoves = useMemo(
    () => hasAnyLegalMoves(turn, position, lastMove),
    [turn, position, lastMove],
  );

  const isCheckmate = isCheck && !hasMoves;
  const isStalemate = !isCheck && !hasMoves;

  return {
    position,
    turn,
    selectedSquare,
    validMoves,
    lastMove,
    checkSquare,
    isCheck,
    isCheckmate,
    isStalemate,
    history,
    pendingPromotion,
    setPendingPromotion,
    handleSquareClick,
    makeMove,
    resetGame,
  };
};
