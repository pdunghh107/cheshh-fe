import React from "react";
import type { FieldValues, Path, PathValue } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { Search, X } from "lucide-react";

import {
  StyledAdornmentButton,
  StyledAdornmentIcon,
  StyledErrorText,
  StyledFormGroup,
  StyledHelperText,
  StyledInput,
  StyledInputWrapper,
  StyledLabel,
} from "./Form.styles";
import type { InputSearchProps } from "./Form.types";

/**
 * InputSearch Component
 *
 * @description Input tìm kiếm độc lập (Self-contained) tích hợp sẵn thẻ input, icon kính lúp và nút xóa nhanh (Clear button).
 *
 * @example
 * <InputSearch
 *   name="search"
 *   label="Tìm kiếm người chơi"
 *   placeholder="Nhập tên đại kiện tướng..."
 * />
 */
export const InputSearch = <TFormValues extends FieldValues = FieldValues>({
  name,
  label,
  helperText,
  required = false,
  className,
  id,
  style,
  onClear,
  ...inputProps
}: InputSearchProps<TFormValues>) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<TFormValues>();

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;
  const inputId = id || name;
  const currentValue = watch(name);
  const hasValue = Boolean(currentValue);

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setValue(name, "" as PathValue<TFormValues, Path<TFormValues>>, {
      shouldDirty: true,
      shouldValidate: true,
    });
    onClear?.();
  };

  return (
    <StyledFormGroup className={className}>
      {label && (
        <StyledLabel htmlFor={inputId} $required={required}>
          {label}
        </StyledLabel>
      )}

      <StyledInputWrapper>
        <StyledAdornmentIcon $position="left">
          <Search size={18} />
        </StyledAdornmentIcon>

        <StyledInput
          id={inputId}
          type="text"
          $hasError={Boolean(errorMessage)}
          style={{
            paddingLeft: "36px",
            paddingRight: hasValue ? "36px" : "14px",
            ...style,
          }}
          {...register(name)}
          {...inputProps}
        />

        {hasValue && (
          <StyledAdornmentButton
            type="button"
            onClick={handleClear}
            aria-label="Xóa nội dung tìm kiếm"
            tabIndex={-1}
          >
            <X size={16} />
          </StyledAdornmentButton>
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
