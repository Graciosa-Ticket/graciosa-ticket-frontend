import { CSSProperties } from "react";
import { SkeletonAnimation } from "../../components/skeleton";

const barArr = [0, 1, 2, 3, 4]; // Número de barras no gráfico

interface SkeletonProps {
  style?: CSSProperties;
}

const GraphSkeletonLoading = ({ style }: SkeletonProps) => {
  return (
    <div style={{ display: "flex", gap: 20, ...style }}>
      {/* Box à Esquerda */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "150px",
          marginRight: "300px", // Espaço entre o box da esquerda e o da direita
          marginLeft: "100px", // Espaço entre o box da esquerda e o da direita
        }}
      >
        <SkeletonAnimation.text style={{ width: "100%", height: "20px" }} />
        <SkeletonAnimation.text style={{ width: "100%", height: "20px" }} />
        <SkeletonAnimation.text style={{ width: "100%", height: "20px" }} />
      </div>

      {/* Base Skeleton para o Box à Direita */}
      <SkeletonAnimation.base
        $columns={barArr.length}
        style={{
          position: "relative",
          width: `calc(${barArr.length * 50}px + ${
            barArr.length - 1
          } * 10px + 16px)`, // Ajuste a largura para acomodar o espaçamento e padding
          height: "200px", // Ajuste a altura conforme necessário
          padding: "8px", // Padding interno
          boxSizing: "border-box", // Inclui padding e borda na largura e altura totais
        }}
      >
        {/* Box à Direita com barras alinhadas verticalmente */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            height: "100%",
            alignItems: "flex-end",
          }}
        >
          {barArr.map((_, index) => (
            <SkeletonAnimation.verticalBar
              key={index}
              style={{
                width: "50px",
                height: "100%", // Ajuste a altura para preencher a altura da base
              }}
            />
          ))}
        </div>
      </SkeletonAnimation.base>
    </div>
  );
};

export default GraphSkeletonLoading;
