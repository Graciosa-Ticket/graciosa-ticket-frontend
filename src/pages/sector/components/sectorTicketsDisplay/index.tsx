import { SectorCardModel } from "../../../../models/sector";
import { Layout, StatusP } from "./styles";

interface SectorTicketsDisplayProps {
  data?: SectorCardModel;
}

const SectorTicketsDisplay = ({ data }: SectorTicketsDisplayProps) => {
  return (
    <Layout>
      <StatusP status="Aberto">
        Aberto
        <span>{data?.counters?.aberto}</span>
      </StatusP>

      <StatusP status="Em andamento">
        Em andamento
        <span>{data?.counters?.em_andamento}</span>
      </StatusP>

      <StatusP status="Aguardando aprovação">
        Aguardando aprovação
        <span>{data?.counters?.aguardando_aprovacao}</span>
      </StatusP>

      <StatusP status="Cancelado">
        Cancelado
        <span>{data?.counters?.cancelado}</span>
      </StatusP>

      <StatusP status="Reaberto">
        Reaberto
        <span>{data?.counters?.reaberto}</span>
      </StatusP>

      <StatusP status="Impeditivo">
        Impeditivo
        <span>{data?.counters?.impeditivo}</span>
      </StatusP>

      <StatusP status="Concluído">
        Concluído
        <span>{data?.counters?.concluido}</span>
      </StatusP>
    </Layout>
  );
};

export default SectorTicketsDisplay;
