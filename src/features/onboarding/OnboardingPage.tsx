import React from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/Button";
import { ROUTE_PATHS } from "@/routes/paths";

import {
  StyledActionGroup,
  StyledFeatureCard,
  StyledFeatureDesc,
  StyledFeatureGrid,
  StyledFeatureIcon,
  StyledFeatureTitle,
  StyledHeroBadge,
  StyledHeroSubtitle,
  StyledHeroTitle,
  StyledOnboardingContainer,
} from "./OnboardingPage.styles";

/**
 * OnboardingPage Component
 *
 * @description Trang Onboarding / Landing chào đón người chơi mới (khi chưa đăng nhập, isAuthenticated = false).
 *
 * @example
 * // Trong Router:
 * <Route path={ROUTE_PATHS.HOME} element={<OnboardingPage />} />
 */
export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledOnboardingContainer>
      <StyledHeroBadge>♟ Đấu Trường Cờ Vua Trực Tuyến Đỉnh Cao</StyledHeroBadge>

      <StyledHeroTitle>
        Chơi Cờ Vua Thời Gian Thực <br />
        Cùng Kỳ Thủ <span>Toàn Cầu</span>
      </StyledHeroTitle>

      <StyledHeroSubtitle>
        Trải nghiệm nền tảng cờ vua chuẩn quốc tế FIDE với hệ thống tính điểm
        Elo thời gian thực, ghép trận siêu tốc và hỗ trợ đa dạng chế độ chơi.
      </StyledHeroSubtitle>

      <StyledActionGroup>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate(ROUTE_PATHS.LOGIN)}
        >
          Tham Gia Ngay
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate(ROUTE_PATHS.LOGIN)}
        >
          Đăng Nhập
        </Button>
      </StyledActionGroup>

      {/* Feature Highlights */}
      <StyledFeatureGrid>
        <StyledFeatureCard>
          <StyledFeatureIcon>⚡</StyledFeatureIcon>
          <StyledFeatureTitle>Ghép Trận Siêu Tốc</StyledFeatureTitle>
          <StyledFeatureDesc>
            Thuật toán matchmaking thông minh tìm kiếm đối thủ xứng tầm theo hệ số
            Elo chỉ trong vài giây.
          </StyledFeatureDesc>
        </StyledFeatureCard>

        <StyledFeatureCard>
          <StyledFeatureIcon>🏆</StyledFeatureIcon>
          <StyledFeatureTitle>Hệ Thống Xếp Hạng Elo</StyledFeatureTitle>
          <StyledFeatureDesc>
            Tích điểm qua từng trận đấu, thăng hạng từ Newbie lên Grandmaster và
            vinh danh trên Bảng xếp hạng.
          </StyledFeatureDesc>
        </StyledFeatureCard>

        <StyledFeatureCard>
          <StyledFeatureIcon>⚔️</StyledFeatureIcon>
          <StyledFeatureTitle>Đa Dạng Chế Độ</StyledFeatureTitle>
          <StyledFeatureDesc>
            Bullet chớp nhoáng (1m), Blitz kịch tính (3m/5m), Rapid chuẩn mực (10m)
            hoặc rèn luyện cùng AI bot.
          </StyledFeatureDesc>
        </StyledFeatureCard>
      </StyledFeatureGrid>
    </StyledOnboardingContainer>
  );
};
