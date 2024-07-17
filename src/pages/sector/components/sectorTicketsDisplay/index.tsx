import { Layout } from "./styles";

interface sectorTicketsDisplayProps {
  status: boolean;
}

const sectorTicketsDisplay = ({ status }: sectorTicketsDisplayProps) => {
  return (
    <Layout>
      <p>formulario: ""  </p>
      <div className={`status-ball ${status ? "active" : "inactive"}`} />
    </Layout>
  );
};

export default sectorTicketsDisplay;
