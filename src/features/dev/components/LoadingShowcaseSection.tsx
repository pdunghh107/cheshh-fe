import React from "react";
import styled from "styled-components";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";
import { Loading } from "@/components/Loading";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  background: #ffffff;
  border: 1px solid ${colors.neutral.light};
  border-radius: 12px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: ${fontSizes.large};
  font-weight: ${fontWeights.bold};
  color: ${colors.neutral.darkest};
`;

const SubTitle = styled.h4`
  margin: 0;
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.semibold};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${colors.neutral.base};
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const ItemLabel = styled.span`
  font-size: ${fontSizes.small};
  color: ${colors.neutral.base};
`;

/**
 * LoadingShowcaseSection Component
 *
 * @description Trực quan hóa và kiểm thử Spinner Loading với nhiều kích cỡ, độ dày và màu sắc khác nhau.
 *
 * @example
 * <LoadingShowcaseSection />
 */
export const LoadingShowcaseSection: React.FC = () => {
  return (
    <Section>
      <SectionTitle>⏳ Loading Spinner Showcase</SectionTitle>

      <SubTitle>1. Kích thước (Sizes: 16px, 24px, 32px, 48px)</SubTitle>
      <Row>
        <ItemWrapper>
          <Loading size={16} thickness={2} />
          <ItemLabel>16px (thickness 2)</ItemLabel>
        </ItemWrapper>
        <ItemWrapper>
          <Loading size={24} thickness={3} />
          <ItemLabel>24px (thickness 3)</ItemLabel>
        </ItemWrapper>
        <ItemWrapper>
          <Loading size={32} thickness={3} />
          <ItemLabel>32px (thickness 3)</ItemLabel>
        </ItemWrapper>
        <ItemWrapper>
          <Loading size={48} thickness={4} />
          <ItemLabel>48px (thickness 4)</ItemLabel>
        </ItemWrapper>
      </Row>

      <SubTitle>2. Tùy biến Màu sắc (Theme Colors)</SubTitle>
      <Row>
        <ItemWrapper>
          <Loading size={28} color={colors.primary.base} />
          <ItemLabel>Primary</ItemLabel>
        </ItemWrapper>
        <ItemWrapper>
          <Loading size={28} color={colors.danger.base} />
          <ItemLabel>Danger</ItemLabel>
        </ItemWrapper>
        <ItemWrapper>
          <Loading size={28} color={colors.warning.base} />
          <ItemLabel>Warning</ItemLabel>
        </ItemWrapper>
        <ItemWrapper>
          <Loading size={28} color={colors.secondary.base} />
          <ItemLabel>Secondary</ItemLabel>
        </ItemWrapper>
      </Row>
    </Section>
  );
};
