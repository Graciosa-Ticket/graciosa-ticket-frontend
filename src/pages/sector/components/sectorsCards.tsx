import SectorCard from "../../../components/sectorCard";
import { SectorCardModel } from "../../../models/sectorCard";

const fakeSectorCardData: SectorCardModel[] = [
  {
    title: "Teste1",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel impedit est ipsa facere iusto quod tenetur consequuntur temporibus, id esse beatae dolor voluptate tempore iste mollitia error tempora cumque optio.",
  },
  {
    title: "Teste2",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel impedit est ipsa facere iusto quod tenetur consequuntur temporibus, id esse beatae dolor voluptate tempore iste mollitia error tempora cumque optio.",
  },
  {
    title: "Teste3",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel impedit est ipsa facere iusto quod tenetur consequuntur temporibus, id esse beatae dolor voluptate tempore iste mollitia error tempora cumque optio.",
  },
  {
    title: "Teste4",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel impedit est ipsa facere iusto quod tenetur consequuntur temporibus, id esse beatae dolor voluptate tempore iste mollitia error tempora cumque optio.",
  },
  {
    title: "Teste5",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel impedit est ipsa facere iusto quod tenetur consequuntur temporibus, id esse beatae dolor voluptate tempore iste mollitia error tempora cumque optio.",
  },
  {
    title: "Teste6",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel impedit est ipsa facere iusto quod tenetur consequuntur temporibus, id esse beatae dolor voluptate tempore iste mollitia error tempora cumque optio.",
  },
  {
    title: "Teste7",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel impedit est ipsa facere iusto quod tenetur consequuntur temporibus, id esse beatae dolor voluptate tempore iste mollitia error tempora cumque optio.",
  },
  {
    title: "Teste8",
    description:
      " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel impedit est ipsa facere iusto quod tenetur consequuntur temporibus, id esse beatae dolor voluptate tempore iste mollitia error tempora cumque optio.",
  },
];

const SectorCardComponent = () => {
  return (
    <ul>
      {fakeSectorCardData.map((e, i) => (
        <li key={i}>
          <SectorCard data={e} />
        </li>
      ))}
    </ul>
  );
};

export default SectorCardComponent;
