import React from "react";
import styled from "styled-components";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";

export interface LogoProps {
  className?: string;
  isCollapsed?: boolean;
  size?: "md" | "lg" | "xl";
}

const StyledLogoWrapper = styled.div<{ $isCollapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 8px;
  user-select: none;
  cursor: pointer;
`;

const StyledLogoIcon = styled.div`
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  font-size: ${fontSizes.xlarge};
  font-weight: ${fontWeights.bold};
  background-color: ${colors.primary.base};
  color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(56, 161, 78, 0.25);
`;

const StyledLogoText = styled.span<{ $size: "md" | "lg" | "xl" }>`
  font-family: inherit;
  font-size: ${(props) =>
    props.$size === "md"
      ? fontSizes.large
      : props.$size === "lg"
        ? fontSizes.xlarge
        : fontSizes.xxlarge};
  font-weight: ${fontWeights.black};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${colors.neutral.darkest};

  span {
    color: ${colors.primary.base};
  }
`;

/**
 * Logo Component
 *
 * @description Hiển thị logo thương hiệu CHESSHH in hoa kèm icon biểu tượng cờ vua
 *
 * @example
 * import { Logo } from '@/components/Sidebar/Logo';
 *
 * <Logo size="lg" />
 * <Logo isCollapsed={true} />
 */
export const Logo: React.FC<LogoProps> = ({
  className,
  isCollapsed = false,
  size = "lg",
}) => {
  return (
    <StyledLogoWrapper className={className} $isCollapsed={isCollapsed}>
      <StyledLogoIcon>♞</StyledLogoIcon>
      {!isCollapsed && (
        <StyledLogoText $size={size}>
          CHESS<span>HH</span>
        </StyledLogoText>
      )}
    </StyledLogoWrapper>
  );
};
