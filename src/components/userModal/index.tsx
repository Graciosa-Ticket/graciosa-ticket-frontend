import { UserModel } from "../../models/user";
import { UserComponent } from "./styles";
import HenryCalvo from "../../assets/henrycalvo.svg"; 
import Display from "./components/display";
import SectorIcon from "../sectorIcon";

interface userModalProps {
  data:UserModel;
  onClose:()=>void;
}

export default function UserModal({data, onClose}:userModalProps){


  return (
    <UserComponent>
      <div className="user-header">
        <button onClick={onClose}>X</button>        
        <div>{data.name}</div>
        <h3>{data.status ? "ativo" : "inativo"}</h3>
        <div className={`status-ball ${data.status ? 'active' : 'inactive'}`} />
      </div>
      <div className="img-sector">
        <img src={HenryCalvo} alt="" className="user-avatar" />
      </div>
      <h1>informacoes Pessoais</h1>
      <div className="user-info-area">
          <Display label={"Código"} content={data.code + "" || "Não informado"}></Display>
          <Display label={"Nome"} content={data.name}></Display>
          <Display label={"Nascimento"} content={data.birthdate + "" || "Não informado"} suffix=""></Display>
          <Display label={"Endereço"} content={data.postalCode + "" || "Não informado" }></Display>
          <Display label={"Cep"} content={data.postalCode + "" || "Não informado"}></Display>
          <Display label={"Telefone/Ramal"} content={data.phone + "" || "Não informado"}></Display>
          <div className="function-area">
        <div>
        <SectorIcon data={data} />          
        </div>
      </div>
      </div>
      
      <div className="footer-buttons"></div>
        

  
      
    </UserComponent>
  );
}
  