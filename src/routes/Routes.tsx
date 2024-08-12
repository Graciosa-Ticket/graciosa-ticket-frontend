import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Sector from "../pages/sector";
import { useAuth } from "../hooks/auth";
import { DefaultContainer } from "./styles";
import MenuHeader from "../components/menu";
import Users from "../pages/Users";
import TicketsPage from "../pages/tickets";
import LoginPage from "../pages/login";
import Config from "../pages/config";

// Função principal que define as rotas da aplicação
const AppRoutes = () => {
  // Recupera o estado de autenticação e o usuário atual
  const { signed, user } = useAuth();

  // Se o usuário não estiver autenticado, redireciona para as rotas de autenticação
  if (!signed) {
    return <AuthRoute />;
  }

  // Se o usuário for um "Collaborator", redireciona para as rotas específicas desse papel
  if (user.role === "Collaborator") {
    return <CollaboratorRoute />;
  }

  // Se o usuário for um "Supervisor", redireciona para as rotas específicas desse papel
  if (user.role === "Supervisor") {
    return <SupervisorRoute />;
  }

  // Se o usuário for um "Admin", redireciona para as rotas específicas desse papel
  return <AdminRoute />;
};

// Define as rotas de autenticação
const AuthRoute = () => {
  return (
    <Routes>
      {/* Se a rota não for encontrada, redireciona para a página de login */}
      <Route path="*" element={<Navigate replace to="/" />} />
      {/* Define a rota para a página de login */}
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};

// Interface para definir as props do componente PrivateRoute
interface PrivateRouteProps {
  element: React.ComponentType; // Define que a prop 'element' é um componente React
}

// Componente para proteger rotas, verificando se o usuário está autenticado
const PrivateRoute = ({ element: Component }: PrivateRouteProps) => {
  const { signed } = useAuth(); // Recupera o estado de autenticação

  // Se o usuário estiver autenticado, renderiza o componente; caso contrário, redireciona para a página de login
  return signed ? <Component /> : <Navigate replace to="/" />;
};

// Define as rotas para o papel de "Collaborator"
const CollaboratorRoute = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        {/* Se a rota não for encontrada, redireciona para a página de chamados */}
        <Route path="*" element={<Navigate replace to="/chamados" />} />
        {/* Define a rota para a página de chamados, protegida pelo PrivateRoute */}
        <Route
          path="/chamados"
          element={<PrivateRoute element={TicketsPage} />}
        />
        {/* Define a rota para a página de configurações, protegida pelo PrivateRoute */}
        <Route path="/config" element={<PrivateRoute element={Config} />} />
      </Route>
    </Routes>
  );
};

// Define as rotas para o papel de "Supervisor"
const SupervisorRoute = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        {/* Se a rota não for encontrada, redireciona para a página inicial */}
        <Route path="*" element={<Navigate replace to="/home" />} />
        {/* Define a rota para a página de chamados, protegida pelo PrivateRoute */}
        <Route
          path="/chamados"
          element={<PrivateRoute element={TicketsPage} />}
        />
        {/* Define a rota para a página de configurações, protegida pelo PrivateRoute */}
        <Route path="/config" element={<PrivateRoute element={Config} />} />
        {/* Define a rota para a página inicial, protegida pelo PrivateRoute */}
        <Route path="/home" element={<PrivateRoute element={Home} />} />
      </Route>
    </Routes>
  );
};

// Define as rotas para o papel de "Admin"
const AdminRoute = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        {/* Se a rota não for encontrada, redireciona para a página inicial */}
        <Route path="*" element={<Navigate replace to="/home" />} />
        {/* Define a rota para a página de configurações, protegida pelo PrivateRoute */}
        <Route path="/config" element={<PrivateRoute element={Config} />} />
        {/* Define a rota para a página de chamados, protegida pelo PrivateRoute */}
        <Route
          path="/chamados"
          element={<PrivateRoute element={TicketsPage} />}
        />
        {/* Define a rota para a página inicial, protegida pelo PrivateRoute */}
        <Route path="/home" element={<PrivateRoute element={Home} />} />
        {/* Define a rota para a página de setores, protegida pelo PrivateRoute */}
        <Route path="/setor" element={<PrivateRoute element={Sector} />} />
        {/* Define a rota para a página de usuários, protegida pelo PrivateRoute */}
        <Route path="/users" element={<PrivateRoute element={Users} />} />
      </Route>
    </Routes>
  );
};

// Layout padrão que envolve as páginas, contendo o menu e uma seção para o conteúdo
const DefaultLayout = () => {
  return (
    <DefaultContainer>
      <MenuHeader />
      <section className="page-default">
        <Outlet /> {/* Renderiza o componente filho correspondente à rota */}
      </section>
    </DefaultContainer>
  );
};

export default AppRoutes;
