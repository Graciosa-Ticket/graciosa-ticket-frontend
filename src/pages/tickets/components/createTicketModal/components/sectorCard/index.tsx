import Avatar from "../../../../../../components/Avatar";
import { SectorModel } from "../../../../../../models/sector";
import { SectorComponent } from "./styles";

interface sectorCardProps {
  data: SectorModel;
  onClick(data: SectorModel): void;
}

export default function SectorCard({ data, onClick }: sectorCardProps) {
  return (
    <SectorComponent onClick={() => onClick(data)}>
      <div className="header-sector">
        <h3>{data?.name}</h3>
        <div className="user-container">
          <span>{data?.user?.name}</span>

          <Avatar
            src={data?.user?.profile_picture}
            style={{ width: 30, height: 30 }}
          />
        </div>
      </div>

      <div className="description-section">
        <h6>Descrição</h6>
        <p>{data?.description}</p>
      </div>
    </SectorComponent>
  );
}
