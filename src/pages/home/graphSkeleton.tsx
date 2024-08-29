import { CSSProperties } from "react";
import { SkeletonAnimation } from "../../components/skeleton";

const barArr = [0, 1, 2, 3, 4, 5]; // Número de barras no gráfico

interface SkeletonProps {
  style?: CSSProperties;
}

const GraphSkeletonLoading = ({ style }: SkeletonProps) => {
  return (
    <div
      style={{
        display: "flex",
        height: "437px",
        padding: "1em ",
        gap: 20,
        ...style,
      }}
    >
      {/* Box à Esquerda */}
      <div
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginRight: "30px", // Espaço entre o box da esquerda e o da direita
          marginLeft: "10px", // Espaço entre o box da esquerda e o da direita
        }}
      >
        <SkeletonAnimation.text style={{ width: "100%", height: "20px" }} />
        <SkeletonAnimation.text style={{ width: "100%", height: "20px" }} />
        <SkeletonAnimation.text style={{ width: "100%", height: "20px" }} />
      </div>

      {/* Base Skeleton para o Box à Direita */}
      <SkeletonAnimation.base
        $columns={1}
        style={{
          position: "relative",
          width: "100%", // Ajuste a largura para acomodar o espaçamento e padding
          height: "100%", // Ajuste a altura conforme necessário
          padding: "8px", // Padding interno
          boxSizing: "border-box", // Inclui padding e borda na largura e altura totais
        }}
      >
        {/* Box à Direita com barras alinhadas verticalmente */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            gap: 10,
            alignItems: "flex-end",
          }}
        >
          {barArr.map((_, index) => (
            <SkeletonAnimation.verticalBar
              key={index}
              style={{
                flex: 1,
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
