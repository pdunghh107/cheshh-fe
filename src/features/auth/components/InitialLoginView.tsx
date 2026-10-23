import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, LogIn, Swords } from "lucide-react";

import { AUTH_MESSAGES, SYSTEM_MESSAGES } from "@/commons/messages";
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
      usernameOrEmail: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const response = await loginApi(values);
      const token = response.accessToken || response.token;
      const user = response.user || {
        id: response.userId || "u_" + values.usernameOrEmail,
        username: response.username || values.usernameOrEmail,
        email: response.email,
        rating: response.rating || 1800,
      };

      handleApiSuccess(response.message || AUTH_MESSAGES.LOGIN_SUCCESS);
      login(user, token);
      navigate(ROUTE_PATHS.HOME, { replace: true });
    } catch (err: unknown) {
      handleApiError(err, AUTH_MESSAGES.LOGIN_FAILED);
      let message: string = SYSTEM_MESSAGES.SERVER_CONNECTION_ERROR;
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

  const handleGuestPlay = () => {
    login("KỳThủ_Khách");
    navigate(ROUTE_PATHS.PLAY);
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
            name="usernameOrEmail"
            label="Tên đăng nhập hoặc Email"
            placeholder="nhập username hoặc email..."
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

          <Button
            type="button"
            variant="outline"
            size="md"
            fullWidth
            onClick={handleGuestPlay}
          >
            Chơi Thử Với Tư Cách Khách
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
