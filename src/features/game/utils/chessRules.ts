import { type PieceColor, type PieceType } from "../components/Piece";

export type BoardPosition = Record<
  string,
  { type: PieceType; color: PieceColor } | undefined
>;

/**
 * Chuyển đổi tên ô (ví dụ 'e4') thành tọa độ số: { col: 5, row: 4 }
 */
export const squareToCoords = (
  square: string,
): { col: number; row: number } => {
  const col = square.charCodeAt(0) - 96; // 'a' -> 1, 'b' -> 2, ..., 'h' -> 8
  const row = parseInt(square[1], 10);
  return { col, row };
};

/**
 * Chuyển đổi tọa độ số về tên ô (ví dụ: { col: 5, row: 4 } -> 'e4')
 */
export const coordsToSquare = (col: number, row: number): string | null => {
  if (col < 1 || col > 8 || row < 1 || row > 8) return null;
  const colLetter = String.fromCharCode(96 + col);
  return `${colLetter}${row}`;
};

/**
 * Tính toán các ô đi hợp lệ cơ bản cho từng loại quân cờ
 */
export const getPossibleMoves = (
  square: string,
  position: BoardPosition,
): string[] => {
  const piece = position[square];
  if (!piece) return [];

  const { col, row } = squareToCoords(square);
  const moves: string[] = [];
  const isWhite = piece.color === "white";

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
      const dir = isWhite ? 1 : -1;
      const startRow = isWhite ? 2 : 7;

      // Đi thẳng 1 ô
      const oneStep = coordsToSquare(col, row + dir);
      if (oneStep && !position[oneStep]) {
        moves.push(oneStep);

        // Đi thẳng 2 ô từ hàng xuất phát
        const twoStep = coordsToSquare(col, row + dir * 2);
        if (row === startRow && twoStep && !position[twoStep]) {
          moves.push(twoStep);
        }
      }

      // Ăn chéo 2 bên
      for (const dCol of [-1, 1]) {
        const diagSq = coordsToSquare(col + dCol, row + dir);
        if (
          diagSq &&
          position[diagSq] &&
          position[diagSq]?.color !== piece.color
        ) {
          moves.push(diagSq);
        }
      }
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
