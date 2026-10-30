import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { getAccessToken } from "./api";

const WS_URL = import.meta.env.VITE_WS_URL || "http://localhost:8000/ws-chess";

/**
 * WebSocket STOMP Client
 *
 * @description Quản lý kết nối WebSocket thời gian thực tập trung cho toàn ứng dụng ChessHH.
 * Hỗ trợ SockJS fallback, tự động đính kèm JWT Token khi handshake và reconnect tự động.
 */
class WebSocketService {
  private client: Client;
  private isConnected = false;

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
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
      },
      onDisconnect: () => {
        this.isConnected = false;
      },
      onStompError: (frame) => {
        console.error("STOMP Error:", frame.headers.message, frame.body);
      },
    });
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
   * Đăng ký lắng nghe 1 topic/queue
   * @param destination Địa chỉ topic hoặc queue (ví dụ: '/user/queue/matchmaking/status')
   * @param callback Hàm xử lý payload khi nhận được tin nhắn
   * @returns Hàm unsubscribe
   */
  public subscribe<T = unknown>(
    destination: string,
    callback: (data: T) => void,
  ): () => void {
    const subscription = this.client.subscribe(destination, (message) => {
      try {
        const parsed = JSON.parse(message.body) as T;
        callback(parsed);
      } catch {
        callback(message.body as unknown as T);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }

  /**
   * Gửi tin nhắn STOMP lên server
   * @param destination Địa chỉ endpoint (ví dụ: '/app/matchmaking/join')
   * @param body Payload gửi đi (object hoặc string)
   */
  public publish(destination: string, body?: unknown): void {
    this.client.publish({
      destination,
      body: body !== undefined ? JSON.stringify(body) : "",
    });
  }
}

export const wsService = new WebSocketService();
export default wsService;
