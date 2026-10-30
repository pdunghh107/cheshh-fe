import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";

import { Logo } from "./Logo";
import {
  CLOSE_LABEL,
  FIXED_SIDEBAR_ITEMS,
  OPEN_LABEL,
} from "./Sidebar.constants";
import {
  StyledCollapseButton,
  StyledExpandChevron,
  StyledItemBadge,
  StyledItemIcon,
  StyledItemLabel,
  StyledNavItemButton,
  StyledNavList,
  StyledSidebarContainer,
  StyledSidebarFooter,
  StyledSidebarHeader,
  StyledSubNavItem,
  StyledSubNavList,
} from "./Sidebar.styles";
import type { NavItem, SidebarProps, SubNavItem } from "./Sidebar.types";

/**
 * Sidebar Component
 *
 * @description Sidebar điều hướng chuẩn của ChessHH, hỗ trợ thu gọn/mở rộng (collapse), logo uppercase "CHESSHH", và các mục có thể expand/collapse theo cấp cha-con (ví dụ mục 4 mở rộng ra 4.1 -> 4.5).
 *
 * @example
 * // 1. Usage mặc định với fixed items:
 * import { Sidebar } from '@/components/Sidebar';
 *
 * <Sidebar />
 *
 * // 2. Usage với expanded mặc định và toggle collapse bên ngoài:
 * const [isCollapsed, setIsCollapsed] = useState(false);
 *
 * <Sidebar
 *   isCollapsed={isCollapsed}
 *   onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
 *   defaultExpandedIds={['game-modes']}
 * />
 */
export const Sidebar: React.FC<SidebarProps> = ({
  className,
  isCollapsed: controlledCollapsed,
  onToggleCollapse,
  items = FIXED_SIDEBAR_ITEMS,
  defaultExpandedIds = ["game-modes"],
  footerContent,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Quản lý trạng thái đóng/mở thu gọn sidebar nếu không truyền từ props ngoài
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = controlledCollapsed ?? internalCollapsed;

  const handleToggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalCollapsed((prev) => !prev);
    }
  };

  // Quản lý danh sách các mục đang được expand
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpandedIds);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleItemClick = (item: NavItem) => {
    if (item.children && item.children.length > 0) {
      // Nếu item có các mục con (expandable) -> Bật/tắt mở rộng
      toggleExpand(item.id);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleSubItemClick = (subItem: SubNavItem) => {
    if (subItem.path) {
      navigate(subItem.path);
    }
  };

  return (
    <StyledSidebarContainer className={className} $isCollapsed={isCollapsed}>
      {/* Header với Logo CHESSHH */}
      <StyledSidebarHeader>
        <Logo isCollapsed={isCollapsed} size="lg" />
      </StyledSidebarHeader>

      {/* Nút thu gọn / mở rộng nằm chính giữa border phải */}
      <StyledCollapseButton
        onClick={handleToggleCollapse}
        aria-label={isCollapsed ? OPEN_LABEL : CLOSE_LABEL}
        title={isCollapsed ? OPEN_LABEL : CLOSE_LABEL}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </StyledCollapseButton>

      {/* Danh sách các Menu Items */}
      <StyledNavList>
        {items.map((item) => {
          const hasChildren = Boolean(
            item.children && item.children.length > 0,
          );
          const isExpanded = expandedIds.includes(item.id);
          const isParentActive =
            Boolean(item.path && location.pathname === item.path) ||
            Boolean(
              item.children?.some((child) => location.pathname === child.path),
            );

          return (
            <div key={item.id}>
              <StyledNavItemButton
                onClick={() => handleItemClick(item)}
                $isActive={isParentActive}
                $isCollapsed={isCollapsed}
                $hasChildren={hasChildren}
                $isExpanded={isExpanded}
                title={isCollapsed ? item.label : undefined}
              >
                {item.icon && <StyledItemIcon>{item.icon}</StyledItemIcon>}
                {!isCollapsed && (
                  <>
                    <StyledItemLabel>{item.label}</StyledItemLabel>
                    {item.badge && (
                      <StyledItemBadge>{item.badge}</StyledItemBadge>
                    )}
                    {hasChildren && (
                      <StyledExpandChevron $isExpanded={isExpanded}>
                        <ChevronUp size={14} />
                      </StyledExpandChevron>
                    )}
                  </>
                )}
              </StyledNavItemButton>

              {/* Sub-items (Expandable) khi không bị thu gọn */}
              {!isCollapsed && hasChildren && (
                <StyledSubNavList $isExpanded={isExpanded}>
                  {item.children?.map((sub) => {
                    const isSubActive = location.pathname === sub.path;
                    return (
                      <StyledSubNavItem
                        key={sub.id}
                        onClick={() => handleSubItemClick(sub)}
                        $isActive={isSubActive}
                      >
                        {sub.icon && (
                          <StyledItemIcon style={{ fontSize: "14px" }}>
                            {sub.icon}
                          </StyledItemIcon>
                        )}
                        <StyledItemLabel>{sub.label}</StyledItemLabel>
                        {sub.badge && (
                          <StyledItemBadge>{sub.badge}</StyledItemBadge>
                        )}
                      </StyledSubNavItem>
                    );
                  })}
                </StyledSubNavList>
              )}
            </div>
          );
        })}
      </StyledNavList>

      {/* Footer tùy chọn */}
      {footerContent && (
        <StyledSidebarFooter>{footerContent}</StyledSidebarFooter>
      )}
    </StyledSidebarContainer>
  );
};
