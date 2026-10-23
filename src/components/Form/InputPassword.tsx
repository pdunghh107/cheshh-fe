import React, { useState } from "react";
import { type FieldValues, useFormContext } from "react-hook-form";

import {
  StyledAdornmentButton,
  StyledErrorText,
  StyledFormGroup,
  StyledHelperText,
  StyledInput,
  StyledInputWrapper,
  StyledLabel,
} from "./Form.styles";
import type { InputPasswordProps } from "./Form.types";

/**
 * InputPassword Component
 *
 * @description Input mật khẩu độc lập (Self-contained) tích hợp sẵn thẻ input password, label, error message và nút toggle ẩn/hiện mật khẩu.
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
  required = false,
  className,
  id,
  style,
  ...inputProps
}: InputPasswordProps<TFormValues>) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext<TFormValues>();

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;
  const inputId = id || name;

  const toggleShowPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword((prev) => !prev);
  };

  return (
    <StyledFormGroup className={className}>
      {label && (
        <StyledLabel htmlFor={inputId} $required={required}>
          {label}
        </StyledLabel>
      )}

      <StyledInputWrapper>
        <StyledInput
          id={inputId}
          type={showPassword ? "text" : "password"}
          $hasError={Boolean(errorMessage)}
          style={{ paddingRight: "40px", ...style }}
          {...register(name)}
          {...inputProps}
        />
        <StyledAdornmentButton
          type="button"
          onClick={toggleShowPassword}
          aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          tabIndex={-1}
        >
          {showPassword ? "🙈" : "👁️"}
        </StyledAdornmentButton>
      </StyledInputWrapper>

      {errorMessage && (
        <StyledErrorText role="alert">{errorMessage}</StyledErrorText>
      )}

      {!errorMessage && helperText && (
        <StyledHelperText>{helperText}</StyledHelperText>
      )}
    </StyledFormGroup>
  );
};
