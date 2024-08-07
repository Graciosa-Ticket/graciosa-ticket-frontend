import { FaAngleLeft } from "react-icons/fa";
import { useAuth } from "../../hooks/auth";
import { UserModel } from "../../models/user";
import { modalActions } from "../../shared/global.interface";
import ButtonComponent from "../buttons";
import { MdLogout } from "react-icons/md";
import Modal, { ModalHeader, ModalTitle } from "../modal";
import { UserComponent } from "../../pages/Users/components/userModal/styles";
import InputPlaceholder from "../form/inputPlaceholder";
import { formatDate } from "date-fns";
import { calculateAge } from "../../utils/calculateAge";
import formatCEP from "../../utils/cepMask";
import phoneMask from "../../utils/phoneMask";
import SectorIcon from "../../pages/Users/components/sectorIcon";
import Avatar from "../Avatar";
import ActionsModalComponent from "../actionModal";
import { useState } from "react";
import EditedFormPopUp from "../EditedFormPopUp";
import CreateUserModal from "../../pages/Users/components/createUserModal";
import { AiOutlineEdit } from "react-icons/ai";

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
          <Avatar src={user?.profile_picture} alt="" className="user-avatar" />
        </div>
        <h3 className="user-info-title">informações Pessoais</h3>
        <div className="user-info-area">
          <InputPlaceholder label="Código" value={user.code} />
          <InputPlaceholder label="Nome" value={user.name} />

          <InputPlaceholder
            label="Nascimento"
            value={
              user.birth_date ? formatDate(user.birth_date, "dd/MM/yyyy") : ""
            }
            affix={{
              suffix: user.birth_date
                ? calculateAge(user.birth_date) + " Anos"
                : undefined,
            }}
          />
          <InputPlaceholder label="Endereço" value={user.address} />
          <InputPlaceholder label="CEP" value={formatCEP(user.cep as string)} />
          <InputPlaceholder
            label="Telefone/Ramal"
            value={phoneMask(user.phone_number as string)}
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
          {user?.role !== "Collaborator" && (        
            <EditUserButton data={user} />            
          )}
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

  return (
    <>
      <ActionsModalComponent
        actionButton={
          <ButtonComponent
            buttonStyles="delete"
            buttonStylesType="outline"
            title="Sair"
            onClick={signOut}
          >
            Sair
          </ButtonComponent>
        }
        message="Você está saindo do sistema, tem certeza que deseja prosseguir?"
      >
        Sair
        <MdLogout />
      </ActionsModalComponent>
    </>
  );
};