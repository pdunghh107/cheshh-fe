import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User } from "lucide-react";
import styled from "styled-components";
import { z } from "zod";

import { colors } from "@/commons/colors";
import { fontSizes, fontWeights } from "@/commons/fonts";
import { Button } from "@/components/Button";
import { Form, InputField, InputPassword, InputSearch } from "@/components/Form";

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

const FormContainer = styled.div`
  max-width: 480px;
  padding: 20px;
  background: ${colors.neutral.lightest};
  border: 1px dashed ${colors.neutral.base};
  border-radius: 8px;
`;

const testSchema = z.object({
  username: z.string().min(3, "Tên người dùng phải từ 3 ký tự trở lên"),
  email: z.string().email("Địa chỉ email không đúng định dạng"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  searchQuery: z.string().optional(),
});

type TestFormValues = z.infer<typeof testSchema>;

/**
 * FormShowcaseSection Component
 *
 * @description Trực quan hóa và kiểm thử form inputs, validation state và icons (InputField, InputPassword, InputSearch).
 *
 * @example
 * <FormShowcaseSection />
 */
export const FormShowcaseSection: React.FC = () => {
  const form = useForm<TestFormValues>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      searchQuery: "",
    },
  });

  const onSubmit = (data: TestFormValues) => {
    alert(`Dữ liệu form hợp lệ:\n${JSON.stringify(data, null, 2)}`);
  };

  return (
    <Section>
      <SectionTitle>📝 Form & Input Showcase</SectionTitle>

      <FormContainer>
        <Form form={form} onSubmit={onSubmit}>
          <InputField
            name="username"
            label="Tên kỳ thủ (Username)"
            placeholder="Ví dụ: grandmaster_99"
            leftIcon={<User size={18} />}
            required
          />

          <InputField
            name="email"
            label="Địa chỉ Email"
            placeholder="name@example.com"
            leftIcon={<Mail size={18} />}
            required
          />

          <InputPassword
            name="password"
            label="Mật khẩu"
            placeholder="••••••••"
            required
          />

          <InputSearch
            name="searchQuery"
            label="Tìm kiếm phòng đấu"
            placeholder="Nhập mã phòng hoặc tên..."
          />

          <div style={{ marginTop: "16px" }}>
            <Button type="submit" variant="primary" fullWidth>
              Kiểm tra Form Validation
            </Button>
          </div>
        </Form>
      </FormContainer>
    </Section>
  );
};
