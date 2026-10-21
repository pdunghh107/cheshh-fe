import React from "react";
import styled from "styled-components";
import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";
import { useAuth } from "@/features/auth/AuthContext";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "@/routes/paths";


/**
 * InitialLoginView Component
 *
 * @description Giao diện đăng nhập thân thiện, chào mừng người dùng lần đầu truy cập hệ thống ChessHH.
 *
 * @example
 * import { InitialLoginView } from '@/features/auth/components/InitialLoginView';
 *
 * <InitialLoginView />
 */

export const InitialLoginView: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login("VuaCo_VietNam");
    navigate(ROUTE_PATHS.PLAY);
  };

  return (
    <StyledContainer>
      <StyledHeroBadge>♟ Chào mừng đến với ChessHH</StyledHeroBadge>
      <StyledTitle>Nâng tầm kỹ năng cờ vua đỉnh cao</StyledTitle>
      <StyledSubtitle>
        Tham gia đấu trường cờ vua thời gian thực, thử thách đối thủ toàn cầu và leo bảng xếp hạng Elo!
      </StyledSubtitle>

      <StyledFormCard onSubmit={handleLogin}>
        <StyledInputGroup>
          <StyledLabel>Tên đăng nhập hoặc Email</StyledLabel>
          <StyledInput
            type="text"
            placeholder="nhập 'grandmaster'..."
            defaultValue="grandmaster"
            required
          />
        </StyledInputGroup>

        <StyledInputGroup>
          <StyledLabel>Mật khẩu</StyledLabel>
          <StyledInput
            type="password"
            placeholder="••••••••"
            defaultValue="123456"
            required
          />
        </StyledInputGroup>

        <StyledPrimaryButton type="submit">
          Đăng nhập ngay
        </StyledPrimaryButton>

        <StyledGuestButton
          type="button"
          onClick={() => {
            login("Khach_KỳThủ");
            navigate(ROUTE_PATHS.PLAY);
          }}
        >
          Chơi thử với tài khoản Khách
        </StyledGuestButton>
      </StyledFormCard>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  background: radial-gradient(circle at 50% 20%, #1e2430 0%, ${colors.neutral.darkest} 80%);
  color: ${colors.neutral.lightest};
  font-family: inherit;
`;

const StyledHeroBadge = styled.div`
  padding: 6px 14px;
  background-color: ${colors.primary.darkest};
  color: ${colors.primary.light};
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.semibold};
  border-radius: 9999px;
  border: 1px solid ${colors.primary.dark};
  margin-bottom: 16px;
  letter-spacing: 0.5px;
`;

const StyledTitle = styled.h1`
  font-size: ${fontSizes.xxxlarge};
  font-weight: ${fontWeights.black};
  margin: 0 0 12px;
  text-align: center;
  color: ${colors.neutral.lightest};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
`;

const StyledSubtitle = styled.p`
  font-size: ${fontSizes.large};
  font-weight: ${fontWeights.regular};
  color: ${colors.neutral.light};
  margin: 0 0 32px;
  text-align: center;
  max-width: 520px;
  line-height: 1.6;
`;

const StyledFormCard = styled.form`
  width: 100%;
  max-width: 440px;
  background-color: ${colors.neutral.dark};
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 36px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: ${colors.primary.base};
    box-shadow: 0 0 0 3px rgba(56, 161, 78, 0.2);
  }
`;

const StyledPrimaryButton = styled.button`
  padding: 14px 20px;
  font-size: ${fontSizes.large};
  font-weight: ${fontWeights.bold};
  color: #ffffff;
  background: linear-gradient(135deg, ${colors.primary.base} 0%, ${colors.primary.dark} 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(56, 161, 78, 0.35);
  }

  &:active {
    transform: translateY(0);
  }
`;

const StyledGuestButton = styled.button`
  padding: 12px 20px;
  font-size: ${fontSizes.base};
  font-weight: ${fontWeights.medium};
  color: ${colors.neutral.light};
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: ${colors.neutral.lightest};
  }
`;
