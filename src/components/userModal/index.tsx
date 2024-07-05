import { UserModel } from "../../models/user";
import { UserComponent, Userheader } from "./styles";
import HenryCalvo from "../../assets/henrycalvo.svg"; 
import Display from "./components/display";
import SectorIcon from "../sectorIcon";
import { ModalHeader } from "../modal";
import ButtonComponent from "../buttons";
import { AiOutlineLeft, AiFillDelete, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";


interface userModalProps {
  data:UserModel;
  onClose:()=>void;
}

export default function UserModal({data, onClose}:userModalProps){

  

  return (
  <>
    <ModalHeader>
      <div className="left-side">
        <ButtonComponent buttonStyles="text" onClick={onClose}><AiOutlineLeft fontSize={"20px"} /></ButtonComponent>
        <h3>{data.name}</h3>
      </div>
      <Userheader>
      <span className="span">{data.status ? "ativo" : "inativo"}</span>
      <div className={`status-ball ${data.status ? 'active' : 'inactive'}`} />
      </Userheader>
    </ModalHeader>
    <UserComponent>
    
      <div className="img-sector">
        <img src={HenryCalvo} alt="" className="user-avatar" />
      </div>
      <h1>informacoes Pessoais</h1>
      <div className="user-info-area">
          <Display label={"Código"} content={data.code + "" || "Não informado"}></Display>
          <Display label={"Nome"} content={data.name}></Display>
          <Display label={"Nascimento"} content={data.birthdate + "" || "Não informado"} suffix="24"></Display>
          <Display label={"Endereço"} content={data.address + "" || "Não informado" }></Display>
          <Display label={"Cep"} content={data.postalCode + "" || "Não informado"}></Display>
          <Display label={"Telefone/Ramal"} content={data.phone + "" || "Não informado"}></Display>
      </div>
      <div className="function-area">
          <div className="right-side">
            <h3>Função</h3>
            <p>{data.sector}</p>
          </div>
          <div className="left-side">
            <SectorIcon data={data} />          
          </div>  
        </div>      
      <div className="footer">
        <ButtonComponent buttonStyles="delete" className="delete-button"><AiOutlineDelete />   Deletar</ButtonComponent>
        <ButtonComponent buttonStyles="edit"  ><AiOutlineEdit />  Editar</ButtonComponent>        
      </div>     
    </UserComponent>
    </>
  );

}