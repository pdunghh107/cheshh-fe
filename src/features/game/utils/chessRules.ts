import { type PieceColor, type PieceType } from "../components/piece/Piece";
import type { PieceMoveContext } from "../components/piece/piece.context";
import { getPawnMoves } from "../components/piece/utils/pawn/getPawnMoves";

import { coordsToSquare, squareToCoords } from "./translateDirection";

export type BoardPosition = Record<
  string,
  { type: PieceType; color: PieceColor } | undefined
>;

/**
 * Tính toán các ô đi hợp lệ cơ bản cho từng loại quân cờ
 */
export const getPossibleMoves = (
  square: string,
  position: BoardPosition,
  lastMove?: [string, string] | null,
): string[] => {
  const piece = position[square];
  if (!piece) return [];

  const { col, row } = squareToCoords(square);
  const moves: string[] = [];

  // Helper kiểm tra 1 ô đích
  // Trả về: 'continue' (ô trống, có thể đi tiếp), 'stop' (bắt quân địch rồi dừng), 'blocked' (bị chặn bởi quân mình hoặc ngoài bàn cờ)
  const checkSquare = (
    c: number,
    r: number,
  ): "continue" | "stop" | "blocked" => {
    const targetSq = coordsToSquare(c, r);
    if (!targetSq) return "blocked";

    const targetPiece = position[targetSq];
    if (!targetPiece) {
      moves.push(targetSq);
      return "continue";
    }
    if (targetPiece.color !== piece.color) {
      moves.push(targetSq); // Bắt quân đối phương
      return "stop";
    }
    return "blocked"; // Bị chặn bởi quân của chính mình
  };

  // Helper quét theo các hướng thẳng/chéo (dùng cho Xe, Tượng, Hậu)
  const scanDirections = (directions: [number, number][]) => {
    for (const [dx, dy] of directions) {
      let step = 1;
      while (true) {
        const status = checkSquare(col + dx * step, row + dy * step);
        if (status !== "continue") break;
        step++;
      }
    }
  };

  switch (piece.type) {
    // 1. Tốt (Pawn)
    case "p": {
      const context: PieceMoveContext = {
        square,
        col,
        row,
        piece,
        position,
        lastMove,
      };
      moves.push(...getPawnMoves(context));
      break;
    }

    // 2. Mã (Knight) - đi hình chữ L (nhảy qua quân khác)
    case "n": {
      const knightOffsets = [
        [1, 2],
        [2, 1],
        [-1, 2],
        [-2, 1],
        [1, -2],
        [2, -1],
        [-1, -2],
        [-2, -1],
      ];
      for (const [dx, dy] of knightOffsets) {
        checkSquare(col + dx, row + dy);
      }
      break;
    }

    // 3. Tượng (Bishop) - đi các đường chéo
    case "b": {
      scanDirections([
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ]);
      break;
    }

    // 4. Xe (Rook) - đi các đường thẳng ngang dọc
    case "r": {
      scanDirections([
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]);
      break;
    }

    // 5. Hậu (Queen) - kết hợp cả Xe và Tượng (8 hướng)
    case "q": {
      scanDirections([
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ]);
      break;
    }

    // 6. Vua (King) - đi 1 ô quanh mình (8 hướng)
    case "k": {
      const kingOffsets = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ];
      for (const [dx, dy] of kingOffsets) {
        checkSquare(col + dx, row + dy);
      }
      break;
    }
  }

  return moves;
};
