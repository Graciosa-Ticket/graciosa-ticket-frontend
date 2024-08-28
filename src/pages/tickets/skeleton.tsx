import { SkeletonAnimation } from "../../components/skeleton";

const arr = [0, 1, 2, 3];

const TicketSkeletonLoading = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        gridColumn: "span 4",
        gap: 20,
        marginTop: 20,
      }}
    >
      {arr.map((e) => (
        <SkeletonAnimation.base key={e} $columns={5} style={{ width: "100%" }}>
          <SkeletonAnimation.text />
          <SkeletonAnimation.text />
          <SkeletonAnimation.text />
          <SkeletonAnimation.text />
          <SkeletonAnimation.text />
        </SkeletonAnimation.base>
      ))}
    </div>
  );
};

export default TicketSkeletonLoading;
