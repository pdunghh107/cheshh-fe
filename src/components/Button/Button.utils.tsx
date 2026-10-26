import type { ReactNode } from "react";

import { Loading } from "../Loading";

import { IconWrapper } from "./Button.styles";
import type { ButtonSize } from "./Button.types";

export const buttonLoadingSize = (size: ButtonSize): number => {
  switch (size) {
    case "sm":
      return 14;
    case "md":
      return 16;
    case "lg":
      return 20;
    default:
      return 16;
  }
};

export const buttonLoadingThickness = (size: ButtonSize): number => {
  switch (size) {
    case "sm":
      return 2;
    case "md":
      return 3;
    case "lg":
      return 4;
    default:
      return 3;
  }
};

export const renderLoading = (
  loading: boolean,
  size: ButtonSize,
): ReactNode => {
  if (!loading) {
    return null;
  }

  return (
    <Loading
      size={buttonLoadingSize(size)}
      thickness={buttonLoadingThickness(size)}
      color="currentColor"
      aria-hidden="true"
    />
  );
};

export const renderLeftIcon = (
  loading: boolean,
  leftIcon: ReactNode,
): ReactNode => {
  if (loading || !leftIcon) return null;

  return <IconWrapper>{leftIcon}</IconWrapper>;
};

export const renderRightIcon = (
  loading: boolean,
  rightIcon: ReactNode,
): ReactNode => {
  if (loading || !rightIcon) return null;

  return <IconWrapper>{rightIcon}</IconWrapper>;
};
