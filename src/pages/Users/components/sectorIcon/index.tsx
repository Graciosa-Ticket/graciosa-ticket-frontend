import { UserModel } from "../../../../models/user";
import { IconComponent } from "./styles";
import { MdOutlineFastfood, MdOutlineLocalGroceryStore } from "react-icons/md";
import {
  AiOutlineCoffee,
  AiOutlineFlag,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { PiCashRegisterBold } from "react-icons/pi";
import { FaBullhorn } from "react-icons/fa";
import { IoGolfOutline } from "react-icons/io5";
import { FiTool } from "react-icons/fi";
import { FaComputer } from "react-icons/fa6";

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
  if (!name || name.toLowerCase() === "desconhecido") {
    return <AiOutlineQuestionCircle className="icon" />; // Ícone para setores desconhecidos ou nulos
  }

  // Verifica se o nome contém números e formata o nome do setor
  const formattedName = hasNumbers(name)
    ? formatSectorName(name)
    : name.toLowerCase().replace(/\./g, ""); // Remove pontos para facilitar a comparação

  if (formattedName.includes("marketing")) {
    return <FaBullhorn className="icon" />; // Ícone para Marketing
  } else if (
    formattedName.includes("manutencao") ||
    formattedName.includes("manutenção")
  ) {
    return <FiTool className="icon" />; // Ícone para Manutenção
  } else if (
    formattedName.includes("t.i") ||
    formattedName.includes("ti") ||
    formattedName.includes("tecnologia da informação") ||
    formattedName.includes("tecnologia")
  ) {
    return <FaComputer className="icon" />; // Ícone para T.I./Tecnologia da Informação
  } else if (formattedName.includes("driving range")) {
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
  }

  // Ícone para setores desconhecidos
  return <AiOutlineQuestionCircle className="icon" />;
};

// Função para verificar se o nome contém números
const hasNumbers = (str: string) => /\d/.test(str);

const SectorIcon = ({ data }: UserCardProps) => {
  const sector = data.sector?.name || "Desconhecido"; // Obtém o nome do setor ou "Desconhecido" se for nulo

  return (
    <IconComponent>
      {getIcon(sector)}
      <div className="prints">
        <p>Setor</p>
        <h2>{sector}</h2>
      </div>
    </IconComponent>
  );
};

export default SectorIcon;
