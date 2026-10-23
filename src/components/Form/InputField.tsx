import type { FieldValues } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import {
  StyledAdornmentIcon,
  StyledErrorText,
  StyledFormGroup,
  StyledHelperText,
  StyledInput,
  StyledInputWrapper,
  StyledLabel,
} from "./Form.styles";
import type { InputFieldProps } from "./Form.types";

/**
 * InputField Component
 *
 * @description InputField độc lập (Self-contained) tích hợp sẵn thẻ input, label, helperText, icons và validation error tự động từ React Hook Form mà KHÔNG cần wrap FormInput con bên trong.
 *
 * @example
 * // Sử dụng trực tiếp:
 * <InputField
 *   name="username"
 *   label="Tên người dùng"
 *   placeholder="nhập username..."
 *   helperText="Từ 3-30 ký tự"
 *   required
 *   autoFocus
 * />
 */
export const InputField = <TFormValues extends FieldValues = FieldValues>({
  name,
  label,
  helperText,
  required = false,
  className,
  leftIcon,
  rightIcon,
  style,
  id,
  type = "text",
  ...inputProps
}: InputFieldProps<TFormValues>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFormValues>();

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;
  const inputId = id || name;

  return (
    <StyledFormGroup className={className}>
      {label && (
        <StyledLabel htmlFor={inputId} $required={required}>
          {label}
        </StyledLabel>
      )}

      <StyledInputWrapper>
        {leftIcon && (
          <StyledAdornmentIcon $position="left">{leftIcon}</StyledAdornmentIcon>
        )}

        <StyledInput
          id={inputId}
          type={type}
          $hasError={Boolean(errorMessage)}
          style={{
            paddingLeft: leftIcon ? "36px" : "14px",
            paddingRight: rightIcon ? "36px" : "14px",
            ...style,
          }}
          {...register(name)}
          {...inputProps}
        />

        {rightIcon && (
          <StyledAdornmentIcon $position="right">
            {rightIcon}
          </StyledAdornmentIcon>
        )}
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
