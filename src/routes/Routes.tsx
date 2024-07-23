import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Sector from "../pages/sector";
import { useAuth } from "../hooks/auth";
import { DefaultContainer } from "./styles";
import MenuHeader from "../components/menu";
import Users from "../pages/Users";
import TicketsPage from "../pages/tickets";
import LoginPage from "../pages/login";
import Config from "../pages/config";

const AppRoutes = () => {
  const { signed, user } = useAuth();

    if (signed)  {
      if(user.role === "Collaborator"){
        return <CollaboratorRoute/>;
      }
      if(user.role === "Supervisor"){
        return <SupervisorRoute/>;
      }
      return <AdminRoute />;
    }
  return <AuthRoute />;
};

const AuthRoute = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate replace to="/" />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};

const CollaboratorRoute = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="*" element={<Navigate replace to="/chamados" />} />        
        <Route path="/chamados" element={<TicketsPage />} />
        <Route path="/config" element={<Config />} />
      </Route>
    </Routes>
  );
};

const SupervisorRoute = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="*" element={<Navigate replace to="/home" />} />
        <Route path="/chamados" element={<TicketsPage />} />
        <Route path="/config" element={<Config />} />          
        <Route path="/home" element={<Home />} />        
      </Route>
    </Routes>
  );
};

const AdminRoute = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="*" element={<Navigate replace to="/home" />} />      
        <Route path="/config" element={<Config />} />     
        <Route path="/chamados" element={<TicketsPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/setor" element={<Sector />} />
        <Route path="/users" element={<Users />} />
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
