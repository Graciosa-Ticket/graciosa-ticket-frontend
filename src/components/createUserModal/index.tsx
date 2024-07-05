import { UserModel } from "../../models/user";
import { UserComponent } from "./styles";
import HenryCalvo from "../../assets/henrycalvo.svg"; 
import SectorIcon from "../sectorIcon";
import Display from "./components/formbox";


interface userModalProps {
  onClose:()=>void;
}

export default function CreateUserModal({onClose}:userModalProps){
    async function handleSubmit(){
        return alert("ok");
    }

  return (
    <UserComponent>
      <div className="user-header">
        <button onClick={onClose}>X</button>        
        <div>Cadastro</div>
      </div>
      <div className="img-sector">
        <img src={HenryCalvo} alt="" className="user-avatar" />
      </div>
      <h1>informacoes Pessoais</h1>
      <div className="user-info-area">
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-box">Codigo:</label>
        <input type="text" placeholder="Digite o Codigo"/>
        <label className="form-box">Nome:</label>
        <input type="text" placeholder="Digite o Nome"/>   
        <label className="form-box">Email:</label>
        <input type="text" placeholder="Digite o Email"/>
        <label className="form-box">email:</label>
        <input type="text" placeholder="Digite o email"/>   
        <label className="form-box">Nome:</label>
        <input type="text" placeholder="Digite o Nome"/>
        <label className="form-box">email:</label>
        <input type="text" placeholder="Digite o email"/>   
        <input type="submit" value="Cadastrar" className="submit-button"/>  
      </form>
        </div>         
    </UserComponent>
  )}
  