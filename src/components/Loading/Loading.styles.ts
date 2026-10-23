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

export const StyledSpinner = styled.span<StyledSpinnerProps>`
  display: inline-block;
  flex-shrink: 0;

  /* Kích thước đường kính */
  width: ${(props) => `${props.$size}px`};
  height: ${(props) => `${props.$size}px`};
  box-sizing: border-box;

  /* Khuyết 1/4 (3 cạnh có màu, 1 cạnh trong suốt) với độ dày stroke chuẩn 4px */
  border-width: ${(props) => `${props.$thickness}px`};
  border-style: solid;
  border-color: ${(props) => props.$color || colors.primary.base};
  border-radius: ${(props) =>
    typeof props.$radius === "number" ? `${props.$radius}px` : props.$radius};

  animation: ${spinAnimation} ${(props) => `${props.$speed}s`} linear infinite;
  border-top-color: transparent; /* Khuyết 1/4 hình tròn */
`;

export const StyledLoadingWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
