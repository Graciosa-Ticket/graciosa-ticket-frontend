import { UserModel } from "../../../../models/user";
import { IconComponent } from "./styles";
import {
  RiBuilding2Line,
  RiBuilding3Line,
  RiBuildingLine,
} from "react-icons/ri";

interface UserCardProps {
  data: UserModel;
}

const SectorIcon = ({ data }: UserCardProps) => {
  const iconOptions = {
    Administrator: <RiBuilding3Line className="icon" />,
    Supervisor: <RiBuilding2Line className="icon" />,
    Collaborator: <RiBuildingLine className="icon" />,
  };

  return (
    <IconComponent>
      {iconOptions[data.role]}
      <div className="prints">
        <p>Setor</p>
        <h2>{data.sector_name}</h2>
      </div>
    </IconComponent>
  );
};

export default SectorIcon;
