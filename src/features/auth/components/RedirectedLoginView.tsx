import React from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";
import { useAuth } from "@/features/auth/AuthContext";
import { useNavigate, useLocation } from "react-router";
import { ROUTE_PATHS } from "@/routes/paths";


/**
 * RedirectedLoginView Component
 *
 * @description Giao diện đăng nhập khi người dùng bị chặn do truy cập vào một tính năng bảo vệ (redirect=true).
 * Có cảnh báo ngắt quãng, viền nhấn mạnh và tự động chuyển về trang đích sau khi đăng nhập.
 *
 * @example
 * import { RedirectedLoginView } from '@/features/auth/components/RedirectedLoginView';
 *
 * <RedirectedLoginView />
 */

export const RedirectedLoginView: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Đọc đường dẫn trang người dùng bị chặn (mặc định nếu không có là trang chơi cờ)
  const targetPath = (location.state as { from?: { pathname: string } })?.from?.pathname || ROUTE_PATHS.PLAY;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login("Grandmaster_Defender");
    // Quay trở lại trang người dùng đang muốn vào trước đó
    navigate(targetPath, { replace: true });
  };

  return (
    <StyledInterruptContainer>
      {/* Banner cảnh báo phiên truy cập bị ngắt */}
      <StyledAlertCard>
        <StyledAlertIcon>🔒</StyledAlertIcon>
        <StyledAlertContent>
          <StyledAlertHeading>Yêu cầu xác thực tài khoản</StyledAlertHeading>
          <StyledAlertDescription>
            Bạn vừa cố gắng truy cập tính năng cần bảo mật <strong>({targetPath})</strong>.
            Vui lòng đăng nhập để lưu kết quả ván đấu, bảo vệ điểm Elo và tiếp tục trận chiến!
          </StyledAlertDescription>
        </StyledAlertContent>
      </StyledAlertCard>

      {/* Form đăng nhập dạng Priority/Focus Card */}
      <StyledFocusedFormCard onSubmit={handleLogin}>
        <StyledFormHeader>
          <StyledBadge>Đăng nhập để tiếp tục</StyledBadge>
          <StyledFormTitle>Tiếp tục ván cờ của bạn</StyledFormTitle>
        </StyledFormHeader>

        <StyledInputGroup>
          <StyledLabel>Tài khoản</StyledLabel>
          <StyledInput
            type="text"
            defaultValue="grandmaster"
            placeholder="Tên kỳ thủ..."
            required
          />
        </StyledInputGroup>

        <StyledInputGroup>
          <StyledLabel>Mật khẩu</StyledLabel>
          <StyledInput
            type="password"
            defaultValue="123456"
            placeholder="••••••••"
            required
          />
        </StyledInputGroup>

        <StyledActionGroup>
          <StyledSubmitButton type="submit">
            Xác thực & Vào ván đấu ngay
          </StyledSubmitButton>

          <StyledCancelButton
            type="button"
            onClick={() => navigate(ROUTE_PATHS.LOGIN)}
          >
            Hủy và trở về màn hình ban đầu
          </StyledCancelButton>
        </StyledActionGroup>
      </StyledFocusedFormCard>
    </StyledInterruptContainer>
  );
};

const pulseBorder = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(244, 155, 21, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(244, 155, 21, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(244, 155, 21, 0);
  }
`;

const StyledInterruptContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  background: radial-gradient(circle at 50% 10%, #2b1f14 0%, ${colors.neutral.darkest} 75%);
  color: ${colors.neutral.lightest};
`;

const StyledAlertCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  max-width: 480px;
  background-color: rgba(43, 31, 20, 0.9);
  border: 1px solid ${colors.warning.base};
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 24px;
  animation: ${pulseBorder} 2s infinite ease-out;
`;

const StyledAlertIcon = styled.span`
  font-size: 28px;
`;

const StyledAlertContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledAlertHeading = styled.span`
  font-size: ${fontSizes.base};
  font-weight: ${fontWeights.bold};
  color: ${colors.warning.light};
`;

const StyledAlertDescription = styled.p`
  font-size: ${fontSizes.small};
  color: ${colors.neutral.light};
  margin: 0;
  line-height: 1.5;

  strong {
    color: ${colors.warning.lightest};
  }
`;

const StyledFocusedFormCard = styled.form`
  width: 100%;
  max-width: 480px;
  background-color: ${colors.neutral.dark};
  border: 1px solid ${colors.warning.dark};
  border-radius: 16px;
  padding: 36px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledFormHeader = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const StyledBadge = styled.span`
  background-color: ${colors.warning.darkest};
  color: ${colors.warning.light};
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.semibold};
  padding: 4px 12px;
  border-radius: 9999px;
  border: 1px solid ${colors.warning.dark};
`;

const StyledFormTitle = styled.h2`
  font-size: ${fontSizes.xxlarge};
  font-weight: ${fontWeights.bold};
  margin: 0;
  color: ${colors.neutral.lightest};
`;

const StyledInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledLabel = styled.label`
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.medium};
  color: ${colors.neutral.light};
`;

const StyledInput = styled.input`
  padding: 12px 16px;
  font-size: ${fontSizes.base};
  background-color: ${colors.neutral.darkest};
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  color: ${colors.neutral.lightest};
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: ${colors.warning.base};
    box-shadow: 0 0 0 3px rgba(244, 155, 21, 0.25);
  }
`;

const StyledActionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;

const StyledSubmitButton = styled.button`
  padding: 14px 20px;
  font-size: ${fontSizes.large};
  font-weight: ${fontWeights.bold};
  color: #ffffff;
  background: linear-gradient(135deg, ${colors.warning.base} 0%, ${colors.warning.dark} 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(244, 155, 21, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const StyledCancelButton = styled.button`
  padding: 10px 16px;
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.medium};
  color: ${colors.neutral.base};
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${colors.neutral.lightest};
  }
`;
