import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import { wsService } from "@/services/websocket";

import {
  cancelMatchmakingApi,
  joinMatchmakingApi,
  sendWsCancelQueue,
  sendWsJoinQueue,
  subscribeMatchFound,
} from "./matchmaking.api";
import type {
  MatchFoundResponse,
  MatchmakingStatus,
} from "./matchmaking.types";

export interface UseMatchmakingReturn {
  status: MatchmakingStatus;
  isSearching: boolean;
  matchData: MatchFoundResponse | null;
  searchDuration: number;
  joinQueue: (useWsAction?: boolean) => Promise<void>;
  cancelQueue: (useWsAction?: boolean) => Promise<void>;
}

/**
 * useMatchmaking Hook
 *
 * @description Hook quản lý toàn bộ luồng tìm trận đấu (Matchmaking) cờ vua thời gian thực.
 * Tích hợp gọi REST API khởi tạo, tự động kích hoạt WebSocket và subscribe `/user/queue/matchmaking`.
 *
 * @example
 * const { isSearching, searchDuration, joinQueue, cancelQueue } = useMatchmaking();
 *
 * <Button onClick={() => joinQueue()} isLoading={isSearching}>Tìm trận</Button>
 */
export const useMatchmaking = (): UseMatchmakingReturn => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<MatchmakingStatus>("IDLE");
  const [matchData, setMatchData] = useState<MatchFoundResponse | null>(null);
  const [searchDuration, setSearchDuration] = useState(0);

  // Bộ đếm thời gian tìm trận
  useEffect(() => {
    if (status !== "QUEUED") return;

    const startTime = Date.now();
    const timer = setInterval(() => {
      setSearchDuration(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [status]);

  // Kết nối WebSocket và Subscribe /user/queue/matchmaking
  useEffect(() => {
    wsService.activate();

    const unsubscribe = subscribeMatchFound((data) => {
      setStatus("MATCHED");
      setMatchData(data);

      toast.success("Ghép trận thành công! Đang vào bàn cờ...");
      if (data.roomId) {
        navigate(`/game/${data.roomId}`);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  // Hành động Tham gia hàng chờ (Mặc định dùng REST POST, có thể tùy chọn qua STOMP WS)
  const joinQueue = useCallback(async (useWsAction = false) => {
    try {
      setStatus("QUEUED");
      if (useWsAction) {
        sendWsJoinQueue();
      } else {
        const response = await joinMatchmakingApi();
        if (response.status) {
          setStatus(response.status);
        }
      }
    } catch (error: unknown) {
      setStatus("ERROR");
      const errorMsg =
        error instanceof Error ? error.message : "Không thể tham gia tìm trận";
      toast.error(errorMsg);
    }
  }, []);

  // Hành động Hủy hàng chờ
  const cancelQueue = useCallback(async (useWsAction = false) => {
    try {
      if (useWsAction) {
        sendWsCancelQueue();
      } else {
        await cancelMatchmakingApi();
      }
      setStatus("CANCELLED");
      toast("Đã hủy tìm kiếm trận đấu.");
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error ? error.message : "Lỗi khi hủy tìm trận";
      toast.error(errorMsg);
    }
  }, []);

  return {
    status,
    isSearching: status === "QUEUED",
    matchData,
    searchDuration,
    joinQueue,
    cancelQueue,
  };
};
