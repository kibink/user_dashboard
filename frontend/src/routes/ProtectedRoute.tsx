import { Navigate, Outlet } from "react-router";
import { useMe } from "@/features/users/hooks/me";
import LoadingPage from "@/routes/pages/LoadingPage";

export const ProtectedRoute = () => {
  const { data: user, isLoading } = useMe();
  if (isLoading) return <LoadingPage />;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.isBlocked) {
    return <Navigate to="/blocked" />;
  }

  return <Outlet />;
};
