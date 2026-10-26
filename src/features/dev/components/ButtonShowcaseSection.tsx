import React, { useState } from "react";
import { Check, Flame, Send, Sparkles, Trash2 } from "lucide-react";
import styled from "styled-components";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";
import { Button } from "@/components/Button";
import type {
  ButtonSize,
  ButtonVariant,
} from "@/components/Button/Button.types";

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
  gap: 12px;
`;

const InteractiveBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: ${colors.neutral.lightest};
  border-radius: 8px;
`;

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.medium};
  color: ${colors.neutral.dark};
  cursor: pointer;
`;

/**
 * ButtonShowcaseSection Component
 *
 * @description Trực quan hóa và kiểm thử tất cả các biến thể, kích cỡ, trạng thái tương tác của Button Component.
 *
 * @example
 * <ButtonShowcaseSection />
 */
export const ButtonShowcaseSection: React.FC = () => {
  const [interactiveLoading, setInteractiveLoading] = useState(false);
  const [interactiveDisabled, setInteractiveDisabled] = useState(false);

  const variants: ButtonVariant[] = [
    "primary",
    "secondary",
    "outline",
    "danger",
    "ghost",
  ];

  const sizes: ButtonSize[] = ["sm", "md", "lg"];

  return (
    <Section>
      <SectionTitle>🔘 Button Showcase</SectionTitle>

      <SubTitle>Bộ điều khiển tương tác (Interactive Controls)</SubTitle>
      <InteractiveBar>
        <Label>
          <input
            type="checkbox"
            checked={interactiveLoading}
            onChange={(e) => setInteractiveLoading(e.target.checked)}
          />
          Bật IsLoading
        </Label>
        <Label>
          <input
            type="checkbox"
            checked={interactiveDisabled}
            onChange={(e) => setInteractiveDisabled(e.target.checked)}
          />
          Bật Disabled
        </Label>
      </InteractiveBar>

      <SubTitle>
        1. Tất cả Biến thể (Variants) với trạng thái tương tác
      </SubTitle>
      <Row>
        {variants.map((v) => (
          <Button
            key={v}
            variant={v}
            isLoading={interactiveLoading}
            disabled={interactiveDisabled}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </Button>
        ))}
      </Row>

      <SubTitle>2. Các kích cỡ (Sizes)</SubTitle>
      <Row>
        {sizes.map((s) => (
          <Button key={s} size={s} variant="primary">
            Size {s.toUpperCase()}
          </Button>
        ))}
      </Row>

      <SubTitle>3. Nút kèm Icons (Left / Right Icon)</SubTitle>
      <Row>
        <Button variant="primary" leftIcon={<Sparkles size={16} />}>
          Tìm trận nhanh
        </Button>
        <Button variant="secondary" rightIcon={<Send size={16} />}>
          Gửi tin nhắn
        </Button>
        <Button variant="danger" leftIcon={<Trash2 size={16} />}>
          Hủy ván đấu
        </Button>
        <Button variant="outline" rightIcon={<Check size={16} />}>
          Đã sẵn sàng
        </Button>
        <Button
          variant="primary"
          leftIcon={<Flame size={16} />}
          isLoading={interactiveLoading}
        >
          Cờ chớp (Blitz)
        </Button>
      </Row>

      <SubTitle>4. Chiều rộng đầy đủ (Full Width)</SubTitle>
      <Button variant="primary" fullWidth size="lg">
        Tham gia giải đấu ngay (Full Width)
      </Button>
    </Section>
  );
};
