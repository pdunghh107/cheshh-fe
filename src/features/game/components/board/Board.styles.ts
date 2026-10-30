import styled from "styled-components";

import { colors } from "@/commons/colors";
import { fontWeights } from "@/commons/fonts";

import { type CoordThemeProps, type SquareThemeProps } from "./Board.types";

export const StyledBoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  width: min(calc(100vh - 200px), calc(100vw - 680px), 640px);
  min-width: 320px;
  height: min(calc(100vh - 200px), calc(100vw - 680px), 640px);
  min-height: 320px;
  overflow: hidden;
  border: 4px solid ${colors.neutral.dark};
  border-radius: 8px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
  aspect-ratio: 1 / 1;

  @media (max-width: 960px) {
    width: min(90vw, 520px);
    height: min(90vw, 520px);
  }
`;

export const StyledSquare = styled.div<SquareThemeProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  background-color: ${(props) => {
    if (props.$isCheck) return colors.danger.base;
    if (props.$isSelected)
      return props.$isLight ? colors.boardLight.dark : colors.boardDark.dark;
    if (props.$isLastMove) return props.$isLight ? "#f7f794" : "#baca44";
    return props.$isLight ? colors.boardLight.base : colors.boardDark.base;
  }};
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${(props) => {
      if (props.$isCheck) return colors.danger.light;
      if (props.$isSelected)
        return props.$isLight
          ? colors.boardLight.darkest
          : colors.boardDark.darkest;
      return props.$isLight ? colors.boardLight.light : colors.boardDark.light;
    }};
  }
`;

export const StyledRankCoord = styled.span<CoordThemeProps>`
  position: absolute;
  top: 3px;
  left: 4px;
  font-size: 11px;
  font-weight: ${fontWeights.bold};
  color: ${(props) =>
    props.$isLight ? colors.boardDark.base : colors.boardLight.base};
  pointer-events: none;
`;

export const StyledFileCoord = styled.span<CoordThemeProps>`
  position: absolute;
  right: 4px;
  bottom: 2px;
  font-size: 11px;
  font-weight: ${fontWeights.bold};
  color: ${(props) =>
    props.$isLight ? colors.boardDark.base : colors.boardLight.base};
  pointer-events: none;
`;

export const StyledValidMoveDot = styled.div`
  width: 18px;
  height: 18px;
  background-color: rgba(0, 0, 0, 0.22);
  border-radius: 50%;
  pointer-events: none;
`;

export const StyledCaptureRing = styled.div`
  position: absolute;
  width: 52px;
  height: 52px;
  border: 4px solid rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  pointer-events: none;

  @media (max-width: 600px) {
    width: 34px;
    height: 34px;
    border-width: 3px;
  }
`;
