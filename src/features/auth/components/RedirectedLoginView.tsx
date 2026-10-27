import React from "react";
import { useLocation, useNavigate } from "react-router";

import { LoginForm } from "@/features/auth/components/LoginForm";
import { ROUTE_PATHS } from "@/routes/paths";

import { AuthHeader } from "./AuthHeader";
import {
  StyledAuthCard,
  StyledAuthFooter,
  StyledAuthPageContainer,
} from "./AuthStyles";

export const RedirectedLoginView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const targetPath =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    ROUTE_PATHS.PLAY;

  return (
    <StyledAuthPageContainer>
      <StyledAuthCard>
        <AuthHeader
          title="Tiếp Tục Ván Cờ Của Bạn"
          subtitle="Đăng nhập để bảo toàn hệ số Elo và không bỏ lỡ trận đấu!"
        />

        <LoginForm onSuccess={() => navigate(targetPath, { replace: true })} />

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
