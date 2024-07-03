import MenuHeader from "../../components/menu";
import SectorCard from "../../components/sectorCard";
import TicketCard from "../../components/ticket";
import { HomeSection } from "./styles";

export default function Home() {
  return (
    <section>
      <HomeSection>
        <MenuHeader />
        <div className="graph">GRÁFICOS</div>

        <div className="div-home">
          <TicketCard />
          <SectorCard />
        </div>
      </HomeSection>
    </section>
  );
}
