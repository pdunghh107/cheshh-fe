import React from "react";

import { Spinner } from "./Loading.styles";
import type { LoadingProps } from "./Loading.types";

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
      <Spinner
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
