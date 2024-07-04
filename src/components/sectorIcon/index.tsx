import { FaClipboard, FaIndustry, FaRegBuilding } from "react-icons/fa";
import { UserModel } from "../../models/user";
import { IconComponent } from "./styles"; // Importe o estilo aqui

interface UserCardProps {
  data: UserModel;
}

const SectorIcon = ({ data }: UserCardProps) => {
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
    <IconComponent>
        <div className="icon-sector">
        {renderSectorIcon(data.sector)} 
        </div>
      <div className="print-sector">
        <h2>Setor</h2>
        <p className="text-sector">{data.sector}</p>
      </div>
    </IconComponent>
    );
};

export default SectorIcon;
