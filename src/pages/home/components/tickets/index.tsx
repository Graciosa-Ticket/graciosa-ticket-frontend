import { NavLink } from "react-router-dom";
import { TicketModel } from "../../../../models/ticket";
import { TicketsHomeContainer } from "./styles";
import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { useFetch } from "../../../../services/hooks/getQuery";
import TicketCard from "../../../../components/ticket";
import { UserModel } from "../../../../models/user";
import { SectorCardModel } from "../../../../models/sector";

interface HomeTicketProps {
  isadmin: boolean;
  user?: UserModel;
  userSector?: SectorCardModel;
}

const HomeTicketComponent = ({ isadmin, user }: HomeTicketProps) => {
  const [dataSource, setDataSource] = useState<TicketModel[]>([]);
  if (isadmin) {
    useFetch<TicketModel[]>(
      "/ticket/getLatest/latestTickets",
      ["latestTicket"],
      {
        onSuccess: (data) => {
          setDataSource(data);
        },
      }
    );
  } else {
    useFetch<TicketModel[]>(
      `/ticket/getLatest/latestTickets/1`,
      ["latestTicket"],
      {
        onSuccess: (data) => {
          setDataSource(data);
        },
      }
    );
  }

  return (
    <TicketsHomeContainer $isadmin={isadmin}>
      <div className="section-title">
        <h3>Últimos tickets</h3>

        <NavLink to="/chamados" title="Ver todos os chamados">
          <AiOutlineEye />
          Ver todos
        </NavLink>
      </div>

      <ul className="ticket-list">
        {dataSource
          .slice()
          .reverse()
          .filter((ticket) =>
            isadmin ? true : ticket.sector.responsible_code === user?.code
          )
          .map((e, i) => (
            <li key={i}>
              <TicketCard data={e} />
            </li>
          ))}
      </ul>
    </TicketsHomeContainer>
  );
};

export default HomeTicketComponent;
