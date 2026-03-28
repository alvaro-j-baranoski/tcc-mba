import { Table } from "@/components/ui/table";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import type { Ghe } from "../../models/Ghe";
import GheTableHeader from "./GheTableHeader";
import GheTableBody from "./GheTableBody";

interface Props {
  isFetching: boolean;
  ghes: Ghe[];
}

export default function GheTable({ isFetching, ghes }: Props) {
  return (
    <>
      {isFetching ? (
        <Skeleton
          count={10}
          height={40}
          wrapper={({ children }) => <div className="mb-4">{children}</div>}
        />
      ) : (
        <Table className="w-full text-left border-collapse">
          <GheTableHeader />
          <GheTableBody ghes={ghes} />
        </Table>
      )}
    </>
  );
}
