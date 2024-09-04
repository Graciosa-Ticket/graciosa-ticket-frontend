import { ReactNode, useState } from "react";
import { AiOutlineClose, AiOutlineWarning } from "react-icons/ai";
import { ActionModalContainer } from "./styles";
import ButtonComponent, { ButtonProps } from "../buttons";
import CenterModal, { CenterModalHeader, ModalTitle } from "../centerModal";

interface actionModalProps {
  message: string;
  modalTitle?: string;
  actionButton: ReactNode;
  children: ReactNode;
  buttonProps?: ButtonProps;
  iconColor?: "warning" | "error";
}

const defaultButtonProps: ButtonProps = {
  buttonStyles: "text",
};

const ActionsModalComponent = ({
  message,
  modalTitle = "Confirmar",
  actionButton,
  children,
  buttonProps = defaultButtonProps,
  iconColor = "warning",
}: actionModalProps) => {
  const [openModal, setOpenModal] = useState(false);

  const iconColorClass = iconColor === "error" ? "error-icon" : "warning-icon";

  return (
    <>
      <CenterModal
        open={openModal}
        onOpenChange={() => setOpenModal(!openModal)}
      >
        <CenterModalHeader>
          <ModalTitle>{modalTitle}</ModalTitle>
          <ButtonComponent
            buttonStyles="text"
            title="Voltar"
            onClick={() => setOpenModal(false)}
          >
            <AiOutlineClose fontSize="1.5em" />
          </ButtonComponent>
        </CenterModalHeader>
        <ActionModalContainer>
          <div className={`alert-icon ${iconColorClass}`}>
            <AiOutlineWarning size={80} />
          </div>
          <div className="content-container">
            <p>{message}</p>
          </div>
          <section className="buttons-container">
            <ButtonComponent
              buttonStyles="text"
              title="Cancelar"
              onClick={() => setOpenModal(false)}
              className="confirm-btn"
            >
              Cancelar
            </ButtonComponent>
            {actionButton}
          </section>
        </ActionModalContainer>
      </CenterModal>

      <ButtonComponent {...buttonProps} onClick={() => setOpenModal(true)}>
        {children}
      </ButtonComponent>
    </>
  );
};

export default ActionsModalComponent;
