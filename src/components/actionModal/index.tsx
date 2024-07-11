import { ReactNode, useState } from "react";
import { AiOutlineClose} from "react-icons/ai";
import { ActionModalContainer } from "./styles";
import { ModalHeader } from "../modal";
import ButtonComponent, { ButtonProps } from "../buttons";
import CenterModal from "../centerModal";

interface actionModalProps {
  message: string;  
  modalTitle?: string;
  actionButton: ReactNode;
  children: ReactNode;
  buttonProps?: ButtonProps
}


const defaultButtonProps: ButtonProps = {
  buttonStyles: "text"
}

const ActionsModalComponent = ({ message, modalTitle = "Confirmar", actionButton,children, buttonProps = defaultButtonProps}: actionModalProps) => {  
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
    
    <CenterModal open={openModal} onOpenChange={() => setOpenModal(!openModal)}>
      <ModalHeader>
        <h3>{modalTitle}</h3>
          <ButtonComponent buttonStyles="text" title="Voltar" onClick={() => setOpenModal(false)}>
            <AiOutlineClose fontSize="2em" />
          </ButtonComponent>
      </ModalHeader>
      <ActionModalContainer>          
            <div className="content-container">
            <p>
              {message}
            </p>
              </div>        

                       
                <section className="buttons-container">
                  <ButtonComponent 
                    buttonStyles="text" 
                    title="Cancelar" 
                    onClick={() => setOpenModal(false)}
                    className="confirm-btn">
                      Cancelar
                  </ButtonComponent>
                
                {actionButton}
                
                </section>
      </ActionModalContainer>
    </CenterModal>

<ButtonComponent {...buttonProps}  onClick={() => setOpenModal(true)}  >

  {children}
  </ButtonComponent>


      </>
  )}
  

  export default ActionsModalComponent