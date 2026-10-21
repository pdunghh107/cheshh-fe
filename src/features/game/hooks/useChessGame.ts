import { useCallback, useState } from "react";

import { DEFAULT_INITIAL_POSITION } from "../components/board/Board.constants";
import { type PieceColor, type PieceType } from "../components/Piece";
import { getPossibleMoves } from "../utils/chessRules";

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

  /**
   * Hàm thực hiện nước đi (Make a move)
   */
  const makeMove = useCallback(
    (from: string, to: string) => {
      const piece = position[from];
      if (!piece) return;

      const captured = position[to];

      // Cập nhật vị trí mới trên bàn cờ
      setPosition((prev) => {
        const next = { ...prev };
        delete next[from]; // Xóa quân ở ô cũ
        next[to] = piece; // Đặt quân vào ô mới
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
    [position],
  );

  /**
   * Xử lý sự kiện khi người chơi click vào một ô cờ
   */
  const handleSquareClick = useCallback(
    (square: string) => {
      const clickedPiece = position[square];

      // KỊCH BẢN 1: Nếu người chơi đang ĐÃ CHỌN 1 ô cờ trước đó
      if (selectedSquare) {
        // A. Click lại đúng ô đó -> Bỏ chọn
        if (selectedSquare === square) {
          setSelectedSquare(null);
          setValidMoves([]);
          return;
        }

        // B. Click vào 1 ô nằm trong danh sách nước đi hợp lệ -> DI CHUYỂN QUÂN
        if (validMoves.includes(square)) {
          makeMove(selectedSquare, square);
          return;
        }

        // C. Click vào 1 quân khác của chính mình -> Đổi lựa chọn sang quân này
        if (clickedPiece && clickedPiece.color === turn) {
          setSelectedSquare(square);
          const moves = getPossibleMoves(square, position);
          setValidMoves(moves);
          return;
        }

        // D. Click vào ô không hợp lệ khác -> Hủy chọn
        setSelectedSquare(null);
        setValidMoves([]);
        return;
      }

      // KỊCH BẢN 2: Chưa chọn ô nào -> Chỉ cho phép chọn nếu là quân cờ của phe ĐẾN LƯỢT ĐI
      if (clickedPiece && clickedPiece.color === turn) {
        setSelectedSquare(square);
        const moves = getPossibleMoves(square, position);
        setValidMoves(moves);
      }
    },
    [selectedSquare, validMoves, position, turn, makeMove],
  );

  /**
   * Khởi động lại ván cờ mới
   */
  const resetGame = useCallback(() => {
    setPosition(DEFAULT_INITIAL_POSITION);
    setTurn("white");
    setSelectedSquare(null);
    setValidMoves([]);
    setLastMove(null);
    setHistory([]);
  }, []);

  return {
    position,
    turn,
    selectedSquare,
    validMoves,
    lastMove,
    history,
    handleSquareClick,
    makeMove,
    resetGame,
  };
};
