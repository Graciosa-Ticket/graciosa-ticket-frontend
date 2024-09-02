import { useEffect, useState } from "react";
import NotFoundComponent from "../../../../components/notFound";
import { SectorCardModel } from "../../../../models/sector";
import { useFetch } from "../../../../services/hooks/getQuery";
import SectorCard from "../../../sector/components/sectorCard";
import SectorSkeletonLoading from "../../../sector/skeleton";
import { SectorsHomeContainer } from "./styles";

const HomeSector = () => {
  const [dataSource, setDataSource] = useState<SectorCardModel[]>([]);

  const {
    isLoading,
    isFetching,
    data: sectorData,
    refetch,
  } = useFetch<SectorCardModel[]>("/sectors", ["sector"]);

  const {
    isLoading: loadingCounter,
    isFetching: fetchingCounter,
    data: counterData,
    refetch: refetchCounter,
  } = useFetch<SectorCardModel>("/counters/counterToChart/allSectors", [
    "sectorCounter",
  ]);

  const onRefetchData = () => {
    refetch();
    refetchCounter();
  };

  useEffect(() => {
    if (sectorData && sectorData.length && counterData) {
      // Cria um array de objetos com sector_code e counters a partir de counterData
      const counters = Object.entries(counterData).map(
        ([sector_code, counters]) => ({
          sector_code,
          counters,
        })
      );

      const data = sectorData.map((item) => {
        // Encontra o contador correspondente ao setor
        const counter = counters.find(
          (filter) => filter.sector_code === item.code
        );

        if (counter) {
          return {
            ...item,
            counters: counter.counters,
          } as SectorCardModel;
        }
        return item;
      });

      setDataSource(data);
    }
  }, [sectorData, counterData]);

  const isLoadingFetch =
    isLoading || isFetching || loadingCounter || fetchingCounter;

  return (
    <SectorsHomeContainer>
      <h1>Visão Geral</h1>
      <div className="div-sector-all">
        {!dataSource.length && !loadingCounter && !fetchingCounter ? (
          <NotFoundComponent />
        ) : isLoadingFetch ? (
          <SectorSkeletonLoading />
        ) : (
          <ul>
            {dataSource.map((e, i) => (
              <li key={i}>
                <SectorCard
                  data={e}
                  onUpdate={() => {
                    onRefetchData();
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </SectorsHomeContainer>
  );
};

export default HomeSector;
