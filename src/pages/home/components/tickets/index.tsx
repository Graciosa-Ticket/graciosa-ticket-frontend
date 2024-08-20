import { NavLink } from "react-router-dom";
import { TicketModel } from "../../../../models/ticket";
import { TicketsHomeContainer } from "./styles";
import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { useFetch } from "../../../../services/hooks/getQuery";
import TicketCard from "../../../../components/ticket";
import { SectorCardModel } from "../../../../models/sector";
import HomeTicketsSkeleton from "./homeTicketsSkeleton";

interface HomeTicketProps {
  isadmin: boolean;
  userSector?: SectorCardModel;
}

const HomeTicketComponent = ({ isadmin, userSector }: HomeTicketProps) => {
  const [dataSource, setDataSource] = useState<TicketModel[]>([]);

  const { isLoading } = useFetch<TicketModel[]>(
    `/ticket/getLatest/latestTickets/${!isadmin ? userSector?.code : ""}`,
    ["latestTicket", isadmin, userSector?.code],
    {
      onSuccess: (data) => {
        setDataSource(data);
      },
    }
  );

  return (
    <TicketsHomeContainer $isadmin={isadmin}>
      <div className="section-title">
        <h3>Últimos tickets</h3>

        <NavLink to="/chamados" title="Ver todos os chamados">
          <AiOutlineEye />
          Ver todos
        </NavLink>
      </div>

      {isLoading ? (
        <HomeTicketsSkeleton style={{ width: "100%", height: "200px" }} />
      ) : !dataSource.length ? (
        <p>Nenhum ticket encontrado</p>
      ) : (
        <ul className="ticket-list">
          {dataSource?.slice()?.map?.((e, i) => {
            return (
              <li key={i}>
                <TicketCard data={e} />
              </li>
            );
          })}
        </ul>
      )}
    </TicketsHomeContainer>
  );
};

export default HomeTicketComponent;
