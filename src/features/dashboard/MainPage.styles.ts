import styled, { keyframes } from "styled-components";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";

export const StyledDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 1100px;
  margin: 0 auto;
`;

export const StyledWelcomeBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 32px;
  background: linear-gradient(
    135deg,
    ${colors.primary.darkest} 0%,
    ${colors.neutral.darkest} 100%
  );
  color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(20, 70, 31, 0.25);
`;

export const StyledBannerText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledBannerTitle = styled.h2`
  margin: 0;
  font-size: ${fontSizes.xxlarge};
  font-weight: ${fontWeights.bold};
`;

export const StyledBannerSubtitle = styled.p`
  margin: 0;
  font-size: ${fontSizes.base};
  color: ${colors.neutral.light};
`;

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledSectionTitle = styled.h3`
  margin: 0;
  font-size: ${fontSizes.xlarge};
  font-weight: ${fontWeights.bold};
  color: ${colors.neutral.darkest};
`;

export const StyledModesGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

export const StyledModeCard = styled.div<{ $isSelected?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  user-select: none;
  background-color: #ffffff;
  border: 2px solid
    ${(props) =>
      props.$isSelected ? colors.primary.base : colors.neutral.light};
  border-radius: 12px;
  box-shadow: ${(props) =>
    props.$isSelected
      ? `0 0 0 4px ${colors.primary.lightest}, 0 6px 16px rgba(56, 161, 78, 0.15)`
      : "0 2px 8px rgba(0, 0, 0, 0.03)"};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${colors.primary.light};
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
`;

export const StyledModeIcon = styled.div`
  margin-bottom: 12px;
  font-size: 32px;
`;

export const StyledModeName = styled.h4`
  margin: 0 0 4px 0;
  font-size: ${fontSizes.large};
  font-weight: ${fontWeights.bold};
  color: ${colors.neutral.darkest};
`;

export const StyledModeTime = styled.span`
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.semibold};
  color: ${colors.primary.base};
`;

export const StyledMatchmakingSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 36px;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid ${colors.neutral.light};
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
`;

const pulseAnimation = keyframes`
  0% { transform: scale(0.98); opacity: 0.8; }
  50% { transform: scale(1.02); opacity: 1; }
  100% { transform: scale(0.98); opacity: 0.8; }
`;

export const StyledSearchingIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px;
  animation: ${pulseAnimation} 1.5s infinite ease-in-out;
`;

export const StyledTimerCount = styled.div`
  font-size: ${fontSizes.xxxlarge};
  font-weight: ${fontWeights.black};
  letter-spacing: 1px;
  color: ${colors.primary.base};
`;
