import PageHeaderComponent from "../../components/pagesHeader";
import AdminTicketsView from "./components/adminView";
import { fakeTicketData } from "./fakeData";
import { TicketsPageContainer } from "./styles";

const TicketsPage = () => {
  return (
    <TicketsPageContainer>
      <PageHeaderComponent.container>
        <PageHeaderComponent.title>Chamados</PageHeaderComponent.title>
        <PageHeaderComponent.button onClick={() => console.log("aaa")} />
      </PageHeaderComponent.container>

      <AdminTicketsView tickets={fakeTicketData} />
    </TicketsPageContainer>
  );
};

export default TicketsPage;
