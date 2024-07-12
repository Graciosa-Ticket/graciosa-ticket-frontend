import { SkeletonAnimation } from "../../components/skeleton";

const arr = [0, 1, 2, 3];

const UserSkeletonLoading = () => {
  return (
    <div style={{ display: "flex", gridColumn: "span 4", gap: 20 }}>
      {arr.map((e) => (
        <SkeletonAnimation.base key={e} $columns={1} style={{ width: "200px" }}>
          <SkeletonAnimation.card
            style={{
              width: 90,
              height: 90,
              margin: "0 auto",
              borderRadius: 99,
            }}
          />
          <SkeletonAnimation.text />
          <SkeletonAnimation.text />
        </SkeletonAnimation.base>
      ))}
    </div>
  );
};

export default UserSkeletonLoading;
