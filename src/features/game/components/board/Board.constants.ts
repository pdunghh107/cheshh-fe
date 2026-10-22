import { type PieceColor, type PieceType } from "../piece/Piece";

export const DEFAULT_INITIAL_POSITION: Record<
  string,
  { type: PieceType; color: PieceColor }
> = {
  // Black pieces
  a8: { type: "r", color: "black" },
  b8: { type: "n", color: "black" },
  c8: { type: "b", color: "black" },
  d8: { type: "q", color: "black" },
  e8: { type: "k", color: "black" },
  f8: { type: "b", color: "black" },
  g8: { type: "n", color: "black" },
  h8: { type: "r", color: "black" },
  a7: { type: "p", color: "black" },
  b7: { type: "p", color: "black" },
  c7: { type: "p", color: "black" },
  d7: { type: "p", color: "black" },
  e7: { type: "p", color: "black" },
  f7: { type: "p", color: "black" },
  g7: { type: "p", color: "black" },
  h7: { type: "p", color: "black" },

  // White pieces
  a2: { type: "p", color: "white" },
  b2: { type: "p", color: "white" },
  c2: { type: "p", color: "white" },
  d2: { type: "p", color: "white" },
  e2: { type: "p", color: "white" },
  f2: { type: "p", color: "white" },
  g2: { type: "p", color: "white" },
  h2: { type: "p", color: "white" },
  a1: { type: "r", color: "white" },
  b1: { type: "n", color: "white" },
  c1: { type: "b", color: "white" },
  d1: { type: "q", color: "white" },
  e1: { type: "k", color: "white" },
  f1: { type: "b", color: "white" },
  g1: { type: "n", color: "white" },
  h1: { type: "r", color: "white" },
};
