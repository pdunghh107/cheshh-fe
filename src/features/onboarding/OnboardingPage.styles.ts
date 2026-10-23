import styled from "styled-components";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";

export const StyledOnboardingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 20px;
  text-align: center;
`;

export const StyledHeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  padding: 6px 16px;
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.semibold};
  background-color: ${colors.primary.lightest};
  color: ${colors.primary.dark};
  border-radius: 20px;
`;

export const StyledHeroTitle = styled.h1`
  margin: 0 0 16px 0;
  font-size: ${fontSizes.xxxxlarge};
  font-weight: ${fontWeights.black};
  line-height: 1.2;
  color: ${colors.neutral.darkest};

  span {
    color: ${colors.primary.base};
  }
`;

export const StyledHeroSubtitle = styled.p`
  max-width: 650px;
  margin: 0 0 36px 0;
  font-size: ${fontSizes.large};
  line-height: 1.6;
  color: ${colors.neutral.base};
`;

export const StyledActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 56px;
`;

export const StyledFeatureGrid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  width: 100%;
  margin-top: 16px;
`;

export const StyledFeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  text-align: left;
  background-color: #ffffff;
  border: 1px solid ${colors.neutral.light};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: ${colors.primary.light};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    transform: translateY(-4px);
  }
`;

export const StyledFeatureIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  margin-bottom: 16px;
  font-size: 22px;
  background-color: ${colors.primary.lightest};
  color: ${colors.primary.base};
  border-radius: 10px;
`;

export const StyledFeatureTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: ${fontSizes.large};
  font-weight: ${fontWeights.bold};
  color: ${colors.neutral.darkest};
`;

export const StyledFeatureDesc = styled.p`
  margin: 0;
  font-size: ${fontSizes.base};
  line-height: 1.5;
  color: ${colors.neutral.base};
`;
