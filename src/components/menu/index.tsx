import { MenuHeaderHome, UserCallerContainer } from "./styles";
import Logo from "../../assets/graciosa-logo 2.svg";
import HenryCalvo from "../../assets/henrycalvo.svg";
import Modal from "../modal";
import { useMemo, useState } from "react";
import ButtonComponent from "../buttons";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

export default function MenuHeader() {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <Modal open={openModal} onOpenChange={() => setOpenModal(!openModal)}>
        Modal Aberto
      </Modal>
      <MenuHeaderHome>
        <div className="left-side">
          <img src={Logo} alt="" />
        </div>

        <nav className="menu">
          <div className="navigation-menu">
            <NavLink
              to={"/home"}
              className={({ isActive }) => (isActive ? "active-button" : "")}
            >
              Inicio
            </NavLink>
            <NavLink
              to={"/setor"}
              className={({ isActive }) => (isActive ? "active-button" : "")}
            >
              Setores
            </NavLink>
            <NavLink
              to={"/chamados"}
              className={({ isActive }) => (isActive ? "active-button" : "")}
            >
              Chamados
            </NavLink>
            <NavLink
              to={"/users"}
              className={({ isActive }) => (isActive ? "active-button" : "")}
            >
              Usuarios
            </NavLink>
            <a href="">Configurações</a>
          </div>

          <ButtonComponent onClick={() => setOpenModal(true)}>
            + Novo Ticket
          </ButtonComponent>
        </nav>

        <div className="menu-right-img">
          <UserCaller />
        </div>
      </MenuHeaderHome>
    </>
  );
}

const UserCaller = () => {
  const { user } = useAuth();

  const greetingUser = useMemo(() => {
    const currentTime = new Date().getHours();

    if (currentTime < 12) {
      return "Bom Dia ☀️";
    }
    if (currentTime < 18) {
      return "Boa Tarde 🌤️";
    }
    return "Boa Noite 🌙";
  }, []);

  return (
    <UserCallerContainer buttonStyles="text">
      <span>
        {greetingUser}, {user.name}
      </span>
      <img src={HenryCalvo} />
    </UserCallerContainer>
  );
};
