import MenuHeader from "../../components/menu";
import SectorCard from "../../components/sectorCard";
import { SectorContainer } from "./styles";

export default function Sector() {
  return (
    <SectorContainer>
      <section>
        <MenuHeader />
        <div className="sector-div">
          <h1>Setores +</h1>

          <SectorCard />
        </div>
      </section>
    </SectorContainer>
  );
}
