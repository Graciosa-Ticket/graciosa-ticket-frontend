import { AiOutlineTool, AiOutlineUser, AiTwotoneSetting } from "react-icons/ai";
import PageHeaderComponent from "../../components/pagesHeader";
import { Configontainer } from "./styles";

export default function Config() {
  return (
    <Configontainer>
      <PageHeaderComponent.container>
        <PageHeaderComponent.title>Configuração</PageHeaderComponent.title>
      </PageHeaderComponent.container>
      <section className="cards-sector" title="Ajustes em geral">

        <div className="card">
          <AiTwotoneSetting style={{ fontSize: "2em" }} />
          Geral
        </div>

        <div className="card" title="Alterações na conta">
          <AiOutlineUser style={{ fontSize: "2em" }} />
          Conta
        </div>

        <div className="card" title="Ajustes no sistema">
          <AiOutlineTool style={{ fontSize: "2em" }} />
          Sistema
        </div>

       
      </section>
    </Configontainer>
  );
}
