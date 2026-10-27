import React from "react";
import { Crown } from "lucide-react";
import styled from "styled-components";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";

export const AuthHeader: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <Wrapper>
      <AuthLogo />
      <AuthText title={title} subtitle={subtitle} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 28px;
  text-align: center;
`;

export const AuthLogo: React.FC = () => {
  return (
    <LogoBadge>
      <Crown size={28} />
    </LogoBadge>
  );
};

const LogoBadge = styled.div`
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

export const AuthText: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <>
      <AuthTitle>{title}</AuthTitle>
      <AuthSubtitle>{subtitle}</AuthSubtitle>
    </>
  );
};

const AuthTitle = styled.h2`
  margin: 0 0 8px 0;
  font-size: ${fontSizes.xxlarge};
  font-weight: ${fontWeights.bold};
  color: ${colors.neutral.darkest};
`;

const AuthSubtitle = styled.p`
  margin: 0;
  font-size: ${fontSizes.base};
  line-height: 1.5;
  color: ${colors.neutral.base};
`;
