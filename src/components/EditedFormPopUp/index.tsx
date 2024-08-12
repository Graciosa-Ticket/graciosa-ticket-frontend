import { DialogProps } from "@radix-ui/react-dialog";
import ButtonComponent from "../buttons";
import CenterModal, {
  CenterModalHeader,
  ModalTitle,
  ModalTriggerClose,
} from "../centerModal";
import { EditedFormContainer } from "./styles";
import { AiOutlineWarning } from "react-icons/ai";

interface editedFormPopUp extends DialogProps {
  onConfirmCloseModal(): void;
}

const EditedFormPopUp = ({
  onConfirmCloseModal,
  ...props
}: editedFormPopUp) => {
  const handleConfirmClose = () => {
    onConfirmCloseModal();
  };

  return (
    <CenterModal {...props}>
      <CenterModalHeader>
        <ModalTitle>Descartar informações</ModalTitle>
      </CenterModalHeader>

      <EditedFormContainer>
        <div className="alert-icon">
          <AiOutlineWarning size={100} />
        </div>
        <p>
          Tem certeza que deseja fechar o formulário? <br /> as informações vão
          ser perdidas.
        </p>

        <div className="buttons-container">
          <ModalTriggerClose>Voltar</ModalTriggerClose>

          <ButtonComponent
            buttonStyles="delete"
            buttonStylesType="outline"
            onClick={handleConfirmClose}
          >
            sim, Fechar
          </ButtonComponent>
        </div>
      </EditedFormContainer>
    </CenterModal>
  );
};

export default EditedFormPopUp;
