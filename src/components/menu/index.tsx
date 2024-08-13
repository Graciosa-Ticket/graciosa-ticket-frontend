import { MenuHeaderHome, UserCallerContainer } from "./styles";
import Logo from "../../assets/graciosa-logo 2.svg";
import Modal from "../modal";
import { useMemo, useState } from "react";
import ButtonComponent from "../buttons";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import UserViewModal from "../userModal";
import { modalActions } from "../../shared/global.interface";
import EditedFormPopUp from "../EditedFormPopUp";
import CreateTicketModal from "../../pages/tickets/components/createTicketModal";
import { FaPlus } from "react-icons/fa";
import Avatar from "../Avatar";

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
          <NavLink to="/home">
            <img src={Logo} alt="Logo" title="Home" />
          </NavLink>
        </div>

        <nav className="menu">
          <div className="navigation-menu">
            <NavLink
              to={user.role !== "Collaborator" ? "/home" : "/chamados"}
              className={({ isActive }) => (isActive ? "active-button" : "")}
              title="Home"
            >
              {user.role !== "Collaborator" ? "Inicio" : "Chamados"}
            </NavLink>
            {user.role !== "Collaborator" && (
              <>
                <NavLink
                  title="Chamados"
                  to={"/chamados"}
                  className={({ isActive }) =>
                    isActive ? "active-button" : ""
                  }
                >
                  Chamados
                </NavLink>

                {user.role !== "Supervisor" && (
                  <>
                    <NavLink
                      title="Setores"
                      to={"/setor"}
                      className={({ isActive }) =>
                        isActive ? "active-button" : ""
                      }
                    >
                      Setores
                    </NavLink>

                    <NavLink
                      title="Usuarios"
                      to={"/users"}
                      className={({ isActive }) =>
                        isActive ? "active-button" : ""
                      }
                    >
                      Usuarios
                    </NavLink>
                  </>
                )}
              </>
            )}
            <NavLink
              title="Configuração"
              to={"/config"}
              className={({ isActive }) => (isActive ? "active-button" : "")}
            >
              Configurações
            </NavLink>
          </div>
          <AddNewTicketButton />
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
  const [openModal, setOpenModal] = useState(false);

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
    <>
      <Modal open={openModal} onOpenChange={() => setOpenModal(!openModal)}>
        <>
          <UserViewModal data={user} onClose={() => setOpenModal(false)} />
        </>
      </Modal>
      <UserCallerContainer
        title="Seu Perfil"
        buttonStyles="text"
        onClick={() => setOpenModal(true)}
      >
        <span>
          {greetingUser},<span className="user-name">{user.name}</span>
        </span>
        <Avatar
          src={`profile-picture/${user?.code}/minSize_${user?.profile_picture}`}
          alt=""
        />
      </UserCallerContainer>
    </>
  );
};

const AddNewTicketButton = ({ onUpdate }: modalActions) => {
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmCloseModal, setOpenConfirmCloseModal] = useState(false);
  const [hasEditedData, setHasEditedData] = useState(false);

  const onOpenChange = () => {
    if (hasEditedData) {
      setOpenConfirmCloseModal(true);
      return;
    }

    setOpenModal(!openModal);
  };

  const onConfirmCloseModal = () => {
    setHasEditedData(false);
    setOpenConfirmCloseModal(false);
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setHasEditedData(false);
    setOpenConfirmCloseModal(false);
  };

  const handleSuccess = () => {
    onUpdate?.();
    onConfirmCloseModal();
  };

  return (
    <>
      <EditedFormPopUp
        open={hasEditedData && openConfirmCloseModal}
        onOpenChange={() => setOpenConfirmCloseModal(!openConfirmCloseModal)}
        onConfirmCloseModal={onConfirmCloseModal}
      />
      <Modal open={openModal} onOpenChange={onOpenChange}>
        <CreateTicketModal
          onClose={onOpenChange}
          onUpdate={handleSuccess}
          onSetEditedData={setHasEditedData}
        />
      </Modal>
      <ButtonComponent title="Novo Ticket" onClick={handleOpenModal}>
        <FaPlus />
      </ButtonComponent>
    </>
  );
};
