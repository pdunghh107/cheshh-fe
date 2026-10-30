import type { PieceColor, PieceType } from "../components/piece/Piece";
import type { BoardPosition } from "../hooks/useMakeMove";

/**
 * Chuyển chuỗi FEN (Forsyth-Edwards Notation) thành đối tượng BoardPosition của FE
 * Ví dụ: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
 */
export const parseFenToPosition = (fen: string): BoardPosition => {
  const position: BoardPosition = {};
  if (!fen) return position;

  const [piecePlacement] = fen.trim().split(" ");
  const rows = piecePlacement.split("/");

  const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

  rows.forEach((rowStr, rowIdx) => {
    const rank = 8 - rowIdx; // Hàng từ 8 xuống 1
    let colIdx = 0;

    for (const char of rowStr) {
      if (char >= "1" && char <= "8") {
        colIdx += parseInt(char, 10);
      } else {
        const file = cols[colIdx];
        const square = `${file}${rank}`;
        const isUpper = char === char.toUpperCase();
        const color: PieceColor = isUpper ? "white" : "black";
        const type = char.toLowerCase() as PieceType;

        position[square] = { type, color };
        colIdx++;
      }
    }
  });

  return position;
};

