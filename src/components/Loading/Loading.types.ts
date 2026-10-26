import type { HTMLAttributes } from "react";

export interface LoadingProps extends HTMLAttributes<HTMLSpanElement> {
  size?: number;
  thickness?: number;
  radius?: number | string;
  color?: string;
  speed?: number;
}

export interface StyledSpinnerProps {
  $size: number;
  $thickness: number;
  $radius: number | string;
  $color?: string;
  $speed: number;
}
