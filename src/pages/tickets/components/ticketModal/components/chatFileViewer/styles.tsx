import styled, { keyframes } from "styled-components";

// Define a animação de crescimento
const growAnimation = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
`;

export const ChatFileContainer = styled.div`
  margin-top: 10px;

  ul {
    display: flex; /* Alinha os itens horizontalmente */
    gap: 8px; /* Espaçamento entre os itens */
    min-width: 230px; /* Largura mínima */
    max-width: 230px; /* Largura máxima */
    overflow-x: auto; /* Permite rolagem horizontal se necessário */
    padding: 0;
    list-style: none;
  }

  li {
    display: flex;
    flex-direction: column; /* Organiza os itens na vertical */
    align-items: center;
    position: relative; /* Permite posicionar o botão "X" absolutamente */
    gap: 4px;
    border: 1px solid ${({ theme }) => theme.colors.brand.dark_blue}; /* Borda ao redor do item */
    border-radius: 4px; /* Cantos arredondados da borda */
    color: ${({ theme }) => theme.colors.brand.dark_blue};
    padding: 8px; /* Espaçamento interno */

    .file-icon {
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      ${({ theme }) => theme.font.p.extra_small};
      color: inherit;
      padding: 20px;
    }

    .file-name {
      max-width: 100px; /* Limita a largura máxima do nome do arquivo */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      ${({ theme }) => theme.font.p.extra_small};
      color: ${({ theme }) => theme.colors.brand.dark_blue};
      text-align: center;
    }

    button {
      position: absolute;
      top: 3px; /* Ajustado para posicionar mais acima */
      right: 3px; /* Ajustado para posicionar mais à direita */
      background: none; /* Remove o background padrão */
      border: none; /* Remove a borda padrão */
      cursor: pointer;
      color: ${({ theme }) => theme.colors.support.error};
      transition: transform 0.3s ease-in-out; /* Adiciona transição suave */

      &:hover {
        animation: ${growAnimation} 0.3s forwards; /* Aplica a animação ao passar o mouse */
      }
    }
  }
`;
