import { useEffect, useState } from "react";
import NotFoundComponent from "../../../../components/notFound";
import { SectorCardModel } from "../../../../models/sector";
import { useFetch } from "../../../../services/hooks/getQuery";
import SectorCard from "../../../sector/components/sectorCard";
import SectorSkeletonLoading from "../../../sector/skeleton";
import { SectorsHomeContainer } from "./styles";
import { map } from "lodash";

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
      const counters = map(counterData[0], (a, b) => ({
        sector_code: b,
        counters: a,
      }));

      const data = sectorData.map((item) => {
        const counter = counters.filter(
          (filter) => filter.sector_code === item.code
        );

        if (counter?.length) {
          return {
            ...item,
            counters: counter[0].counters,
          } as unknown as SectorCardModel;
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
