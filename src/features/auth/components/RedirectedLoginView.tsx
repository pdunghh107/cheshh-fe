import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, LogIn, ShieldAlert } from "lucide-react";
import styled from "styled-components";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";
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
} from "./AuthStyles";

const StyledAlertBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 24px;
  padding: 16px;
  background-color: ${colors.warning.lightest};
  color: ${colors.warning.darkest};
  border: 1px solid ${colors.warning.light};
  border-radius: 12px;
`;

const StyledAlertIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  background-color: #ffffff;
  color: ${colors.warning.dark};
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const StyledAlertTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledAlertHeading = styled.h4`
  margin: 0;
  font-size: ${fontSizes.base};
  font-weight: ${fontWeights.bold};
  color: ${colors.warning.darkest};
`;

const StyledAlertDescription = styled.p`
  margin: 0;
  font-size: ${fontSizes.small};
  line-height: 1.5;
  color: ${colors.neutral.dark};
`;

/**
 * RedirectedLoginView Component
 *
 * @description Màn hình đăng nhập khi người dùng bị ngắt phiên truy cập vào trang bảo vệ (kèm cảnh báo và Lucide icons).
 *
 * @example
 * <RedirectedLoginView />
 */
export const RedirectedLoginView: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const targetPath =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    ROUTE_PATHS.PLAY;

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
      if (!response.user && !response.username) {
        throw new Error(SYSTEM_MESSAGES.UNKNOWN_ERROR);
      }

      const user = response.user || {
        id: "u_" + values.usernameOrEmail,
        username: response.username || values.usernameOrEmail,
        rating: 1800,
      };

      handleApiSuccess(response.message || AUTH_MESSAGES.LOGIN_SUCCESS);
      login(user, token);
      navigate(targetPath, { replace: true });
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

  return (
    <StyledAuthPageContainer>
      <StyledAuthCard>
        {/* Banner cảnh báo phiên bị ngắt */}
        <StyledAlertBox>
          <StyledAlertIconWrapper>
            <ShieldAlert size={20} />
          </StyledAlertIconWrapper>
          <StyledAlertTextGroup>
            <StyledAlertHeading>Yêu cầu xác thực tài khoản</StyledAlertHeading>
            <StyledAlertDescription>
              Bạn vừa cố gắng truy cập tính năng cần bảo mật (
              <strong>{targetPath}</strong>). Vui lòng đăng nhập để tiếp tục!
            </StyledAlertDescription>
          </StyledAlertTextGroup>
        </StyledAlertBox>

        <StyledAuthHeader>
          <StyledAuthTitle>Tiếp Tục Ván Cờ Của Bạn</StyledAuthTitle>
          <StyledAuthSubtitle>
            Đăng nhập để bảo toàn hệ số Elo và không bỏ lỡ trận đấu!
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
            label="Tài khoản"
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
            Đăng Nhập & Tiếp Tục
          </Button>
        </Form>

        <StyledAuthFooter>
          <span>Quay lại</span>
          <button type="button" onClick={() => navigate(ROUTE_PATHS.HOME)}>
            Trang chủ
          </button>
        </StyledAuthFooter>
      </StyledAuthCard>
    </StyledAuthPageContainer>
  );
};
