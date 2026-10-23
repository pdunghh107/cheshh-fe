import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";
import { useAuth } from "@/features/auth/useAuth";
import { Board } from "@/features/game/components/board/Board";
import { PromotionBoard } from "@/features/game/components/promotion/PromotionBoard";
import { useChessGame } from "@/features/game/hooks/useChessGame";
import { ROUTE_PATHS } from "@/routes/paths";


/**
 * PlayChessPage Component
 *
 * @description Màn hình chơi cờ vua trực tuyến (Protected Route demo), hiển thị bàn cờ 64 ô qua Board Component, thông tin kỳ thủ và đồng hồ đếm ngược.
 *
 * @example
 * // Sử dụng trong ProtectedRoute:
 * import { PlayChessPage } from '@/features/game/PlayChessPage';
 *
 * <ProtectedRoute>
 *   <PlayChessPage />
 * </ProtectedRoute>
 */

export const PlayChessPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Sử dụng custom hook tự viết useChessGame để quản lý bàn cờ
  const {
    position,
    turn,
    selectedSquare,
    validMoves,
    lastMove,
    checkSquare,
    history,
    pendingPromotion,
    setPendingPromotion,
    handleSquareClick,
    makeMove,
    resetGame,
  } = useChessGame();

  const handleLogout = () => {
    logout();
    navigate(ROUTE_PATHS.LOGIN);
  };


  return (
    <StyledGameLayout>
      {/* Top Navbar */}
      <StyledNavbar>
        <StyledBrand>
          <span style={{ fontSize: "24px" }}>♟</span> ChessHH Arena
        </StyledBrand>
        <StyledUserSection>
          <StyledPlayerBadge>
            <span>👤</span>
            <strong>{user?.username || "Grandmaster"}</strong>
            <StyledEloTag>Elo: {user?.rating || 1800}</StyledEloTag>
          </StyledPlayerBadge>
          <StyledLogoutBtn onClick={handleLogout}>Đăng xuất</StyledLogoutBtn>
        </StyledUserSection>
      </StyledNavbar>

      {/* Main Game Stage */}
      <StyledStageContainer>
        {/* Left / Center: Chessboard Area */}
        <StyledBoardWrapper>
          {/* Opponent Card */}
          <StyledPlayerBar>
            <StyledAvatar $color={colors.red.base}>🤖</StyledAvatar>
            <StyledInfo>
              <StyledName>Magnus_Bot (AI Grandmaster)</StyledName>
              <StyledElo>Elo 2800</StyledElo>
            </StyledInfo>
            <StyledClock>10:00</StyledClock>
          </StyledPlayerBar>

          {/* Reusable Chessboard Component with Promotion Overlay */}
          <div style={{ position: "relative", width: "fit-content" }}>
            <Board
              orientation="white"
              position={position}
              selectedSquare={selectedSquare}
              validMoves={validMoves}
              lastMove={lastMove}
              checkSquare={checkSquare}
              onSquareClick={handleSquareClick}
            />

            {pendingPromotion && (
              <PromotionBoard
                targetSquare={pendingPromotion.to}
                color={pendingPromotion.color}
                orientation="white"
                onSelect={(pieceType) => {
                  makeMove(pendingPromotion.from, pendingPromotion.to, pieceType);
                  setPendingPromotion(null);
                }}
                onCancel={() => setPendingPromotion(null)}
              />
            )}
          </div>

          {/* Current Player Card */}
          <StyledPlayerBar>
            <StyledAvatar $color={colors.primary.base}>♟</StyledAvatar>
            <StyledInfo>
              <StyledName>{user?.username} (Bạn)</StyledName>
              <StyledElo>Elo {user?.rating}</StyledElo>
            </StyledInfo>
            <StyledClock $isActive={turn === "white"}>09:45</StyledClock>
          </StyledPlayerBar>
        </StyledBoardWrapper>

        {/* Right Sidebar: Match Control & Game Notation */}
        <StyledControlSidebar>
          <StyledSidebarHeader>Trạng thái ván đấu</StyledSidebarHeader>
          <StyledMatchMeta>
            <StyledMetaRow>
              <span>Thời gian:</span>
              <strong>10 phút (Rapid)</strong>
            </StyledMetaRow>
            <StyledMetaRow>
              <span>Lượt đi:</span>
              <strong style={{ color: turn === "white" ? colors.primary.light : colors.warning.light }}>
                {turn === "white" ? "Quân Trắng (Bạn)" : "Quân Đen (Đối thủ)"}
              </strong>
            </StyledMetaRow>
          </StyledMatchMeta>

          <StyledMoveHistory>
            <StyledHistoryHeader>
              Biên bản nước đi ({history.length} nước)
            </StyledHistoryHeader>
            <StyledMovesList>
              {history.length === 0 ? (
                <span style={{ color: colors.neutral.base, fontStyle: "italic" }}>
                  Chưa có nước đi nào. Bấm vào quân cờ để bắt đầu!
                </span>
              ) : (
                history.map((m, idx) => (
                  <StyledMoveRow key={idx}>
                    <span>{idx + 1}.</span>{" "}
                    <code>
                      {m.piece.type.toUpperCase()}: {m.from} → {m.to}
                    </code>
                    {m.captured && (
                      <span style={{ color: colors.danger.light, fontSize: "11px" }}>
                        (Ăn {m.captured.type.toUpperCase()})
                      </span>
                    )}
                  </StyledMoveRow>
                ))
              )}
            </StyledMovesList>
          </StyledMoveHistory>

          <StyledActionButtons>
            <StyledActionButton $variant="draw" onClick={resetGame}>
              Ván mới
            </StyledActionButton>
            <StyledActionButton $variant="resign">Đầu hàng</StyledActionButton>
          </StyledActionButtons>
        </StyledControlSidebar>
      </StyledStageContainer>
    </StyledGameLayout>
  );
};

export default PlayChessPage;

// Styled Components
const StyledGameLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${colors.neutral.darkest};
  color: ${colors.neutral.lightest};
`;

const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 24px;
  background-color: ${colors.neutral.dark};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const StyledBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: ${fontSizes.large};
  font-weight: ${fontWeights.bold};
  color: ${colors.primary.light};
`;

const StyledUserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StyledPlayerBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  font-size: ${fontSizes.small};
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 8px;
`;

const StyledEloTag = styled.span`
  padding: 2px 6px;
  font-weight: ${fontWeights.semibold};
  background-color: ${colors.primary.darkest};
  color: ${colors.primary.light};
  border-radius: 4px;
`;

const StyledLogoutBtn = styled.button`
  padding: 6px 12px;
  font-size: ${fontSizes.small};
  background: transparent;
  color: ${colors.neutral.light};
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${colors.danger.darkest};
    color: ${colors.danger.light};
    border-color: ${colors.danger.dark};
  }
`;

const StyledStageContainer = styled.main`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  gap: 32px;
  padding: 32px;

  @media (max-width: 960px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledBoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledPlayerBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background-color: ${colors.neutral.dark};
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
`;

const StyledAvatar = styled.div<{ $color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  font-size: 18px;
  background-color: ${(props) => props.$color};
  border-radius: 8px;
`;

const StyledInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const StyledName = styled.span`
  font-size: ${fontSizes.base};
  font-weight: ${fontWeights.bold};
`;

const StyledElo = styled.span`
  font-size: ${fontSizes.small};
  color: ${colors.neutral.light};
`;

const StyledClock = styled.div<{ $isActive?: boolean }>`
  padding: 6px 12px;
  font-family: monospace;
  font-size: ${fontSizes.xlarge};
  font-weight: ${fontWeights.bold};
  background-color: ${(props) =>
    props.$isActive ? colors.primary.darkest : colors.neutral.darkest};
  color: ${(props) =>
    props.$isActive ? colors.primary.light : colors.neutral.light};
  border: 1px solid
    ${(props) => (props.$isActive ? colors.primary.dark : "transparent")};
  border-radius: 6px;
`;

const StyledControlSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 320px;
  padding: 24px;
  background-color: ${colors.neutral.dark};
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
`;

const StyledSidebarHeader = styled.h3`
  margin: 0;
  padding-bottom: 12px;
  font-size: ${fontSizes.large};
  font-weight: ${fontWeights.bold};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const StyledMatchMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: ${fontSizes.small};
`;

const StyledMetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.neutral.light};
`;

const StyledMoveHistory = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background-color: ${colors.neutral.darkest};
  border-radius: 8px;
`;

const StyledHistoryHeader = styled.span`
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.semibold};
  color: ${colors.neutral.light};
`;

const StyledMovesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: ${fontSizes.small};
`;

const StyledMoveRow = styled.div`
  display: flex;
  gap: 16px;
  color: ${colors.neutral.light};

  code {
    font-weight: ${fontWeights.semibold};
    color: ${colors.neutral.lightest};
  }
`;

const StyledActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledActionButton = styled.button<{ $variant: "draw" | "resign" }>`
  flex: 1;
  padding: 10px;
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.semibold};
  background-color: ${(props) =>
    props.$variant === "draw" ? colors.warning.darkest : colors.danger.darkest};
  color: ${(props) =>
    props.$variant === "draw" ? colors.warning.light : colors.danger.light};
  border: 1px solid
    ${(props) =>
      props.$variant === "draw" ? colors.warning.dark : colors.danger.dark};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;
