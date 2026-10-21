import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";
import { useAuth } from "@/features/auth/AuthContext";
import { ROUTE_PATHS } from "@/routes/paths";

/**
 * PlayChessPage Component
 *
 * @description Màn hình chơi cờ vua trực tuyến (Protected Route demo), hiển thị bàn cờ 64 ô, thông tin kỳ thủ và đồng hồ đếm ngược.
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

  const handleLogout = () => {
    logout();
    navigate(ROUTE_PATHS.LOGIN);
  };

  // Tạo lưới 8x8 cho bàn cờ chuẩn
  const rows = [8, 7, 6, 5, 4, 3, 2, 1];
  const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

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

          {/* 64 Squares Board */}
          <StyledChessboard>
            {rows.map((row, rIdx) =>
              cols.map((col, cIdx) => {
                const isLight = (rIdx + cIdx) % 2 === 0;
                return (
                  <StyledSquare
                    key={`${col}${row}`}
                    $isLight={isLight}
                    title={`${col}${row}`}
                  >
                    {/* Render tọa độ viền góc bàn cờ */}
                    {cIdx === 0 && (
                      <StyledRankCoord $isLight={isLight}>
                        {row}
                      </StyledRankCoord>
                    )}
                    {rIdx === 7 && (
                      <StyledFileCoord $isLight={isLight}>
                        {col}
                      </StyledFileCoord>
                    )}

                    {/* Vị trí mẫu vài quân cờ tượng trưng */}
                    {row === 8 && (
                      <StyledPiece $isBlack>
                        {["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"][cIdx]}
                      </StyledPiece>
                    )}
                    {row === 7 && <StyledPiece $isBlack>♟</StyledPiece>}
                    {row === 2 && <StyledPiece>♙</StyledPiece>}
                    {row === 1 && (
                      <StyledPiece>
                        {["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"][cIdx]}
                      </StyledPiece>
                    )}
                  </StyledSquare>
                );
              }),
            )}
          </StyledChessboard>

          {/* Current Player Card */}
          <StyledPlayerBar>
            <StyledAvatar $color={colors.primary.base}>♟</StyledAvatar>
            <StyledInfo>
              <StyledName>{user?.username} (Bạn)</StyledName>
              <StyledElo>Elo {user?.rating}</StyledElo>
            </StyledInfo>
            <StyledClock $isActive>09:45</StyledClock>
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
              <span>Trạng thái:</span>
              <strong style={{ color: colors.primary.light }}>
                Đến lượt bạn đi
              </strong>
            </StyledMetaRow>
          </StyledMatchMeta>

          <StyledMoveHistory>
            <StyledHistoryHeader>
              Biên bản nước đi (Notation)
            </StyledHistoryHeader>
            <StyledMovesList>
              <StyledMoveRow>
                <span>1.</span> <code>e4</code> <code>e5</code>
              </StyledMoveRow>
              <StyledMoveRow>
                <span>2.</span> <code>Nf3</code> <code>Nc6</code>
              </StyledMoveRow>
              <StyledMoveRow>
                <span>3.</span> <code>Bc4</code> <code>Bc5</code>
              </StyledMoveRow>
            </StyledMovesList>
          </StyledMoveHistory>

          <StyledActionButtons>
            <StyledActionButton $variant="draw">Xin hòa cờ</StyledActionButton>
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

const StyledChessboard = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 64px);
  grid-template-rows: repeat(8, 64px);
  overflow: hidden;
  border: 4px solid ${colors.neutral.dark};
  border-radius: 8px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6);

  @media (max-width: 600px) {
    grid-template-columns: repeat(8, 40px);
    grid-template-rows: repeat(8, 40px);
  }
`;

const StyledSquare = styled.div<{ $isLight: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  background-color: ${(props) =>
    props.$isLight ? colors.boardLight.base : colors.boardDark.base};
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${(props) =>
      props.$isLight ? colors.boardLight.light : colors.boardDark.light};
  }
`;

const StyledPiece = styled.span<{ $isBlack?: boolean }>`
  font-size: 42px;
  line-height: 1;
  color: ${(props) => (props.$isBlack ? "#181a1b" : "#ffffff")};
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));

  @media (max-width: 600px) {
    font-size: 26px;
  }
`;

const StyledRankCoord = styled.span<{ $isLight: boolean }>`
  position: absolute;
  top: 2px;
  left: 4px;
  font-size: 10px;
  font-weight: ${fontWeights.bold};
  color: ${(props) =>
    props.$isLight ? colors.boardDark.base : colors.boardLight.base};
`;

const StyledFileCoord = styled.span<{ $isLight: boolean }>`
  position: absolute;
  right: 4px;
  bottom: 2px;
  font-size: 10px;
  font-weight: ${fontWeights.bold};
  color: ${(props) =>
    props.$isLight ? colors.boardDark.base : colors.boardLight.base};
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
