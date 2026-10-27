import React from "react";
import { Link, useNavigate } from "react-router";

import { ROUTE_PATHS } from "@/routes/paths";

import { AuthHeader } from "./AuthHeader";
import {
  StyledAuthCard,
  StyledAuthFooter,
  StyledAuthPageContainer,
} from "./AuthStyles";
import { LoginForm } from "./LoginForm";

export const InitialLoginView: React.FC = () => {
  const navigate = useNavigate();

  const targetPath = ROUTE_PATHS.HOME;

  return (
    <StyledAuthPageContainer>
      <StyledAuthCard>
        <AuthHeader
          title="Đăng Nhập ChessHH"
          subtitle="Tham gia phòng đấu cờ vua thời gian thực và leo bảng xếp hạng Elo!"
        />

        <LoginForm onSuccess={() => navigate(targetPath, { replace: true })} />

        <StyledAuthFooter>
          <span>Chưa có tài khoản?</span>
          <Link to={ROUTE_PATHS.REGISTER}>Đăng ký ngay</Link>
        </StyledAuthFooter>
      </StyledAuthCard>
    </StyledAuthPageContainer>
  );
};
