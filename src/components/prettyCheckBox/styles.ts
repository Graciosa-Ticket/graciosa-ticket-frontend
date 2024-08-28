import styled from "styled-components";
import * as Checkbox from "@radix-ui/react-checkbox";

const errorColor = ({ theme }: any) => theme.colors.alert_failure;

interface ContainerProps {
  maxWidth?: number;
  readonly?: boolean;
  disabled?: boolean;
}

export const PrettyContainer = styled.div<ContainerProps>`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 12px;
  pointer-events: ${(prop) => (prop.readonly || prop.disabled) && "none"};

  label {
    cursor: pointer;
    display: block;
    ${({ theme }) => theme.font.p.small};
    color: ${({ theme }) => theme.colors.brand.dark_blue};
  }

  p {
    color: ${errorColor};
    ${({ theme }) => theme.font.p.small}
  }
`;

export const PrettyCheckboxRoot = styled(Checkbox.Root)`
  width: 20px; /* Aumentado para um estilo mais visível */
  height: 20px; /* Aumentado para um estilo mais visível */
  border: solid 2px ${({ theme }) => theme.colors.brand.blue}; /* Borda azul */
  border-radius: 4px; /* Bordas mais arredondadas para um visual diferente */
  background: transparent; /* Fundo transparente para mostrar a borda interna */
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: border-color 0.3s; /* Correção da sintaxe de transição */

  /* Pseudo-elemento para criar o fundo interno */
  &:before {
    content: "";
    position: absolute;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background: ${({ theme }) =>
      theme.colors.brand.white}; /* Fundo branco interno */
    border-radius: 2px; /* Bordas internas arredondadas */
    transition: border-color 0.3s; /* Transição para o fundo interno */
  }

  /* Estilos quando selecionado */
  &[aria-checked="true"] {
    border-color: ${({ theme }) =>
      theme.colors.brand.blue}; /* Borda azul quando selecionado */

    &:before {
      background: ${({ theme }) =>
        theme.colors.brand.blue}; /* Fundo azul interno */
    }
  }
`;

export const PrettyCheckboxIndicator = styled(Checkbox.Indicator)`
  color: ${({ theme }) =>
    theme.colors.brand.white}; /* Cor do ícone quando selecionado */
  display: flex;
  align-items: center;
  justify-content: center;
  /* Remover o ícone padrão */
  svg {
    display: none;
  }
`;
