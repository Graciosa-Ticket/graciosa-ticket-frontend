import { CSSProperties } from "react";
import { SkeletonAnimation } from "../../components/skeleton";

const arr = [0, 1, 2, 3];

interface skeletonProps {
  style?: CSSProperties;
}

const SectorSkeletonLoading = ({ style }: skeletonProps) => {
  return (
    <div style={{ display: "flex", gridColumn: "span 2", gap: 20, ...style }}>
      {arr.map((e) => (
        <SkeletonAnimation.base key={e} $columns={1} style={{ width: "200px" }}>
          <SkeletonAnimation.base
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 0,
            }}
          >
            <SkeletonAnimation.text />
            <SkeletonAnimation.card
              style={{
                width: 10,
                height: 10,
                margin: "0 auto",
                borderRadius: 99,
              }}
            />
          </SkeletonAnimation.base>
          <SkeletonAnimation.text />
          <SkeletonAnimation.text />
          <SkeletonAnimation.text />
        </SkeletonAnimation.base>
      ))}
    </div>
  );
};

export default SectorSkeletonLoading;
