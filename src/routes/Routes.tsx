import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Sector from "../pages/sector";
import { useAuth } from "../hooks/auth";
import { DefaultContainer } from "./styles";
import MenuHeader from "../components/menu";
import Users from "../pages/Users";

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
      <Route element={<DefaultLayout />}>
        <Route path="*" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/setor" element={<Sector />} />
        <Route path="/usuarios" element={<Users />} />
      </Route>
    </Routes>
  );
};

const DefaultLayout = () => {
  return (
    <DefaultContainer>
      <div className="menu-default-container">
        <MenuHeader />
      </div>
      <section className="page-default">
        <Outlet />
      </section>
    </DefaultContainer>
  );
};

export default AppRoutes;
