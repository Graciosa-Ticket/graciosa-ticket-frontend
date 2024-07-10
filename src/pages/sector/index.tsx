import SectorCard from "../../components/sectorCard";
import { SectorCardModel } from "../../models/sector";
import { SectorContainer } from "./styles";
import PageHeaderComponent from "../../components/pagesHeader";
import { useState } from "react";
import { useFetch } from "../../services/hooks/getQuery";
import NotFoundComponent from "../../components/notFound";

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
  const [dataSource, setDataSource] = useState<SectorCardModel[]>([]);

  const { isLoading, isFetching } = useFetch<SectorCardModel[]>(
    "/sectors",
    ["sector"],
    {
      onSuccess: (data) => {
        console.log(data);
        setDataSource(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const isLoadingFecth = isLoading || isFetching;

  return (
    <SectorContainer>
      <PageHeaderComponent.container>
        <PageHeaderComponent.title>Setores</PageHeaderComponent.title>
        <PageHeaderComponent.button onClick={() => console.log("aaa")} />
      </PageHeaderComponent.container>
      <div className="div-sector-all">
        {!dataSource.length && !isLoadingFecth ? (
          <NotFoundComponent />
        ) : isLoadingFecth ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {dataSource.map((e, i) => (
              <li key={i}>
                <SectorCard data={e} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </SectorContainer>
  );
}
