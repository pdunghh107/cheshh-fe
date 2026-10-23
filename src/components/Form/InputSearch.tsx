import React from "react";
import type { FieldValues, Path, PathValue } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import {
  StyledAdornmentButton,
  StyledAdornmentIcon,
  StyledInput,
  StyledInputWrapper,
} from "./Form.styles";
import type { InputSearchProps } from "./Form.types";
import { InputField } from "./InputField";

/**
 * InputSearch Component
 *
 * @description Input tìm kiếm được wrap từ InputField, tự động tích hợp icon kính lúp và nút xóa nhanh (Clear button).
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
  required,
  className,
  onClear,
  ...inputProps
}: InputSearchProps<TFormValues>) => {
  const { setValue, watch } = useFormContext<TFormValues>();
  const currentValue = watch(name);

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
    <InputField
      name={name}
      label={label}
      helperText={helperText}
      required={required}
      className={className}
    >
      <SearchInputInner
        hasValue={Boolean(currentValue)}
        onClear={handleClear}
        {...inputProps}
      />
    </InputField>
  );
};

interface SearchInputInnerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  $hasError?: boolean;
  hasValue: boolean;
  onClear: (e: React.MouseEvent) => void;
}

const SearchInputInner = React.forwardRef<
  HTMLInputElement,
  SearchInputInnerProps
>(({ hasValue, onClear, $hasError, style, ...rest }, ref) => {
  return (
    <StyledInputWrapper>
      <StyledAdornmentIcon $position="left">🔍</StyledAdornmentIcon>
      <StyledInput
        ref={ref}
        type="text"
        $hasError={$hasError}
        style={{
          paddingLeft: "36px",
          paddingRight: hasValue ? "36px" : "14px",
          ...style,
        }}
        {...rest}
      />
      {hasValue && (
        <StyledAdornmentButton
          type="button"
          onClick={onClear}
          aria-label="Xóa nội dung tìm kiếm"
          tabIndex={-1}
        >
          ✕
        </StyledAdornmentButton>
      )}
    </StyledInputWrapper>
  );
});

SearchInputInner.displayName = "SearchInputInner";
