import type { ReactNode } from "react";

export interface SubNavItem {
  id: string;
  label: string;
  path: string;
  icon?: ReactNode;
  badge?: string | number;
}

export interface NavItem {
  id: string;
  label: string;
  path?: string;
  icon?: ReactNode;
  badge?: string | number;
  children?: SubNavItem[];
}

export interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  items?: NavItem[];
  defaultExpandedIds?: string[];
  footerContent?: ReactNode;
}

export interface StyledSidebarProps {
  $isCollapsed?: boolean;
}

export interface StyledNavItemProps {
  $isActive?: boolean;
  $isCollapsed?: boolean;
  $hasChildren?: boolean;
  $isExpanded?: boolean;
}
