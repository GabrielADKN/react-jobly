import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import UserContext from "../auth/UserContext";

// Child routes from this component can only be accessed if there is a token in UserContext
// If no token, take user to the login page instead

const ProtectedRoutes = () => {
  const { token } = useContext(UserContext);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
