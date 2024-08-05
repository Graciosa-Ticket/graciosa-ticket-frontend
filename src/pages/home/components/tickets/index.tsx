import { NavLink } from "react-router-dom";
import { TicketModel } from "../../../../models/ticket";
import { TicketsHomeContainer } from "./styles";
import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { useFetch } from "../../../../services/hooks/getQuery";
import TicketCard from "../../../../components/ticket";
import { UserModel } from "../../../../models/user";

interface HomeTicketProps {
  isadmin: boolean;
  user?: UserModel;
}

const HomeTicketComponent = ({ isadmin, user }: HomeTicketProps) => {
  const [dataSource, setDataSource] = useState<TicketModel[]>([]);

  useFetch<TicketModel[]>("/ticket", ["ticket"], {
    onSuccess: (data) => {
      setDataSource(data);
    },
  });

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
