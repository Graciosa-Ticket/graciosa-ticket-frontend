import { SectorCardModel } from "../../../../models/sector";
import { Layout, StatusP } from "./styles";

interface SectorTicketsDisplayProps {
  data?: SectorCardModel;
}

const SectorTicketsDisplay = ({ data }: SectorTicketsDisplayProps) => {
  return (
    <Layout>
      <StatusP status="Aberto">Aberto</StatusP>
      <span>{data?.counters?.aberto}</span>
      <StatusP status="Em_andamento">Em andamento</StatusP>
      <span>{data?.counters?.em_andamento}</span>
      <StatusP status="Aguardando aprovação">Aguardando aprovação</StatusP>
      <span>{data?.counters?.aguardando_aprovacao}</span>
      <StatusP status="Cancelado">Cancelado</StatusP>
      <span>{data?.counters?.cancelado}</span>
      <StatusP status="Reaberto">Reaberto</StatusP>
      <span>{data?.counters?.reaberto}</span>
      <StatusP status="Impeditivo">Impeditivo</StatusP>
      <span>{data?.counters?.impeditivo}</span>
      <StatusP status="Concluído">Concluído</StatusP>
      <span>{data?.counters?.concluido}</span>
    </Layout>
  );
};

export default SectorTicketsDisplay;
