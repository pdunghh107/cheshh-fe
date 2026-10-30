import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { wsService } from "@/services/websocket";

import {
  getGameRoomStateApi,
  sendMoveWs,
  subscribeGameErrors,
  subscribeGameMove,
  subscribeGameOver,
} from "../api/chessGameApi";
import { DEFAULT_INITIAL_POSITION } from "../components/board/Board.constants";
import type { PieceColor, PieceType } from "../components/piece/Piece";
import { isPawnPromote } from "../components/piece/utils/pawn/pawn.constants";
import { getLegalMoves } from "../utils/chessRules";
import { parseFenToPosition } from "../utils/fenParser";

import type { MoveHistoryItem, PendingPromotion } from "./useChessGame";
import type { BoardPosition } from "./useMakeMove";

interface UseRealtimeChessGameProps {
  roomId?: string;
  currentUserId?: string;
}

export const useRealtimeChessGame = ({
  roomId,
  currentUserId,
}: UseRealtimeChessGameProps) => {
  const [position, setPosition] = useState<BoardPosition>(
    DEFAULT_INITIAL_POSITION,
  );
  const [turn, setTurn] = useState<PieceColor>("white");
  const [plyCount, setPlyCount] = useState<number>(0);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [validMoves, setValidMoves] = useState<string[]>([]);
  const [lastMove, setLastMove] = useState<[string, string] | null>(null);
  const [history, setHistory] = useState<MoveHistoryItem[]>([]);
  const [pendingPromotion, setPendingPromotion] =
    useState<PendingPromotion | null>(null);

  // Đồng hồ đếm ngược (ms)
  const [whiteTimeMs, setWhiteTimeMs] = useState<number>(600000);
  const [blackTimeMs, setBlackTimeMs] = useState<number>(600000);
  const [gameStatus, setGameStatus] = useState<string>("ONGOING");
  const [playerColor, setPlayerColor] = useState<PieceColor>("white");

  const plyCountRef = useRef(0);
  useEffect(() => {
    plyCountRef.current = plyCount;
  }, [plyCount]);

  // 1. Khôi phục Game State khi F5 / Reconnect
  useEffect(() => {
    if (!roomId) return;

    let isMounted = true;
    getGameRoomStateApi(roomId)
      .then((state) => {
        if (!isMounted) return;
        setPosition(parseFenToPosition(state.fen));
        setTurn(state.turn === "WHITE" ? "white" : "black");
        setPlyCount(state.plyCount);
        setWhiteTimeMs(state.whiteTimeRemainingMs);
        setBlackTimeMs(state.blackTimeRemainingMs);
        setGameStatus(state.status);

        if (currentUserId) {
          if (currentUserId === state.whiteUserId) {
            setPlayerColor("white");
          } else if (currentUserId === state.blackUserId) {
            setPlayerColor("black");
          }
        }
      })
      .catch((err) => {
        console.warn("Không tải được state phòng cờ:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [roomId, currentUserId]);

  // 2. Đồng hồ đếm lùi thời gian phía Client
  useEffect(() => {
    if (gameStatus !== "ONGOING") return;

    const timer = setInterval(() => {
      if (turn === "white") {
        setWhiteTimeMs((prev) => Math.max(0, prev - 100));
      } else {
        setBlackTimeMs((prev) => Math.max(0, prev - 100));
      }
    }, 100);

    return () => clearInterval(timer);
  }, [turn, gameStatus]);

  // 3. Kết nối WebSocket STOMP và Subscriptions
  useEffect(() => {
    if (!roomId) return;

    wsService.activate();

    // Lắng nghe nước đi hợp lệ broadcast từ Server
    const unsubMove = subscribeGameMove(roomId, (data) => {
      setPosition(parseFenToPosition(data.fen));
      setTurn(data.turn === "WHITE" ? "white" : "black");
      setPlyCount(data.plyCount);
      setWhiteTimeMs(data.whiteTimeRemainingMs);
      setBlackTimeMs(data.blackTimeRemainingMs);
      setGameStatus(data.status);
      setLastMove([data.from, data.to]);

      setSelectedSquare(null);
      setValidMoves([]);

      setHistory((prev) => [
        ...prev,
        {
          from: data.from,
          to: data.to,
          piece: {
            type: (data.promotion?.toLowerCase() as PieceType) || "p",
            color: data.turn === "WHITE" ? "black" : "white",
          },
        },
      ]);
    });

    // Lắng nghe kết thúc trận đấu (Timeout / Checkmate / Resign)
    const unsubGameOver = subscribeGameOver(roomId, (message) => {
      setGameStatus("FINISHED");
      toast(message, { icon: "🏁", duration: 5000 });
    });

    // Lắng nghe lỗi nước đi cá nhân để Rollback
    const unsubError = subscribeGameErrors((err) => {
      toast.error(err.error || "Nước đi không hợp lệ!");
      if (err.currentFen) {
        setPosition(parseFenToPosition(err.currentFen));
      }
      if (err.currentPly !== undefined) {
        setPlyCount(err.currentPly);
      }
      setSelectedSquare(null);
      setValidMoves([]);
    });

    return () => {
      unsubMove();
      unsubGameOver();
      unsubError();
    };
  }, [roomId]);

  // 4. Gửi nước đi lên Backend
  const makeMove = useCallback(
    (from: string, to: string, promotionPieceType?: PieceType) => {
      if (!roomId) return;

      const expectedPly = plyCountRef.current + 1;
      const promotion = promotionPieceType
        ? promotionPieceType.toUpperCase()
        : null;

      sendMoveWs(roomId, {
        from,
        to,
        promotion,
        expectedPly,
      });

      setSelectedSquare(null);
      setValidMoves([]);
    },
    [roomId],
  );

  // 5. Xử lý click chọn ô cờ
  const handleSquareClick = useCallback(
    (square: string) => {
      if (gameStatus !== "ONGOING") return;

      // Chỉ cho phép click nếu tới lượt của người chơi
      if (turn !== playerColor) {
        toast("Chưa tới lượt đi của bạn!", { icon: "⏳" });
        return;
      }

      const piece = position[square];

      // Nếu đã chọn 1 ô trước đó
      if (selectedSquare) {
        if (selectedSquare === square) {
          setSelectedSquare(null);
          setValidMoves([]);
          return;
        }

        // Nếu ô click nằm trong danh sách nước đi hợp lệ
        if (validMoves.includes(square)) {
          const movingPiece = position[selectedSquare];

          // Kiểm tra phong cấp tốt
          if (
            movingPiece?.type === "p" &&
            isPawnPromote(square, movingPiece.color)
          ) {
            setPendingPromotion({
              from: selectedSquare,
              to: square,
              color: movingPiece.color,
            });
            return;
          }

          makeMove(selectedSquare, square);
          return;
        }

        // Nếu click vào một quân cờ khác của chính mình
        if (piece && piece.color === turn) {
          setSelectedSquare(square);
          setValidMoves(getLegalMoves(square, position, lastMove));
          return;
        }

        setSelectedSquare(null);
        setValidMoves([]);
        return;
      }

      // Chọn quân cờ
      if (piece && piece.color === turn) {
        setSelectedSquare(square);
        setValidMoves(getLegalMoves(square, position, lastMove));
      }
    },
    [
      gameStatus,
      turn,
      playerColor,
      position,
      selectedSquare,
      validMoves,
      lastMove,
      makeMove,
    ],
  );

  return {
    position,
    turn,
    plyCount,
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
  };
};
