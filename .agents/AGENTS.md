# Quy tắc Coding & Brainstorming cho ChessHH Front-end

> **Dự án:** ChessHH - Hệ thống chơi cờ vua trực tuyến thời gian thực tích hợp hệ thống xếp hạng & tính điểm (Elo / Ranking) (Front-end Client).

---

## 1. Bắt buộc Brainstorming

- **Quy tắc:** Trước khi bắt tay vào code bất kỳ tính năng, module, hoặc component nào (dù lớn hay nhỏ), **BẮT BUỘC** phải thực hiện quy trình `brainstorming` (được định nghĩa trong thư mục skills/brainstorming).
- **Mục tiêu:**
  - Làm rõ phạm vi yêu cầu, các edge cases (ví dụ: mất kết nối WebSocket/STOMP, tự động reconnect, render bàn cờ, đồng hồ đếm ngược, timeout, hòa cờ, chiếu hết, race conditions trong cập nhật trạng thái ván đấu).
  - Thống nhất giải pháp, cấu trúc component, luồng dữ liệu (data flow) và state management trước khi sinh code.

---

## 2. Persona Senior Front-end Developer / Architect

- **Vai trò:** Luôn đóng vai trò là một **Senior Front-end Developer / Architect** chuyên sâu về React, TypeScript, Realtime Web Applications.
- **Tiêu chuẩn đánh giá:** Khi thiết kế UI/UX, Component Hierarchy, State Management, hoặc cơ chế đồng bộ realtime:
  - Phân tích rõ ràng **Ưu điểm & Nhược điểm (Pros & Cons)** của từng giải pháp kiến trúc và cách quản lý state.
  - Tuân thủ nghiêm ngặt các nguyên tắc Clean Code, tối ưu re-render, tách biệt rõ ràng UI và Business Logic (Container/Presenter pattern hoặc Custom Hooks pattern).
  - Đảm bảo tính nhất quán của theme, giao diện Responsive, Accessibility (a11y), xử lý lỗi mượt mà và bảo mật phía client (quản lý token an toàn, chống XSS).
- **Quy trình thực hiện:** Sau khi phân tích và thống nhất giải pháp chuẩn mực, tối ưu nhất (**Enterprise Standard**), mới tiến hành implementation (viết code).

---

## 3. Front-end Architecture & Tech Stack (React)

- **Library:** React (Functional Components + Hooks) & TypeScript.
- **Styling:** Styled Components (Dùng theme từ ThemeProvider, không hardcode màu sắc/spacing).
- **Form Management & Validation:** React Hook Form kết hợp với Zod schemas.
- **State Management:** Redux Toolkit (RTK) cho global state / Server state (hoặc RTK Query nếu gọi API).
- **Routing:** React Router.

---

## 4. Cấu trúc thư mục Front-end (Project Structure)

```text
src/
├── assets/          # Images, icons, global styles
├── components/      # Shared/Reusable UI components (Button, Input, Modal...)
├── features/        # Feature-based folders (mỗi tính năng gồm components, slice, api riêng)
│   ├── auth/
│   │   ├── components/
│   │   ├── authSlice.ts
│   │   └── authSchema.ts  # Zod schema cho form auth
│   └── dashboard/
├── hooks/           # Custom hooks dùng chung
├── store/           # Redux store configuration
├── services/        # Axios instance / API clients
├── styles/          # Global styles, Theme (colors, typography, spacing)
└── utils/           # Helper functions
```

---

## 5. Quy chuẩn lập trình Front-end (Coding Standards)

### 5.1. Form & Validation (React Hook Form + Zod)

- **Bắt buộc:** Mọi form nhập liệu phải dùng `react-hook-form` kết hợp với `zod` để định nghĩa schema validation.
- **Tách Schema:** Định nghĩa Zod schema ngay tại file feature tương ứng (hoặc một file `*.schema.ts` riêng biệt), không viết inline schema phức tạp trong component.

**Ví dụ chuẩn cho Agent:**

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải từ 6 ký tự trở lên"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Trong Component:
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<LoginFormValues>({
  resolver: zodResolver(loginSchema),
});
```

### 5.2. Styling (Styled Components)

- **Không hardcode giá trị:** Luôn sử dụng các biến từ theme (ví dụ: `theme.colors.primary`, `theme.spacing.medium`) cho màu sắc, khoảng cách, font chữ.
- **Dynamic Styling qua Props:** Sử dụng transient props (bắt đầu bằng dấu `$`, ví dụ: `$isActive`) để truyền props vào styled component nhằm tránh việc pass nhầm thuộc tính xuống DOM HTML thực tế.
- **Tên Component:** Đặt tên styled component rõ nghĩa, có tiền tố `Styled` hoặc đi kèm tên ngữ cảnh (ví dụ: `StyledButton`, `Container`, `Title`).

### 5.3. State Management (Redux Toolkit)

- **Sử dụng RTK:** Luôn dùng Redux Toolkit (`createSlice`, `createAsyncThunk`) thay vì Redux nguyên bản cũ.
- **Phân tách State:** Chỉ đưa dữ liệu thực sự cần dùng chung toàn app (global state như Auth, Theme, User info) vào Redux. Dữ liệu cục bộ của component (modal open/close, form input tạm thời) phải dùng `useState` hoặc `useReducer`.

### 5.4. Xử lý API & Async

- **Axios Instance & Interceptor:** Sử dụng Axios instance đã cấu hình sẵn Interceptor (để tự động đính kèm Token/Refresh Token vào Header).
- **Trạng thái UI:** Xử lý trạng thái loading, error, success rõ ràng trên UI cho mọi luồng gọi API.

### 5.5. Bắt buộc có Usage Comments trong mọi file TSX

- **Quy tắc bắt buộc:** Mỗi khi tạo mới hoặc cập nhật một file `.tsx` (Component, Page, Layout, Provider...), **BẮT BUỘC** phải có một khối JSDoc/Block comment ở đầu file mô tả mục đích và **cách sử dụng (Usage example)** cụ thể.
- **Mục tiêu:** Giúp lập trình viên khác hoặc các agent sau có thể dễ dàng hiểu props, context cần thiết và copy/paste cách dùng ngay lập tức mà không cần đọc hết code logic bên dưới.

**Ví dụ chuẩn:**

```tsx
/**
 * Button Component
 *
 * @description Button chuẩn dùng trong toàn bộ ứng dụng, hỗ trợ nhiều biến thể và trạng thái loading.
 *
 * @example
 * // Usage cơ bản:
 * import { Button } from '@/components/Button';
 *
 * <Button variant="primary" size="medium" onClick={handleClick}>
 *   Chơi ngay
 * </Button>
 *
 * // Usage với icon và loading:
 * <Button variant="secondary" isLoading disabled>
 *   Đang tìm trận...
 * </Button>
 */
```

### 5.6. Quy chuẩn Router (React Router v7 / v8)

- **Cấu hình tập trung:** Toàn bộ route phải được định nghĩa tập trung trong thư mục `src/routes/` thay vì viết rải rác.
- **Sử dụng Data Router (`createBrowserRouter` + `RouterProvider`):** Khởi tạo router bằng `createBrowserRouter` và cung cấp qua `<RouterProvider router={router} />` trong `App.tsx` hoặc `main.tsx`.
- **Tách Path Constants (`paths.ts`):** Không hardcode chuỗi đường dẫn (e.g. `"/login"`, `"/game/:id"`) trực tiếp trong component. Luôn định nghĩa hằng số trong `src/routes/paths.ts` (ví dụ: `ROUTE_PATHS.LOGIN`, `ROUTE_PATHS.GAME(id)`).
- **Phân tách Route Public / Protected:**
  - Route công khai: Login, Register, Landing Page, Not Found (404).
  - Route bảo vệ (`ProtectedRoute`): Lobby, Matchmaking, Realtime Chess Room (`/game/:gameId`), Profile, Leaderboard (yêu cầu kiểm tra token xác thực/Redux auth state trước khi render `Outlet`).
- **Layouts & Nested Routes:** Tận dụng `Outlet` kết hợp các Layout riêng biệt (ví dụ: `MainLayout` cho giao diện có thanh điều hướng/chơi cờ và `AuthLayout` cho màn hình đăng nhập/đăng ký).
- **Lazy Loading:** Bắt buộc áp dụng `React.lazy()` hoặc route `lazy` loader cho các trang chính (đặc biệt là Bàn cờ Realtime Game room) để tối ưu code splitting và thời gian tải trang ban đầu.

### 5.7. Quy chuẩn Path Alias (`@/*`)

- **Bắt buộc:** Luôn sử dụng path alias `@/*` trỏ tới thư mục `src/*` cho tất cả các câu lệnh `import` trong toàn bộ dự án.
- **Không dùng đường dẫn tương đối sâu:** Tránh sử dụng relative path quá 1 cấp (như `../../commons/colors`, `../../../features/...`) để tránh lỗi sai lệch đường dẫn khi di chuyển file và giữ code luôn sạch sẽ, dễ đọc.
- **Ví dụ chuẩn:**
  ```typescript
  import { colors } from "@/commons/colors";
  import { fontSizes, fontWeights } from "@/commons/fonts";
  import { useAuth } from "@/features/auth/AuthContext";
  import { ROUTE_PATHS } from "@/routes/paths";
  ```

### 5.8. Quy chuẩn Auto-sort Import & CSS Order

- **Auto-sort Import (ESLint):** Dự án sử dụng `eslint-plugin-simple-import-sort`. Các import luôn được tự động phân nhóm theo thứ tự:
  1. Thư viện ngoài / React (`react`, `react-router`, `styled-components`...)
  2. Path alias nội bộ (`@/*`)
  3. Đường dẫn tương đối (`./`, `../`)
  4. Stylesheet (`.css`)
- **Auto-sort CSS Order (Stylelint):** Sử dụng `stylelint` với `stylelint-order` và `postcss-styled-syntax` để tự động sắp xếp các thuộc tính CSS bên trong Styled Components theo 5 tầng logic chuẩn quốc tế:
  1. **Positioning:** `position`, `top`, `right`, `bottom`, `left`, `z-index`
  2. **Display & Box Model:** `display`, `flex`, `grid`, `width`, `height`, `margin`, `padding`
  3. **Typography:** `font-family`, `font-size`, `font-weight`, `line-height`, `text-align`
  4. **Visual & Colors:** `background`, `color`, `border`, `border-radius`, `box-shadow`
  5. **Animation & Interaction:** `cursor`, `transition`, `transform`, `animation`
- **Lệnh thực thi:**
  - `pnpm run format`: Chạy tự động sort cho cả Import và CSS trên toàn bộ dự án.
  - `pnpm run lint:fix`: Sắp xếp và sửa lỗi import.
  - `pnpm run lint:css`: Sắp xếp và chuẩn hóa thuộc tính CSS trong Styled Components.
  - Tự động thực thi mỗi khi nhấn **Save** (`Ctrl + S`) trong VS Code thông qua cấu hình `.vscode/settings.json`.


