export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Đăng nhập thành công!",
  LOGIN_FAILED:
    "Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản hoặc mật khẩu!",
  REGISTER_SUCCESS: "Đăng ký tài khoản thành công!",
  REGISTER_FAILED:
    "Đăng ký thất bại. Tên người dùng hoặc email có thể đã được sử dụng!",
  LOGOUT_SUCCESS: "Đăng xuất thành công!",
  LOGOUT_FAILED: "Đăng xuất thất bại. Vui lòng thử lại!",
  SESSION_EXPIRED: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!",
  AUTHENTICATION_REQUIRED: "Bạn cần đăng nhập để truy cập tính năng này!",
} as const;

export const CHESS_MESSAGES = {
  GAME_START: "Ván đấu bắt đầu!",
  CHECK: "Chiếu tướng!",
  CHECKMATE: "Chiếu hết! Trận đấu kết thúc.",
  STALEMATE: "Hòa cờ (Hết nước đi hợp lệ).",
  DRAW_AGREED: "Hai bên chấp thuận hòa cờ.",
  RESIGN: "Đối thủ đã xin hàng.",
  TIMEOUT: "Hết giờ thi đấu!",
  INVALID_MOVE: "Nước đi không hợp lệ!",
  OPPONENT_DISCONNECTED: "Đối thủ đã mất kết nối. Đang chờ kết nối lại...",
  RECONNECTING: "Đang kết nối lại phòng thi đấu...",
  RECONNECTED: "Đã kết nối lại thành công!",
} as const;

export const SYSTEM_MESSAGES = {
  OPERATION_SUCCESS: "Thao tác thành công!",
  OPERATION_FAILED: "Thao tác thất bại. Vui lòng thử lại sau!",
  SERVER_CONNECTION_ERROR:
    "Không thể kết nối đến máy chủ Backend. Vui lòng kiểm tra lại dịch vụ!",
  NETWORK_ERROR:
    "Lỗi kết nối mạng. Vui lòng kiểm tra lại đường truyền internet!",
  UNKNOWN_ERROR: "Đã có lỗi không xác định xảy ra. Vui lòng thử lại sau!",
  UNAUTHORIZED: "Bạn không có quyền thực hiện thao tác này!",
} as const;
