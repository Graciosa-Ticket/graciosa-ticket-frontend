import { MenuHeaderHome } from "./styles";
import Logo from "../../assets/graciosa-logo 2.svg";
import HenryCalvo from "../../assets/henrycalvo.svg";
import Modal from "../modal";
import { useState } from "react";
import ButtonComponent from "../buttons";
import { NavLink } from "react-router-dom";

export default function MenuHeader() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <MenuHeaderHome>
      <img src={Logo} alt="" />

      <nav className="menu">
        <ul>
          <li>
            <NavLink
              to={"/home"}
              className={({ isActive }) => (isActive ? "active-button" : "")}
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/setor"}
              className={({ isActive }) => (isActive ? "active-button" : "")}
            >
              Setores
            </NavLink>
          </li>
          <li>
            <a href="">Chamados</a>
          </li>
          <li>
            <a href="">Usuários</a>
          </li>
          <li>
            <a href="">Configurações</a>
          </li>
        </ul>
      </nav>

      <div className="menu-right-img">
        <ButtonComponent onClick={() => setOpenModal(true)}>
          + Novo Ticket
        </ButtonComponent>
        <p>Boa Tarde, Henry C.</p>
        <img src={HenryCalvo} />
      </div>
      <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
        Modal Aberto
      </Modal>
    </MenuHeaderHome>
  );
}
