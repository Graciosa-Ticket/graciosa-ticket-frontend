import { useState } from "react";
import Modal from "../../../../components/modal";
import { UserModel } from "../../../../models/user";
import Avatar from "../../../../components/Avatar";
import { useAuth } from "../../../../hooks/auth";
import UserViewModal from "../../../../components/userModal";
import { SelectUserContainer } from "./styles";
import UserModal from "../../../../pages/Users/components/userModal";

interface UserCardProps {
  data: UserModel;
  refetch: () => void;
}

const SectorUserSelect = ({ data, refetch }: UserCardProps) => {
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

      <SelectUserContainer buttonStyles="text" onClick={() => setOpen(true)}>
        <div className="header-container">
          <Avatar src={data?.profile_picture} alt="" className="user-avatar" />
        </div>
        <div className="userdata-container">
          <h5>{data.name.slice(0, 10) + "."}</h5>
        </div>
      </SelectUserContainer>
    </>
  );
};

export default SectorUserSelect;
