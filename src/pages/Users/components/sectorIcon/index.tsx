import { FaRegBuilding, FaIndustry, FaClipboard } from "react-icons/fa";
import { UserModel } from "../../../../models/user";
import { IconComponent } from "./styles";
import { AiFillClockCircle } from "react-icons/ai";


interface UserCardProps {
  data: UserModel;
}

const SectorIcon = ({ data }: UserCardProps) => {
  const renderSectorIcon = (setor: string) => {
    switch (setor.toLowerCase()) {
      case 'administrativo':
        return <AiFillClockCircle fontSize={"1.5em"} className="icon"/>
      case 'manutenção':
        return <AiFillClockCircle fontSize={"1.5em"} className="icon"/>
      case 'produção':
        return <AiFillClockCircle fontSize={"1.5em"} className="icon"/>
      default:
        return null;
    }
  };

  return (
    <IconComponent>
      {renderSectorIcon(data.sector)}
      <div className="prints">         
        <p>Setor</p>          
        <h2>{data.sector}</h2>
      </div>      
    </IconComponent>
    );
};

export default SectorIcon;
