import React from "react";
import { useLocation, useNavigate } from "react-router";
import { ShieldAlert } from "lucide-react";
import styled from "styled-components";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { ROUTE_PATHS } from "@/routes/paths";

import {
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
 * @description Màn hình đăng nhập khi người dùng bị ngắt phiên truy cập vào trang bảo vệ (kèm cảnh báo và LoginForm tái sử dụng).
 *
 * @example
 * <RedirectedLoginView />
 */
export const RedirectedLoginView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const targetPath =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    ROUTE_PATHS.PLAY;

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

