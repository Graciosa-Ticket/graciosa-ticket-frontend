import SectorCardComponent from "./components/sectorsCards";
import { SectorContainer } from "./styles";

export default function Sector() {
  return (
    <SectorContainer>
      <div className="sector-div">
        <div className="div-add-sector">
          <h1>Setores</h1>
          <a>+</a>
        </div>

        <SectorCardComponent />
      </div>
    </SectorContainer>
  );
}
