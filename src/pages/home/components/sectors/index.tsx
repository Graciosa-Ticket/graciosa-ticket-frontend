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
  } = useFetch<SectorCardModel[]>("/counters/counterToChart/allsectors", [
    "sectorCounter",
  ]);

  const onRefetchData = () => {
    refetch();
    refetchCounter();
  };

  useEffect(() => {
    if (sectorData?.length && counterData?.length) {
      const data = sectorData.map((item) => {
        const counter = counterData.filter(
          (filter) => filter.code === item.code
        );

        if (counter?.length) {
          return { ...item, counters: counter } as unknown as SectorCardModel;
        }
        return item;
      });

      // console.log(data);
      setDataSource(data);
    }
  }, [sectorData, counterData]);

  const isLoadingFetch =
    isLoading || isFetching || loadingCounter || fetchingCounter;

  return (
    <SectorsHomeContainer>
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
