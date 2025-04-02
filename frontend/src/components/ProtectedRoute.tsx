import { Navigate, Outlet } from "react-router-dom";

export const ProtectedDashboardRoute = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to={"/login"} />;
};

export const ProtectedLoginSignupRoute = () => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to={"/"} /> : <Outlet />;
};
