import type { HTMLAttributes } from "react";

export interface LoadingProps extends HTMLAttributes<HTMLSpanElement> {
  /** Kích thước đường kính của vòng xoay (px), mặc định 24px */
  size?: number;
  /** Độ dày nét viền (px), mặc định 4px theo yêu cầu */
  thickness?: number;
  /** Bán kính bo góc (border-radius), mặc định '50%' cho hình tròn hoàn hảo */
  radius?: number | string;
  /** Màu sắc vòng xoay, mặc định 'currentColor' (hoặc mã màu hex tùy chọn) */
  color?: string;
  /** Tốc độ 1 vòng xoay (giây), mặc định 0.75s */
  speed?: number;
}

export interface StyledSpinnerProps {
  $size: number;
  $thickness: number;
  $radius: number | string;
  $color?: string;
  $speed: number;
}
