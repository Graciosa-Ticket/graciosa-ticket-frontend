import { useState } from "react";
import { CounterToChartModel } from "../../../../models/counterToChart";
import { useFetch } from "../../../../services/hooks/getQuery";
import BarGraph from "./bar/barGraph";
import { HomeGraphContainer } from "./styles";
import LoadingScreen from "../../../../components/loading/loadingScreen";
import SelectSector from "../../../../components/selectSector";
import { useForm } from "react-hook-form";
import { SectorCardModel } from "../../../../models/sector";

const HomeGraph = () => {
  const [dataSource, setDataSource] = useState<CounterToChartModel | null>(
    null
  );
  const [selectedDataSource, setSelectedDataSource] =
    useState<SectorCardModel | null>(null);

  const { setValue, watch } = useForm<SectorCardModel>();

  const { isLoading: isLoadingAllSectorsCounters } =
    useFetch<CounterToChartModel>("/counters/CounterToChart", ["counter"], {
      onSuccess: (geralData) => setDataSource(geralData),
    });

  const { isLoading: isLoadingSelectedSector } = useFetch<SectorCardModel>(
    `/counters/counterToChart/sector/${watch("code")}`,
    ["selectedSectorCounter", watch("code")],
    {
      onSuccess: (selectedSectorData) => {
        // console.log(selectedSectorData);
        setSelectedDataSource(selectedSectorData);
      },
    }
  );

  const isLoading = isLoadingAllSectorsCounters || isLoadingSelectedSector;

  const allTickets =
    (dataSource?.aberto ?? 0) +
    (dataSource?.aguardando_aprovacao ?? 0) +
    (dataSource?.cancelado ?? 0) +
    (dataSource?.concluido ?? 0) +
    (dataSource?.em_andamento ?? 0) +
    (dataSource?.impeditivo ?? 0) +
    (dataSource?.reaberto ?? 0);

  if (isLoading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
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
            <p>{allTickets}</p>
            <span>Chamados totais</span>
          </li>
        </ul>
      </section>

      <section className="bar-chart">
        <BarGraph data={dataSource || selectedDataSource} />
      </section>

      <section className="sector-search">
        <SelectSector
          label=""
          title="Selecionar Setor"
          onChange={(data) => {
            setValue("code", data?.code as string, { shouldDirty: true });
          }}
        />
      </section>
    </HomeGraphContainer>
  );
};

export default HomeGraph;
