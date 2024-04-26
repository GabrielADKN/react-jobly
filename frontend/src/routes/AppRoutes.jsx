import { Routes, Route } from "react-router-dom";
import JobsList from "../jobs/JobsList";
import CompaniesList from "../companies/CompaniesList";
import CompanyDetail from "../companies/CompanyDetail";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Profile from "../profiles/Profile";
import Home from "../homepage/Home";
import Logout from "../auth/Logout";
import { useContext } from "react";
import UserContext from "../auth/UserContext";
import ProtectedRoutes from "../routes/ProtectedRoutes";


const AppRoutes = () => {
  const { currentUser, token } = useContext(UserContext);

  return (
    <Routes>
      {/* Home routes.  */}
      <Route path="/" element={<Home />} />

      {/* Logged Out Routes.  */}

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />

      {/* Login Protected Routes */}
      <Route element={<ProtectedRoutes token={token} />}>
        {/* Companies routes */}
        <Route path="/companies" element={<CompaniesList />} />
        <Route path="/companies/:handle" element={<CompanyDetail />} />
        {/* Jobs routes.  */}
        <Route path="/jobs" element={<JobsList />} />
        {/* Profile routes.  */}
        <Route path="/:username" element={<Profile user={currentUser} />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
