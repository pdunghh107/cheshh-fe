import React from "react";

import { useAuth } from "@/features/auth/useAuth";
import { MainPage } from "@/features/dashboard";
import { OnboardingPage } from "@/features/onboarding";

/**
 * HomeEntryPage Component
 *
 * @description Điều hướng thông minh tại Route `/`:
 * - Nếu chưa đăng nhập (isAuthenticated = false): Hiển thị OnboardingPage
 * - Nếu đã đăng nhập (isAuthenticated = true): Hiển thị MainPage (Dashboard chọn chế độ cờ & ghép trận)
 */
export const HomeEntryPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <MainPage /> : <OnboardingPage />;
};
