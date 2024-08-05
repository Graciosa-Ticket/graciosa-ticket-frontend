import {
  AiOutlineCheckCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { FaAngleLeft } from "react-icons/fa";
import ButtonComponent from "../../../../components/buttons";
import Modal, { ModalHeader, ModalTitle } from "../../../../components/modal";
import SectorIcon from "../sectorIcon";
import { UserComponent } from "./styles";
import { formatDate } from "date-fns";
import { useState } from "react";
import InputPlaceholder from "../../../../components/form/inputPlaceholder";
import { calculateAge } from "../../../../utils/calculateAge";
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";
import phoneMask from "../../../../utils/phoneMask";
import formatCEP from "../../../../utils/cepMask";
import ActionsModalComponent from "../../../../components/actionModal";
import { modalActions } from "../../../../shared/global.interface";
import { UserModel } from "../../../../models/user";
import { toast } from "sonner";
import CreateUserModal from "../createUserModal";
import Avatar from "../../../../components/Avatar";
import EditedFormPopUp from "../../../../components/EditedFormPopUp";
import StatusComponent from "../Status";

export default function UserModal({
  data,
  onClose,
  onUpdate,
}: modalActions<UserModel>) {
  const { mutate: deleteUser, isLoading: isLoadingDelete } = useMutationQuery(
    `/users/${data?.code}`,
    "delete"
  );

  const handleDeleteUser = () => {
    deleteUser(
      {},
      {
        onSuccess: () => {
          toast.success("usuário deletado com sucesso!");
          onUpdate?.();
        },
      }
    );
  };

  const { mutate: unDeleteUser, isLoading: isLoadingUnDelete } =
    useMutationQuery(`/users/undoDeletedUser/${data?.code}`, "post");

  const handleReactiveUser = () => {
    unDeleteUser(
      {},
      {
        onSuccess: () => {
          toast.success("usuário Reativado com sucesso!");
          onUpdate?.();
        },
      }
    );
  };

  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ButtonComponent buttonStyles="text" title="Voltar" onClick={onClose}>
            <FaAngleLeft fontSize="1.9em" />
          </ButtonComponent>
          <ModalTitle>{data?.name}</ModalTitle>
        </div>
        {data && <StatusComponent status={!data?.deleted_at} />}
      </ModalHeader>

      <UserComponent>
        <div className="img-sector">
          <Avatar src={data?.profile_picture} alt="" className="user-avatar" />
        </div>
        <h3 className="user-info-title">informações Pessoais</h3>
        <div className="user-info-area">
          <InputPlaceholder label="Código" value={data?.code} />
          <InputPlaceholder label="Nome" value={data?.name} />

          <InputPlaceholder
            label="Nascimento"
            value={
              data?.birth_date ? formatDate(data?.birth_date, "dd/MM/yyyy") : ""
            }
            affix={{
              suffix: data?.birth_date
                ? calculateAge(data?.birth_date) + " Anos"
                : undefined,
            }}
          />
          <InputPlaceholder label="Endereço" value={data?.address} />
          <InputPlaceholder
            label="CEP"
            value={formatCEP(data?.cep as string)}
          />
          <InputPlaceholder
            label="Telefone/Ramal"
            value={phoneMask(data?.phone_number as string)}
          />
        </div>
        {data?.role !== "Administrator" && (
          <div className="function-area">
            <div className="left-side">
              <span>Função</span>
              <h5>{data?.role}</h5>
            </div>
            <div className="right-side">
              <SectorIcon data={data as UserModel} />
            </div>
          </div>
        )}
        <div className="footer">
          <div />
          {!data?.deleted_at ? (
            <ActionsModalComponent
              message="Confirme para deletar este usuário. Esta ação não pode ser desfeita."
              actionButton={
                <ButtonComponent
                  buttonStyles="delete"
                  buttonStylesType="outline"
                  onClick={handleDeleteUser}
                  isLoading={isLoadingDelete}
                >
                  Confirmar Deletar usuário
                </ButtonComponent>
              }
              buttonProps={{
                buttonStyles: "delete",
                buttonStylesType: "outline",
              }}
            >
              <AiOutlineDelete /> Deletar
            </ActionsModalComponent>
          ) : (
            <ActionsModalComponent
              message="Confirme para reativar este usuário."
              actionButton={
                <ButtonComponent
                  buttonStyles="confirm"
                  onClick={handleReactiveUser}
                  isLoading={isLoadingUnDelete}
                >
                  Confirmar
                </ButtonComponent>
              }
              buttonProps={{
                buttonStyles: "confirm",
                buttonStylesType: "outline",
              }}
            >
              <AiOutlineCheckCircle /> Reativar
            </ActionsModalComponent>
          )}

          <EditUserButton data={data} onUpdate={onUpdate} />
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
