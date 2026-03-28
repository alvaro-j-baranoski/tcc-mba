import { QueryKeys } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { HomeSection } from "@/pages/Home/HomeSection";
import type { Ghe } from "../models/Ghe";
import { GheService } from "../services/GheService";
import { AddEditGheDialog } from "./dialogs/AddEditGheDialog";
import { DeleteGheDialog } from "./dialogs/DeleteGheDialog";
import { GheSectionHeader } from "./GheSectionHeader";
import GheTable from "./table/GheTable";
import { GheActionsContext } from "../context/GheActionsContext";

export default function GheSection() {
  const [targetGhe, setTargetGhe] = useState<Ghe | null>(null);
  const [deleteDialogControlledOpen, setDeleteDialogControlledOpen] =
    useState(false);
  const [editDialogControlledOpen, setEditDialogControlledOpen] =
    useState(false);
  const [addDialogControlledOpen, setAddDialogControlledOpen] = useState(false);

  const { data, isFetching } = useQuery({
    queryKey: [QueryKeys.GetGhes],
    queryFn: GheService.getGhes,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const gheActions = {
    onAdd: () => setAddDialogControlledOpen(true),
    onEdit: (ghe: Ghe) => {
      setTargetGhe(ghe);
      setEditDialogControlledOpen(true);
    },
    onDelete: (ghe: Ghe) => {
      setTargetGhe(ghe);
      setDeleteDialogControlledOpen(true);
    },
  };

  return (
    <GheActionsContext.Provider value={gheActions}>
      <HomeSection>
        <GheSectionHeader disabled={isFetching} />

        <GheTable isFetching={isFetching} ghes={data?.data} />

        {deleteDialogControlledOpen ? (
          <DeleteGheDialog
            controlledOpen={deleteDialogControlledOpen}
            setControlledOpen={setDeleteDialogControlledOpen}
            ghe={targetGhe!}
          />
        ) : null}
        {addDialogControlledOpen ? (
          <AddEditGheDialog
            controlledOpen={addDialogControlledOpen}
            setControlledOpen={setAddDialogControlledOpen}
            isEdit={false}
          />
        ) : null}
        {editDialogControlledOpen ? (
          <AddEditGheDialog
            controlledOpen={editDialogControlledOpen}
            setControlledOpen={setEditDialogControlledOpen}
            isEdit={true}
            ghe={targetGhe!}
          />
        ) : null}
      </HomeSection>
    </GheActionsContext.Provider>
  );
}
