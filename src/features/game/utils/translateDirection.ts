export const squareToCoords = (
  square: string,
): { col: number; row: number } => {
  const col = square.charCodeAt(0) - 96;
  const row = parseInt(square[1], 10);
  return { col, row };
};

export const coordsToSquare = (col: number, row: number): string | null => {
  if (col < 1 || col > 8 || row < 1 || row > 8) return null;
  const colLetter = String.fromCharCode(96 + col);
  return `${colLetter}${row}`;
};
