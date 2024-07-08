import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Sector from "../pages/sector";
import { useAuth } from "../hooks/auth";
import { DefaultContainer } from "./styles";
import MenuHeader from "../components/menu";
import Users from "../pages/Users";
import TicketsPage from "../pages/tickets";

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
        <Route path="/users" element={<Users />} />
        <Route path="/chamados" element={<TicketsPage />} />
      </Route>
    </Routes>
  );
};

const DefaultLayout = () => {
  return (
    <DefaultContainer>
      <MenuHeader />
      <section className="page-default">
        <Outlet />
      </section>
    </DefaultContainer>
  );
};

export default AppRoutes;
