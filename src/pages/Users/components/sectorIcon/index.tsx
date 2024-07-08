import { FaRegBuilding, FaIndustry, FaClipboard } from "react-icons/fa";
import { UserModel } from "../../../../models/user";
import { IconComponent } from "./styles";
import { AiFillClockCircle } from "react-icons/ai";


interface UserCardProps {
  data: UserModel;
}

const SectorIcon = ({ data }: UserCardProps) => {
  const renderSectorIcon = (role: string) => {
    switch (role.toString()) {
      case 'Administrator':
        return <AiFillClockCircle fontSize={"1.5em"} className="icon"/>
      case 'Supervisor':
        return <AiFillClockCircle fontSize={"1.5em"} className="icon"/>
      case 'Collaborator':
        return <AiFillClockCircle fontSize={"1.5em"} className="icon"/>
      default:
        return null;
    }
  };

  return (
    <IconComponent>
      {renderSectorIcon(data.role)}
      <div className="prints">         
        <p>Setor</p>          
        <h2>{data.role}</h2>
      </div>      
    </IconComponent>
    );
};

export default SectorIcon;
