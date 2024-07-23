import ticketData from "../sectorCard/fakedata";
import { Layout, StatusP } from "./styles";

const SectorTicketsDisplay = () => {
  return (
    <Layout>
      <StatusP status="Aberto">Aberto</StatusP>
      <span>{ticketData.aberto}</span>
      <StatusP status="Em andamento">Em andamento</StatusP>
      <span>{ticketData.em_andamento}</span>
      <StatusP status="Aguardando aprovação">Aguardando aprovação</StatusP>
      <span>{ticketData.aguardando_aprovacao}</span>
      <StatusP status="Cancelado">Cancelado</StatusP>
      <span>{ticketData.cancelado}</span>
      <StatusP status="Reaberto">Reaberto</StatusP>
      <span>{ticketData.reaberto}</span>
      <StatusP status="Impeditivo">Impeditivo</StatusP>
      <span>{ticketData.impeditivo}</span>
      <StatusP status="Concluído">Concluído</StatusP>
      <span>{ticketData.concluido}</span>
    </Layout>
  );
};

export default SectorTicketsDisplay;
