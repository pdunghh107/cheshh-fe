import React from "react";

import { StyledSpinner } from "./Loading.styles";
import type { LoadingProps } from "./Loading.types";

/**
 * Loading Component (Pure CSS Spinner)
 *
 * @description Vòng tròn loading xoay mượt mà sử dụng CSS thuần, hình tròn khuyết 1/4 với độ dày nét 4px chuẩn, cho phép tùy chỉnh size, radius, màu sắc và tích hợp trực tiếp vào Button.
 *
 * @example
 * // 1. Usage cơ bản:
 * import { Loading } from '@/components/Loading';
 *
 * <Loading size={24} />
 *
 * // 2. Tùy chỉnh màu sắc và độ dày viền:
 * <Loading size={32} thickness={4} color="#38A14E" speed={0.6} />
 *
 * // 3. Tùy chỉnh radius hình vuông/bo góc nhẹ:
 * <Loading size={28} radius={8} />
 */
export const Loading = React.forwardRef<HTMLSpanElement, LoadingProps>(
  (
    {
      size = 24,
      thickness = 4,
      radius = "50%",
      color = "currentColor",
      speed = 0.75,
      className,
      ...restProps
    },
    ref,
  ) => {
    return (
      <StyledSpinner
        ref={ref}
        className={className}
        $size={size}
        $thickness={thickness}
        $radius={radius}
        $color={color}
        $speed={speed}
        role="status"
        aria-label="Đang tải dữ liệu..."
        {...restProps}
      />
    );
  },
);

Loading.displayName = "Loading";
