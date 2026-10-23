import React from "react";

import { StyledInput } from "./Form.styles";

/**
 * FormInput Component
 *
 * @description Input component được chuẩn hóa style theo design system của ChessHH, tự động nhận props từ FormField.
 *
 * @example
 * <FormInput placeholder="Nhập mật khẩu..." type="password" />
 */
export const FormInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { $hasError?: boolean }
>((props, ref) => {
  return <StyledInput ref={ref} {...props} />;
});

FormInput.displayName = "FormInput";
