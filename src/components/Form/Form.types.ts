import type { FormHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import type {
  DefaultValues,
  FieldValues,
  FormState,
  Path,
  SubmitHandler,
  UseFormGetValues,
  UseFormReturn,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";

/**
 * Interface cho ref được expose ra từ Form Component thông qua useImperativeHandle
 */
export interface FormRef<TFormValues extends FieldValues = FieldValues> {
  /** Toàn bộ form có đang bị dirty hay không */
  isDirty: boolean;
  /** Kiểm tra một trường cụ thể có bị dirty hay không */
  isFieldDirty: (name: Path<TFormValues>) => boolean;
  /** Danh sách các trường dirty */
  dirtyFields: FormState<TFormValues>["dirtyFields"];
  /** Kiểm tra form có hợp lệ hay không */
  isValid: boolean;
  /** Kích hoạt submit form từ bên ngoài */
  submit: () => Promise<void>;
  /** Reset lại form */
  reset: (values?: DefaultValues<TFormValues>) => void;
  /** Lấy giá trị hiện tại của form */
  getValues: UseFormGetValues<TFormValues>;
  /** Cập nhật giá trị một trường */
  setValue: UseFormSetValue<TFormValues>;
  /** Kích hoạt validate form hoặc một trường cụ thể */
  trigger: UseFormTrigger<TFormValues>;
  /** FormState nguyên bản của react-hook-form */
  formState: FormState<TFormValues>;
}

export interface FormProps<
  TFormValues extends FieldValues = FieldValues,
> extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  form: UseFormReturn<TFormValues>;
  onSubmit: SubmitHandler<TFormValues>;
  children: ReactNode;
}

/**
 * Props cho InputField dạng self-contained (tự render thẻ input bên trong)
 */
export interface InputFieldProps<
  TFormValues extends FieldValues = FieldValues,
> extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: Path<TFormValues>;
  label?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

/** Alias cho InputFieldProps để tương thích */
export type FormFieldProps<TFormValues extends FieldValues = FieldValues> =
  InputFieldProps<TFormValues>;

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  $hasError?: boolean;
}

export interface InputPasswordProps<
  TFormValues extends FieldValues = FieldValues,
> extends Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "type"> {
  name: Path<TFormValues>;
  label?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
}

export interface InputSearchProps<
  TFormValues extends FieldValues = FieldValues,
> extends Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "type"> {
  name: Path<TFormValues>;
  label?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  onClear?: () => void;
}
