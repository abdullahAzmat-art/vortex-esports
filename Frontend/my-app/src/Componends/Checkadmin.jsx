import { Outlet, Navigate } from "react-router-dom";

const Checkadmin = () => {
  const role = sessionStorage.getItem("role");

  return role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default Checkadmin;
