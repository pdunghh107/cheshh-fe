import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Crown, UserPlus } from "lucide-react";

import { Button } from "@/components/Button";
import { Form, InputField, InputPassword } from "@/components/Form";
import {
  type RegisterFormValues,
  registerSchema,
} from "@/features/auth/auth.schema";
import { registerApi } from "@/features/auth/authApi";
import { useAuth } from "@/features/auth/useAuth";
import { ROUTE_PATHS } from "@/routes/paths";
import { handleApiError, handleApiSuccess } from "@/utils/toast";

import {
  StyledApiErrorAlert,
  StyledAuthCard,
  StyledAuthFooter,
  StyledAuthHeader,
  StyledAuthPageContainer,
  StyledAuthSubtitle,
  StyledAuthTitle,
  StyledLogoBadge,
} from "./components/AuthStyles";

/**
 * RegisterPage Component
 *
 * @description Màn hình đăng ký tài khoản ChessHH mới (Theme Trắng & Xanh lá chuẩn, icon Lucide React), gọi API POST /auth/register.
 *
 * @example
 * <RegisterPage />
 */
export const RegisterPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

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
    setApiError(null);

    try {
      const response = await registerApi({
        username: values.username,
        email: values.email,
        password: values.password,
      });

      const token = response.accessToken || response.token;
      const user = response.user || {
        id: response.userId || "u_" + values.username,
        username: response.username || values.username,
        email: response.email || values.email,
        rating: response.rating || 1200,
      };

      handleApiSuccess(response.message || "Đăng ký tài khoản thành công!");
      login(user, token);
      navigate(ROUTE_PATHS.HOME, { replace: true });
    } catch (err: unknown) {
      handleApiError(err, "Đăng ký thất bại. Vui lòng thử lại!");
      let message =
        "Không thể kết nối đến máy chủ Backend (http://localhost:8081). Vui lòng kiểm tra lại dịch vụ!";
      if (err && typeof err === "object") {
        if ("response" in err) {
          const res = (err as { response?: { data?: { message?: string } } })
            .response;
          if (res?.data?.message) {
            message = res.data.message;
          }
        } else if (
          "message" in err &&
          typeof (err as { message: unknown }).message === "string"
        ) {
          message = (err as { message: string }).message;
        }
      }
      setApiError(message);
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

        {apiError && (
          <StyledApiErrorAlert>
            <AlertCircle size={20} />
            <span>{apiError}</span>
          </StyledApiErrorAlert>
        )}

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
