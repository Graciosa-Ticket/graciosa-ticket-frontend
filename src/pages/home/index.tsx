import { useState, useEffect } from "react";
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
  const [userSector, setUserSector] = useState<SectorCardModel | undefined>(
    undefined
  );
  const isadmin = user.role === "Administrator";

  useFetch<SectorCardModel[]>("/sectors", ["sectorsListData"], {
    onSuccess: (data) => {
      setSectorListData(data);
    },
  });

  useEffect(() => {
    if (sectorsListData.length > 0) {
      const sector = sectorsListData.find(
        (data) => data.responsible_code === user.code
      );
      setUserSector(sector);
    }
  }, [sectorsListData, user.code]);

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
          {userSector && (
            <HomeTicketComponent isadmin={isadmin} userSector={userSector} />
          )}
        </>
      )}
    </HomeSection>
  );
}
