import Skeleton from "react-loading-skeleton";

export default function RiscosTableSkeleton() {
  return (
    <Skeleton
      count={10}
      height={40}
      wrapper={({ children }) => <div className="mb-4">{children}</div>}
    />
  );
}
