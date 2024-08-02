import { useMemo, useState } from "react";
import { CounterToChartModel } from "../../../../models/counterToChart";
import { useFetch } from "../../../../services/hooks/getQuery";
import BarGraph from "./bar/barGraph";
import { HomeGraphContainer } from "./styles";
import TabComponent from "../../../../components/tabComponent";
import { map } from "lodash";
import SectorBarGraph from "./bar/barGraphSector";
import { SectorCardModel } from "../../../../models/sector";

interface homeGraphProps {
  userSector?: SectorCardModel;
}

const HomeGraph = ({ userSector }: homeGraphProps) => {
  const [dataSource, setDataSource] = useState<CounterToChartModel>();

  const [selectedDataSource, setSelectedDataSource] =
    useState<CounterToChartModel[]>();

  const { isLoading: isLoadingAllSectorsCounters } =
    useFetch<CounterToChartModel>(
      "/counters/counterToChart",
      ["geralCountData"],
      {
        onSuccess: (geralCountData) => {
          setDataSource(geralCountData);
        },
      }
    );

  const { isLoading: isLoadingSelectedSector } = useFetch<
    CounterToChartModel[]
  >(`/counters/counterToChart/allSectors`, ["selectedSectorCounter"], {
    onSuccess: (selectedSectorCountData) => {
      setSelectedDataSource(
        map(selectedSectorCountData[0], (a: any, b) => ({
          sector_code: b,
          ...a,
        }))
      );
    },
  });

  const { isLoading: isLoadingCountBySectorCode } =
    useFetch<CounterToChartModel>(
      `/counters/counterToChart/sector/${userSector?.responsible_code}`,
      ["counterBySectorCode"],
      {
        onSuccess: (counterBySectorCode) => {
          const sectorData = Object.values(counterBySectorCode)[0];
          setDataSource(sectorData);
          console.log("counterBySectorCode: " + sectorData);
        },
      }
    );

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
        content: <SectorBarGraph data={selectedDataSource} />,
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
          <TabComponent data={tabOptions} />
        )}
      </section>

      <section className="sector-search"></section>
    </HomeGraphContainer>
  );
};

export default HomeGraph;
