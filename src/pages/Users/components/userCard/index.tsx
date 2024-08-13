import { useState } from "react";
import Modal from "../../../../components/modal";
import { UserModel } from "../../../../models/user";
import SectorIcon from "../sectorIcon";
import UserModal from "../userModal";
import { UserComponent } from "./styles";
import Avatar from "../../../../components/Avatar";
import { useAuth } from "../../../../hooks/auth";
import UserViewModal from "../../../../components/userModal";
import StatusComponent from "../Status";

interface UserCardProps {
  data: UserModel;
  refetch: () => void;
}

const UserCard = ({ data, refetch }: UserCardProps) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <Modal open={open} onOpenChange={() => setOpen(!open)}>
        {user?.code === data?.code ? (
          <UserViewModal
            onClose={() => setOpen(false)}
            onUpdate={() => {
              setOpen(false);
              refetch();
            }}
          />
        ) : (
          <UserModal
            data={data}
            onClose={() => setOpen(false)}
            onUpdate={() => {
              setOpen(false);
              refetch();
            }}
          />
        )}
      </Modal>

      <UserComponent type="button" onClick={() => setOpen(true)}>
        <div className="status-container">
          <StatusComponent status={!data?.deleted_at} />
        </div>
        <div className="header-container">
          <Avatar
            src={`profile-picture/${data?.code}/regularSize_${data?.profile_picture}`}
            alt=""
            className="user-avatar"
          />
        </div>
        <div className="userdata-container">
          <h5>{data.name.slice(0, 10) + "."}</h5>
          <span>{data?.role}</span>
        </div>
        {data?.role !== "Administrator" && (
          <div>
            <SectorIcon data={data} />
          </div>
        )}
      </UserComponent>
    </>
  );
};

export default UserCard;
