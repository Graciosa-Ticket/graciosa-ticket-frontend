import { AiOutlineClose} from "react-icons/ai";
import ButtonComponent from "../buttons";
import { ModalHeader } from "../modal";
import { UserComponent } from "./styles";

interface confirmationModalProps {
  onClose:()=>void;
  message: string;  
  onDelete:()=>void;
}


export default function ConfirmationModal({onClose, message, onDelete}: confirmationModalProps) {  

  return (
    <>
      <ModalHeader>
        <h3>Confirmar</h3>
          <ButtonComponent buttonStyles="text" title="Voltar" onClick={onClose}>
            <AiOutlineClose fontSize={"30px"} />
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
                </div>
      </UserComponent></>
  )}
  