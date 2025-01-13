import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../store/store";

const ProtectRoutes = () => {
  const { adminInfo } = useStore();

  // Redirect to login if not authenticated
  if (!adminInfo) {
    return <Navigate to="/login" replace />;
  }

  // Render nested routes
  return <Outlet />;
};

export default ProtectRoutes;
