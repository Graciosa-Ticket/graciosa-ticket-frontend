import { useEffect, useMemo, useState } from "react";
import {
  Graph,
  GraphItem,
  StyledTooltipArrow,
  StyledTooltipContent,
} from "./styles";
import { CounterToChartModel } from "../../../../../models/counterToChart";
import { map } from "lodash";
import ButtonComponent from "../../../../../components/buttons";
import { FaAngleLeft } from "react-icons/fa";
import formatLabel from "../../../../../utils/formatLabel";
import * as Tooltip from "@radix-ui/react-tooltip";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const chartData = useMemo(() => {
    if (!data.length) return [];

    return data.map((e) => {
      const sector_code = e.sector_code;
      const sector_name = e.name;

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

  useEffect(() => {
    if (data.length) {
      setIsLoading(false);
    }
  }, [data]);

  const handleChangeGraphPosition = (index: number | undefined) => {
    if (!selectionactive) return;
    setGraphPosition(index);
    setSelectionActive(index === undefined);
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
      const steps = maxValue;
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!selectionactive && (
        <ButtonComponent
          buttonStyles="text"
          onClick={() => {
            setGraphPosition(undefined);
            setSelectionActive(true);
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
                        <Tooltip.Root
                          key={`${e.sector_code}-${total.label}-${index}`}
                        >
                          <Tooltip.Trigger asChild>
                            <GraphItem
                              style={{
                                height: (value * 100) / maxValue + "%",
                              }}
                              $type={total.label as keyof CounterToChartModel}
                            />
                          </Tooltip.Trigger>
                          <Tooltip.Portal>
                            <StyledTooltipContent side="top" align="center">
                              {`${formatLabel(total.label)}: ${value}`}
                              <StyledTooltipArrow />
                            </StyledTooltipContent>
                          </Tooltip.Portal>
                        </Tooltip.Root>
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
