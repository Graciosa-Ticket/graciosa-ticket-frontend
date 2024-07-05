import SectorCardComponent from "../sector/components/sectorsCards";
import HomeTicketComponent from "./components/tickets";
import { HomeSection } from "./styles";

export default function Home() {
  return (
    <HomeSection>
      <div className="graph">GRÁFICOS</div>

      <div className="div-home">
        <HomeTicketComponent />
        <SectorCardComponent />
      </div>
    </HomeSection>
  );
}
