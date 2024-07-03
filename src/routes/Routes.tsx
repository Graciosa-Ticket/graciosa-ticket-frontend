import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Sector from "../pages/sector";
import { useAuth } from "../hooks/auth";

const AppRoutes = () => {
  const { signed } = useAuth();

  if (signed) {
    return <UserRoute />;
  }

  return <AuthRoute />;
};

const AuthRoute = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate replace to="/" />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};
const UserRoute = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate replace to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/setor" element={<Sector />} />
    </Routes>
  );
};

export default AppRoutes;
