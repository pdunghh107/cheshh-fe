/**
 * ChessHH Typography System
 *
 * Quản lý chuẩn font size, font weight và các biến thể typography dùng trong Styled Components.
 */

// 1. Font Weights
export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  black: 900,
} as const;

// 2. Font Sizes (px scale chuẩn UI Design System)
export const fontSizes = {
  small: "12px", // Caption, helper text, move timestamp
  base: "14px", // Body text mặc định, form input, chat message
  large: "16px", // Subtitle, button text, player name
  xlarge: "20px", // Section header, card title, clock timer
  xxlarge: "24px", // Modal title, match score, rank badge
  xxxlarge: "32px", // Page title, winner announcement
  xxxxlarge: "48px", // Big banner, Elo rating highlight, hero numbers
} as const;

// 3. Typography Presets (Tổ hợp sẵn font size, font weight và line-height tối ưu)
export const typography = {
  // Base scales
  baseRegular: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    lineHeight: "20px",
  },
  baseMedium: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    lineHeight: "20px",
  },
  baseSemibold: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    lineHeight: "20px",
  },
  baseBold: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.bold,
    lineHeight: "20px",
  },
  baseBlack: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.black,
    lineHeight: "20px",
  },

  // Small scales
  smallRegular: {
    fontSize: fontSizes.small,
    fontWeight: fontWeights.regular,
    lineHeight: "16px",
  },
  smallMedium: {
    fontSize: fontSizes.small,
    fontWeight: fontWeights.medium,
    lineHeight: "16px",
  },
  smallSemibold: {
    fontSize: fontSizes.small,
    fontWeight: fontWeights.semibold,
    lineHeight: "16px",
  },

  // Large scales
  largeRegular: {
    fontSize: fontSizes.large,
    fontWeight: fontWeights.regular,
    lineHeight: "24px",
  },
  largeMedium: {
    fontSize: fontSizes.large,
    fontWeight: fontWeights.medium,
    lineHeight: "24px",
  },
  largeSemibold: {
    fontSize: fontSizes.large,
    fontWeight: fontWeights.semibold,
    lineHeight: "24px",
  },
  largeBold: {
    fontSize: fontSizes.large,
    fontWeight: fontWeights.bold,
    lineHeight: "24px",
  },

  // Headings
  h4: {
    fontSize: fontSizes.xlarge,
    fontWeight: fontWeights.semibold,
    lineHeight: "28px",
  },
  h3: {
    fontSize: fontSizes.xxlarge,
    fontWeight: fontWeights.bold,
    lineHeight: "32px",
  },
  h2: {
    fontSize: fontSizes.xxxlarge,
    fontWeight: fontWeights.bold,
    lineHeight: "40px",
  },
  h1: {
    fontSize: fontSizes.xxxxlarge,
    fontWeight: fontWeights.black,
    lineHeight: "56px",
  },
} as const;

export type FontWeight = typeof fontWeights;
export type FontSize = typeof fontSizes;
export type TypographyPreset = typeof typography;
