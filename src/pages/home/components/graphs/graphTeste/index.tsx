import { useMemo, useState } from "react";
import { Graph, GraphItem } from "./styles";
import { CounterToChartModel } from "../../../../../models/counterToChart";
import { map } from "lodash";
import ButtonComponent from "../../../../../components/buttons";
import { FaAngleLeft } from "react-icons/fa";
import formatLabel from "../../../../../utils/formatLabel";

type SectorGraphData = CounterToChartModel & {
  sector_code?: string;
  name?: string;
  [key: string]: number | string | undefined;
};

interface graphProps {
  data: SectorGraphData[];
}
const GCCBarGraph = ({ data }: graphProps) => {
  const [graphPosition, setGraphPosition] = useState<number | undefined>();
  const [selectionactive, setSelectionActive] = useState<boolean>(true);
  const [tooltip, setTooltip] = useState<{
    label: string;
    value: number;
    x: number;
    y: number;
  } | null>(null);

  const chartData = useMemo(() => {
    if (!data.length) return [];

    return data.map((e) => {
      const sector_code = e.sector_code;
      const sector_name = e.name;

      // console.log(`Processing sector: ${sector_code} - ${sector_name}`); // Debug log

      return {
        sector_code,
        sector_name,
        data: map(e, (a, b) => ({
          label: b,
          value: a,
        })),
      };
    });
  }, [data]);

  const handleChangeGraphPosition = (index: number | undefined) => {
    if (!selectionactive) return; // Bloquear o clique se a seleção estiver desativada
    setGraphPosition(index);
    setSelectionActive(index === undefined); // Desativar a seleção se o índice for indefinido
  };

  const maxValue = useMemo(() => {
    if (!data.length) return 0;

    const maxNumb = chartData
      .flatMap((e) => e.data)
      .filter((d) => typeof d.value === "number")
      .map((d) => d.value as number);

    return Math.max(...maxNumb);
  }, [chartData]);

  const graphLines = useMemo(() => {
    if (maxValue > 0) {
      const steps = maxValue; // Número de linhas no gráfico
      const stepValue = maxValue / steps;

      return (
        <div className="graph-line-container">
          {[...Array(steps + 1)].map((_, index) => {
            const value = maxValue - stepValue * index;
            return (
              <span key={index} className="graph-line">
                {value.toFixed()}
              </span>
            );
          })}
        </div>
      );
    }
    return null;
  }, [maxValue]);

  return (
    <div>
      {!selectionactive && (
        <ButtonComponent
          buttonStyles="text"
          onClick={() => {
            setGraphPosition(undefined);
            setSelectionActive(true); // Reativar a seleção
          }}
        >
          <FaAngleLeft fontSize="1.9em" />
        </ButtonComponent>
      )}
      <Graph selectionactive={selectionactive}>
        {chartData
          ?.slice(
            graphPosition !== undefined ? graphPosition : 0,
            graphPosition !== undefined ? graphPosition + 1 : chartData.length
          )
          .map((e, i) => (
            <button
              type="button"
              key={`${e.sector_code}-${i}`}
              className="lines-container"
              onClick={() => handleChangeGraphPosition(i)}
            >
              <div className="lines">
                {e.data
                  .filter((item) => item.label !== "sector_code")
                  .map((total, index) => {
                    const value = Number(total.value);
                    if (!isNaN(value)) {
                      return (
                        <GraphItem
                          key={`${e.sector_code}-${total.label}-${index}`}
                          style={{
                            height: (value * 100) / maxValue + "%",
                          }}
                          $type={total.label as keyof CounterToChartModel}
                          onMouseEnter={(event) => {
                            const rect = (
                              event.currentTarget as HTMLElement
                            ).getBoundingClientRect();
                            setTooltip({
                              label: formatLabel(total.label),
                              value,
                              x: rect.left + window.scrollX + rect.width / 2,
                              y: rect.top + window.scrollY - 5,
                            });
                          }}
                          onMouseLeave={() => setTooltip(null)}
                        >
                          <div className="graph-item-tooltip">
                            {`${formatLabel(total.label)}: ${value}`}
                          </div>
                        </GraphItem>
                      );
                    }
                    return null;
                  })}
              </div>
              <p className="date-indicator">{e.sector_name || e.sector_code}</p>
            </button>
          ))}

        {graphLines}
      </Graph>
    </div>
  );
};

export default GCCBarGraph;
