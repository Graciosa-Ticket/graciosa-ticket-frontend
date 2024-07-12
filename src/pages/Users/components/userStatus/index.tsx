import { UserModel } from "../../../../models/user";
import { StatusLayout } from "./styles";

interface UserCardProps {
  data: UserModel;
}

const UserStatus = ({ data }: UserCardProps) => {
  const isActive = !data.deleted_at;

  return (
    <StatusLayout>
      <p>{isActive ? "Ativo" : "Inativo"}</p>
      <div className={`status-ball ${isActive ? "active" : "inactive"}`} />
    </StatusLayout>
  );
};

export default UserStatus;
