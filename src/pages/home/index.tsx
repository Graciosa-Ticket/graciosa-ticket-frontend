import HomeGraph from "./components/graphs";
import HomeSector from "./components/sectors";
import HomeTicketComponent from "./components/tickets";
import { HomeSection } from "./styles";

export default function Home() {
  return (
    <HomeSection>
      <HomeGraph />
      <HomeTicketComponent />
      <HomeSector />
    </HomeSection>
  );
}
