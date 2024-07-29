import { NavLink } from "react-router-dom";
import { TicketModel } from "../../../../models/ticket";
import { TicketsHomeContainer } from "./styles";
import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { useFetch } from "../../../../services/hooks/getQuery";
import TicketCard from "../../../../components/ticket";

const HomeTicketComponent = () => {
  const [dataSource, setDataSource] = useState<TicketModel[]>([]);

  const {} = useFetch<TicketModel[]>("/ticket", ["ticket"], {
    onSuccess: (data) => {
      setDataSource(data);
    },
    onError: (error) => {},
  });

  return (
    <TicketsHomeContainer>
      <div className="section-title">
        <h3>Últimos tickets</h3>

        <NavLink to="/chamados" title="Ver todos os chamados">
          <AiOutlineEye />
          Ver todos
        </NavLink>
      </div>

      <ul className="ticket-list">
        {dataSource.map((e, i) => (
          <li key={i}>
            <TicketCard data={e} />
          </li>
        ))}
      </ul>
    </TicketsHomeContainer>
  );
};

export default HomeTicketComponent;
