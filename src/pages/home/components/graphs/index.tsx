import { useEffect, useMemo, useState } from "react";
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
  isadmin = false,
  sectorsListData,
}: homeGraphProps) => {
  const [countersDataSource, setcountersDataSource] =
    useState<CounterToChartModel>();

  const [createdTicketsCounterDataSource, setcreatedTicketsCounterDataSource] =
    useState<number>();

  const [selectedDataSource, setSelectedDataSource] =
    useState<CounterToChartModel[]>();

  const { isLoading: isLoadingAllSectorsCounters } =
    useFetch<CounterToChartModel>(
      "/counters/counterToChart" +
        (isadmin ? "" : `/sector/${userSector?.code}`),
      ["geralCountData", isadmin, userSector?.code],
      {
        onSuccess: (geralCountData) => {
          setcountersDataSource(geralCountData);
        },
      }
    );

  const { isLoading: isLoadingCreatedTicketsCounterDataByCode } =
    useFetch<number>(
      `/ticket/count/getCreatedTickets/` + (isadmin ? "" : userSector?.code),
      ["createdTicketsCounterDataByCode", isadmin, userSector?.code],
      {
        onSuccess: (createdTicketsCounterDataByCode) => {
          setcreatedTicketsCounterDataSource(createdTicketsCounterDataByCode);
        },
      }
    );

  const { isLoading: isLoadingSelectedSector, data: allSectorsCountData } =
    useFetch<CounterToChartModel[]>("/counters/counterToChart/allSectors", [
      "selectedSectorCounter",
    ]);

  useEffect(() => {
    if (allSectorsCountData?.length) {
      const counters = allSectorsCountData[0];

      const updatedData = Object.entries(counters).map(
        ([sector_code, values]) => {
          const sector = sectorsListData?.find((s) => s.code === sector_code);

          return {
            sector_code,
            ...values,
            name: sector?.name || "Desconhecido",
          };
        }
      );
      setSelectedDataSource(updatedData);
    }
  }, [allSectorsCountData, sectorsListData]);

  const isLoading =
    isLoadingAllSectorsCounters ||
    isLoadingCreatedTicketsCounterDataByCode ||
    isLoadingSelectedSector;

  const allSetorsTicketsCount = useMemo(() => {
    const dataSourceKeys = Object.values(countersDataSource || {});
    if (!dataSourceKeys.length) return 0;
    return dataSourceKeys.reduce((a, b) => a + b, 0);
  }, [countersDataSource]);

  const tabOptions = useMemo(() => {
    return [
      {
        title: "Geral",
        value: "geral",
        content: <BarGraph data={countersDataSource} />,
      },
      {
        title: "Setores",
        value: "sector",
        content: <GCCBarGraph data={selectedDataSource as any} />,
      },
    ];
  }, [countersDataSource, selectedDataSource]);

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
            <p>{createdTicketsCounterDataSource}</p>
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
          <BarGraph data={countersDataSource} />
        ) : (
          <TabComponent data={tabOptions} defaultValue="geral" />
        )}
      </section>

      <section className="sector-search"></section>
    </HomeGraphContainer>
  );
};

export default HomeGraph;
