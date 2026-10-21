import { type PieceColor, type PieceType } from "../Piece";

export interface BoardProps {
  orientation?: "white" | "black";
  selectedSquare?: string | null;
  validMoves?: string[];
  lastMove?: [string, string] | null;
  checkSquare?: string | null;
  onSquareClick?: (square: string) => void;
  position?: Record<string, { type: PieceType; color: PieceColor } | undefined>;
}

export type SquareThemeProps = {
  $isLight: boolean;
  $isSelected?: boolean;
  $isLastMove?: boolean;
  $isCheck?: boolean;
};

export type CoordThemeProps = {
  $isLight: boolean;
};
