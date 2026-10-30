import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import { wsService } from "@/services/websocket";

import {
  cancelMatchmakingApi,
  joinMatchmakingApi,
  sendWsCancelQueue,
  sendWsJoinQueue,
  subscribeMatchmakingStatus,
} from "./matchmaking.api";
import type {
  MatchmakingStatus,
  MatchmakingStatusResponse,
} from "./matchmaking.types";

export interface UseMatchmakingReturn {
  status: MatchmakingStatus;
  isSearching: boolean;
  matchData: MatchmakingStatusResponse | null;
  searchDuration: number;
  joinQueue: (useWsAction?: boolean) => Promise<void>;
  cancelQueue: (useWsAction?: boolean) => Promise<void>;
}

/**
 * useMatchmaking Hook
 *
 * @description Hook quản lý toàn bộ luồng tìm trận đấu (Matchmaking) cờ vua thời gian thực.
 * Tích hợp gọi REST API khởi tạo, tự động kích hoạt WebSocket và subscribe `/user/queue/matchmaking/status`.
 *
 * @example
 * const { isSearching, searchDuration, joinQueue, cancelQueue } = useMatchmaking();
 *
 * <Button onClick={() => joinQueue()} isLoading={isSearching}>Tìm trận</Button>
 */
export const useMatchmaking = (): UseMatchmakingReturn => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<MatchmakingStatus>("IDLE");
  const [matchData, setMatchData] =
    useState<MatchmakingStatusResponse | null>(null);
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

  // Kết nối WebSocket và Subscribe /user/queue/matchmaking/status
  useEffect(() => {
    wsService.activate();

    const unsubscribe = subscribeMatchmakingStatus((data) => {
      setStatus(data.status);
      setMatchData(data);

      if (data.status === "MATCHED") {
        toast.success("Đã tìm thấy đối thủ! Đang vào ván đấu...");
        if (data.gameId) {
          navigate(`/game/${data.gameId}`);
        }
      } else if (data.status === "CANCELLED") {
        toast("Đã hủy tìm kiếm trận đấu.");
      } else if (data.status === "ERROR") {
        toast.error(data.message || "Lỗi trong quá trình tìm trận");
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
        setStatus(response.status);
        setMatchData(response);
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
        const response = await cancelMatchmakingApi();
        setStatus(response.status);
        setMatchData(response);
      }
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
