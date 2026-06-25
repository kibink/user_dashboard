import { Navigate, Outlet } from "react-router";
import { useMe } from "@/features/users/hooks/me";
import LoadingPage from "@/routes/pages/LoadingPage";

export const GuestRoute = () => {
  const { data: user, isLoading } = useMe();
  if (isLoading) return <LoadingPage />;

  if (user) {
    if (user.status === "Blocked") {
      return <Navigate to="/blocked" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
