import MenuHeader from "../../components/menu";
import SectorCard from "../../components/sectorCard";
import { HomeSection } from "./styles";

export default function Home() {
  return (
    <section>
      <HomeSection>
        <MenuHeader />
        <div className=""></div>
        <SectorCard />
      </HomeSection>
    </section>
  );
}
