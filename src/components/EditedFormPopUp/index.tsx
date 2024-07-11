import { DialogProps } from "@radix-ui/react-dialog";
import ButtonComponent from "../buttons";
import CenterModal, {
  CenterModalHeader,
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
        <h2>teste</h2>
      </CenterModalHeader>

      <EditedFormContainer>
        <p>As informaçãoes vão ser descartadas</p>

        <div className="buttons-container">
          <ModalTriggerClose>Voltar</ModalTriggerClose>

          <ButtonComponent buttonStyles="error" onClick={handleConfirmClose}>
            Fechar
          </ButtonComponent>
        </div>
      </EditedFormContainer>
    </CenterModal>
  );
};

export default EditedFormPopUp;
