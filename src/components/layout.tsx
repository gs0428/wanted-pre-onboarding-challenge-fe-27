import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const isLogin = localStorage.getItem("token");

  useEffect(() => {
    if (isLogin && pathname.startsWith("/auth")) {
      navigate("/todos");
    } else if (!isLogin && !pathname.startsWith("/auth")) {
      navigate("/auth");
    }
  }, [isLogin, pathname, navigate]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
};

export default Layout;
