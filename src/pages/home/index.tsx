import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import { SectorCardModel } from "../../models/sector";
import { useFetch } from "../../services/hooks/getQuery";
import HomeGraph from "./components/graphs";
import HomeSector from "./components/sectors";
import HomeTicketComponent from "./components/tickets";
import { HomeSection } from "./styles";

export default function Home() {
  const { user } = useAuth();
  const [sectorsListData, setSectorListData] = useState<SectorCardModel[]>([]);
  const isadmin = user.role === "Administrator";

  useFetch<SectorCardModel[]>("/sectors", ["sectorsListData"], {
    onSuccess: (data) => {
      setSectorListData(data);
    },
  });

  const userSector = sectorsListData?.length
    ? sectorsListData?.find((data) => data.user.code === user.code)
    : undefined;
  // console.log("auqqeiqwe" + JSON.stringify(userSector, null, 2)); //add for debuggin

  return (
    <HomeSection $isadmin={isadmin}>
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
          <HomeTicketComponent
            isadmin={isadmin}
            user={user}
            userSector={userSector}
          />
        </>
      )}
    </HomeSection>
  );
}
