import styled, { css } from "styled-components";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";

import type { StyledNavItemProps, StyledSidebarProps } from "./Sidebar.types";

export const StyledSidebarContainer = styled.aside<StyledSidebarProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.$isCollapsed ? "72px" : "260px")};
  height: 100vh;
  padding: 16px 12px;
  box-sizing: border-box;
  user-select: none;
  background-color: #ffffff;
  border-right: 1px solid ${colors.neutral.light};
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.03);
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const StyledSidebarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${colors.neutral.lightest};
`;

export const StyledCollapseButton = styled.button`
  position: absolute;
  top: 50%;
  right: -12px;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background-color: #ffffff;
  color: ${colors.neutral.base};
  border: 1px solid ${colors.neutral.light};
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.2s ease;
  transform: translateY(-50%);

  svg {
    display: block;
    flex-shrink: 0;
  }

  &:hover {
    background-color: ${colors.primary.lightest};
    color: ${colors.primary.base};
    border-color: ${colors.primary.base};
    box-shadow: 0 2px 8px rgba(56, 161, 78, 0.25);
    transform: translateY(-50%) scale(1.1);
  }
`;

export const StyledNavList = styled.nav`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 6px;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const StyledNavItemButton = styled.div<StyledNavItemProps>`
  display: flex;
  justify-content: ${(props) => (props.$isCollapsed ? "center" : "flex-start")};
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  font-size: ${fontSizes.base};
  font-weight: ${(props) =>
    props.$isActive ? fontWeights.bold : fontWeights.medium};
  text-decoration: none;
  background-color: ${(props) =>
    props.$isActive ? colors.primary.lightest : "transparent"};
  color: ${(props) =>
    props.$isActive ? colors.primary.base : colors.neutral.dark};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.$isActive ? colors.primary.lightest : colors.neutral.lightest};
    color: ${(props) =>
      props.$isActive ? colors.primary.dark : colors.neutral.darkest};
  }
`;

export const StyledItemIcon = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  font-size: 18px;
`;

export const StyledItemLabel = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledItemBadge = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 2px 6px;
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.semibold};
  background-color: ${colors.primary.base};
  color: #ffffff;
  border-radius: 10px;
`;

export const StyledExpandChevron = styled.span<{ $isExpanded?: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${colors.neutral.base};
  transition: transform 0.2s ease-in-out;

  svg {
    display: block;
    flex-shrink: 0;
  }

  ${(props) =>
    props.$isExpanded &&
    css`
      transform: rotate(180deg);
    `}
`;

export const StyledSubNavList = styled.div<{ $isExpanded?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
  padding-left: 28px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  ${(props) =>
    !props.$isExpanded &&
    css`
      display: none;
    `}
`;

export const StyledSubNavItem = styled.div<StyledNavItemProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  font-size: ${fontSizes.small};
  font-weight: ${(props) =>
    props.$isActive ? fontWeights.semibold : fontWeights.regular};
  text-decoration: none;
  background-color: ${(props) =>
    props.$isActive ? colors.primary.lightest : "transparent"};
  color: ${(props) =>
    props.$isActive ? colors.primary.base : colors.neutral.base};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${colors.neutral.lightest};
    color: ${colors.neutral.darkest};
  }
`;

export const StyledSidebarFooter = styled.div`
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid ${colors.neutral.lightest};
`;
