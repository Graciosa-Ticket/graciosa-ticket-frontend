import { MenuHeaderHome } from "./styles";
import Logo from "../../assets/graciosa-logo 2.svg";
import HenryCalvo from "../../assets/henrycalvo.svg";
import Modal from "../modal";
import { useState } from "react";

export default function MenuHeader() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <MenuHeaderHome>
      <header>
        <nav className="menu">
          <img src={Logo} alt="" />

          <ul>
            <li>
              <a href="">Inicio</a>
            </li>
            <li>
              <a href="/setor">Setores</a>
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

          <div className="menu-right-img">
            <button
              className="new-ticket-btn"
              onClick={() => setOpenModal(true)}
            >
              + Novo Ticket
            </button>
            <p>Boa Tarde, Henry C.</p>
            <img src={HenryCalvo} />
          </div>
          <Modal
            isOpen={openModal}
            setModalOpen={() => setOpenModal(!openModal)}
          >
            Modal Aberto
          </Modal>
        </nav>
      </header>
    </MenuHeaderHome>
  );
}
