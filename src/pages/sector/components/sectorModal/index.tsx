import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSwap } from "react-icons/ai";
import { toast } from "sonner";
import ButtonComponent from "../../../../components/buttons";
import { ModalHeader, ModalTitle } from "../../../../components/modal";
import ActionsModalComponent from "../../../../components/actionModal";
import SelectUsers from "../../../../components/form/selectUsers";
import { SectorCardModel } from "../../../../models/sector";
import { UserModel } from "../../../../models/user";
import { modalActions } from "../../../../shared/global.interface";
import { SectorModalComponent } from "./styles";
import SectorTicketsDisplay from "../sectorTicketsDisplay";
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";
import EditedFormPopUp from "../../../../components/EditedFormPopUp";
import CenterModal from "../../../../components/centerModal";
import CreateSectorModal from "../createNewSector";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

export default function SectorModal({
  data,
  onClose,
  onUpdate,
}: modalActions<SectorCardModel>) {
  const { mutate: deleteSector, isLoading: isLoadingDelete } = useMutationQuery(
    `/sectors/${data?.code}`,
    "delete"
  );

  const handleDeleteSector = () => {
    deleteSector(
      {},
      {
        onSuccess: () => {
          toast.success("Setor deletado com sucesso!");
          onUpdate?.();
        },
      }
    );
  };

  const { mutate: updateSectorUser, isLoading: isLoadingUpdate } =
    useMutationQuery(`/sectors`, "put");

  const handleChangeUser = (user: UserModel) => {
    updateSectorUser(
      {
        responsible_code: user.code,
        code: data?.code,
      },
      {
        onSuccess: () => {
          toast.success("Responsável Alterado!");
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
      </ModalHeader>

      <SectorModalComponent>
        <div className="select-user-div">
          <SelectUsers
            label="Responsável"
            title="Alterar Responsável"
            showRemoveButton={false}
            placeholderIcon={<AiOutlineSwap />}
            defaultValue={data?.user as UserModel}
            onChange={handleChangeUser}
          />
          <p className="arrows-button">
            <FaArrowRightArrowLeft /> Substituir
          </p>
        </div>

        <h1>Chamados do Setor</h1>
        <SectorTicketsDisplay data={data} />

        <div className="footer">
          <div />

          <ActionsModalComponent
            message="Confirme para deletar este Setor. Esta ação não pode ser desfeita."
            actionButton={
              <ButtonComponent
                buttonStyles="delete"
                buttonStylesType="outline"
                onClick={handleDeleteSector}
                isLoading={isLoadingDelete}
              >
                Confirmar Deletar Setor
              </ButtonComponent>
            }
            buttonProps={{
              buttonStyles: "delete",
              buttonStylesType: "outline",
            }}
          >
            <AiOutlineDelete /> Deletar
          </ActionsModalComponent>

          <EditSectorButton
            isLoading={isLoadingUpdate}
            data={data}
            onUpdate={onUpdate}
          />
        </div>
      </SectorModalComponent>
    </>
  );
}

interface editSector extends modalActions {
  isLoading: boolean;
}

const EditSectorButton = ({ onUpdate, data, isLoading }: editSector) => {
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

      <CenterModal open={openModal} onOpenChange={onOpenChange}>
        <CreateSectorModal
          onClose={onOpenChange}
          onUpdate={handleSuccess}
          data={data}
          onSetEditedData={setHasEditedData}
        />
      </CenterModal>

      <ButtonComponent
        buttonStylesType="outline"
        isLoading={isLoading}
        onClick={handleOpenModal}
      >
        <AiOutlineEdit /> Editar
      </ButtonComponent>
    </>
  );
};
