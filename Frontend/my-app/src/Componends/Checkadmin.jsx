import { Outlet, Navigate } from "react-router-dom";

const Checkadmin = () => {
  const role = localStorage.getItem("role");

  return role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default Checkadmin;
