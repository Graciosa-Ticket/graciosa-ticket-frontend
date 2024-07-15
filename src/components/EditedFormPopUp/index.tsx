import { DialogProps } from "@radix-ui/react-dialog";
import ButtonComponent from "../buttons";
import CenterModal, {
  CenterModalHeader,
  ModalTitle,
  ModalTriggerClose,
} from "../centerModal";
import { EditedFormContainer } from "./styles";

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
        <p>
          Tem certeza que deseja fechar o formulário? <br /> as informações vão
          ser perdidas.
        </p>

        <div className="buttons-container">
          <ModalTriggerClose>Voltar</ModalTriggerClose>

          <ButtonComponent buttonStyles="delete" onClick={handleConfirmClose}>
            Fechar
          </ButtonComponent>
        </div>
      </EditedFormContainer>
    </CenterModal>
  );
};

export default EditedFormPopUp;
