import { DialogProps } from "@radix-ui/react-dialog";
import ButtonComponent from "../buttons";
import CenterModal, {
  CenterModalHeader,
  ModalTitle,
  ModalTriggerClose,
} from "../centerModal";
import { AiOutlineWarning } from "react-icons/ai";
import { DeletePopUpContainer } from "./styles";

interface deletePopUpProps extends DialogProps {
  onConfirmDelete(): void;
}

const DeletePopUp = ({ onConfirmDelete, ...props }: deletePopUpProps) => {
  const handleConfirmDelete = () => {
    onConfirmDelete();
  };

  return (
    <CenterModal {...props}>
      <CenterModalHeader>
        <ModalTitle>Confirmar exclusão de ticket</ModalTitle>
      </CenterModalHeader>

      <DeletePopUpContainer>
        <div className="alert-icon">
          <AiOutlineWarning size={80} />
        </div>
        <p>
          Você está prestes a excluir o ticket. <br />
          essa ação é irreversivel <br />
          Tem certeza que deseja prosseguir?
        </p>

        <div className="buttons-container">
          <ModalTriggerClose>Cancelar</ModalTriggerClose>

          <ButtonComponent
            buttonStyles="delete"
            buttonStylesType="outline"
            buttonSize="small"
            onClick={handleConfirmDelete}
          >
            Sim, excluir
          </ButtonComponent>
        </div>
      </DeletePopUpContainer>
    </CenterModal>
  );
};

export default DeletePopUp;
