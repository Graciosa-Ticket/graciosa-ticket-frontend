import { useState } from "react";
import Modal from "../../../../components/modal";
import { UserModel } from "../../../../models/user";
import SectorIcon from "../sectorIcon";
import UserModal from "../userModal";
import { UserComponent } from "./styles";
import HenryCalvo from "../../../../assets/henrycalvo.svg";

interface UserCardProps {
  data: UserModel;
}

const UserCard = ({ data }: UserCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal open={open} onOpenChange={() => setOpen(!open)}>
        <UserModal data={data} onClose={() => setOpen(false)} />
      </Modal>

      <UserComponent type="button" onClick={() => setOpen(true)}>
        <div className="status-container">
          <p>{data.status ? "ativo" : "inativo"}</p>
          <div
            className={`status-ball ${data.status ? "active" : "inactive"}`}
          />
        </div>
        <div className="header-container">
          <img src={HenryCalvo} alt="" className="user-avatar" />
        </div>
        <div className="userdata-container">
          <h5>{data.name.slice(0, 10) + "."}</h5>
          <span>{data.role}</span>
        </div>
        {data.role !== "Administrator" && (
          <div>
            <SectorIcon data={data} />
          </div>
        )}
      </UserComponent>
    </>
  );
};

export default UserCard;
