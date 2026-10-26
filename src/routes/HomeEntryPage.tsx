import React from "react";

import { MainPage } from "@/features/dashboard";
import { OnboardingPage } from "@/features/onboarding";
import { useAppSelector } from "@/store";

/**
 * HomeEntryPage Component
 *
 * @description Điều hướng thông minh tại Route `/`:
 * - Nếu chưa đăng nhập (isAuthenticated = false): Hiển thị OnboardingPage
 * - Nếu đã đăng nhập (isAuthenticated = true): Hiển thị MainPage (Dashboard chọn chế độ cờ & ghép trận)
 */
export const HomeEntryPage: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <MainPage /> : <OnboardingPage />;
};
