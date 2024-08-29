import { FaAngleLeft } from "react-icons/fa";
import { useAuth } from "../../hooks/auth";
import { UserModel } from "../../models/user";
import { modalActions } from "../../shared/global.interface";
import ButtonComponent from "../buttons";
import { MdLogout } from "react-icons/md";
import Modal, { ModalHeader, ModalTitle } from "../modal";
import { UserComponent } from "../../pages/Users/components/userModal/styles";
import InputPlaceholder from "../form/inputPlaceholder";
import Avatar from "../Avatar";
import { useState } from "react";
import EditedFormPopUp from "../EditedFormPopUp";
import CreateUserModal from "../../pages/Users/components/createUserModal";
import { AiOutlineEdit } from "react-icons/ai";
import SectorIcon from "../../pages/Users/components/sectorIcon";
import LogoutPopUp from "../logOutFormPopUp";
import phoneMask from "../../utils/phoneMask";

export default function UserViewModal({ onClose }: modalActions<UserModel>) {
  const { user } = useAuth();

  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ButtonComponent buttonStyles="text" title="Voltar" onClick={onClose}>
            <FaAngleLeft fontSize="1.9em" />
          </ButtonComponent>
          <ModalTitle>{user?.name}</ModalTitle>
        </div>
        <LogOutButton />
      </ModalHeader>
      <UserComponent>
        <div className="img-sector">
          <Avatar
            {...(user?.profile_picture && {
              src: `profile-picture/${user?.code}/regularSize_${user?.profile_picture}`,
            })}
            alt=""
            className="user-avatar"
          />
        </div>
        <h3 className="user-info-title">informações Pessoais</h3>
        <div className="user-info-area">
          <InputPlaceholder label="Código" value={user.code} />
          <InputPlaceholder label="Nome" value={user.name} />
          <InputPlaceholder
            label="Email"
            value={user?.email}
            copyText={user?.email as string}
          />
          <InputPlaceholder
            label="Telefone/Ramal"
            value={phoneMask(user?.sector?.ramal as string)}
            copyText={user?.sector?.ramal as string}
          />
        </div>
        {user.role !== "Administrator" && (
          <div className="function-area">
            <div className="left-side">
              <span>Função</span>
              <h5>{user.role}</h5>
            </div>
            <div className="right-side">
              <SectorIcon data={user as UserModel} />
            </div>
          </div>
        )}

        <div className="footer">
          <div />
          <div />
          {user?.role === "Administrator" && <EditUserButton data={user} />}
        </div>
      </UserComponent>
    </>
  );
}

const EditUserButton = ({ onUpdate, data }: modalActions) => {
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
        <CreateUserModal
          onClose={onOpenChange}
          onUpdate={handleSuccess}
          data={data}
          onSetEditedData={setHasEditedData}
        />
      </Modal>
      <ButtonComponent buttonStylesType="outline" onClick={handleOpenModal}>
        <AiOutlineEdit /> Editar
      </ButtonComponent>
    </>
  );
};

const LogOutButton = () => {
  const { signOut } = useAuth();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleOpenLogoutModal = () => setOpenLogoutModal(true);

  const handleConfirmLogout = () => {
    signOut();
    setOpenLogoutModal(false);
  };

  return (
    <>
      <LogoutPopUp
        open={openLogoutModal}
        onOpenChange={(open) => setOpenLogoutModal(open)}
        onConfirmLogout={handleConfirmLogout}
      />
      <ButtonComponent buttonStyles="text" onClick={handleOpenLogoutModal}>
        <MdLogout />
        Sair
      </ButtonComponent>
    </>
  );
};
