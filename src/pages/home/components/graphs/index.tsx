import { useMemo, useState } from "react";
import { CounterToChartModel } from "../../../../models/counterToChart";
import { useFetch } from "../../../../services/hooks/getQuery";
import BarGraph from "./bar/barGraph";
import { HomeGraphContainer } from "./styles";
import TabComponent from "../../../../components/tabComponent";
import { SectorCardModel } from "../../../../models/sector";
import GCCBarGraph from "./graphTeste";

interface homeGraphProps {
  userSector?: SectorCardModel;
  isadmin: boolean;
  sectorsListData?: SectorCardModel[];
}

const HomeGraph = ({
  userSector,
  isadmin,
  sectorsListData,
}: homeGraphProps) => {
  const [dataSource, setDataSource] = useState<CounterToChartModel>();

  const [selectedDataSource, setSelectedDataSource] =
    useState<CounterToChartModel[]>();

  let isLoadingAllSectorsCounters = false;
  let isLoadingCountBySectorCode = false;

  if (isadmin) {
    ({ isLoading: isLoadingAllSectorsCounters } = useFetch<CounterToChartModel>(
      "/counters/counterToChart",
      ["geralCountData"],
      {
        onSuccess: (geralCountData) => {
          setDataSource(geralCountData);
        },
      }
    ));
  } else {
    ({ isLoading: isLoadingCountBySectorCode } = useFetch<CounterToChartModel>(
      `/counters/counterToChart/sector/${userSector?.code}`,
      ["counterBySectorCode"],
      {
        onSuccess: (counterBySectorCode) => {
          const sectorData = Object.values(counterBySectorCode)[0];
          setDataSource(sectorData);
        },
      }
    ));
  }

  const { isLoading: isLoadingSelectedSector } = useFetch<
    CounterToChartModel[]
  >(`/counters/counterToChart/allSectors`, ["selectedSectorCounter"], {
    onSuccess: (selectedSectorCountData) => {
      const counters = selectedSectorCountData[0];

      // console.log("Counters:", counters);
      // console.log("Sectors List Data:", sectorsListData);

      const updatedData = Object.entries(counters).map(
        ([sector_code, values]) => {
          const sector = sectorsListData?.find((s) => s.code === sector_code);

          // console.log(`Sector Code: ${sector_code}, Found Sector:`, sector);

          return {
            sector_code,
            ...values,
            name: sector?.name || "Desconhecido",
          };
        }
      );
      setSelectedDataSource(updatedData);
    },
  });

  const isLoading =
    isLoadingAllSectorsCounters ||
    isLoadingSelectedSector ||
    isLoadingCountBySectorCode;

  const allSetorsTicketsCount = useMemo(() => {
    const dataSourceKeys = Object.values(dataSource || {});
    if (!dataSourceKeys.length) return 0;
    return dataSourceKeys.reduce((a, b) => a + b, 0);
  }, [dataSource]);

  const tabOptions = useMemo(() => {
    return [
      {
        title: "Geral",
        value: "geral",
        content: <BarGraph data={dataSource} />,
      },
      {
        title: "Setores",
        value: "sector",
        content: <GCCBarGraph data={selectedDataSource as any} />,
      },
    ];
  }, [dataSource, selectedDataSource]);

  if (isLoading) {
    return <div>{/* <LoadingScreen /> */}</div>;
  }

  return (
    <HomeGraphContainer>
      <section className="big-numbers">
        <div className="section-header">
          <h1>Chamados Graciosa Country Club</h1>
        </div>
        <ul className="big-numbers-list">
          <li>
            <p>35+</p>
            <span>Chamados abertos no último mês</span>
          </li>

          <li>
            <p>{allSetorsTicketsCount}</p>
            <span>Chamados totais</span>
          </li>
        </ul>
      </section>

      <section className="bar-chart">
        {userSector ? (
          <BarGraph data={dataSource} />
        ) : (
          <TabComponent data={tabOptions} defaultValue="geral" />
        )}
      </section>

      <section className="sector-search"></section>
    </HomeGraphContainer>
  );
};

export default HomeGraph;
