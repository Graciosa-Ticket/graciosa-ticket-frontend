import { CSSProperties } from "react";
import { SkeletonAnimation } from "../../../../components/skeleton";

interface SkeletonProps {
  style?: CSSProperties;
}

const HomeTicketsSkeleton = ({ style }: SkeletonProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", ...style }}>
      <SkeletonAnimation.base style={{ width: "100%", height: "100px" }}>
        <SkeletonAnimation.text style={{ width: "100%", height: "20px" }} />
        <SkeletonAnimation.text style={{ width: "100%", height: "30px" }} />
      </SkeletonAnimation.base>
    </div>
  );
};

export default HomeTicketsSkeleton;
