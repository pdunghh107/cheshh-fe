import { fontSizes } from "@/commons/fonts";
import { ROUTE_PATHS } from "@/routes/paths";

import type { NavItem } from "./Sidebar.types";

/**
 * Danh sách menu cố định ban đầu (Fixed Navigation Items)
 * 3 item đầu không có expand, item thứ 4 có expand mở ra các item con 4.1 -> 4.5
 */
export const FIXED_SIDEBAR_ITEMS: NavItem[] = [
  {
    id: "play",
    label: "Chơi Cờ",
    path: ROUTE_PATHS.PLAY,
    icon: "♟",
  },
  {
    id: "leaderboard",
    label: "Bảng Xếp Hạng",
    path: ROUTE_PATHS.LEADERBOARD,
    icon: "🏆",
  },
  {
    id: "profile",
    label: "Hồ Sơ Cá Nhân",
    path: ROUTE_PATHS.PROFILE,
    icon: "👤",
  },
  {
    id: "game-modes",
    label: "Chế Độ Chơi",
    icon: "⚔️",
    badge: "5",
    children: [
      {
        id: "mode-bullet",
        label: "4.1 Chớp Nhoáng (Bullet 1m)",
        path: "/modes/bullet",
        icon: "⚡",
      },
      {
        id: "mode-blitz",
        label: "4.2 Cờ Chớp (Blitz 3m/5m)",
        path: "/modes/blitz",
        icon: "🔥",
      },
      {
        id: "mode-rapid",
        label: "4.3 Cờ Nhanh (Rapid 10m)",
        path: "/modes/rapid",
        icon: "⏱",
      },
      {
        id: "mode-bot",
        label: "4.4 Đấu Với Máy (AI Bot)",
        path: "/modes/bot",
        icon: "🤖",
      },
      {
        id: "mode-custom",
        label: "4.5 Tùy Chỉnh Phòng Đấu",
        path: "/modes/custom",
        icon: "⚙️",
      },
    ],
  },
];

/**
 * Mảng động có thể mở rộng (Dynamic navigation registry)
 */
let dynamicSidebarItems: NavItem[] = [...FIXED_SIDEBAR_ITEMS];

/**
 * Thêm một Navigation Item mới vào danh sách menu
 *
 * @param item NavItem cần thêm mới vào Sidebar
 */
export const addNavigationItem = (item: NavItem): void => {
  const existingIndex = dynamicSidebarItems.findIndex((i) => i.id === item.id);
  if (existingIndex >= 0) {
    dynamicSidebarItems[existingIndex] = item;
  } else {
    dynamicSidebarItems.push(item);
  }
};

/**
 * Bổ sung sub-item vào một item cha đã có sẵn
 *
 * @param parentId ID của mục cha (ví dụ 'game-modes')
 * @param subItem Mục con cần gắn vào
 */
export const addSubNavigationItem = (
  parentId: string,
  subItem: NonNullable<NavItem["children"]>[number],
): void => {
  const parent = dynamicSidebarItems.find((i) => i.id === parentId);
  if (parent) {
    if (!parent.children) {
      parent.children = [];
    }
    const existingSub = parent.children.findIndex((s) => s.id === subItem.id);
    if (existingSub >= 0) {
      parent.children[existingSub] = subItem;
    } else {
      parent.children.push(subItem);
    }
  }
};

/**
 * Lấy toàn bộ danh sách menu hiện tại (bao gồm fixed và dynamic)
 */
export const getSidebarItems = (): NavItem[] => {
  return [...dynamicSidebarItems];
};

/**
 * Đặt lại danh sách về mặc định fixed items
 */
export const resetSidebarItems = (): void => {
  dynamicSidebarItems = [...FIXED_SIDEBAR_ITEMS];
};

export const OPEN_LABEL = "Mở rộng thanh điều hướng";
export const CLOSE_LABEL = "Thu gọn thanh điều hướng";

export type LogoSize = "md" | "lg" | "xl";

export const LOGO_FONT_SIZES: Record<LogoSize, string> = {
  md: fontSizes.large,
  lg: fontSizes.xlarge,
  xl: fontSizes.xxlarge,
};
