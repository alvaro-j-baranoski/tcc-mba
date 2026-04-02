import { Table } from "@/components/ui/table";
import "react-loading-skeleton/dist/skeleton.css";
import type { Ghe } from "../../models/Ghe";
import GheTableHeader from "./GheTableHeader";
import GheTableBody from "./GheTableBody";
import GheTableSkeleton from "./GheTableSkeleton";
import { GheActionsContext } from "../../context/GheActionsContext";
import { useContext } from "react";
import { AddEditGheDialog } from "../dialogs/AddEditGheDialog";
import { DeleteGheDialog } from "../dialogs/DeleteGheDialog";

interface Props {
    isFetching: boolean;
    ghes: Ghe[] | undefined;
}

export default function GheTable({ isFetching, ghes }: Props) {

    const { modalState } = useContext(GheActionsContext)!;

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

            {modalState?.type === "add" ? <AddEditGheDialog type="add" /> : null}
            {modalState?.type === "edit" ? <AddEditGheDialog type="edit" /> : null}
            {modalState?.type === "delete" ? <DeleteGheDialog /> : null}

        </>
    );
}
