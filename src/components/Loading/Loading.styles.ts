import styled, { keyframes } from "styled-components";

import { colors } from "@/commons/colors";

import type { StyledSpinnerProps } from "./Loading.types";

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.span<StyledSpinnerProps>`
  display: inline-block;
  flex-shrink: 0;

  width: ${(props) => `${props.$size}px`};
  height: ${(props) => `${props.$size}px`};
  box-sizing: border-box;

  border-width: ${(props) => `${props.$thickness}px`};
  border-style: solid;
  border-color: ${(props) => props.$color || colors.primary.base};
  border-radius: ${(props) =>
    typeof props.$radius === "number" ? `${props.$radius}px` : props.$radius};

  animation: ${spinAnimation} ${(props) => `${props.$speed}s`} linear infinite;
  border-top-color: transparent;
`;
