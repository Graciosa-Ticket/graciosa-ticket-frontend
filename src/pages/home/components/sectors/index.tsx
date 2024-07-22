import { useState } from "react";
import NotFoundComponent from "../../../../components/notFound";
import { SectorCardModel } from "../../../../models/sector";
import { useFetch } from "../../../../services/hooks/getQuery";
import SectorCard from "../../../sector/components/sectorCard";
import SectorSkeletonLoading from "../../../sector/skeleton";
import { SectorsHomeContainer } from "./styles";

const HomeSector = () => {

  const [dataSource, setDataSource] = useState<SectorCardModel[]>([]);
  const { isLoading, isFetching, refetch } = useFetch<SectorCardModel[]>(
    "/sectors",
    ["sector"],
    {
      onSuccess: (data) => {
        setDataSource(data);
        console.log(data);
      },
      onError: (error) => {},
    }
  );

  const isLoadingFetch = isLoading || isFetching;


  
  return (<SectorsHomeContainer><div className="div-sector-all">
  {!dataSource.length && !isLoadingFetch ? (
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
              refetch();
            }}
          />
        </li>
      ))}
    </ul>
  )}
</div></SectorsHomeContainer>);
};

export default HomeSector;
