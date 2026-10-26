import React from "react";
import { Link, useNavigate } from "react-router";
import { Swords } from "lucide-react";

import { ROUTE_PATHS } from "@/routes/paths";

import {
  StyledAuthCard,
  StyledAuthFooter,
  StyledAuthHeader,
  StyledAuthPageContainer,
  StyledAuthSubtitle,
  StyledAuthTitle,
  StyledLogoBadge,
} from "./AuthStyles";
import { LoginForm } from "./LoginForm";

/**
 * InitialLoginView Component
 *
 * @description Màn hình đăng nhập khởi tạo mặc định khi người dùng chủ động vào `/login`.
 *
 * @example
 * <InitialLoginView />
 */
export const InitialLoginView: React.FC = () => {
  const navigate = useNavigate();

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

        <LoginForm
          onSuccess={() => navigate(ROUTE_PATHS.HOME, { replace: true })}
        />

        <StyledAuthFooter>
          <span>Chưa có tài khoản?</span>
          <Link to={ROUTE_PATHS.REGISTER}>Đăng ký ngay</Link>
        </StyledAuthFooter>
      </StyledAuthCard>
    </StyledAuthPageContainer>
  );
};
