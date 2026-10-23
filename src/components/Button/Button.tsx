import React from "react";

import { Loading } from "@/components/Loading";

import { StyledButton, StyledIconWrapper } from "./Button.styles";
import type { ButtonProps } from "./Button.types";

/**
 * Button Component
 *
 * @description Button chuẩn dùng trong toàn bộ ứng dụng ChessHH, hỗ trợ nhiều biến thể (primary, secondary, danger, outline, ghost, link), kích thước (sm, md, lg), trạng thái loading và disabled.
 *
 * @example
 * // 1. Usage cơ bản:
 * import { Button } from '@/components/Button';
 *
 * <Button variant="primary" size="md" onClick={handlePlay}>
 *   Chơi ngay
 * </Button>
 *
 * // 2. Usage với icon và trạng thái loading:
 * <Button
 *   variant="secondary"
 *   size="lg"
 *   isLoading
 *   leftIcon={<SwordsIcon />}
 * >
 *   Đang tìm trận...
 * </Button>
 *
 * // 3. Usage với disabled hoặc danger:
 * <Button variant="danger" disabled>
 *   Đầu hàng
 * </Button>
 */
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
        {isLoading && (
          <Loading
            size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
            thickness={size === "sm" ? 2 : 4}
            color="currentColor"
            aria-hidden="true"
          />
        )}
        {!isLoading && leftIcon && (
          <StyledIconWrapper>{leftIcon}</StyledIconWrapper>
        )}
        {children}
        {!isLoading && rightIcon && (
          <StyledIconWrapper>{rightIcon}</StyledIconWrapper>
        )}
      </StyledButton>
    );
  },
);

Button.displayName = "Button";
