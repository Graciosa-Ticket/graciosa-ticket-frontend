import { UserModel } from "../../../../models/user";
import { IconComponent } from "./styles";
import { sectorIcons } from "../../../../utils/sectorsIcon";

interface UserCardProps {
  data: UserModel;
}

// Função para verificar se o nome contém números

const SectorIcon = ({ data }: UserCardProps) => {
  const sector = data.sector?.name || "Desconhecido"; // Obtém o nome do setor ou "Desconhecido" se for nulo
  const firstWord = sector.split(" ")[0]; // Pega a primeira palavra
  const isTruncated = sector.split(" ").length > 1; // Verifica se há mais de uma palavra
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
