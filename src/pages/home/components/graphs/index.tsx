import { useMemo, useState } from "react";
import { CounterToChartModel } from "../../../../models/counterToChart";
import { useFetch } from "../../../../services/hooks/getQuery";
import BarGraph from "./bar/barGraph";
import { HomeGraphContainer } from "./styles";
import LoadingScreen from "../../../../components/loading/loadingScreen";
import SelectSector from "../../../../components/selectSector";
import { useForm } from "react-hook-form";
import { SectorCardModel } from "../../../../models/sector";
import TabComponent from "../../../../components/tabComponent";
import { map } from "lodash";
import SectorBarGraph from "./bar/barGraphSector";

const HomeGraph = () => {
  const [dataSource, setDataSource] = useState<CounterToChartModel>();

  const [selectedDataSource, setSelectedDataSource] =
    useState<CounterToChartModel[]>();

  const { setValue, watch } = useForm<SectorCardModel>();

  const { isLoading: isLoadingAllSectorsCounters } =
    useFetch<CounterToChartModel>("/counters/CounterToChart", ["counter"], {
      onSuccess: (geralData) => {
        console.log({ geralData });
        setDataSource(geralData);
      },
    });

  const { isLoading: isLoadingSelectedSector } = useFetch<
    CounterToChartModel[]
  >(`/counters/counterToChart/allsectors`, ["selectedSectorCounter"], {
    onSuccess: (selectedSectorData) => {
      setSelectedDataSource(
        map(selectedSectorData[0], (a: any, b) => ({
          sector_code: b,
          ...a,
        }))
      );
    },
  });

  const isLoading = isLoadingAllSectorsCounters || isLoadingSelectedSector;

  const allTicketsCount = useMemo(() => {
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
            <p>{allTicketsCount}</p>
            <span>Chamados totais</span>
          </li>
        </ul>
      </section>

      <section className="bar-chart">
        <SelectSector
          label=""
          title="Selecionar Setor"
          onChange={(data) => {
            setValue("code", data?.code as string, { shouldDirty: true });
          }}
        />

        <TabComponent data={tabOptions} />
      </section>

      <section className="sector-search"></section>
    </HomeGraphContainer>
  );
};

export default HomeGraph;
