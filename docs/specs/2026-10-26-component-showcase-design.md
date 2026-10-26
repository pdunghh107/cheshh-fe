# [Design Spec] Component Showcase Feature (Dev Only)

## Goal
Tạo trang Showcase trực quan hóa và test toàn bộ các components cơ bản (`Button`, `Loading`, `InputField`, `InputPassword`) tại route `/dev/components`.
Route này chỉ được đăng ký khi `import.meta.env.DEV === true` (tức `NODE_ENV === 'development'`). Trên môi trường Production, route hoàn toàn không tồn tại và tự động chuyển về 404 / Home.

## Architecture & Security
- **Route Guard / Conditional Route**:
  - Định nghĩa `ROUTE_PATHS.DEV_COMPONENTS = "/dev/components"` trong `src/routes/paths.ts`.
  - Trong `src/routes/index.tsx`, kiểm tra `import.meta.env.DEV`:
    - Nếu là development: nạp route `/dev/components` với `<ComponentShowcasePage />`.
    - Nếu là production: loại bỏ hoàn toàn route này, Vite / Rollup sẽ tự động tree-shake không đóng gói code dev vào production bundle.
- **Component Hierarchy**:
  ```text
  src/features/dev/
  ├── ComponentShowcasePage.tsx       # Trang tổng quan chia các Tab hoặc Section
  ├── components/
  │   ├── ButtonShowcaseSection.tsx   # Test Button (variants, sizes, states, icons, loading tương tác)
  │   ├── FormShowcaseSection.tsx     # Test InputField, InputPassword (validation states, error messages)
  │   └── LoadingShowcaseSection.tsx  # Test Loading spinner (sizes, thickness, colors)
  └── index.ts
  ```
- **Styling**:
  - Styled Components tuân thủ đúng 5 tầng CSS Order chuẩn AGENTS.md.
  - Sử dụng token từ `colors`, `fontSizes`, `fontWeights` trong `@/commons`.
- **Usage Comment**:
  - Mọi file `.tsx` bắt buộc có JSDoc `@description` và `@example`.
