import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";
import { ROUTE_PATHS } from "@/routes/paths";

import { LOGO_FONT_SIZES, type LogoSize } from "./Sidebar.constants";

export interface LogoProps {
  className?: string;
  isCollapsed?: boolean;
  size?: "md" | "lg" | "xl";
}

const Wrapper = styled.div<{ $isCollapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 8px;
  user-select: none;
  cursor: pointer;
`;

const LogoIcon = styled.div`
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

const LogoText = styled.span<{ $size: LogoSize }>`
  font-family: inherit;
  font-size: ${(props) => LOGO_FONT_SIZES[props.$size]};
  font-weight: ${fontWeights.black};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${colors.neutral.darkest};

  span {
    color: ${colors.primary.base};
  }
`;

export const Logo: React.FC<LogoProps> = ({
  className,
  isCollapsed = false,
  size = "lg",
}) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(ROUTE_PATHS.HOME);
  };

  return (
    <Wrapper
      className={className}
      $isCollapsed={isCollapsed}
      onClick={onClick}
      // role="button"
      // tabIndex={0}
      // onKeyDown={(e) => {
      //   if (e.key === "Enter" || e.key === " ") {
      //     navigate(ROUTE_PATHS.HOME);
      //   }
      // }}
    >
      <LogoIcon>♞</LogoIcon>
      {!isCollapsed && (
        <LogoText $size={size}>
          CHESS<span>HH</span>
        </LogoText>
      )}
    </Wrapper>
  );
};
