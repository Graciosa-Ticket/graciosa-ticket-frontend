import { forEach } from "lodash";
import {
  AiOutlineCamera,
  AiOutlineCoffee,
  AiOutlineConsoleSql,
  AiOutlineDollar,
  AiOutlineDribbble,
  AiOutlineFlag,
  AiOutlineInbox,
  AiOutlineKey,
  AiOutlineQuestionCircle,
  AiOutlineSolution,
  AiOutlineTeam,
  AiOutlineTool,
} from "react-icons/ai";
import { PiGolf } from "react-icons/pi";

const formatText = (value: string) => {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const golfWords = ["golf", "golfe"];
const pdvWords = ["pdv", "ponto de venda", "alimentos e bebidas"];
const rhWords = ["rh", "recursos humanos", "marketing"];
const moneyWords = ["contabilidade", "tesouraria"];
const sportWords = [
  "esporte",
  "cpe",
  "cp",
  "raquete",
  "raquetes",
  "futebol",
  "volei",
];
const itWords = ["informatica", "it", "ti", "tecnologia da informacao"];
const repairWords = ["manutencao"];
const secretaryWords = ["secretaria geral"];
const stockWords = ["almoxarifado", "compras & almoxarifado"];
const gardenWords = ["clubinho da crianca", "clubinho", "clube"];
const eventsWords = ["eventos", "evento"];
const secWords = [
  "portaria",
  "portarias & telefonia",
  "vigilancia noturna",
  "portarias",
];

const allWords = {
  it: {
    list: itWords,
    icon: <AiOutlineConsoleSql className="icon" />,
  },
  pdv: {
    list: pdvWords,
    icon: <AiOutlineCoffee className="icon" />,
  },
  golf: {
    list: golfWords,
    icon: <PiGolf className="icon" />,
  },
  sport: {
    list: sportWords,
    icon: <AiOutlineDribbble className="icon" />,
  },
  rh: {
    list: rhWords,
    icon: <AiOutlineTeam className="icon" />,
  },
  money: {
    list: moneyWords,
    icon: <AiOutlineDollar className="icon" />,
  },
  repair: {
    list: repairWords,
    icon: <AiOutlineTool className="icon" />,
  },
  garden: {
    list: gardenWords,
    icon: <AiOutlineFlag className="icon" />,
  },
  events: {
    list: eventsWords,
    icon: <AiOutlineCamera className="icon" />,
  },
  stock: {
    list: stockWords,
    icon: <AiOutlineInbox className="icon" />,
  },
  secretary: {
    list: secretaryWords,
    icon: <AiOutlineSolution className="icon" />,
  },
  security: {
    list: secWords,
    icon: <AiOutlineKey className="icon" />,
  },
  unknown: {
    list: [""],
    icon: <AiOutlineQuestionCircle className="icon" />,
  },
};

type selectedSectorType =
  | "unknown"
  | "events"
  | "garden"
  | "repair"
  | "money"
  | "rh"
  | "sport"
  | "golf"
  | "pdv"
  | "it"
  | "stock"
  | "secretary"
  | "security";

export const sectorIcons = (sector_name: string) => {
  let selectedSector: selectedSectorType = "unknown";

  forEach(allWords, (a, b) => {
    if (a.list.includes(formatText(sector_name))) {
      selectedSector = b as selectedSectorType;
    }
  });

  return allWords[selectedSector].icon;
};
