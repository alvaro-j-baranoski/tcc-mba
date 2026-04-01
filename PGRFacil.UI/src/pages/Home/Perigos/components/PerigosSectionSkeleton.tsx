import Skeleton from "react-loading-skeleton";

export default function PerigosSectionSkeleton() {
    return (
        <Skeleton
            count={3}
            height={32}
            width={150}
            inline
            wrapper={({ children }) => <div className="flex gap-2">{children}</div>}
        />
    );
}
