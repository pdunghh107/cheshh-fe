import React from "react";
import { type FieldValues, useFormContext } from "react-hook-form";

import {
  StyledErrorText,
  StyledFormGroup,
  StyledHelperText,
  StyledLabel,
} from "./Form.styles";
import type { InputFieldProps } from "./Form.types";

/**
 * InputField Component
 *
 * @description Tự động kết nối với useFormContext để lấy trạng thái register và hiển thị validation error message theo prop `name`.
 *
 * @example
 * <InputField name="username" label="Tên người dùng" required>
 *   <FormInput placeholder="Nhập username..." />
 * </InputField>
 */
export const InputField = <TFormValues extends FieldValues = FieldValues>({
  name,
  label,
  helperText,
  required = false,
  children,
  className,
}: InputFieldProps<TFormValues>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFormValues>();

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <StyledFormGroup className={className}>
      {label && <StyledLabel $required={required}>{label}</StyledLabel>}

      {React.isValidElement(children)
        ? React.cloneElement(
            children as React.ReactElement<Record<string, unknown>>,
            {
              ...register(name),
              $hasError: Boolean(errorMessage),
              id: name,
            },
          )
        : children}

      {errorMessage && (
        <StyledErrorText role="alert">{errorMessage}</StyledErrorText>
      )}

      {!errorMessage && helperText && (
        <StyledHelperText>{helperText}</StyledHelperText>
      )}
    </StyledFormGroup>
  );
};
