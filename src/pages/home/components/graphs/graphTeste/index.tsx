import { useMemo, useState } from "react";
import { Graph, GraphItem } from "./styles";
import { CounterToChartModel } from "../../../../../models/counterToChart";
import { filter, map } from "lodash";
import ButtonComponent from "../../../../../components/buttons";

type SectorGraphData = CounterToChartModel & {
  sector_code?: string;
  [key: string]: number | string | undefined;
};

interface graphProps {
  data: SectorGraphData[];
}

const GCCBarGraph = ({ data }: graphProps) => {
  const [graphPosition, setGraphPosition] = useState<number>();

  const chartData = useMemo(() => {
    if (!data.length) return [];

    const buildData = data.map((e) => {
      const sector_code = e.sector_code;

      return {
        sector_code,
        data: map(e, (a, b) => ({
          label: b,
          value: a,
        })),
      };
    });

    return buildData;
  }, [data]);

  const handleChangeGraphPositon = (index: number | undefined) => {
    console.log(index);

    setGraphPosition(index);
  };

  const maxValue = useMemo(() => {
    if (!data.length) return 0;

    const flattedMap = data.map((e) => Object.values(e)).flat();

    const maxNumb = filter(flattedMap, (a) => {
      if (typeof a === "number") return true;
      return false;
    });

    return Math.max(...(maxNumb as number[]));
  }, [data]);

  const graphLines = useMemo(() => {
    if (maxValue > 0) {
      return (
        <div className="graph-line-container">
          {[1, 2, 3, 4, 0].map((e) => {
            if (!e) {
              return (
                <span key={e} className="graph-line">
                  {e}
                </span>
              );
            }

            return <span className="graph-line" key={e} />;
          })}
        </div>
      );
    }
  }, [maxValue]);

  return (
    <div>
      <ButtonComponent onClick={() => handleChangeGraphPositon(undefined)}>
        teste
      </ButtonComponent>

      <Graph>
        {chartData
          ?.slice(
            graphPosition,
            typeof graphPosition === "number" ? 1 + graphPosition : -1
          )
          .map((e, i) => (
            <button
              type="button"
              key={(e.sector_code as string) + i}
              className="lines-container"
              onClick={() => handleChangeGraphPositon(i)}
            >
              <div className="lines">
                {e.data
                  .filter((filter) => filter.label !== "sector_code")
                  .map((total, index) => {
                    if (total.value) {
                      return (
                        <GraphItem
                          key={
                            Number(total.value) +
                            (index + 1) +
                            (e?.sector_code as string)
                          }
                          style={{
                            height:
                              (Number(total.value) * 100) / maxValue + "%",
                          }}
                          $type={total.label as keyof CounterToChartModel}
                        />
                      );
                    }
                  })}
              </div>
              <p className="date-indicator">{e.sector_code}</p>
            </button>
          ))}

        {graphLines}
      </Graph>
    </div>
  );
};

export default GCCBarGraph;
