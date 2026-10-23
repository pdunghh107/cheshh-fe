import React, { useState } from "react";
import type { FieldValues } from "react-hook-form";

import {
  StyledAdornmentButton,
  StyledInput,
  StyledInputWrapper,
} from "./Form.styles";
import type { InputPasswordProps } from "./Form.types";
import { InputField } from "./InputField";

/**
 * InputPassword Component
 *
 * @description Input mật khẩu được wrap từ InputField, tự động tích hợp nút toggle ẩn/hiện mật khẩu và kết nối với form qua prop `name`.
 *
 * @example
 * <InputPassword
 *   name="password"
 *   label="Mật khẩu"
 *   placeholder="Nhập tối thiểu 6 ký tự..."
 *   required
 * />
 */
export const InputPassword = <TFormValues extends FieldValues = FieldValues>({
  name,
  label,
  helperText,
  required,
  className,
  ...inputProps
}: InputPasswordProps<TFormValues>) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword((prev) => !prev);
  };

  return (
    <InputField
      name={name}
      label={label}
      helperText={helperText}
      required={required}
      className={className}
    >
      <PasswordInputInner
        showPassword={showPassword}
        onTogglePassword={toggleShowPassword}
        {...inputProps}
      />
    </InputField>
  );
};

interface PasswordInputInnerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  $hasError?: boolean;
  showPassword: boolean;
  onTogglePassword: (e: React.MouseEvent) => void;
}

const PasswordInputInner = React.forwardRef<
  HTMLInputElement,
  PasswordInputInnerProps
>(({ showPassword, onTogglePassword, $hasError, style, ...rest }, ref) => {
  return (
    <StyledInputWrapper>
      <StyledInput
        ref={ref}
        type={showPassword ? "text" : "password"}
        $hasError={$hasError}
        style={{ paddingRight: "40px", ...style }}
        {...rest}
      />
      <StyledAdornmentButton
        type="button"
        onClick={onTogglePassword}
        aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        tabIndex={-1}
      >
        {showPassword ? "🙈" : "👁️"}
      </StyledAdornmentButton>
    </StyledInputWrapper>
  );
});

PasswordInputInner.displayName = "PasswordInputInner";
