import TicketCard from "../../../components/ticket";
import { TicketModel } from "../../../models/ticket";

const fakeTicketData: TicketModel[] = [
  {
    date: new Date(),
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel impedit est ipsa facere iusto quod tenetur consequuntur temporibus, id esse beatae dolor voluptate tempore iste mollitia error tempora cumque optio.",
    status: "Andamento",
    title: "Teste",
  },
  {
    date: new Date(),
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel impedit est ipsa facere iusto quod tenetur consequuntur temporibus, id esse beatae dolor voluptate tempore iste mollitia error tempora cumque optio.",
    status: "Concluído",
    title: "AAAAA",
  },
  {
    date: new Date(),
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel impedit est ipsa facere iusto quod tenetur consequuntur temporibus, id esse beatae dolor voluptate tempore iste mollitia error tempora cumque optio.",
    status: "Concluído",
    title: "CCCCCC",
  },
];

const HomeTicketComponent = () => {
  return (
    <ul>
      {fakeTicketData.map((e, i) => (
        <li key={i}>
          <TicketCard data={e} />
        </li>
      ))}
    </ul>
  );
};

export default HomeTicketComponent;
