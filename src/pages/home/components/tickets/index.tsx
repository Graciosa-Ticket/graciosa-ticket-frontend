import { NavLink } from "react-router-dom";
import TicketCard from "../../../../components/ticket";
import { TicketModel } from "../../../../models/ticket";
import { TicketsHomeContainer } from "./styles";
import { AiOutlineEye } from "react-icons/ai";

const fakeTicketData: Partial<TicketModel>[] = [
  {
    created_at: new Date(),
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel impedit est ipsa facere iusto quod tenetur consequuntur temporibus, id esse beatae dolor voluptate tempore iste mollitia error tempora cumque optio.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel impedit est ipsa facere iusto quod tenetur consequuntur temporibus, id esse beatae dolor voluptate tempore iste mollitia error tempora cumque optio.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel impedit est ipsa facere iusto quod tenetur consequuntur temporibus, id esse beatae dolor voluptate tempore iste mollitia error tempora cumque optio.",
    status: "Em andamento",
    title: "Teste",
  },
  {
    created_at: new Date(),
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel impedit est ipsa facere iusto quod tenetur consequuntur temporibus, id esse beatae dolor voluptate tempore iste mollitia error tempora cumque optio.",
    status: "Concluído",
    title: "AAAAA",
  },
  {
    created_at: new Date(),
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel impedit est ipsa facere iusto quod tenetur consequuntur temporibus, id esse beatae dolor voluptate tempore iste mollitia error tempora cumque optio.",
    status: "Concluído",
    title: "CCCCCC",
  },
];

const HomeTicketComponent = () => {
  return (
    <TicketsHomeContainer>
      <div className="section-title">
        <h3>Últimos tickets</h3>

        <NavLink to="/chamados">
          <AiOutlineEye />
          Ver todos
        </NavLink>
      </div>

      <ul className="ticket-list">
        {fakeTicketData.map((e, i) => (
          <li key={i}>
            <TicketCard data={e} />
          </li>
        ))}
      </ul>
    </TicketsHomeContainer>
  );
};

export default HomeTicketComponent;
