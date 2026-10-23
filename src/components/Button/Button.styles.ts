import styled, { css, keyframes } from "styled-components";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";

import type {
  ButtonSize,
  ButtonVariant,
  StyledButtonProps,
} from "./Button.types";

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const getVariantStyles = ($variant: ButtonVariant) => {
  switch ($variant) {
    case "primary":
      return css`
        background-color: ${colors.primary.base};
        color: #ffffff;
        border: 1px solid transparent;

        &:hover:not(:disabled) {
          background-color: ${colors.primary.dark};
        }

        &:active:not(:disabled) {
          background-color: ${colors.primary.darkest};
        }
      `;

    case "secondary":
      return css`
        background-color: ${colors.secondary.base};
        color: #ffffff;
        border: 1px solid transparent;

        &:hover:not(:disabled) {
          background-color: ${colors.secondary.dark};
        }

        &:active:not(:disabled) {
          background-color: ${colors.secondary.darkest};
        }
      `;

    case "danger":
      return css`
        background-color: ${colors.danger.base};
        color: #ffffff;
        border: 1px solid transparent;

        &:hover:not(:disabled) {
          background-color: ${colors.danger.dark};
        }

        &:active:not(:disabled) {
          background-color: ${colors.danger.darkest};
        }
      `;

    case "outline":
      return css`
        background-color: transparent;
        color: ${colors.neutral.darkest};
        border: 1px solid ${colors.neutral.light};

        &:hover:not(:disabled) {
          background-color: ${colors.neutral.lightest};
          border-color: ${colors.neutral.base};
        }

        &:active:not(:disabled) {
          background-color: ${colors.neutral.light};
        }
      `;

    case "ghost":
      return css`
        background-color: transparent;
        color: ${colors.neutral.darkest};
        border: 1px solid transparent;

        &:hover:not(:disabled) {
          background-color: ${colors.neutral.lightest};
        }

        &:active:not(:disabled) {
          background-color: ${colors.neutral.light};
        }
      `;

    case "link":
      return css`
        padding-right: 0;
        padding-left: 0;
        background-color: transparent;
        color: ${colors.primary.base};
        border: 1px solid transparent;

        &:hover:not(:disabled) {
          text-decoration: underline;
          color: ${colors.primary.dark};
        }

        &:active:not(:disabled) {
          color: ${colors.primary.darkest};
        }
      `;
  }
};

const getSizeStyles = ($size: ButtonSize) => {
  switch ($size) {
    case "sm":
      return css`
        gap: 6px;
        height: 32px;
        padding: 6px 12px;
        font-size: ${fontSizes.small};
        border-radius: 6px;
      `;
    case "lg":
      return css`
        gap: 10px;
        height: 48px;
        padding: 12px 24px;
        font-size: ${fontSizes.large};
        border-radius: 10px;
      `;
    case "md":
    default:
      return css`
        gap: 8px;
        height: 40px;
        padding: 10px 18px;
        font-size: ${fontSizes.base};
        border-radius: 8px;
      `;
  }
};

export const StyledButton = styled.button<StyledButtonProps>`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
  box-sizing: border-box;

  font-family: inherit;
  font-weight: ${fontWeights.semibold};
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;

  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${(props) => getSizeStyles(props.$size)}
  ${(props) => getVariantStyles(props.$variant)}

  &:disabled {
    box-shadow: none;
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${(props) =>
    props.$isLoading &&
    css`
      cursor: wait;
    `}
`;

export const StyledSpinner = styled.span<{ $size: ButtonSize }>`
  display: inline-block;
  width: ${(props) =>
    props.$size === "sm" ? "14px" : props.$size === "lg" ? "18px" : "16px"};
  height: ${(props) =>
    props.$size === "sm" ? "14px" : props.$size === "lg" ? "18px" : "16px"};
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${spinAnimation} 0.75s linear infinite;
`;

export const StyledIconWrapper = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
`;
