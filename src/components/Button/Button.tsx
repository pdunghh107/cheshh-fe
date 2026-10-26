import React from "react";

import { StyledButton } from "./Button.styles";
import type { ButtonProps } from "./Button.types";
import { renderLeftIcon, renderLoading, renderRightIcon } from "./Button.utils";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      type = "button",
      ...restProps
    },
    ref,
  ) => {
    const isButtonDisabled = disabled || isLoading;

    return (
      <StyledButton
        ref={ref}
        type={type}
        disabled={isButtonDisabled}
        $variant={variant}
        $size={size}
        $isLoading={isLoading}
        $fullWidth={fullWidth}
        {...restProps}
      >
        {renderLoading(isLoading, size)}
        {renderLeftIcon(isLoading, leftIcon)}
        {children}
        {renderRightIcon(isLoading, rightIcon)}
      </StyledButton>
    );
  },
);

Button.displayName = "Button";
