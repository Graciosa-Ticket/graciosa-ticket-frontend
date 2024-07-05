import { UserModel } from "../../models/user";
import { UserComponent } from "./styles";
import HenryCalvo from "../../assets/henrycalvo.svg"; 
import SectorIcon from "../sectorIcon";
import Display from "./components/formbox";


interface userModalProps {
  onClose:()=>void;
}

export default function CreateUserModal({onClose}:userModalProps){


  return (
    <UserComponent>
      <div className="modal-header">
        <button onClick={onClose}>X</button>        
        <div>{}</div>
        <h3>{data.status ? "ativo" : "inativo"}</h3>
        <div className={`status-ball ${data.status ? 'active' : 'inactive'}`} />
      </div>
      <div className="img-sector">
        <img src={HenryCalvo} alt="" className="user-avatar" />
      </div>
      <h1>informacoes Pessoais</h1>
      <div className="user-info-area">
          <Display label={""} onSubmit={function (value: string): void {
                  throw new Error("Function not implemented.");
              } }></Display>
          <Display label={"pao"} onSubmit={function (value: string): void {
                  throw new Error("Function not implemented.");
              } } ></Display>
          <Display label={"pao"} ></Display>
          <Display label={"pao"} content={data.address + "" || "Não informado" }></Display>
          <Display label={"Cep"} content={data.postalCode + "" || "Não informado"}></Display>
          <Display label={"Telefone/Ramal"} content={data.phone + "" || "Não informado"}></Display>
      </div>
      <div className="function-area">
          <div>
            <SectorIcon data={data} />          
          </div>
          <div>
            <h1></h1>
          </div>
        </div>      
      <div className="footer-buttons">
        <p></p>
      </div>     
    </UserComponent>
  );
}
  