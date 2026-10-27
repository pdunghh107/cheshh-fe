import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";

import { Button } from "@/components/Button";
import { Form, InputField, InputPassword } from "@/components/Form";
import { type LoginFormValues, loginSchema } from "@/features/auth/auth.schema";
import { loginUser } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/store";

export interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);

    const resultAction = await dispatch(loginUser(values));

    setIsLoading(false);

    if (loginUser.fulfilled.match(resultAction)) {
      onSuccess?.();
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <InputField
        name="email"
        label="Địa chỉ Email"
        placeholder="nhập email của bạn..."
        required
        autoFocus
      />

      <InputPassword
        name="password"
        label="Mật khẩu"
        placeholder="••••••••"
        required
      />

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
        leftIcon={<LogIn size={18} />}
        style={{ marginTop: "8px" }}
      >
        Đăng Nhập
      </Button>
    </Form>
  );
};
