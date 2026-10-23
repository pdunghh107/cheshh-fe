import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";

import { AuthProvider } from "@/features/auth/AuthContext";
import { router } from "@/routes";

/**
 * App Root Component
 *
 * @description Điểm khởi đầu của ứng dụng, tích hợp AuthProvider, React Router Data Provider và Toaster notification.
 *
 * @example
 * // Sử dụng trong main.tsx:
 * <App />
 */
function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

