import React from "react";

import { Piece } from "../piece/Piece";

import { isLightSquare } from "./utils/boardHelpers";
import { DEFAULT_INITIAL_POSITION } from "./Board.constants";
import {
  StyledBoardContainer,
  StyledCaptureRing,
  StyledFileCoord,
  StyledRankCoord,
  StyledSquare,
  StyledValidMoveDot,
} from "./Board.styles";
import { type BoardProps } from "./Board.types";

export const Board: React.FC<BoardProps> = ({
  orientation = "white",
  selectedSquare = null,
  validMoves = [],
  lastMove = null,
  checkSquare = null,
  onSquareClick,
  position = DEFAULT_INITIAL_POSITION,
}) => {
  const rows =
    orientation === "white"
      ? [8, 7, 6, 5, 4, 3, 2, 1]
      : [1, 2, 3, 4, 5, 6, 7, 8];
  const cols =
    orientation === "white"
      ? ["a", "b", "c", "d", "e", "f", "g", "h"]
      : ["h", "g", "f", "e", "d", "c", "b", "a"];

  return (
    <StyledBoardContainer>
      {rows.map((row, rIdx) =>
        cols.map((col, cIdx) => {
          const square = `${col}${row}`;
          const isLight = isLightSquare(col, row);

          const isSelected = selectedSquare === square;
          const isValidMove = validMoves.includes(square);
          const isLastMove = lastMove?.includes(square) ?? false;
          const isCheck = checkSquare === square;
          const piece = position[square];

          return (
            <StyledSquare
              key={square}
              $isLight={isLight}
              $isSelected={isSelected}
              $isLastMove={isLastMove}
              $isCheck={isCheck}
              onClick={() => onSquareClick?.(square)}
              title={square}
            >
              {cIdx === 0 && (
                <StyledRankCoord $isLight={isLight}>{row}</StyledRankCoord>
              )}

              {rIdx === 7 && (
                <StyledFileCoord $isLight={isLight}>{col}</StyledFileCoord>
              )}

              {piece && <Piece type={piece.type} color={piece.color} />}

              {isValidMove && !piece && <StyledValidMoveDot />}
              {isValidMove && piece && <StyledCaptureRing />}
            </StyledSquare>
          );
        }),
      )}
    </StyledBoardContainer>
  );
};

export default Board;
