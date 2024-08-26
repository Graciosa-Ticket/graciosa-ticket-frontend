import { UserModel } from "../../../../models/user";
import { IconComponent } from "./styles";
import { MdOutlineFastfood, MdOutlineLocalGroceryStore } from "react-icons/md";
import { AiOutlineCoffee, AiOutlineFlag } from "react-icons/ai";
import { PiCashRegisterBold } from "react-icons/pi";
import { FaComputer } from "react-icons/fa6";
import { IoGolfOutline } from "react-icons/io5";

interface UserCardProps {
  data: UserModel;
}

const formatSectorName = (name: string): string => {
  const match = name.match(
    /^(\d{1,3}) - (caixa|bar|restaurante|pdv|ponto de venda|driving range|clubinho|[a-z\s]+)/i
  );
  if (match) {
    const [_, number, type] = match;
    switch (type.toLowerCase()) {
      case "caixa":
        return `Caixa - ${number}`;
      case "bar":
        return `Bar - ${number}`;
      case "restaurante":
        return `Restaurante - ${number}`;
      case "pdv":
      case "ponto de venda":
        return `Ponto de Venda - ${number}`;
      case "driving range":
        return `Driving Range - ${number}`;
      case "clubinho":
        return `Clubinho - ${number}`;
      default:
        return `${type.replace(/\s+/g, " ").trim()} - ${number}`;
    }
  }
  return name;
};

const getIcon = (name?: string) => {
  if (!name) return null;

  // Verifica se o nome contém números e formata o nome do setor
  const formattedName = hasNumbers(name)
    ? formatSectorName(name)
    : name.toLowerCase().replace(/\./g, ""); // Remove pontos para facilitar a comparação

  if (formattedName.includes("driving range")) {
    return <IoGolfOutline className="icon" />;
  } else if (formattedName.includes("restaurante")) {
    return <MdOutlineFastfood className="icon" />;
  } else if (formattedName.includes("bar")) {
    return <AiOutlineCoffee className="icon" />;
  } else if (formattedName.includes("caixa")) {
    return <PiCashRegisterBold className="icon" />;
  } else if (formattedName.includes("clubinho")) {
    return <AiOutlineFlag className="icon" />;
  } else if (
    formattedName.includes("ponto de venda") ||
    formattedName.includes("pdv")
  ) {
    return <MdOutlineLocalGroceryStore className="icon" />;
  } else if (
    formattedName.includes("ti") ||
    formattedName.includes("tecnologia da informação")
  ) {
    return <FaComputer className="icon" />;
  }

  return null;
};

// Função para verificar se o nome contém números
const hasNumbers = (str: string) => /\d/.test(str);

const SectorIcon = ({ data }: UserCardProps) => {
  const sector = data.sector?.name; // Obtém o nome do setor

  return (
    <IconComponent>
      {getIcon(sector)}
      <div className="prints">
        <p>Setor</p>
        <h2>{sector || "Desconhecido"}</h2>
      </div>
    </IconComponent>
  );
};

export default SectorIcon;
