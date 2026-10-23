import styled from "styled-components";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";

export const StyledHeader = styled.header`
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 24px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-bottom: 1px solid ${colors.neutral.light};
`;

export const StyledHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StyledHeaderTitle = styled.h1`
  margin: 0;
  font-size: ${fontSizes.xlarge};
  font-weight: ${fontWeights.bold};
  color: ${colors.neutral.darkest};
`;

export const StyledUserControls = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const StyledUserBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
  font-size: ${fontSizes.base};
  background-color: ${colors.neutral.lightest};
  color: ${colors.neutral.darkest};
  border: 1px solid ${colors.neutral.light};
  border-radius: 9999px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #ffffff;
    border-color: ${colors.primary.base};
  }
`;

export const StyledAvatarPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  background-color: ${colors.primary.lightest};
  color: ${colors.primary.base};
  border-radius: 50%;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const StyledUsername = styled.span`
  max-width: 140px;
  overflow: hidden;
  font-weight: ${fontWeights.semibold};
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.neutral.darkest};
`;

export const StyledRatingBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.bold};
  background-color: ${colors.primary.lightest};
  color: ${colors.primary.dark};
  border-radius: 12px;

  svg {
    width: 12px;
    height: 12px;
  }
`;
