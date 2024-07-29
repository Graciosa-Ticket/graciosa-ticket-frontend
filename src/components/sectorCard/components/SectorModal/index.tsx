import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { SectorModel } from "../../../../models/sector";
import ButtonComponent from "../../../buttons";
import CenterModal, { ModalTitle } from "../../../centerModal";
import {
  FormButtonsContainer,
  FormContainer,
  FormContentContainer,
} from "../../../form/form";
import InputPlaceholder from "../../../form/inputPlaceholder";
import { ModalHeader } from "../../../modal";
import { SectorModalContainer } from "./styles";
import CreateSectorModal from "../../../../pages/sector/components/createNewSector";
import EditedFormPopUp from "../../../EditedFormPopUp";
import { modalActions } from "../../../../shared/global.interface";
import { useState } from "react";
import SectorUserSelect from "../userSelect";
import { UserModel } from "../../../../models/user";
import ActionsModalComponent from "../../../actionModal";
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";
import { toast } from "sonner";

const SectorModal = ({ data, onUpdate }: modalActions<SectorModel>) => {
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

  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ModalTitle>{data?.name}</ModalTitle>
        </div>
      </ModalHeader>
      <SectorModalContainer>
        <FormContainer>
          <FormContentContainer>
            <InputPlaceholder
              label="Reponsável"
              value={
                <SectorUserSelect
                  data={data?.user as UserModel}
                  refetch={() => onUpdate?.()}
                />
              }
            />
            <InputPlaceholder label="Nome" value={data?.name} />

            <InputPlaceholder label="Descrição" value={data?.description} />
          </FormContentContainer>
          <FormButtonsContainer $columns={3}>
            <div />
            <ActionsModalComponent
              message="Confirme para deletar este setor. Esta ação não pode ser desfeita."
              actionButton={
                <ButtonComponent
                  buttonStyles="delete"
                  onClick={handleDeleteSector}
                  isLoading={isLoadingDelete}
                >
                  Deletar
                </ButtonComponent>
              }
              buttonProps={{
                buttonStyles: "delete",
                buttonStylesType: "outline",
              }}
            >
              <AiOutlineDelete /> Deletar
            </ActionsModalComponent>
            <EditUserButton data={data} />
          </FormButtonsContainer>
        </FormContainer>
      </SectorModalContainer>
    </>
  );
};

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
      <CenterModal open={openModal} onOpenChange={onOpenChange}>
        <CreateSectorModal
          onClose={onOpenChange}
          onUpdate={handleSuccess}
          data={data}
          onSetEditedData={setHasEditedData}
        />
      </CenterModal>
      <ButtonComponent buttonStylesType="outline" onClick={handleOpenModal}>
        <AiOutlineEdit /> Editar
      </ButtonComponent>
    </>
  );
};

export default SectorModal;
