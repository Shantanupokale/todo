import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token"); // Get token from localStorage

  return token ? <Outlet /> : <Navigate to="/" replace />; // Redirect unauthorized users to landing page
};

export default PrivateRoute;
