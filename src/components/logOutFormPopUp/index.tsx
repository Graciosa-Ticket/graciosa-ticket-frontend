import { DialogProps } from "@radix-ui/react-dialog";
import ButtonComponent from "../buttons";
import CenterModal, {
  CenterModalHeader,
  ModalTitle,
  ModalTriggerClose,
} from "../centerModal";
import { AiOutlineWarning } from "react-icons/ai";
import { LogOutFormContainer } from "./styles";

interface LogoutPopUpProps extends DialogProps {
  onConfirmLogout(): void;
}

const LogoutPopUp = ({ onConfirmLogout, ...props }: LogoutPopUpProps) => {
  const handleConfirmLogout = () => {
    onConfirmLogout();
  };

  return (
    <CenterModal {...props}>
      <CenterModalHeader>
        <ModalTitle>Confirmar Logout</ModalTitle>
      </CenterModalHeader>

      <LogOutFormContainer>
        <div className="alert-icon">
          <AiOutlineWarning size={80} />
        </div>
        <p>
          Você está prestes a sair do sistema. <br /> Tem certeza que deseja
          prosseguir?
        </p>

        <div className="buttons-container">
          <ModalTriggerClose>Cancelar</ModalTriggerClose>

          <ButtonComponent
            buttonStyles="delete"
            buttonStylesType="outline"
            onClick={handleConfirmLogout}
          >
            Sim, sair
          </ButtonComponent>
        </div>
      </LogOutFormContainer>
    </CenterModal>
  );
};

export default LogoutPopUp;
