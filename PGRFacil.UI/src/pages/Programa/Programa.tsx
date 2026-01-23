import { AppHeader } from "@/components/AppHeader/AppHeader";
import { AddEditRiscoDialog } from "@/components/dialogs/AddEditRiscoDialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { QueryKeys } from "@/lib/utils";
import { ProgramsService } from "@/services/ProgramasService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ProgramaBackButton from "./components/ProgramaBackButton";
import ProgramaTitle from "./components/ProgramaTitle";
import ProgramaVersion from "./components/ProgramaVersion";
import ProgramaRiscosCadastrados from "./components/ProgramaRiscosCadastrados";
import ProgramaAtualizadoEm from "./components/ProgramaAtualizadoEm";
import RiscosTabela from "./components/RiscosTabela";
import { RisksService } from "@/services/RisksService";

export default function Programa() {
  const { programaGuid } = useParams<{ programaGuid: string }>();
  const [addDialogControlledOpen, setAddDialogControlledOpen] = useState(false);
  const { isUserEditor } = useAuth();

  const { data: programaData } = useQuery({
    queryKey: [QueryKeys.GetProgramaByID(programaGuid!)],
    queryFn: ProgramsService.getProgramByID.bind(null, programaGuid ?? ""),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { data: riscosData } = useQuery({
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
          <ProgramaBackButton />
          <div className="flex flex-col gap-3">
            <ProgramaTitle programaName={programaData?.data?.name} />

            <div className="flex items-center gap-3 text-sm text-gray-500 pb-6">
              <ProgramaVersion version={programaData?.data?.version} />
              <span className="text-gray-300">•</span>
              <ProgramaRiscosCadastrados
                numberOfRisks={riscosData?.data?.length}
              />
              <span className="text-gray-300">•</span>
              <ProgramaAtualizadoEm updatedOn={programaData?.data?.updatedOn} />
              {isUserEditor && (
                <Button onClick={handleOnAddButtonPressed} className="ml-auto">
                  <FaPlus />
                  <span>Adicionar Risco</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        <RiscosTabela programaGuid={programaGuid} riscosData={riscosData} />

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
