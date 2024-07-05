import SectorCard from "../../components/sectorCard";
import HomeTicketComponent from "./components/tickets";
import { HomeSection } from "./styles";

export default function Home() {
  return (
    <HomeSection>
      <div className="graph">GRÁFICOS</div>

      <div className="div-home">
        <HomeTicketComponent />
        <SectorCard />
      </div>
    </HomeSection>
  );
}
