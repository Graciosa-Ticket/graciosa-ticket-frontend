import { UserModel } from "../../models/user";
import { UserComponent } from "./styles";
import HenryCalvo from "../../assets/henrycalvo.svg"; 
import { FaRegBuilding, FaIndustry, FaClipboard } from "react-icons/fa";
import Display from "./components/display";

interface userModalProps {
  data:UserModel;
  onClose:()=>void;
}

export default function UserModal({data, onClose}:userModalProps){



  const renderSectorIcon = (setor: string) => {
    switch (setor.toLowerCase()) {
      case 'administrativo':
        return <FaRegBuilding className="sector-icon" />;
      case 'manutenção':
        return <FaIndustry className="sector-icon" />;
      case 'produção':
        return <FaClipboard className="sector-icon" />;
      default:
        return null;
    }
  };
  
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
          <Display label={"codigo"} content={data.code}></Display>
          <Display label={"Nome"} content={data.name}></Display>
          <Display label={"Nascimento"} content={data.birthdate}></Display>
          <Display label={"Endereço"} content={data.address}></Display>
          <Display label={"Cep"} content={data.postalCode}></Display>
          <Display label={"Telefone/Ramal"} content={data.phone}></Display>
      <div className="function-area">
        <div>
          <p>Função</p>
          
        </div>

      </div>
      <div className="footer-buttons"></div>
        

      </div>
      
    </UserComponent>
  );
}
  