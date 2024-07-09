import { SectorComponent } from "./styles";
import HenryCalvo from "../../assets/henrycalvo.svg";
import { SectorCardModel } from "../../models/sector";

interface sectorCardProps {
  data: SectorCardModel;
}

export default function SectorCard({ data }: sectorCardProps) {
  return (
    <SectorComponent>
      <section>
        <div className="all-sector">
          <div className="header-sector">
            <h3>{`${data.name} ${data.code}`}</h3>
            <img src={HenryCalvo} />
          </div>

          <div className="p-sector">
            <p>Lorem Ipsum</p>
            <p>35</p>
            <p>Lorem Ipsum</p>
            <p>35</p>
            <p>Lorem Ipsum</p>
            <p>35</p>
            <p>Lorem Ipsum</p>
            <p>35</p>
          </div>

          <h2>Lorem Ipsum</h2>
          <p>{data?.description}</p>
        </div>
      </section>
    </SectorComponent>
  );
}
