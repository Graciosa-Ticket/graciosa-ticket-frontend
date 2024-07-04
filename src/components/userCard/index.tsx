import  {useState} from "react"
import { FaRegBuilding, FaIndustry, FaClipboard } from 'react-icons/fa'; 
import HenryCalvo from "../../assets/henrycalvo.svg"; 
import { UserModel } from "../../models/user";
import { UserComponent } from "./styles";
import  Modal  from '../modal';
import UserModal from "../userModal";


interface UserCardProps {
  data: UserModel;
}

const UserCard = ({ data }:UserCardProps) => {

const [open, setOpen] = useState(false)

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
    <>
<Modal  open={open} onOpenChange={() => setOpen(!open)}>
<UserModal data={data} onClose={()=> setOpen(false)}/>
</Modal>


    <UserComponent type="button" onClick={()=> setOpen(true)}>
      
      <div className="h3-container">
        <h3>{data.status ? "ativo" : "inativo"}</h3>
        <div className={`status-ball ${data.status ? 'active' : 'inactive'}`} />
      </div>
      <div className="header-sector">
        <img src={HenryCalvo} alt="" className="user-avatar" />
      </div>
      <div className="text-container">
        <h2>{data.name}</h2>
        <p>{data.type}</p>
      </div>
      {data.type !== "admin" && <div className="sector-container">
        {renderSectorIcon(data.sector)}
        <div className="p-sector">
          <h2>Setor</h2>
          <p className="sector-text">{data.sector}</p>
        </div>
      </div>
        }
    </UserComponent>
    </>
  );
};

export default UserCard;