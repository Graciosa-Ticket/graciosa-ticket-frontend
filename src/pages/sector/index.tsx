import { useState } from "react";
import SectorCard from "./components/sectorCard";
import { SectorCardModel } from "../../models/sector";
import { SectorContainer } from "./styles";
import PageHeaderComponent from "../../components/pagesHeader";
import { useFetch } from "../../services/hooks/getQuery";
import NotFoundComponent from "../../components/notFound";

export default function Sector() {
  const [dataSource, setDataSource] = useState<SectorCardModel[]>([]);
  const [openModal, setOpenModal] = useState(false); // Estado para controlar a abertura do modal

  const { isLoading, isFetching, refetch } = useFetch<SectorCardModel[]>(
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

  const isLoadingFetch = isLoading || isFetching;

  const onOpenChange = () => {
    setOpenModal(!openModal);
  };

  return (
    <SectorContainer>
      <PageHeaderComponent.container>
        <PageHeaderComponent.title>Setores</PageHeaderComponent.title>
        <PageHeaderComponent.button
          className="btn"
          title="Cadastrar Novo Setor"
          onClick={onOpenChange}
        />
      </PageHeaderComponent.container>


      <div className="div-sector-all">
        {!dataSource.length && !isLoadingFetch ? (
          <NotFoundComponent />
        ) : isLoadingFetch ? (
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
