import { RouterProvider } from "react-router";
import { AuthProvider } from "@/features/auth/AuthContext";
import { router } from "@/routes";


/**
 * App Root Component
 *
 * @description Điểm khởi đầu của ứng dụng, tích hợp AuthProvider và React Router Data Provider.
 *
 * @example
 * // Sử dụng trong main.tsx:
 * <App />
 */

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
