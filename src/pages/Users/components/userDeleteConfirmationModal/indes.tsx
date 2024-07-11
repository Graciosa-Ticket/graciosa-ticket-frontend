import { AiOutlineClose} from "react-icons/ai";
import { UserComponent } from "./styles";
import ButtonComponent from "../../../../components/buttons";
import { ModalHeader } from "../../../../components/modal";

interface confirmationModalProps {
  onClose:()=>void;
  message: string;  
  onDelete:()=>void;
}


export default function UserDeleteConfirmationModal({onClose, message, onDelete}: confirmationModalProps) {  

  return (
    <>
      <ModalHeader>
        <h3>Confirmar</h3>
          <ButtonComponent buttonStyles="text" title="Voltar" onClick={onClose}>
            <AiOutlineClose fontSize={"20px"} />
          </ButtonComponent>
      </ModalHeader>
      <UserComponent>          
            <div className="confirm-text">
            <p>
              {message}
            </p>
            
              </div>                 
                <div className="button-div">
                  <ButtonComponent 
                    onClick={onDelete}
                    type="submit" 
                    buttonStyles="delete" 
                    title="Confirmar" 
                    className="confirm-btn">Deletar
                  </ButtonComponent>
                  <ButtonComponent>

                  </ButtonComponent>
                </div>
      </UserComponent></>
  )}
  