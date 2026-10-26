import React from "react";
import { Layers } from "lucide-react";
import styled from "styled-components";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";

import { ButtonShowcaseSection } from "./components/ButtonShowcaseSection";
import { FormShowcaseSection } from "./components/FormShowcaseSection";
import { LoadingShowcaseSection } from "./components/LoadingShowcaseSection";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px 64px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${colors.neutral.light};
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: ${fontSizes.xxlarge};
  font-weight: ${fontWeights.bold};
  color: ${colors.neutral.darkest};
`;

const Description = styled.p`
  margin: 0;
  font-size: ${fontSizes.base};
  color: ${colors.neutral.dark};
`;

const DevTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.bold};
  background: ${colors.warning.lightest};
  color: ${colors.warning.dark};
  border: 1px solid ${colors.warning.light};
  border-radius: 9999px;
`;

/**
 * ComponentShowcasePage Component
 *
 * @description Trang kiểm thử trực quan tất cả các UI Components cơ bản của hệ thống ChessHH (Chỉ hoạt động ở môi trường Development).
 *
 * @example
 * <ComponentShowcasePage />
 */
export const ComponentShowcasePage: React.FC = () => {
  return (
    <PageContainer>
      <HeaderWrapper>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <DevTag>DEVELOPMENT ONLY</DevTag>
          <DevTag style={{ background: colors.primary.lightest, color: colors.primary.dark, borderColor: colors.primary.light }}>
            Route: /dev/components
          </DevTag>
        </div>
        <Title>
          <Layers size={32} color={colors.primary.base} />
          ChessHH Design System & Component Showcase
        </Title>
        <Description>
          Môi trường kiểm thử trực tiếp các trạng thái, biến thể, props và tương tác của các Component cốt lõi.
        </Description>
      </HeaderWrapper>

      <ButtonShowcaseSection />
      <LoadingShowcaseSection />
      <FormShowcaseSection />
    </PageContainer>
  );
};
