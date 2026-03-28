import { Table } from "@/components/ui/table";
import "react-loading-skeleton/dist/skeleton.css";
import type { Ghe } from "../../models/Ghe";
import GheTableHeader from "./GheTableHeader";
import GheTableBody from "./GheTableBody";
import GheTableSkeleton from "./GheTableSkeleton";

interface Props {
  isFetching: boolean;
  ghes: Ghe[] | undefined;
}

export default function GheTable({ isFetching, ghes }: Props) {
  return (
    <>
      {isFetching ? (
        <GheTableSkeleton />
      ) : (
        <Table className="w-full text-left border-collapse">
          <GheTableHeader />
          <GheTableBody ghes={ghes} />
        </Table>
      )}
    </>
  );
}
