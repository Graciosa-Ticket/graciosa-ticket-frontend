import { StatusLayout } from "./styles";

interface StatusComponentProps {
  status: boolean;
}

const StatusComponent = ({ status }: StatusComponentProps) => {
  return (
    <StatusLayout>
      <p>{status ? "Ativo" : "Inativo"}</p>
      <div className={`status-ball ${status ? "active" : "inactive"}`} />
    </StatusLayout>
  );
};

export default StatusComponent;
