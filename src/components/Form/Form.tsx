import React, { useImperativeHandle } from "react";
import { type FieldValues, FormProvider, type Path } from "react-hook-form";

import { StyledForm } from "./Form.styles";
import type { FormProps, FormRef } from "./Form.types";

/**
 * Form Component (Generic Form Wrapper)
 *
 * @description Form Wrapper tích hợp React Hook Form và useImperativeHandle. Expose ref chứa `isDirty`, `isFieldDirty`, `submit`, `reset`, `getValues`... để component cha kiểm soát form dễ dàng.
 *
 * @example
 * // 1. Khởi tạo useForm với Zod schema:
 * const methods = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
 * const formRef = useRef<FormRef<LoginFormData>>(null);
 *
 * // 2. Kiểm tra dirty trước khi rời trang hoặc submit ngoài form:
 * const handleExternalSave = () => {
 *   if (formRef.current?.isDirty) {
 *     formRef.current.submit();
 *   }
 * };
 *
 * // 3. Render Form:
 * <Form form={methods} ref={formRef} onSubmit={onSubmit}>
 *   <FormField name="email" label="Email" required>
 *     <FormInput placeholder="example@chesshh.com" />
 *   </FormField>
 *   <Button type="submit">Đăng nhập</Button>
 * </Form>
 */
const FormInner = <TFormValues extends FieldValues = FieldValues>(
  { form, onSubmit, children, className, ...restProps }: FormProps<TFormValues>,
  ref: React.ForwardedRef<FormRef<TFormValues>>,
) => {
  const { handleSubmit, formState, reset, getValues, setValue, trigger } = form;

  // Expose các methods và dirty checkers ra ngoài qua ref
  useImperativeHandle(
    ref,
    (): FormRef<TFormValues> => ({
      isDirty: formState.isDirty,
      isFieldDirty: (name: Path<TFormValues>) => {
        const dirtyFields = formState.dirtyFields as Record<
          string,
          boolean | undefined
        >;
        return Boolean(dirtyFields[name]);
      },
      dirtyFields: formState.dirtyFields,
      isValid: formState.isValid,
      submit: async () => {
        await handleSubmit(onSubmit)();
      },
      reset,
      getValues,
      setValue,
      trigger,
      formState,
    }),
    [formState, handleSubmit, onSubmit, reset, getValues, setValue, trigger],
  );

  return (
    <FormProvider {...form}>
      <StyledForm
        className={className}
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
        {...restProps}
      >
        {children}
      </StyledForm>
    </FormProvider>
  );
};

export const Form = React.forwardRef(FormInner) as <
  TFormValues extends FieldValues = FieldValues,
>(
  props: FormProps<TFormValues> & {
    ref?: React.ForwardedRef<FormRef<TFormValues>>;
  },
) => React.ReactElement;
