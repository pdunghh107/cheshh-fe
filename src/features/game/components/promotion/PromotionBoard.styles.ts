import styled from "styled-components";

import { colors } from "@/commons/colors";

export const StyledPromotionOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
`;

export const StyledPromotionContainer = styled.div<{ $colIndex: number; $isTopRow: boolean }>`
  position: absolute;
  top: ${({ $isTopRow }) => ($isTopRow ? "0" : "auto")};
  bottom: ${({ $isTopRow }) => ($isTopRow ? "auto" : "0")};
  left: calc(${({ $colIndex }) => $colIndex} * 12.5%);
  z-index: 101;
  display: flex;
  flex-direction: column;
  width: 12.5%;
  height: 50%;
  overflow: hidden;
  background: ${colors.neutral.dark};
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7);
`;

export const StyledPromotionOption = styled.button`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease, transform 0.1s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  &:active {
    transform: scale(0.92);
  }
`;
