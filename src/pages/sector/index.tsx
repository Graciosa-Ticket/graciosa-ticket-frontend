import SectorCard from "../../components/sectorCard";
import { SectorCardModel } from "../../models/sector";
import { SectorContainer } from "./styles";
import PageHeaderComponent from "../../components/pagesHeader";

const fakeSectorCardData: SectorCardModel[] = [
  {
    name: "Setor 01",
    responsible_code: "2",
    code: "54",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab consequatur magni deleniti ullam voluptatum atque vel optio ipsa. Obcaecati aperiam libero error ad voluptatem? Eum ab porro cum optio dolorum.",
  },
  {
    name: "Setor 01",
    responsible_code: "2",
    code: "54",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab consequatur magni deleniti ullam voluptatum atque vel optio ipsa. Obcaecati aperiam libero error ad voluptatem? Eum ab porro cum optio dolorum.",
  },
  {
    name: "Setor 01",
    responsible_code: "2",
    code: "54",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab consequatur magni deleniti ullam voluptatum atque vel optio ipsa. Obcaecati aperiam libero error ad voluptatem? Eum ab porro cum optio dolorum.",
  },
  {
    name: "Setor 01",
    responsible_code: "2",
    code: "54",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab consequatur magni deleniti ullam voluptatum atque vel optio ipsa. Obcaecati aperiam libero error ad voluptatem? Eum ab porro cum optio dolorum.",
  },
  {
    name: "Setor 01",
    responsible_code: "2",
    code: "54",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab consequatur magni deleniti ullam voluptatum atque vel optio ipsa. Obcaecati aperiam libero error ad voluptatem? Eum ab porro cum optio dolorum.",
  },
  {
    name: "Setor 01",
    responsible_code: "2",
    code: "54",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab consequatur magni deleniti ullam voluptatum atque vel optio ipsa. Obcaecati aperiam libero error ad voluptatem? Eum ab porro cum optio dolorum.",
  },
  {
    name: "Setor 01",
    responsible_code: "2",
    code: "54",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab consequatur magni deleniti ullam voluptatum atque vel optio ipsa. Obcaecati aperiam libero error ad voluptatem? Eum ab porro cum optio dolorum.",
  },
  {
    name: "Setor 01",
    responsible_code: "2",
    code: "54",
    description:
      "Lorem ipsum dolor sit amet conseaaaaaaaaaaaactetur adipisicing elit. Ab consequatur magni deleniti ullam voluptatum atque vel optio ipsa. Obcaecati aperiam libero error ad voluptatem? Eum ab porro cum optio dolorum.",
  },
  {
    name: "Setor 01",
    responsible_code: "2",
    code: "54",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab consequatur magni deleniti ullam voluptatum atque vel optio ipsa. Obcaecati aperiam libero error ad voluptatem? Eum ab porro cum optio dolorum.",
  },
];

export default function Sector() {
  return (
    <SectorContainer>
      <PageHeaderComponent.container>
        <PageHeaderComponent.title>Setores</PageHeaderComponent.title>
        <PageHeaderComponent.button onClick={() => console.log("aaa")} />
      </PageHeaderComponent.container>
      <div className="div-sector-all">
        <ul>
          {fakeSectorCardData.map((e, i) => (
            <li key={i}>
              <SectorCard data={e} />
            </li>
          ))}
        </ul>
      </div>
    </SectorContainer>
  );
}
