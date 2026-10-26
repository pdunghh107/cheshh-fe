import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Crown, UserPlus } from "lucide-react";

import { Button } from "@/components/Button";
import { Form, InputField, InputPassword } from "@/components/Form";
import {
  type RegisterFormValues,
  registerSchema,
} from "@/features/auth/auth.schema";
import { registerUser } from "@/features/auth/authSlice";
import { ROUTE_PATHS } from "@/routes/paths";
import { useAppDispatch } from "@/store";

import {
  StyledAuthCard,
  StyledAuthFooter,
  StyledAuthHeader,
  StyledAuthPageContainer,
  StyledAuthSubtitle,
  StyledAuthTitle,
  StyledLogoBadge,
} from "./components/AuthStyles";

export const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);

    try {
      await dispatch(
        registerUser({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      ).unwrap();

      navigate(ROUTE_PATHS.HOME, { replace: true });
    } catch {
      // Toast thông báo lỗi đã được registerUser thunk xử lý tự động
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledAuthPageContainer>
      <StyledAuthCard>
        <StyledAuthHeader>
          <StyledLogoBadge>
            <Crown size={28} />
          </StyledLogoBadge>
          <StyledAuthTitle>Tạo Tài Khoản Kỳ Thủ</StyledAuthTitle>
          <StyledAuthSubtitle>
            Gia nhập cộng đồng cờ vua trực tuyến ChessHH và bắt đầu hành trình
            trở thành Grandmaster!
          </StyledAuthSubtitle>
        </StyledAuthHeader>

        <Form form={form} onSubmit={onSubmit}>
          <InputField
            name="username"
            label="Tên người dùng"
            placeholder="ví dụ: magnus_carlsen"
            helperText="Từ 3-30 ký tự (chữ, số và dấu gạch dưới)"
            required
            autoFocus
          />

          <InputField
            name="email"
            type="email"
            label="Địa chỉ Email"
            placeholder="example@chesshh.com"
            required
          />

          <InputPassword
            name="password"
            label="Mật khẩu"
            placeholder="Tối thiểu 6 ký tự..."
            required
          />

          <InputPassword
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu..."
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
            leftIcon={<UserPlus size={18} />}
            style={{ marginTop: "12px" }}
          >
            Đăng Ký Tài Khoản
          </Button>
        </Form>

        <StyledAuthFooter>
          <span>Đã có tài khoản?</span>
          <Link to={ROUTE_PATHS.LOGIN}>Đăng nhập ngay</Link>
        </StyledAuthFooter>
      </StyledAuthCard>
    </StyledAuthPageContainer>
  );
};
