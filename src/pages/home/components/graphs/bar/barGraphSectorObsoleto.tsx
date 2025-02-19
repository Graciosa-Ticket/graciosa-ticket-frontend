import { CounterToChartModel } from "../../../../../models/counterToChart";
import { SectorCardModel } from "../../../../../models/sector";
import styled from "styled-components";
import GCCBarGraph from "../barGraphGCC";
import NotFoundComponent from "../../../../../components/notFound";

type SectorGraphData = CounterToChartModel & {
  sector_code?: string;
  [key: string]: number | string | undefined;
};

interface SectorBarGraphProps {
  data?: SectorGraphData[];
  sectorsListData: SectorCardModel[];
}

const GraphContainer = styled.div``;

const SectorBarGraph = ({ data }: SectorBarGraphProps) => {
  if (!data || data.length === 0) {
    return <NotFoundComponent message="Nenhum dado encontrado" />;
  }

  const extendedData = Array.from({ length: 10 }).flatMap(() => data);

  return (
    <GraphContainer>
      <GCCBarGraph data={extendedData} />
    </GraphContainer>
  );
};

export default SectorBarGraph;
