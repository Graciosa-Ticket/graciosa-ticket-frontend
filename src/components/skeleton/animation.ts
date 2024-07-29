import styled, { css, keyframes } from "styled-components";

const skeletonLoading = keyframes`
 to {
    background-position-x: -20%;
  }
`;

export const skeletonAnim = css`
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 900;
  font-size: 32px;
  background-color: ${({ theme }) => theme.colors.animation.skeleton_base};
  background: ${({
    theme,
  }) => `linear-gradient(100deg, ${theme.colors.animation.skeleton_100} 40%,
      ${theme.colors.animation.skeleton_50} 50%,
      ${theme.colors.animation.skeleton_100} 60%
    )
    ${theme.colors.animation.skeleton_base}`};
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: ${skeletonLoading} 1s infinite;
`;

interface skeletonTextProps {
  size?: "small" | "medium" | "large";
}

export const SkeletonTextComponent = styled.div<skeletonTextProps>`
  width: 100%;
  position: relative;
  border-radius: 0.2em;
  overflow: hidden;

  &:after {
    ${skeletonAnim}
  }

  ${({ size }) => {
    if (size === "small") {
      return css`
        padding: 0.4em 0.8em;
      `;
    }
    if (size === "large") {
      return css`
        padding: 1.3em 32px;
      `;
    }
    return css`
      padding: 0.7em 1.3em;
    `;
  }}
`;

interface skeletonCardProps {
  size?: "small" | "medium" | "large";
  shape?: "rect" | "square" | "circle";
  $columns?: number;
  $rows?: number;
}

export const SkeletonCardComponent = styled.div<skeletonCardProps>`
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;

  &:after {
    ${skeletonAnim}
  }

  ${({ size }) => {
    if (size === "small") {
      return css`
        padding: 0.7em 0.8em;
      `;
    }
    if (size === "large") {
      return css`
        padding: 20px 32px;
      `;
    }
    return css`
      padding: 0.9em 1.2em;
    `;
  }}

  ${({ shape }) => {
    if (shape === "square") {
      return css`
        aspect-ratio: 1/1;
        border-radius: 0.7em;
      `;
    }
    if (shape === "circle") {
      return css`
        aspect-ratio: 1/1;
        border-radius: 999px;
      `;
    }

    return css`
      border-radius: 0.8em;
    `;
  }}
`;

export const SkeletonBaseCardComponent = styled.div<skeletonCardProps>`
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
  display: grid;
  background-color: ${({ theme }) => theme.colors.animation.skeleton_bg};
  gap: 0.7em;

  ${({ $columns, $rows }) => {
    return css`
      grid-template-columns: repeat(${$columns}, 1fr);
      grid-template-rows: repeat(${$rows}, 1fr);
    `;
  }}

  ${({ size }) => {
    if (size === "small") {
      return css`
        padding: 0.7em 0.8em;
      `;
    }
    if (size === "large") {
      return css`
        padding: 20px 32px;
      `;
    }
    return css`
      padding: 0.9em 1.2em;
    `;
  }}

  ${({ shape }) => {
    if (shape === "square") {
      return css`
        aspect-ratio: 1/1;
        border-radius: 0.7em;
      `;
    }
    if (shape === "circle") {
      return css`
        aspect-ratio: 1/1;
        border-radius: 999px;
      `;
    }

    return css`
      border-radius: 0.8em;
    `;
  }}
`;
