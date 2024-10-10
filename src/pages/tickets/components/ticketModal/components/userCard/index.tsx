import { useState } from "react";
import { TicketUserButton } from "./styles";
import { useAuth } from "../../../../../../hooks/auth";
import Modal from "../../../../../../components/modal";
import { UserModel } from "../../../../../../models/user";
import UserViewModal from "../../../../../../components/userModal";
import UserModal from "../../../../../Users/components/userModal";
import Avatar from "../../../../../../components/Avatar";
import { api } from "../../../../../../services/api.service";

interface ticketUserCardProps {
  data: UserModel;
}

const TicketUserCard = ({ data }: ticketUserCardProps) => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<UserModel>();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const onOpenModal = async () => {
    setLoading(true);
    try {
      const { data: res } = await api.get(`users/${data?.code}`);
      setModalData({ ...res, ...data });
      setOpen(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal open={open} onOpenChange={() => setOpen(!open)}>
        {user?.code === data?.code ? (
          <UserViewModal
            onClose={() => setOpen(false)}
            onUpdate={() => {
              setOpen(false);
            }}
          />
        ) : (
          <UserModal
            data={modalData}
            onClose={() => setOpen(false)}
            onUpdate={() => {
              setOpen(false);
            }}
          />
        )}
      </Modal>
      <TicketUserButton
        buttonStyles="text"
        onClick={onOpenModal}
        isLoading={loading}
      >
        <Avatar
          {...(data?.profile_picture && {
            src: `profile_pictures/${data?.profile_picture}`,
          })}
          alt=""
          className="user-avatar"
        />
        <span>{data?.name?.slice(0, 10) + "."}</span>
      </TicketUserButton>
    </>
  );
};

export default TicketUserCard;
