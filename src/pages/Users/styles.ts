import styled from "styled-components";

export const UserContainer = styled.section`
  section {
    padding: 20px;
  }

  .user-div {
    h1 {
      font-size: 32px;
      margin-top: 10px;
      margin-bottom: 20px;
    }

    .user-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
  }

  .btn {
    background-color: #808080; /* Cor cinza */
    width: 120px;
    height: 33px;
    border: none;
    border-radius: 8px;
    box-shadow: 0px 13px 5.5px -12px rgba(0, 0, 0, 0.08);
    color: white;
    font-size: 13px;
    font-weight: 400;
    transition: background-color 0.3s ease;
    margin-right: 10px; /* Espaçamento entre os botões */
    cursor: pointer; /* Altera o cursor para indicar que o botão é clicável */
  }

  .btn:hover {
    background-color: #a9a9a9;
  }

  .btn:focus {
    background-color: #0054a4; /* Cor azul ao ser selecionado */
    outline: none; /* Remove o outline padrão */
  }
`;
