import { NotFoundContainer } from "./styles";

interface props {
  message?: string;
}

const NotFoundComponent = ({ message = "Nenhum dado encontrado" }: props) => {
  return (
    <NotFoundContainer>
      <p>{message}</p>
    </NotFoundContainer>
  );
};

export default NotFoundComponent;
