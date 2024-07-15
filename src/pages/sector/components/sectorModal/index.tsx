
import { FaAngleLeft } from "react-icons/fa";
import ButtonComponent from "../../../../components/buttons";
import { ModalTitle } from "../../../../components/centerModal";
import { ModalHeader } from "../../../../components/modal";
import { SectorCardModel } from "../../../../models/sector";
import { modalActions } from "../../../../shared/global.interface";
import { SectorModalComponent } from "./styles";
import Avatar from "../../../../components/Avatar";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";


export default function SectorModal({
  data,
  onClose,
  onUpdate,
}: modalActions<SectorCardModel>) {

  return (
    <>
      <ModalHeader>
        <div className="left-side"> 
          <ButtonComponent buttonStyles="text" title="Voltar" onClick={onClose}>
            <FaAngleLeft fontSize="1.9em" />
          </ButtonComponent>
          <ModalTitle>{data?.name}</ModalTitle>
        </div>
      </ModalHeader>
      <SectorModalComponent>
        <p>responsavel</p>  
        <div className="img-sector">
          <Avatar src={data?.user.profile_picture} alt="" className="user-avatar" />          
          <h3>{data?.user.name}</h3>
        </div>
        
          <p>chamados do setor</p>

        <div className="">

        </div>



        <div className="footer">        
        <ButtonComponent buttonStylesType="outline" buttonStyles="delete" ><AiOutlineDelete />Deletar</ButtonComponent>
        <ButtonComponent buttonStylesType="outline"><AiOutlineEdit />Editar</ButtonComponent>

        </div>
      
      </SectorModalComponent>
    </>
    
  );
}
