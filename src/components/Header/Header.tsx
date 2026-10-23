import React, { useState } from "react";
import { useNavigate } from "react-router";
import { LogIn, LogOut, Trophy, User as UserIcon } from "lucide-react";

import { Button } from "@/components/Button";
import { useAuth } from "@/features/auth/useAuth";
import { ROUTE_PATHS } from "@/routes/paths";
import { handleApiError, handleApiSuccess } from "@/utils/toast";

import {
  StyledAvatarPlaceholder,
  StyledHeader,
  StyledHeaderLeft,
  StyledHeaderTitle,
  StyledRatingBadge,
  StyledUserBadge,
  StyledUserControls,
  StyledUsername,
} from "./Header.styles";
import type { HeaderProps } from "./Header.types";

/**
 * Header Component
 *
 * @description Header chuẩn của ứng dụng ChessHH. Tự động kiểm tra trạng thái đăng nhập
 * để chuyển đổi giữa nút "Đăng nhập" và "Đăng xuất". Khi click "Đăng xuất", component sẽ
 * gọi API logout và điều hướng về trang chủ.
 *
 * @example
 * // Sử dụng mặc định trong Layout:
 * import { Header } from "@/components/Header";
 *
 * <Header />
 *
 * // Tuỳ chỉnh tiêu đề:
 * <Header title="Đấu Trường Cờ Vua" />
 */
export const Header: React.FC<HeaderProps> = ({
  title = "ChessHH Arena",
  className,
}) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLoginClick = () => {
    navigate(ROUTE_PATHS.LOGIN);
  };

  const handleLogoutClick = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      handleApiSuccess("Đăng xuất thành công!");
      navigate(ROUTE_PATHS.HOME);
    } catch (error) {
      handleApiError(error, "Đăng xuất thất bại!");
      console.error("Lỗi khi đăng xuất:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <StyledHeader className={className}>
      <StyledHeaderLeft>
        <StyledHeaderTitle>{title}</StyledHeaderTitle>
      </StyledHeaderLeft>

      <StyledUserControls>
        {isAuthenticated && user ? (
          <>
            <StyledUserBadge title={`Đang đăng nhập: ${user.username}`}>
              <StyledAvatarPlaceholder>
                <UserIcon />
              </StyledAvatarPlaceholder>
              <StyledUsername>{user.username}</StyledUsername>
              <StyledRatingBadge>
                <Trophy />
                Elo {user.rating}
              </StyledRatingBadge>
            </StyledUserBadge>

            <Button
              variant="outline"
              size="sm"
              isLoading={isLoggingOut}
              disabled={isLoggingOut}
              leftIcon={<LogOut size={16} />}
              onClick={handleLogoutClick}
            >
              Đăng xuất
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            size="sm"
            leftIcon={<LogIn size={16} />}
            onClick={handleLoginClick}
          >
            Đăng nhập
          </Button>
        )}
      </StyledUserControls>
    </StyledHeader>
  );
};
