import React from "react";
import { useSearchParams } from "react-router";

import { InitialLoginView } from "@/features/auth/components/InitialLoginView";
import { RedirectedLoginView } from "@/features/auth/components/RedirectedLoginView";

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isRedirected = searchParams.get("redirect") === "true";

  return isRedirected ? <RedirectedLoginView /> : <InitialLoginView />;
};

export default LoginPage;
