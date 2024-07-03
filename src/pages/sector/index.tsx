import SectorCard from "../../components/sectorCard";
import { SectorContainer } from "./styles";

export default function Sector() {
  return (
    <SectorContainer>
      <div className="sector-div">
        <h1>Setores +</h1>

        <SectorCard />
      </div>
    </SectorContainer>
  );
}
