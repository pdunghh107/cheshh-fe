/**
 * ChessHH Color Palette System
 *
 * Mỗi nhóm màu được thiết kế với 5 sắc độ chuẩn:
 * lightest -> light -> base -> dark -> darkest
 * Không sử dụng màu CSS cơ bản (mã màu hex được căn chỉnh theo HSL hài hòa, hiện đại).
 */

export interface ColorShades {
  lightest: string;
  light: string;
  base: string;
  dark: string;
  darkest: string;
}

export const colors = {
  // 1. Primary (Màu thương hiệu / UI chủ đạo theo tone Xanh lá cờ vua)
  primary: {
    lightest: "#EBF7EE", // Background tint, badge hover
    light: "#86D993", // Border focus, hover button
    base: "#38A14E", // Brand CTA, active states, buttons
    dark: "#277A3A", // Hover primary, pressed state
    darkest: "#14461F", // Text on light green, deep accents
  },

  // Green riêng biệt trong vòng thuần sắc (được duplicate code theo yêu cầu cho các ngữ cảnh riêng)
  green: {
    lightest: "#EBF7EE",
    light: "#86D993",
    base: "#38A14E",
    dark: "#277A3A",
    darkest: "#14461F",
  },

  // 2. Secondary (Xanh ngọc / Mint - Tương phản hỗ trợ cho tone Green chủ đạo)
  secondary: {
    lightest: "#E6FAF8",
    light: "#7FE3D6",
    base: "#1DBFA7",
    dark: "#138C7B",
    darkest: "#0A5248",
  },

  // ----------------------------------------------------
  // VÒNG THUẦN SẮC / CÁC MÀU TRONG BÁNH XE MÀU (COLOR WHEEL)
  // ----------------------------------------------------

  // Vàng lục / Lime (Chuyển tiếp giữa Vàng và Xanh lá)
  lime: {
    lightest: "#F4FCE3",
    light: "#BFE765",
    base: "#88C222",
    dark: "#638F14",
    darkest: "#3C5708",
  },

  // Vàng (Yellow)
  yellow: {
    lightest: "#FEF9E7",
    light: "#FAD865",
    base: "#F4B717",
    dark: "#BD8808",
    darkest: "#6E4E02",
  },

  // Cam (Orange)
  orange: {
    lightest: "#FFF3E8",
    light: "#FDB678",
    base: "#EE771A",
    dark: "#B5540B",
    darkest: "#6B2F04",
  },

  // Đỏ (Red)
  red: {
    lightest: "#FDECEE",
    light: "#F88590",
    base: "#E5384B",
    dark: "#AD1E2E",
    darkest: "#630D17",
  },

  // Hồng / Magenta (Pink)
  pink: {
    lightest: "#FCEEF7",
    light: "#F487CE",
    base: "#DB349F",
    dark: "#9F1B71",
    darkest: "#5E0D42",
  },

  // Tím (Purple / Violet)
  purple: {
    lightest: "#F5EEFC",
    light: "#C790F3",
    base: "#9340D8",
    dark: "#6A23A1",
    darkest: "#401164",
  },

  // Xanh chàm (Indigo)
  indigo: {
    lightest: "#EEF2FC",
    light: "#9EAEF5",
    base: "#5867DD",
    dark: "#3A47AC",
    darkest: "#202A6F",
  },

  // Xanh dương (Blue)
  blue: {
    lightest: "#EBF4FE",
    light: "#86BDFB",
    base: "#2D82E8",
    dark: "#1A5DB1",
    darkest: "#0D366B",
  },

  // Xanh lơ (Cyan / Teal)
  cyan: {
    lightest: "#E5FAFC",
    light: "#76DFEB",
    base: "#17ABC0",
    dark: "#0E7A8A",
    darkest: "#074852",
  },

  // ----------------------------------------------------
  // SEMANTIC / FEEDBACK COLORS
  // ----------------------------------------------------

  // Danger (Cảnh báo chiếu tướng, nước đi sai, thua trận)
  danger: {
    lightest: "#FDECEE",
    light: "#F88590",
    base: "#E5384B",
    dark: "#AD1E2E",
    darkest: "#630D17",
  },

  // Warning (Cảnh báo hết giờ, lời mời hòa cờ, timeout warning)
  warning: {
    lightest: "#FFF8E6",
    light: "#FDCB58",
    base: "#F49B15",
    dark: "#B86D07",
    darkest: "#6E3E02",
  },

  // Success (Nước đi hợp lệ, thắng trận, tăng điểm Elo)
  success: {
    lightest: "#EBF7EE",
    light: "#86D993",
    base: "#38A14E",
    dark: "#277A3A",
    darkest: "#14461F",
  },

  // Info (Thông báo phòng đấu, tin nhắn chat, gợi ý)
  info: {
    lightest: "#EBF4FE",
    light: "#86BDFB",
    base: "#2D82E8",
    dark: "#1A5DB1",
    darkest: "#0D366B",
  },

  // ----------------------------------------------------
  // MÀU BÀN CỜ ĐẶC THÙ CHO CHESS (CHESSBOARD PALETTE)
  // ----------------------------------------------------

  // Ô sáng của bàn cờ (Warm cream / Off-white tone)
  boardLight: {
    lightest: "#FFFFFF", // Highlight ô cờ khi hover
    light: "#F2F5E8", // Gợi ý ô đi được
    base: "#EBECD0", // Màu chuẩn của ô trắng bàn cờ
    dark: "#D0D2B0", // Ô cờ khi được chọn
    darkest: "#A9AB88", // Viền / nhãn tọa độ ô trắng
  },

  // Ô tối của bàn cờ (Classic Green Chessboard tone phong cách cờ quốc tế)
  boardDark: {
    lightest: "#A7C686", // Highlight ô cờ khi hover
    light: "#8EB467", // Gợi ý ô đi được
    base: "#739552", // Màu chuẩn của ô xanh bàn cờ
    dark: "#58743C", // Ô cờ khi được chọn
    darkest: "#3D5228", // Viền / nhãn tọa độ ô xanh
  },

  // ----------------------------------------------------
  // NEUTRALS & SURFACES (DARK MODE & LIGHT MODE CHESS UI)
  // ----------------------------------------------------

  // Neutrals (Gray scale tinh chỉnh, ngả xanh đen lạnh sang trọng)
  neutral: {
    lightest: "#F8F9FA", // Background light mode, card sáng
    light: "#D3D6DC", // Border, divider, icon inactive
    base: "#6E7684", // Secondary text, placeholders
    dark: "#2E3440", // Card surfaces dark mode, navigation
    darkest: "#191C24", // Background chính dark mode, modal overlay
  },
} as const;

export type ColorPalette = typeof colors;
export type ColorFamily = keyof ColorPalette;
