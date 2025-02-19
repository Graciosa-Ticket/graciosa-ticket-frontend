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
import { roleTranslation } from "../../../../utils/roleTranslation";

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

      <UserComponent
        type="button"
        onClick={() => setOpen(true)}
        title={data.name}
      >
        <div className="status-container">
          <StatusComponent status={!data?.deleted_at} />
        </div>
        <div className="header-container">
          <Avatar
            {...(data?.profile_picture && {
              src: `profile_pictures/${data?.profile_picture}`,
            })}
            alt=""
            className="user-avatar"
          />
        </div>
        <div className="userdata-container">
          <h5>
            {(() => {
              const nameParts = data.name.trim().split(" ");
              const firstName = nameParts[0];
              const lastName =
                nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
              return `${firstName} ${lastName}`;
            })()}
          </h5>

          <span>{roleTranslation[data?.role]}</span>
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
