import { Client } from "@stomp/stompjs";

import { getAccessToken } from "./api";

const getBrokerURL = (): string => {
  const envUrl = import.meta.env.VITE_WS_URL || "ws://localhost:8000/ws-chess";
  // Tự động chuyển http:// hoặc https:// thành ws:// hoặc wss:// nếu config nhầm
  return envUrl.replace(/^http/, "ws");
};

interface PendingSubscription {
  id: string;
  destination: string;
  callback: (data: unknown) => void;
  stompSubscription?: { unsubscribe: () => void };
}

/**
 * WebSocket STOMP Client
 *
 * @description Quản lý kết nối WebSocket thời gian thực tập trung cho toàn ứng dụng ChessHH.
 * Sử dụng Native WebSocket (brokerURL ws://) giúp tối ưu hiệu năng, không bị giữ HTTP streaming gây treo xoay tab Chrome.
 * Hỗ trợ hàng đợi subscription tự động khi chưa kết nối (auto resubscribe khi connect/reconnect).
 */
class WebSocketService {
  private client: Client;
  private isConnected = false;
  private subscriptions: Map<string, PendingSubscription> = new Map();
  private subIdCounter = 0;

  constructor() {
    this.client = new Client({
      brokerURL: getBrokerURL(),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      beforeConnect: () => {
        const token = getAccessToken();
        this.client.connectHeaders = {
          Authorization: token ? `Bearer ${token}` : "",
        };
      },
      onConnect: () => {
        this.isConnected = true;
        // Đăng ký lại toàn bộ topic khi STOMP connection sẵn sàng
        this.subscriptions.forEach((sub) => {
          this.executeSubscription(sub);
        });
      },
      onDisconnect: () => {
        this.isConnected = false;
        this.subscriptions.forEach((sub) => {
          sub.stompSubscription = undefined;
        });
      },
      onStompError: (frame) => {
        console.error("STOMP Error:", frame.headers.message, frame.body);
      },
    });
  }

  private executeSubscription(sub: PendingSubscription): void {
    if (!this.client.connected) return;

    try {
      sub.stompSubscription = this.client.subscribe(
        sub.destination,
        (message) => {
          try {
            const parsed = JSON.parse(message.body);
            sub.callback(parsed);
          } catch {
            sub.callback(message.body);
          }
        },
      );
    } catch (err) {
      console.warn("Lỗi khi đăng ký STOMP subscription:", err);
    }
  }

  /**
   * Kích hoạt kết nối WebSocket nếu chưa kết nối
   */
  public activate(): void {
    if (!this.client.active) {
      this.client.activate();
    }
  }

  /**
   * Ngắt kết nối WebSocket
   */
  public deactivate(): Promise<void> {
    return this.client.deactivate();
  }

  /**
   * Kiểm tra trạng thái đã kết nối STOMP broker hay chưa
   */
  public get connected(): boolean {
    return this.isConnected && this.client.connected;
  }

  /**
   * Đăng ký lắng nghe 1 topic/queue.
   * Nếu STOMP chưa kết nối xong, subscription sẽ được đưa vào hàng đợi
   * và tự động subscribe ngay khi handshake thành công.
   *
   * @param destination Địa chỉ topic hoặc queue (ví dụ: '/user/queue/matchmaking/status')
   * @param callback Hàm xử lý payload khi nhận được tin nhắn
   * @returns Hàm unsubscribe
   */
  public subscribe<T = unknown>(
    destination: string,
    callback: (data: T) => void,
  ): () => void {
    const id = `sub-${++this.subIdCounter}`;
    const sub: PendingSubscription = {
      id,
      destination,
      callback: callback as (data: unknown) => void,
    };

    this.subscriptions.set(id, sub);

    if (this.client.connected) {
      this.executeSubscription(sub);
    }

    return () => {
      const existing = this.subscriptions.get(id);
      if (existing?.stompSubscription) {
        existing.stompSubscription.unsubscribe();
      }
      this.subscriptions.delete(id);
    };
  }

  /**
   * Gửi tin nhắn STOMP lên server
   * @param destination Địa chỉ endpoint (ví dụ: '/app/matchmaking/join')
   * @param body Payload gửi đi (object hoặc string)
   */
  public publish(destination: string, body?: unknown): void {
    if (!this.client.connected) {
      console.warn("Chưa kết nối STOMP, bỏ qua publish:", destination);
      return;
    }
    this.client.publish({
      destination,
      body: body !== undefined ? JSON.stringify(body) : "",
    });
  }
}

export const wsService = new WebSocketService();
export default wsService;
