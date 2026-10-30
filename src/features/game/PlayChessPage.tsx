import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";
import { Board } from "@/features/game/components/board/Board";
import { PromotionBoard } from "@/features/game/components/promotion/PromotionBoard";
import { useRealtimeChessGame } from "@/features/game/hooks/useRealtimeChessGame";
import { useAppSelector } from "@/store";

/**
 * Format milliseconds sang chuỗi mm:ss
 */
const formatTime = (timeMs: number): string => {
  const totalSeconds = Math.max(0, Math.floor(timeMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

/**
 * PlayChessPage Component
 *
 * @description Màn hình chơi cờ vua trực tuyến thời gian thực (Realtime), đồng bộ nước đi và đồng hồ đếm ngược với Backend WebSocket STOMP.
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
  const { gameId } = useParams<{ gameId?: string }>();
  const user = useAppSelector((state) => state.auth.user);

  // Hook kết nối WebSocket STOMP, đồng bộ nước đi và countdown time
  const {
    position,
    turn,
    selectedSquare,
    validMoves,
    lastMove,
    history,
    pendingPromotion,
    setPendingPromotion,
    whiteTimeMs,
    blackTimeMs,
    gameStatus,
    playerColor,
    handleSquareClick,
    makeMove,
  } = useRealtimeChessGame({
    roomId: gameId,
    currentUserId: user?.id,
  });

  const isWhitePlayer = playerColor === "white";
  const myTimeMs = isWhitePlayer ? whiteTimeMs : blackTimeMs;
  const opponentTimeMs = isWhitePlayer ? blackTimeMs : whiteTimeMs;
  const isMyTurn = turn === playerColor;

  return (
    <StyledGameLayout>
      {/* Main Game Stage */}
      <StyledStageContainer>
        {/* Left / Center: Chessboard Area */}
        <StyledBoardWrapper>
          {/* Opponent Card (Top) */}
          <StyledPlayerBar>
            <StyledAvatar $color={colors.red.base}>♟</StyledAvatar>
            <StyledInfo>
              <StyledName>
                {isWhitePlayer ? "Đối thủ (Quân Đen)" : "Đối thủ (Quân Trắng)"}
              </StyledName>
              <StyledElo>Phòng: {gameId || "Luyện tập"}</StyledElo>
            </StyledInfo>
            <StyledClock $isActive={turn !== playerColor && gameStatus === "ONGOING"}>
              {formatTime(opponentTimeMs)}
            </StyledClock>
          </StyledPlayerBar>

          {/* Reusable Chessboard Component with Promotion Overlay */}
          <div style={{ position: "relative", width: "fit-content" }}>
            <Board
              orientation={playerColor}
              position={position}
              selectedSquare={selectedSquare}
              validMoves={validMoves}
              lastMove={lastMove}
              onSquareClick={handleSquareClick}
            />

            {pendingPromotion && (
              <PromotionBoard
                targetSquare={pendingPromotion.to}
                color={pendingPromotion.color}
                orientation={playerColor}
                onSelect={(pieceType) => {
                  makeMove(pendingPromotion.from, pendingPromotion.to, pieceType);
                  setPendingPromotion(null);
                }}
                onCancel={() => setPendingPromotion(null)}
              />
            )}
          </div>

          {/* Current Player Card (Bottom) */}
          <StyledPlayerBar>
            <StyledAvatar $color={colors.primary.base}>♟</StyledAvatar>
            <StyledInfo>
              <StyledName>
                {user?.username || "Bạn"} ({playerColor === "white" ? "Quân Trắng" : "Quân Đen"})
              </StyledName>
              <StyledElo>Elo: {user?.rating ?? 1200}</StyledElo>
            </StyledInfo>
            <StyledClock $isActive={isMyTurn && gameStatus === "ONGOING"}>
              {formatTime(myTimeMs)}
            </StyledClock>
          </StyledPlayerBar>
        </StyledBoardWrapper>

        {/* Right Sidebar: Match Control & Game Notation */}
        <StyledControlSidebar>
          <StyledSidebarHeader>Trạng thái ván đấu</StyledSidebarHeader>
          <StyledMatchMeta>
            <StyledMetaRow>
              <span>Trạng thái:</span>
              <strong style={{ color: gameStatus === "ONGOING" ? colors.primary.base : colors.danger.base }}>
                {gameStatus === "ONGOING" ? "Đang thi đấu" : gameStatus}
              </strong>
            </StyledMetaRow>
            <StyledMetaRow>
              <span>Phe của bạn:</span>
              <strong>{playerColor === "white" ? "Trắng (Đi trước)" : "Đen (Đi sau)"}</strong>
            </StyledMetaRow>
            <StyledMetaRow>
              <span>Lượt đi hiện tại:</span>
              <strong style={{ color: isMyTurn ? colors.primary.base : colors.warning.base }}>
                {turn === "white" ? "Quân Trắng" : "Quân Đen"} {isMyTurn ? "(Lượt của bạn)" : "(Đối thủ)"}
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
                      <span style={{ color: colors.danger.base, fontSize: "11px" }}>
                        (Ăn {m.captured.type.toUpperCase()})
                      </span>
                    )}
                  </StyledMoveRow>
                ))
              )}
            </StyledMovesList>
          </StyledMoveHistory>

          <StyledActionButtons>
            <StyledActionButton $variant="draw" onClick={() => window.location.reload()}>
              Làm mới ván
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
  flex: 1;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: ${colors.neutral.lightest};
  color: ${colors.neutral.darkest};
`;

const StyledStageContainer = styled.main`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  gap: 32px;
  width: 100%;
  height: 100%;
  padding: 32px 24px;
  box-sizing: border-box;

  @media (max-width: 960px) {
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
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
  background-color: #ffffff;
  color: ${colors.neutral.darkest};
  border: 1px solid ${colors.neutral.light};
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
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
  color: ${colors.neutral.darkest};
`;

const StyledElo = styled.span`
  font-size: ${fontSizes.small};
  color: ${colors.neutral.base};
`;

const StyledClock = styled.div<{ $isActive?: boolean }>`
  padding: 6px 12px;
  font-family: monospace;
  font-size: ${fontSizes.xlarge};
  font-weight: ${fontWeights.bold};
  background-color: ${(props) =>
    props.$isActive ? colors.primary.lightest : colors.neutral.lightest};
  color: ${(props) =>
    props.$isActive ? colors.primary.darkest : colors.neutral.darkest};
  border: 1px solid
    ${(props) => (props.$isActive ? colors.primary.light : colors.neutral.light)};
  border-radius: 6px;
`;

const StyledControlSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 320px;
  max-height: min(calc(100vh - 120px), 740px);
  padding: 20px;
  box-sizing: border-box;
  background-color: #ffffff;
  color: ${colors.neutral.darkest};
  border: 1px solid ${colors.neutral.light};
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);

  @media (max-width: 960px) {
    width: min(90vw, 520px);
    max-height: none;
  }
`;

const StyledSidebarHeader = styled.h3`
  margin: 0;
  padding-bottom: 12px;
  font-size: ${fontSizes.large};
  font-weight: ${fontWeights.bold};
  color: ${colors.neutral.darkest};
  border-bottom: 1px solid ${colors.neutral.lightest};
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
  color: ${colors.neutral.base};

  strong {
    color: ${colors.neutral.darkest};
  }
`;

const StyledMoveHistory = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background-color: ${colors.neutral.lightest};
  border: 1px solid ${colors.neutral.light};
  border-radius: 8px;
`;

const StyledHistoryHeader = styled.span`
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.semibold};
  color: ${colors.neutral.dark};
`;

const StyledMovesList = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 6px;
  max-height: 180px;
  overflow-y: auto;
  font-size: ${fontSizes.small};
`;

const StyledMoveRow = styled.div`
  display: flex;
  gap: 16px;
  color: ${colors.neutral.base};

  code {
    font-weight: ${fontWeights.semibold};
    color: ${colors.neutral.darkest};
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
    props.$variant === "draw" ? colors.warning.lightest : colors.danger.lightest};
  color: ${(props) =>
    props.$variant === "draw" ? colors.warning.darkest : colors.danger.darkest};
  border: 1px solid
    ${(props) =>
      props.$variant === "draw" ? colors.warning.light : colors.danger.light};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.$variant === "draw" ? colors.warning.light : colors.danger.light};
    opacity: 0.9;
  }
`;
