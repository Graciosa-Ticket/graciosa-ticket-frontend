import styled from "styled-components";

export const UserContainer = styled.section`
 .user-header{
   margin: 10px 0 20px;
display:flex;
align-items:center;
gap:1em;

h1 {
   ${({theme}) => theme.font.h1}; 
}
 }

    .user-cards {
      margin-top:2em;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
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


&.selected{
    background-color: ${({theme}) => theme.colors.brand.blue}; 
}


&:hover {
    background-color: #a9a9a9;
  }

  &:focus {
    background-color: #0054a4; /* Cor azul ao ser selecionado */
    outline: none; /* Remove o outline padrão */
  }

  }

  
`;
