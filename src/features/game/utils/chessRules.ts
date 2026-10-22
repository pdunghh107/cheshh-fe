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

/**
 * Tìm vị trí ô của quân Vua theo màu
 */
export const getKingSquare = (
  color: PieceColor,
  position: BoardPosition,
): string | null => {
  for (const [sq, p] of Object.entries(position)) {
    if (p && p.type === "k" && p.color === color) {
      return sq;
    }
  }
  return null;
};

/**
 * Kiểm tra xem một ô bất kỳ có đang bị đối phương tấn công (chiếu) hay không
 */
export const isSquareAttacked = (
  targetSquare: string,
  attackerColor: PieceColor,
  position: BoardPosition,
): boolean => {
  const { col: targetCol, row: targetRow } = squareToCoords(targetSquare);

  // 1. Bị Tốt đối phương tấn công
  // Tốt đối phương đứng ở hàng trước (theo hướng đi của nó) và chéo 1 cột
  const pawnDir = attackerColor === "white" ? 1 : -1;
  const pawnAttackingRow = targetRow - pawnDir;
  for (const dCol of [-1, 1]) {
    const pawnSq = coordsToSquare(targetCol + dCol, pawnAttackingRow);
    if (pawnSq) {
      const p = position[pawnSq];
      if (p && p.type === "p" && p.color === attackerColor) return true;
    }
  }

  // 2. Bị Mã đối phương tấn công (8 ô L-shape)
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
    const sq = coordsToSquare(targetCol + dx, targetRow + dy);
    if (sq) {
      const p = position[sq];
      if (p && p.type === "n" && p.color === attackerColor) return true;
    }
  }

  // 3. Bị Vua đối phương áp sát (quanh 1 ô)
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
    const sq = coordsToSquare(targetCol + dx, targetRow + dy);
    if (sq) {
      const p = position[sq];
      if (p && p.type === "k" && p.color === attackerColor) return true;
    }
  }

  // 4. Bị quét theo tia thẳng (Xe hoặc Hậu đối phương)
  const straightDirs: [number, number][] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  for (const [dx, dy] of straightDirs) {
    let step = 1;
    while (true) {
      const sq = coordsToSquare(targetCol + dx * step, targetRow + dy * step);
      if (!sq) break;
      const p = position[sq];
      if (p) {
        if (p.color === attackerColor && (p.type === "r" || p.type === "q")) {
          return true;
        }
        break; // Bị che khuất bởi quân cờ khác
      }
      step++;
    }
  }

  // 5. Bị quét theo tia chéo (Tượng hoặc Hậu đối phương)
  const diagonalDirs: [number, number][] = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  for (const [dx, dy] of diagonalDirs) {
    let step = 1;
    while (true) {
      const sq = coordsToSquare(targetCol + dx * step, targetRow + dy * step);
      if (!sq) break;
      const p = position[sq];
      if (p) {
        if (p.color === attackerColor && (p.type === "b" || p.type === "q")) {
          return true;
        }
        break; // Bị che khuất bởi quân cờ khác
      }
      step++;
    }
  }

  return false;
};

/**
 * Kiểm tra xem Vua của màu `color` có đang bị chiếu hay không
 */
export const isKingInCheck = (
  color: PieceColor,
  position: BoardPosition,
): boolean => {
  const kingSquare = getKingSquare(color, position);
  if (!kingSquare) return false;
  const enemyColor: PieceColor = color === "white" ? "black" : "white";
  return isSquareAttacked(kingSquare, enemyColor, position);
};

/**
 * Mô phỏng nước đi để kiểm tra tính hợp lệ
 */
const simulateMove = (
  position: BoardPosition,
  from: string,
  to: string,
): BoardPosition => {
  const next = { ...position };
  const piece = next[from];
  if (!piece) return next;

  // Xử lý ăn tốt qua đường trong bàn cờ ảo
  if (piece.type === "p" && !next[to] && from[0] !== to[0]) {
    const enPassantVictimSq = `${to[0]}${from[1]}`;
    delete next[enPassantVictimSq];
  }

  delete next[from];
  next[to] = piece;
  return next;
};

/**
 * Tính toán danh sách nước đi hợp lệ tuyệt đối theo luật FIDE
 * (Loại bỏ các nước đi làm Vua của phe mình bị chiếu)
 */
export const getLegalMoves = (
  square: string,
  position: BoardPosition,
  lastMove?: [string, string] | null,
): string[] => {
  const piece = position[square];
  if (!piece) return [];

  const pseudoLegalMoves = getPossibleMoves(square, position, lastMove);

  return pseudoLegalMoves.filter((targetSq) => {
    const simulatedPosition = simulateMove(position, square, targetSq);
    // Sau khi đi nước này, Vua của phe mình KHÔNG được bị chiếu
    return !isKingInCheck(piece.color, simulatedPosition);
  });
};

/**
 * Kiểm tra xem người chơi hiện tại có nước đi hợp lệ nào không
 */
export const hasAnyLegalMoves = (
  color: PieceColor,
  position: BoardPosition,
  lastMove?: [string, string] | null,
): boolean => {
  for (const [sq, piece] of Object.entries(position)) {
    if (piece && piece.color === color) {
      const legalMoves = getLegalMoves(sq, position, lastMove);
      if (legalMoves.length > 0) return true;
    }
  }
  return false;
};
