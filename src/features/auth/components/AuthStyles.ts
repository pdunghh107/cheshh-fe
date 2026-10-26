import styled from "styled-components";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";

export const StyledAuthPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 32px 16px;
  box-sizing: border-box;
  background-color: ${colors.neutral.lightest};
`;

export const StyledAuthCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 440px;
  padding: 36px 32px;
  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid ${colors.neutral.light};
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
`;

export const StyledAuthHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 28px;
  text-align: center;
`;

export const StyledLogoBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 52px;
  margin-bottom: 16px;
  background-color: ${colors.primary.lightest};
  color: ${colors.primary.base};
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(56, 161, 78, 0.15);
`;

export const StyledAuthTitle = styled.h2`
  margin: 0 0 8px 0;
  font-size: ${fontSizes.xxlarge};
  font-weight: ${fontWeights.bold};
  color: ${colors.neutral.darkest};
`;

export const StyledAuthSubtitle = styled.p`
  margin: 0;
  font-size: ${fontSizes.base};
  line-height: 1.5;
  color: ${colors.neutral.base};
`;


export const StyledAuthFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 24px;
  font-size: ${fontSizes.base};
  color: ${colors.neutral.base};

  a,
  button {
    padding: 0;
    font-weight: ${fontWeights.semibold};
    text-decoration: none;
    background: none;
    color: ${colors.primary.base};
    border: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
      color: ${colors.primary.dark};
    }
  }
`;
