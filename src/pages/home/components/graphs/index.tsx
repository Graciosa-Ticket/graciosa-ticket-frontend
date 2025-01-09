import { useEffect, useMemo, useState } from "react";
import {
  CounterToChartModel,
  CounterToChartModelSector,
} from "../../../../models/counterToChart";
import { useFetch } from "../../../../services/hooks/getQuery";
import BarGraph from "./bar/barGraph";
import { HomeGraphContainer } from "./styles";
import TabComponent from "../../../../components/tabComponent";
import { SectorCardModel } from "../../../../models/sector";
import GCCBarGraph from "./barGraphGCC";
import GraphSkeletonLoading from "../../graphSkeleton";

interface homeGraphProps {
  userSector?: SectorCardModel;
  isadmin: boolean;
  sectorsListData?: SectorCardModel[];
}

type ResponseError = { message: string; statusCode: number };

const HomeGraph = ({
  userSector,
  isadmin = false,
  sectorsListData = [],
}: homeGraphProps) => {
  const [countersDataSource, setcountersDataSource] = useState<
    CounterToChartModel | CounterToChartModelSector | ResponseError
  >();

  const [createdTicketsCounterDataSource, setcreatedTicketsCounterDataSource] =
    useState<number>(0);

  const [selectedDataSource, setSelectedDataSource] =
    useState<CounterToChartModel[]>();

  const { isLoading: isLoadingAllSectorsCounters } = useFetch<
    CounterToChartModel | CounterToChartModelSector
  >(
    "/counters/counterToChart" + (isadmin ? "" : `/sector/${userSector?.code}`), // Define a URL de acordo com o tipo de usuário
    ["geralCountData", isadmin, userSector?.code],
    {
      onSuccess: (geralCountData) => {
        setcountersDataSource(() => {
          if (isadmin) return geralCountData;

          return (geralCountData as CounterToChartModelSector)?.[
            userSector?.code as string
          ];
        });
      },
    }
  );

  const { isLoading: isLoadingCreatedTicketsCounterDataByCode } = useFetch<
    number | ResponseError
  >(
    `/ticket/count/getCreatedTickets` + (isadmin ? "" : "/" + userSector?.code), // Define a URL de acordo com o tipo de usuário
    ["createdTicketsCounterDataByCode", isadmin, userSector?.code],
    {
      onSuccess: (createdTicketsCounterDataByCode) => {
        if (
          (createdTicketsCounterDataByCode as ResponseError)?.statusCode &&
          (createdTicketsCounterDataByCode as ResponseError)?.statusCode !== 200
        )
          return;

        setcreatedTicketsCounterDataSource(
          createdTicketsCounterDataByCode as number
        );
      },
    }
  );

  const { isLoading: isLoadingSelectedSector, data: allSectorsCountData } =
    useFetch<CounterToChartModel>("/counters/counterToChart/allSectors", [
      "selectedSectorCounter",
    ]);

  useEffect(() => {
    if (allSectorsCountData && sectorsListData?.length) {
      const counters = allSectorsCountData;
      const updatedData = Object.entries(counters)
        .map(([sector_code, values]) => {
          const sector = sectorsListData?.find((s) => s.code === sector_code);

          return {
            sector_code,
            ...values,
            name: sector?.name || "Desconhecido",
          };
        })
        .filter((sector) => sector.name !== "Desconhecido"); // Filtra setores com o nome "Desconhecido"

      setSelectedDataSource(updatedData);
    }
  }, [allSectorsCountData, sectorsListData]);

  const isLoading =
    isLoadingAllSectorsCounters ||
    isLoadingCreatedTicketsCounterDataByCode ||
    isLoadingSelectedSector;

  const allSetorsTicketsCount = useMemo(() => {
    if (
      (countersDataSource as ResponseError)?.statusCode &&
      (countersDataSource as ResponseError)?.statusCode !== 200
    )
      return 0;

    const dataSourceKeys = Object.values(countersDataSource || {});
    if (!dataSourceKeys.length) return 0;
    return dataSourceKeys.reduce((a, b) => a + b, 0);
  }, [countersDataSource]);

  const tabOptions = useMemo(() => {
    return [
      {
        title: "Geral",
        value: "geral",
        content: (
          <BarGraph
            data={
              countersDataSource as
                | CounterToChartModel
                | CounterToChartModelSector
            }
          />
        ),
      },
      {
        title: "Setores",
        value: "sector",
        content: <GCCBarGraph data={selectedDataSource as any} />,
      },
    ];
  }, [countersDataSource, selectedDataSource]);

  if (isLoading) {
    return (
      <GraphSkeletonLoading style={{ margin: "20px", gridColumn: "span 2" }} />
    );
  }

  return (
    <HomeGraphContainer>
      <section className="big-numbers">
        <div className="section-header">
          <h1>Indicadores Graciosa Country Club</h1>
        </div>
        <ul className="big-numbers-list">
          <div className="sl">
            <p>{createdTicketsCounterDataSource}</p>
            <span>Chamados abertos no último mês</span>
          </div>

          <li>
            <p>{allSetorsTicketsCount}</p>
            <span>Chamados totais</span>
          </li>
        </ul>
      </section>

      <section className="bar-chart">
        {userSector ? (
          <BarGraph
            data={
              countersDataSource as
                | CounterToChartModel
                | CounterToChartModelSector
            }
          />
        ) : (
          <TabComponent data={tabOptions} defaultValue="geral" />
        )}
      </section>

      <section className="sector-search"></section>
    </HomeGraphContainer>
  );
};

export default HomeGraph;
