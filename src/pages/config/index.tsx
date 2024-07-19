import { AiOutlineDollar, AiOutlineTool, AiOutlineUser, AiTwotoneSetting } from "react-icons/ai";
import PageHeaderComponent from "../../components/pagesHeader";
import { Configontainer } from "./styles";
import { useAuth } from "../../hooks/auth";

export default function Config() {

  const {user} = useAuth();

  
  return (
    <Configontainer>
      <PageHeaderComponent.container>
        <PageHeaderComponent.title>Configuração</PageHeaderComponent.title>
      </PageHeaderComponent.container>
      <section className="cards-sector" title="Geral">

        <div className="card">
          <AiTwotoneSetting style={{ fontSize: "2em" }} />
          Geral
        </div>

        <div className="card" title="Conta">
          <AiOutlineUser style={{ fontSize: "2em" }} />
          Conta
        </div>

        <div className="card" title="Sistema">
          <AiOutlineTool style={{ fontSize: "2em" }} />
          Sistema
        </div>     

        {user?.role === "Administrator"  && (
          <div className="card" title="Financeiro">  
          <AiOutlineDollar style={{ fontSize: "2em" }} />
            Financeiro
          </div>
        )}

       
      </section>
    </Configontainer>
  );
}
