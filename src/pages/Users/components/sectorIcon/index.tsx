import { UserModel } from "../../../../models/user";
import { IconComponent } from "./styles";
// import {
//   RiBuilding2Line,
//   RiBuilding3Line,
//   RiBuildingLine,
// } from "react-icons/ri";
import { MdOutlineFastfood } from "react-icons/md";
import { AiOutlineCoffee } from "react-icons/ai";
import { TbSteeringWheel } from "react-icons/tb";
import { PiCashRegisterBold } from "react-icons/pi";

interface UserCardProps {
  data: UserModel;
}

const SectorIcon = ({ data }: UserCardProps) => {
  const { sector_name } = data;

  // Função para formatar o setor
  const formatSectorName = (name: string) => {
    // Converte o nome do setor para minúsculas
    const lowerCaseName = name.toLowerCase();
    // Usa uma expressão regular para extrair o número e o tipo principal
    const match = lowerCaseName.match(
      /^(\d{1,3}) - (caixa|bar|restaurante|[a-z\s]+)/
    );
    if (match) {
      const [_, number, type] = match;
      if (type === "caixa") {
        return `Caixa - ${number}`;
      } else if (type === "bar") {
        return `Bar - ${number}`;
      } else if (type === "restaurante") {
        return `Restaurante - ${number}`;
      } else {
        // Formata o nome do setor com o número no final
        return `${type.replace(/\s+/g, " ").trim()} - ${number}`;
      }
    }
    // Retorna o nome completo se não corresponder ao padrão
    return name;
  };

  const getIcon = (name: string) => {
    const lowerCaseName = name.toLowerCase();

    if (lowerCaseName.includes("driving range")) {
      return <TbSteeringWheel className="icon" />;
    } else if (lowerCaseName.includes("restaurante")) {
      return <MdOutlineFastfood className="icon" />;
    } else if (lowerCaseName.includes("bar")) {
      return <AiOutlineCoffee className="icon" />;
    } else if (lowerCaseName.includes("caixa")) {
      return <PiCashRegisterBold className="icon" />;
    }

    return null; // Retorna null se nenhum ícone corresponder
  };

  return (
    <IconComponent>
      {getIcon(sector_name)}
      <div className="prints">
        <p>Setor</p>
        <h2>{formatSectorName(sector_name)}</h2>
      </div>
    </IconComponent>
  );
};

export default SectorIcon;
