import styled, { css } from "styled-components";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const StyledFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const StyledLabel = styled.label<{ $required?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${fontSizes.base};
  font-weight: ${fontWeights.medium};
  color: ${colors.neutral.darkest};

  ${(props) =>
    props.$required &&
    css`
      &::after {
        font-weight: ${fontWeights.bold};
        color: ${colors.danger.base};
        content: "*";
      }
    `}
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 42px;
  padding: 8px 14px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: ${fontSizes.base};
  background-color: #ffffff;
  color: ${colors.neutral.darkest};
  border: 1px solid
    ${(props) => (props.$hasError ? colors.danger.base : colors.neutral.light)};
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: ${colors.neutral.base};
  }

  &:focus {
    border-color: ${(props) =>
      props.$hasError ? colors.danger.base : colors.primary.base};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.$hasError
          ? "rgba(229, 56, 75, 0.15)"
          : "rgba(56, 161, 78, 0.15)"};
  }

  &:disabled {
    background-color: ${colors.neutral.lightest};
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StyledErrorText = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.regular};
  color: ${colors.danger.base};
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const StyledHelperText = styled.span`
  font-size: ${fontSizes.small};
  color: ${colors.neutral.base};
`;

export const StyledInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const StyledAdornmentIcon = styled.span<{ $position: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${(props) => (props.$position === "left" ? "left: 12px;" : "right: 12px;")}
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: ${colors.neutral.base};
  pointer-events: none;
  transform: translateY(-50%);
`;

export const StyledAdornmentButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: transparent;
  color: ${colors.neutral.base};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  transform: translateY(-50%);

  &:hover {
    background-color: ${colors.neutral.lightest};
    color: ${colors.neutral.darkest};
  }
`;
