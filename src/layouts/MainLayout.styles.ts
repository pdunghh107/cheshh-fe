import styled from "styled-components";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";

export const StyledLayoutRoot = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  background-color: ${colors.neutral.lightest};
`;

export const StyledMainWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  height: 100vh;
  overflow: hidden;
`;

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

export const StyledHeaderTitle = styled.h1`
  margin: 0;
  font-size: ${fontSizes.xlarge};
  font-weight: ${fontWeights.bold};
  color: ${colors.neutral.darkest};
`;

export const StyledUserControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StyledUserBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  font-size: ${fontSizes.base};
  background-color: ${colors.neutral.lightest};
  color: ${colors.neutral.darkest};
  border: 1px solid ${colors.neutral.light};
  border-radius: 8px;

  strong {
    font-weight: ${fontWeights.semibold};
  }
`;

export const StyledRatingBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.bold};
  background-color: ${colors.primary.lightest};
  color: ${colors.primary.dark};
  border-radius: 12px;
`;

export const StyledContentContainer = styled.main`
  flex: 1;
  padding: 28px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
`;
