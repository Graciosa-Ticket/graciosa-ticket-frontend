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

// Define as propriedades esperadas para o componente HomeGraph
interface homeGraphProps {
  userSector?: SectorCardModel;
  isadmin: boolean;
  sectorsListData?: SectorCardModel[];
}

type ResponseError = { message: string; statusCode: number };

const HomeGraph = ({
  userSector,
  isadmin = false,
  sectorsListData,
}: homeGraphProps) => {
  // Estado para armazenar os dados dos contadores recebidos da API
  const [countersDataSource, setcountersDataSource] = useState<
    CounterToChartModel | CounterToChartModelSector | ResponseError
  >();

  // Estado para armazenar o número de tickets criados
  const [createdTicketsCounterDataSource, setcreatedTicketsCounterDataSource] =
    useState<number>(0);

  // Estado para armazenar os dados selecionados de um setor específico
  const [selectedDataSource, setSelectedDataSource] =
    useState<CounterToChartModel[]>();

  // Hook para buscar os dados gerais dos contadores de todos os setores ou de um setor específico
  const { isLoading: isLoadingAllSectorsCounters } = useFetch<
    CounterToChartModel | CounterToChartModelSector
  >(
    "/counters/counterToChart" + (isadmin ? "" : `/sector/${userSector?.code}`), // Define a URL de acordo com o tipo de usuário
    ["geralCountData", isadmin, userSector?.code],
    {
      onSuccess: (geralCountData) => {
        // Atualiza o estado com os dados recebidos
        setcountersDataSource(() => {
          if (isadmin) return geralCountData;

          return (geralCountData as CounterToChartModelSector)?.[
            userSector?.code as string
          ];
        });
      },
    }
  );

  // Hook para buscar o número de tickets criados, filtrando por setor se o usuário não for administrador
  const { isLoading: isLoadingCreatedTicketsCounterDataByCode } = useFetch<
    number | ResponseError
  >(
    `/ticket/count/getCreatedTickets` + (isadmin ? "" : "/" + userSector?.code), // Define a URL de acordo com o tipo de usuário
    ["createdTicketsCounterDataByCode", isadmin, userSector?.code],
    {
      onSuccess: (createdTicketsCounterDataByCode) => {
        // Atualiza o estado com o número de tickets criados

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

  // Hook para buscar os dados dos contadores de todos os setores
  const { isLoading: isLoadingSelectedSector, data: allSectorsCountData } =
    useFetch<CounterToChartModel[]>("/counters/counterToChart/allSectors", [
      "selectedSectorCounter",
    ]);

  // Efeito que é executado quando os dados de todos os setores são carregados
  useEffect(() => {
    if (allSectorsCountData?.length) {
      const counters = allSectorsCountData[0];
      const updatedData = Object.entries(counters)
        .map(([sector_code, values]) => {
          // Encontra o setor correspondente e adiciona o nome ao objeto
          const sector = sectorsListData?.find((s) => s.code === sector_code);

          return {
            sector_code,
            ...values,
            name: sector?.name || "Desconhecido",
          };
        })
        .filter((sector) => sector.name !== "Desconhecido"); // Filtra setores com o nome "Desconhecido"

      // Atualiza o estado com os dados dos setores selecionados
      setSelectedDataSource(updatedData);
    }
  }, [allSectorsCountData, sectorsListData]);

  // Define a flag de carregamento combinando os estados de carregamento dos diferentes hooks
  const isLoading =
    isLoadingAllSectorsCounters ||
    isLoadingCreatedTicketsCounterDataByCode ||
    isLoadingSelectedSector;

  // Calcula o número total de tickets de todos os setores
  const allSetorsTicketsCount = useMemo(() => {
    console.log(countersDataSource);

    if (
      (countersDataSource as ResponseError)?.statusCode &&
      (countersDataSource as ResponseError)?.statusCode !== 200
    )
      return 0;

    const dataSourceKeys = Object.values(countersDataSource || {});
    if (!dataSourceKeys.length) return 0;
    return dataSourceKeys.reduce((a, b) => a + b, 0);
  }, [countersDataSource]);

  // Define as opções de abas (tabs) para o componente TabComponent
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
        ), // Gráfico de barras para dados gerais
      },
      {
        title: "Setores",
        value: "sector",
        content: <GCCBarGraph data={selectedDataSource as any} />, // Gráfico de barras para setores específicos
      },
    ];
  }, [countersDataSource, selectedDataSource]);

  // Se estiver carregando, exibe um elemento de carregamento (comentado no momento)
  if (isLoading) {
    return (
      <div>
        <GraphSkeletonLoading style={{ margin: "20px" }} />
      </div>
    );
  }

  // Retorna o conteúdo do componente HomeGraph
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
