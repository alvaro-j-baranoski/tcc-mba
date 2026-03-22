import { AppHeader } from "@/components/AppHeader/AppHeader";
import { AddEditRiscoDialog } from "@/components/dialogs/AddEditRiscoDialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { QueryKeys } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import BackButton from "./components/BackButton";
import GheTitle from "./components/GheTitle";
import GheVersion from "./components/GheVersion";
import GheNumberOfRiscos from "./components/GheNumberOfRiscos";
import GheUpdatedOn from "./components/GheUpdatedOn";
import RiscosTable from "./components/RiscosTable";
import { RisksService } from "@/services/RisksService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { GheService } from "../Home/Ghe/services/GheService";

export default function Programa() {
  const { programaGuid } = useParams<{ programaGuid: string }>();
  const [addDialogControlledOpen, setAddDialogControlledOpen] = useState(false);
  const { isUserEditor } = useAuth();

  const { data: programaData } = useQuery({
    queryKey: [QueryKeys.GetProgramaByID(programaGuid!)],
    queryFn: GheService.getProgramByID.bind(null, programaGuid ?? ""),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { data: riscosData, isFetching: isRiscosDataFetching } = useQuery({
    queryKey: [QueryKeys.GetRiscos(programaGuid!)],
    queryFn: RisksService.getRisks.bind(null, programaGuid ?? ""),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const handleOnAddButtonPressed = () => {
    setAddDialogControlledOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <AppHeader />
      <div className="flex min-h-svh flex-col my-8 mx-8">
        <div className="space-y-6">
          <BackButton />
          <div className="flex flex-col gap-3">
            <GheTitle programaName={programaData?.data?.nome} />

            <div className="flex items-center gap-3 text-sm text-gray-500 pb-6">
              <GheVersion version={programaData?.data?.versao} />
              <span className="text-gray-300">•</span>
              <GheNumberOfRiscos
                numberOfRiscos={riscosData?.data?.length}
              />
              <span className="text-gray-300">•</span>
              <GheUpdatedOn updatedOn={programaData?.data?.atualizadoEm} />
              {isUserEditor && (
                <Button onClick={handleOnAddButtonPressed} className="ml-auto">
                  <FaPlus />
                  <span>Adicionar Risco</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        {!isRiscosDataFetching ? (
          <RiscosTable programaGuid={programaGuid} riscosData={riscosData} />
        ) : (
          <Skeleton
            count={10}
            height={40}
            wrapper={({ children }) => <div className="mb-4">{children}</div>}
          />
        )}

        {addDialogControlledOpen ? (
          <AddEditRiscoDialog
            controlledOpen={addDialogControlledOpen}
            setControlledOpen={setAddDialogControlledOpen}
            isEdit={false}
            programaGuid={programaGuid ?? ""}
          />
        ) : null}
      </div>
    </div>
  );
}
