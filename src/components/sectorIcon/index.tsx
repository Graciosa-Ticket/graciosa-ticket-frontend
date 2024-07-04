import { FaClipboard, FaIndustry, FaRegBuilding } from "react-icons/fa";
import { UserModel } from "../../models/user";
import { sectorIconComponent } from "./styles";


interface UserCardProps {
    data: UserModel;
  }

  const SectorIcon = ({ data }:UserCardProps) => {

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

  return(
    <sectorIconComponent>
        {renderSectorIcon(data.sector)}
        <div className="p-sector">
            <h2>Setor</h2>
            <p className="sector-text">{data.sector}</p>
        </div>
    </sectorIconComponent>
    
  )


}
  export default SectorIcon;