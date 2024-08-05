import { useAuth } from "../../hooks/auth";
import { SectorCardModel } from "../../models/sector";
import { useFetch } from "../../services/hooks/getQuery";
import HomeGraph from "./components/graphs";
import HomeSector from "./components/sectors";
import HomeTicketComponent from "./components/tickets";
import { HomeSection } from "./styles";

export default function Home() {
  const { user } = useAuth();
  const isadmin = user.role === "Administrator";

  const { data: sectorsListData = [] } = useFetch<SectorCardModel[]>(
    "/sectors",
    ["sectorsListData"]
  );

  const userSector = sectorsListData?.length
    ? sectorsListData?.find((data) => data.responsible_code === user.code)
    : undefined;

  return (
    <HomeSection isadmin={isadmin}>
      {isadmin ? (
        <>
          <HomeGraph isadmin={isadmin} sectorsListData={sectorsListData} />
          <HomeTicketComponent isadmin={isadmin} />
          <HomeSector />
        </>
      ) : (
        <>
          <HomeGraph
            userSector={userSector}
            isadmin={isadmin}
            sectorsListData={sectorsListData}
          />
          <HomeTicketComponent isadmin={isadmin} user={user} />
        </>
      )}
    </HomeSection>
  );
}
