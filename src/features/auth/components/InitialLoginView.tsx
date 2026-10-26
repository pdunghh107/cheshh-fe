import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, LogIn, Swords } from "lucide-react";

import { AUTH_MESSAGES } from "@/commons/messages";
import { Button } from "@/components/Button";
import { Form, InputField, InputPassword } from "@/components/Form";
import { type LoginFormValues, loginSchema } from "@/features/auth/auth.schema";
import { loginApi } from "@/features/auth/authApi";
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
} from "./AuthStyles";

export const InitialLoginView: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await loginApi(values);
      handleApiSuccess(AUTH_MESSAGES.LOGIN_SUCCESS);
      login(response.user, response.accessToken);
      navigate(ROUTE_PATHS.HOME, { replace: true });
    } catch (err: unknown) {
      const errorMsg = handleApiError(err, AUTH_MESSAGES.LOGIN_FAILED);
      setApiError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledAuthPageContainer>
      <StyledAuthCard>
        <StyledAuthHeader>
          <StyledLogoBadge>
            <Swords size={28} />
          </StyledLogoBadge>
          <StyledAuthTitle>Đăng Nhập ChessHH</StyledAuthTitle>
          <StyledAuthSubtitle>
            Tham gia phòng đấu cờ vua thời gian thực và leo bảng xếp hạng Elo!
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
            size="lg"
            fullWidth
            isLoading={isLoading}
            leftIcon={<LogIn size={18} />}
            style={{ marginTop: "8px" }}
          >
            Đăng Nhập
          </Button>
        </Form>

        <StyledAuthFooter>
          <span>Chưa có tài khoản?</span>
          <Link to={ROUTE_PATHS.REGISTER}>Đăng ký ngay</Link>
        </StyledAuthFooter>
      </StyledAuthCard>
    </StyledAuthPageContainer>
  );
};
