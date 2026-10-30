import React from "react";
import styled from "styled-components";

/**
 * Piece Component
 *
 * @description Hiển thị quân cờ vua với ký hiệu Unicode hoặc SVG, hỗ trợ màu sắc và hiệu ứng đổ bóng.
 *
 * @example
 * // Usage cơ bản:
 * import { Piece } from '@/components/main/Piece';
 *
 * <Piece type="k" color="white" />
 * <Piece type="q" color="black" />
 */

export type PieceType = "p" | "n" | "b" | "r" | "q" | "k";
export type PieceColor = "white" | "black";

export interface PieceProps {
  type: PieceType;
  color: PieceColor;
  className?: string;
}

const PIECE_SYMBOLS: Record<PieceColor, Record<PieceType, string>> = {
  white: {
    k: "♔",
    q: "♕",
    r: "♖",
    b: "♗",
    n: "♘",
    p: "♙",
  },
  black: {
    k: "♚",
    q: "♛",
    r: "♜",
    b: "♝",
    n: "♞",
    p: "♟",
  },
};

export const Piece: React.FC<PieceProps> = ({ type, color, className }) => {
  const symbol = PIECE_SYMBOLS[color]?.[type] || "";

  return (
    <StyledPieceSymbol $isBlack={color === "black"} className={className}>
      {symbol}
    </StyledPieceSymbol>
  );
};

export default Piece;

const StyledPieceSymbol = styled.span<{ $isBlack: boolean }>`
  font-size: min(42px, 6vw);
  line-height: 1;
  user-select: none;
  color: ${(props) => (props.$isBlack ? "#181a1b" : "#ffffff")};
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.45));
  transition: transform 0.15s ease;

  &:hover {
    transform: scale(1.08);
  }

  @media (max-width: 600px) {
    font-size: 26px;
  }
`;
