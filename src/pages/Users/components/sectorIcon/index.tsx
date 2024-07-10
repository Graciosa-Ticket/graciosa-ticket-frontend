import { UserModel } from "../../../../models/user";
import { IconComponent } from "./styles";
import { RiBuilding2Line } from "react-icons/ri";

interface UserCardProps {
  data: UserModel;
}

const SectorIcon = ({ data }: UserCardProps) => {
  const iconOptions = {
    Administrator: <RiBuilding2Line className="icon" />,
    Supervisor: <RiBuilding2Line className="icon" />,
    Collaborator: <RiBuilding2Line className="icon" />,
  };

  return (
    <IconComponent>
      {iconOptions[data.role]}
      <div className="prints">
        <p>Setor</p>
        <h2>{data.role}</h2>
      </div>
    </IconComponent>
  );
};

export default SectorIcon;
