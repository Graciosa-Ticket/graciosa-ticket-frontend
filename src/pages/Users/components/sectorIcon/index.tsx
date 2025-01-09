import { UserModel } from "../../../../models/user";
import { IconComponent } from "./styles";
import { sectorIcons } from "../../../../utils/sectorsIcon";

interface UserCardProps {
  data: UserModel;
}

const SectorIcon = ({ data }: UserCardProps) => {
  const sector = data.sector?.name || "Desconhecido";
  const firstWord = sector.split(" ")[0];
  const isTruncated = sector.split(" ").length > 1;
  return (
    <IconComponent>
      {sectorIcons(sector)}
      <div className="prints">
        <p>Setor</p>
        <h2 title={sector}>{isTruncated ? `${firstWord}...` : sector}</h2>
      </div>
    </IconComponent>
  );
};

export default SectorIcon;
