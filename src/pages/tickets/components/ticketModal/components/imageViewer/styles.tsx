import styled from "styled-components";

export const ImageViewerContainer = styled.div`
  display: grid;
  gap: 10px; /* Espaçamento entre as imagens */
  align-items: center;
  max-width: 100%; /* Ajusta a largura máxima para caber no container pai */
  cursor: pointer;
`;

export const Thumbnail = styled.img`
  width: 35px; /* Faz com que a imagem ocupe toda a largura da célula da grade */
  height: auto; /* Mantém a proporção da imagem */
  object-fit: cover;
  border-radius: 4px; /* Opcional: adiciona bordas arredondadas */
`;

export const LoadingText = styled.p`
  font-size: 16px;
  color: #666;
  grid-column: span 3; /* Faz com que o texto ocupe toda a largura da grade */
  text-align: center; /* Centraliza o texto */
`;
