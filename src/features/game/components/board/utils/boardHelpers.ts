export const isLightSquare = (col: string, row: number): boolean => {
  const fileNum = col.charCodeAt(0) - 96; // a=1, b=2...
  return (fileNum + row) % 2 !== 0;
};
