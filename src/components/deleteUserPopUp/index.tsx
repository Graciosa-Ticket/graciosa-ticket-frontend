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

const DeleteUserPopUp = ({ onConfirmDelete, ...props }: deletePopUpProps) => {
  const handleConfirmDelete = () => {
    onConfirmDelete();
  };

  return (
    <CenterModal {...props}>
      <CenterModalHeader>
        <ModalTitle>Desativação de Usuario</ModalTitle>
      </CenterModalHeader>

      <DeletePopUpContainer>
        <div className="alert-icon">
          <AiOutlineWarning size={80} />
        </div>
        <p>
          Você está prestes a desativar esse usuario. <br />
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
            Sim, desativar
          </ButtonComponent>
        </div>
      </DeletePopUpContainer>
    </CenterModal>
  );
};

export default DeleteUserPopUp;
