import { useAuth } from "../../hooks/auth";
import { SectorCardModel } from "../../models/sector";
import { useFetch } from "../../services/hooks/getQuery";
import HomeGraph from "./components/graphs";
import HomeSector from "./components/sectors";
import HomeTicketComponent from "./components/tickets";
import { HomeSection } from "./styles";

interface homeProps {
  sector: SectorCardModel;
  isAdmin: boolean;
}

export default function Home({}: homeProps) {
  const { user } = useAuth();
  const isAdmin = user.role === "Administrator";

  const { data: sectorsListData } = useFetch<SectorCardModel[]>("/sectors", [
    "sector",
  ]);

  const userSector = sectorsListData?.find(
    (data) => data.responsible_code === user.code
  );

  return (
    <HomeSection isAdmin={isAdmin}>
      {isAdmin ? (
        <>
          <HomeGraph />
          <HomeTicketComponent isAdmin={isAdmin} />
          <HomeSector />
        </>
      ) : (
        <>
          <HomeGraph userSector={userSector} />
          <HomeTicketComponent isAdmin={isAdmin} />
        </>
      )}
    </HomeSection>
  );
}
