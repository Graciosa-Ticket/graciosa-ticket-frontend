import { DialogProps } from "@radix-ui/react-dialog";
import ButtonComponent from "../buttons";
import CenterModal, {
  CenterModalHeader,
  ModalTitle,
  ModalTriggerClose,
} from "../centerModal";
import { EditedFormContainer } from "./styles";
import { AiOutlineWarning } from "react-icons/ai";

interface EditedFormPopUpProps extends DialogProps {
  onConfirmCloseModal(): void;
  title?: string; // Texto do título
  message?: string; // Texto da mensagem
  buttonText?: string; // Texto do botão
  iconColor?: string; // Cor do ícone
  buttonStyles?: "confirm" | "delete" | "primary"; // Estilo do botão
}

const FormPopUp = ({
  onConfirmCloseModal,
  title = "Descartar informações",
  message = "Tem certeza que deseja fechar o formulário? <br /> as informações serão perdidas.",
  buttonText = "Sim, fechar",
  iconColor,
  buttonStyles = "delete",
  ...props
}: EditedFormPopUpProps) => {
  const handleConfirmClose = () => {
    onConfirmCloseModal();
  };

  return (
    <CenterModal {...props}>
      <CenterModalHeader>
        <ModalTitle>{title}</ModalTitle>
      </CenterModalHeader>

      <EditedFormContainer>
        <div className="alert-icon" style={{ color: iconColor }}>
          <AiOutlineWarning size={80} />
        </div>
        <p dangerouslySetInnerHTML={{ __html: message }} />

        <div className="buttons-container">
          <ModalTriggerClose>Voltar</ModalTriggerClose>

          <ButtonComponent
            buttonStyles={buttonStyles}
            buttonStylesType="outline"
            buttonSize="small"
            onClick={handleConfirmClose}
          >
            {buttonText}
          </ButtonComponent>
        </div>
      </EditedFormContainer>
    </CenterModal>
  );
};

export default FormPopUp;
