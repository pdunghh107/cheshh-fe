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
