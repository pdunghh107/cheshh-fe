import { useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import styled from "styled-components";

import { Loading } from "@/components/Loading";
import { restoreAuthSession } from "@/features/auth/authSlice";
import { router } from "@/routes";
import { useAppDispatch, useAppSelector } from "@/store";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f8fafc;
`;

/**
 * App Root Component
 *
 * @description Điểm khởi đầu của ứng dụng, tự động khôi phục phiên đăng nhập (Silent Refresh) từ Cookie vào Redux Toolkit.
 *
 * @example
 * <App />
 */
function App() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const hasRestoredRef = useRef(false);

  useEffect(() => {
    if (hasRestoredRef.current) return;
    hasRestoredRef.current = true;

    dispatch(restoreAuthSession());
  }, [dispatch]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading size={40} />
      </LoadingContainer>
    );
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

