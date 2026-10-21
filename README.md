# ♟ ChessHH Front-end Client

> **Dự án:** Hệ thống chơi cờ vua trực tuyến thời gian thực tích hợp hệ thống xếp hạng & tính điểm Elo (Front-end Client).

---

## 🚀 1. Lệnh Thực Thi Dự Án (Project Scripts)

Dự án sử dụng trình quản lý gói **pnpm**:

### 🛠 Phát triển & Build
| Lệnh | Mục đích |
| :--- | :--- |
| `pnpm dev` | Khởi động Local Development Server với Vite (HMR) |
| `pnpm build` | Kiểm tra TypeScript (`tsc -b`) và đóng gói mã nguồn cho Production |
| `pnpm preview` | Chạy thử bản build production trên môi trường local |

### 🧹 Kiểm tra & Tự động Định dạng (Format & Linting)
| Lệnh | Mục đích |
| :--- | :--- |
| `pnpm run format` | **Chạy tự động sort cả Import và CSS** trên toàn bộ dự án |
| `pnpm run lint:fix` | **Tự động sắp xếp Import** theo nhóm chuẩn bằng ESLint |
| `pnpm run lint:css` | **Tự động sắp xếp thuộc tính CSS** trong Styled Components bằng Stylelint |
| `pnpm lint` | Kiểm tra toàn bộ lỗi cú pháp và code quality mà không sửa file |

> **Mẹo:** VS Code đã được tích hợp sẵn qua file `.vscode/settings.json`. Mỗi khi bạn bấm **Save (`Ctrl + S`)**, Editor sẽ tự động sắp xếp Import và CSS chuẩn 100%.

---

## 📦 2. Lệnh Cài Đặt Thư Viện (Package Management)

Khi cần thêm thư viện mới vào dự án, luôn dùng **pnpm**:

```bash
# Thêm thư viện chính (Dependencies)
pnpm add <tên_gói>

# Thêm thư viện cho môi trường phát triển (DevDependencies)
pnpm add -D <tên_gói>
```

---

## 🛠 3. Các Thư Viện Đang Sử Dụng (Tech Stack)

### 3.1. Thư viện Chính (Dependencies)
- **[React 19](https://react.dev/) + [React DOM 19](https://react.dev/)**: Thư viện nền tảng UI (hỗ trợ React Compiler).
- **[React Router v8](https://reactrouter.com/)**: Định tuyến ứng dụng với Data Router API (`createBrowserRouter`, `RouterProvider`, `Navigate`, `Outlet`).
- **[Styled Components v6](https://styled-components.com/)**: CSS-in-JS linh hoạt, quản lý theme, dynamic styling qua transient props (`$prop`).
- **[Redux Toolkit (RTK)](https://redux-toolkit.js.org/) & [React-Redux](https://react-redux.js.org/)**: Quản lý Global State (Auth, Socket session, User profile).
- **[React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)**: Quản lý Form hiệu năng cao kết hợp Schema Validation chặt chẽ.
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)**: Cầu nối tích hợp Zod vào React Hook Form.
- **[Lucide React](https://lucide.dev/)**: Bộ Icon SVG hiện đại, tối ưu dung lượng.

### 3.2. Công cụ Phát triển & Định dạng (DevDependencies)
- **[Vite 8](https://vite.dev/)**: Build tool thế hệ mới siêu nhanh.
- **[TypeScript 5.7](https://www.typescriptlang.org/)**: Đảm bảo an toàn kiểu dữ liệu tĩnh.
- **[ESLint 10](https://eslint.org/)** + **[eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)**: Tự động gom nhóm và sắp xếp thứ tự các câu lệnh `import`/`export`.
- **[Stylelint 17](https://stylelint.io/)** + **[stylelint-order](https://github.com/hudochenkov/stylelint-order)** + **[postcss-styled-syntax](https://github.com/hudochenkov/postcss-styled-syntax)**: Phân tích cú pháp và tự động sắp xếp thứ tự thuộc tính CSS bên trong Styled Components.
- **[React Compiler Babel Plugin](https://react.dev/learn/react-compiler)**: Tự động tối ưu hóa re-render và memoization.

---

## 📐 4. Quy Chuẩn Code (Coding Standards)

1. **Path Alias (`@/*`):** Luôn import qua alias `@/*` trỏ tới `src/*` (ví dụ: `import { colors } from '@/commons/colors'`).
2. **Quy chuẩn Auto-sort Import:**
   - Nhóm 1: React & thư viện bên ngoài (`react`, `react-router`, `styled-components`...)
   - Nhóm 2: Path alias nội bộ (`@/*`)
   - Nhóm 3: Đường dẫn tương đối (`./`, `../`)
   - Nhóm 4: Stylesheet (`.css`)
3. **Quy chuẩn Thứ tự CSS (5 tầng logic):**
   - **Positioning:** `position`, `top`, `right`, `bottom`, `left`, `z-index`
   - **Display & Box Model:** `display`, `flex`, `grid`, `width`, `height`, `margin`, `padding`
   - **Typography:** `font-family`, `font-size`, `font-weight`, `line-height`, `text-align`
   - **Visual & Colors:** `background`, `color`, `border`, `border-radius`, `box-shadow`
   - **Animation & Interaction:** `cursor`, `transition`, `transform`, `animation`
4. **Usage Comments trong TSX:** Mỗi file `.tsx` luôn có một khối JSDoc mô tả mục đích và ví dụ cách sử dụng (Usage example) ở đầu file.
5. **Color & Typography System:** Sử dụng bảng màu 5 sắc độ (`lightest` -> `darkest`) tại `@/commons/colors` và typography chuẩn tại `@/commons/fonts`.
