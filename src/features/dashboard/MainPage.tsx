import React, { useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/Button";
import { useMatchmaking } from "@/features/game/matchmaking/useMatchmaking";
import { ROUTE_PATHS } from "@/routes/paths";
import { useAppSelector } from "@/store";

import {
  StyledBannerSubtitle,
  StyledBannerText,
  StyledBannerTitle,
  StyledDashboardContainer,
  StyledMatchmakingSection,
  StyledModeCard,
  StyledModeIcon,
  StyledModeName,
  StyledModesGrid,
  StyledModeTime,
  StyledSearchingIndicator,
  StyledSection,
  StyledSectionHeader,
  StyledSectionTitle,
  StyledTimerCount,
  StyledWelcomeBanner,
} from "./MainPage.styles";

interface GameMode {
  id: string;
  name: string;
  time: string;
  icon: string;
  description: string;
}

const GAME_MODES: GameMode[] = [
  {
    id: "bullet",
    name: "Bullet",
    time: "1 phút",
    icon: "⚡",
    description: "Tốc độ chớp nhoáng, phản xạ đỉnh cao",
  },
  {
    id: "blitz",
    name: "Blitz",
    time: "3 | 5 phút",
    icon: "🔥",
    description: "Kịch tính, đấu trí nhanh",
  },
  {
    id: "rapid",
    name: "Rapid",
    time: "10 | 15 phút",
    icon: "⏱️",
    description: "Chuẩn mực thi đấu cờ nhanh",
  },
  {
    id: "bot",
    name: "Vs AI Bot",
    time: "Không giới hạn",
    icon: "🤖",
    description: "Rèn luyện cùng Magnus Bot AI",
  },
  {
    id: "custom",
    name: "Tùy Chỉnh",
    time: "Tự tạo phòng",
    icon: "⚙️",
    description: "Mời bạn bè vào phòng riêng",
  },
];

/**
 * MainPage Component (Dashboard)
 *
 * @description Trang chủ khi người dùng đã đăng nhập (isAuthenticated = true). Cho phép chọn các chế độ chơi (Bullet, Blitz, Rapid, Bot...) và ghép trận (Matchmaking).
 *
 * @example
 * <MainPage />
 */
export const MainPage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [selectedModeId, setSelectedModeId] = useState<string>("rapid");
  const { isSearching, searchDuration, joinQueue, cancelQueue } =
    useMatchmaking();

  const handleStartMatchmaking = () => {
    joinQueue();
  };

  const handleCancelMatchmaking = () => {
    cancelQueue();
  };

  const selectedMode = GAME_MODES.find((m) => m.id === selectedModeId);

  return (
    <StyledDashboardContainer>
      {/* Welcome Banner */}
      <StyledWelcomeBanner>
        <StyledBannerText>
          <StyledBannerTitle>
            Xin chào, {user?.username || "Kỳ thủ"}! 👋
          </StyledBannerTitle>
          <StyledBannerSubtitle>
            Elo hiện tại của bạn là {user?.rating || 1800}. Hãy chọn chế độ chơi và
            bắt đầu leo rank!
          </StyledBannerSubtitle>
        </StyledBannerText>
        <Button
          variant="secondary"
          size="md"
          onClick={() => navigate(ROUTE_PATHS.LEADERBOARD)}
        >
          Xem Bảng Xếp Hạng 🏆
        </Button>
      </StyledWelcomeBanner>

      {/* Game Mode Selection */}
      <StyledSection>
        <StyledSectionHeader>
          <StyledSectionTitle>Chọn Chế Độ Chơi</StyledSectionTitle>
        </StyledSectionHeader>

        <StyledModesGrid>
          {GAME_MODES.map((mode) => (
            <StyledModeCard
              key={mode.id}
              $isSelected={selectedModeId === mode.id}
              onClick={() => !isSearching && setSelectedModeId(mode.id)}
            >
              <StyledModeIcon>{mode.icon}</StyledModeIcon>
              <StyledModeName>{mode.name}</StyledModeName>
              <StyledModeTime>{mode.time}</StyledModeTime>
            </StyledModeCard>
          ))}
        </StyledModesGrid>
      </StyledSection>

      {/* Matchmaking Section */}
      <StyledMatchmakingSection>
        {!isSearching ? (
          <>
            <div style={{ fontSize: "40px" }}>♟️</div>
            <div>
              <h3 style={{ margin: "0 0 6px 0", fontSize: "20px" }}>
                Chế độ đã chọn: {selectedMode?.name} ({selectedMode?.time})
              </h3>
              <p style={{ margin: 0, color: "#6E7684", fontSize: "14px" }}>
                {selectedMode?.description}
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartMatchmaking}
              style={{ minWidth: "220px", marginTop: "8px" }}
            >
              Tìm Trận Đấu Ngay ⚔️
            </Button>
          </>
        ) : (
          <StyledSearchingIndicator>
            <div style={{ fontSize: "36px" }}>🔍</div>
            <h3 style={{ margin: 0, fontSize: "20px" }}>
              Đang tìm đối thủ xứng tầm ({selectedMode?.name})...
            </h3>
            <StyledTimerCount>
              {Math.floor(searchDuration / 60)
                .toString()
                .padStart(2, "0")}
              :{(searchDuration % 60).toString().padStart(2, "0")}
            </StyledTimerCount>
            <Button
              variant="danger"
              size="md"
              onClick={handleCancelMatchmaking}
              style={{ marginTop: "8px" }}
            >
              Hủy Tìm Trận
            </Button>
          </StyledSearchingIndicator>
        )}
      </StyledMatchmakingSection>
    </StyledDashboardContainer>
  );
};
