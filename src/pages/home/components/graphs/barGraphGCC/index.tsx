import { useEffect, useMemo, useState } from "react";
import {
  Graph,
  GraphItem,
  Separator,
  StyledTooltipArrow,
  StyledTooltipContent,
} from "./styles";
import { CounterToChartModel } from "../../../../../models/counterToChart";
import { map } from "lodash";
import ButtonComponent from "../../../../../components/buttons";
import { FaAngleLeft } from "react-icons/fa";
import formatLabel from "../../../../../utils/formatLabel";
import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";

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
    if (!data?.length) return [];

    return data
      ?.slice(
        graphPosition !== undefined ? graphPosition : 0,
        graphPosition !== undefined ? graphPosition + 1 : data.length
      )
      .map((e) => {
        const sector_code = e.sector_code;
        const sector_name = e.name;

        const filteredData = map(e, (a, b) => ({
          label: b,
          value: a,
        })).filter((item) => typeof item.value === "number" && item.value > 0);

        return {
          sector_code,
          sector_name,
          data: filteredData,
        };
      });
  }, [data, graphPosition]);

  useEffect(() => {
    if (data?.length) {
      setIsLoading(false);
    }
  }, [data]);

  const handleChangeGraphPosition = (index: number | undefined) => {
    if (!selectionactive) return;
    setGraphPosition(index);
    setSelectionActive(index === undefined);
  };

  const maxValue = useMemo(() => {
    if (!data?.length) return 0;

    const maxNumb = chartData
      .flatMap((e) => e.data)
      .filter((d) => typeof d.value === "number")
      .map((d) => d.value as number);

    return Math.max(...maxNumb);
  }, [chartData]);

  const graphLines = useMemo(() => {
    if (maxValue > 0) {
      return (
        <div className="graph-line-container">
          {[1, 2, 3, 4, 5].map((divideBy, index) => {
            const value = Math.ceil(maxValue / divideBy);

            if (divideBy === 5) {
              return (
                <span key={index} className="graph-line">
                  0
                </span>
              );
            }
            return (
              <span key={index} className="graph-line">
                {value}
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
      <Graph $selectionactive={selectionactive}>
        {chartData.map((e, i) => (
          <React.Fragment key={i}>
            {/* Adiciona o Separator antes do button */}
            {i > 0 && <Separator />}

            <button
              type="button"
              className="lines-container"
              onClick={() => handleChangeGraphPosition(i)}
            >
              <div className="lines">
                {e.data
                  .filter((item) => item.label !== "sector_code")
                  .map((total, index) => {
                    const value = Number(total.value);
                    if (!isNaN(value)) {
                      const height = (value * 100) / maxValue;

                      return (
                        <Tooltip.Root
                          key={`${e.sector_code}-${total.label}-${index}`}
                        >
                          <Tooltip.Trigger asChild>
                            <GraphItem
                              style={{
                                height: (height <= 1 ? 2 : height) + "%",
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
          </React.Fragment>
        ))}
        {graphLines}
      </Graph>
    </div>
  );
};

export default GCCBarGraph;
