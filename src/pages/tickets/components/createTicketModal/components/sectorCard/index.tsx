import Avatar from "../../../../../../components/Avatar";
import { SectorCardModel } from "../../../../../../models/sector";
import { SectorComponent } from "./styles";

interface sectorCardProps {
  data: SectorCardModel;
  onClick(data: SectorCardModel): void;
}
export default function SectorCard({ data, onClick }: sectorCardProps) {
  return (
    <SectorComponent onClick={() => onClick(data)} title={data?.name}>
      <div className="header-sector">
        <h3>{data?.name}</h3>
        <div className="user-container">
          <Avatar
            {...(data?.user?.profile_picture && {
              src: `profile_pictures/${data?.user?.profile_picture}`,
            })}
            style={{ width: 30, height: 30 }}
          />
          <span>{data?.user?.name}</span>
        </div>
      </div>

      <div className="description-section">
        <h6>Descrição</h6>
        <p title={data?.description}>{data?.description}</p>
      </div>
    </SectorComponent>
  );
}
