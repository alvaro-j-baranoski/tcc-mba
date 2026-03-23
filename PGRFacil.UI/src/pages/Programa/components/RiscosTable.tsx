import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { invalidateQueriesForUpdatesOnRisco } from "@/lib/riscoUtils";
import { mapNivelSignificancia } from "@/lib/utils";
import { AgentesDeRisco } from "@/models/AgentesDeRisco";
import type { Risco } from "@/pages/Programa/models/Risco";
import type { RiscosFilter } from "@/pages/Programa/models/RiscosFilter";
import { RiscosService } from "@/pages/Programa/services/RiscosService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { AddEditRiscoDialog } from "./AddEditRiscoDialog";
import { PlanoDeAcaoDialog } from "./AddEditPlanoDeAcaoDialog";
import { FilterableHeader } from "./FilterableHeader";

interface Props {
  gheId?: string;
  riscosData?: Risco[] | undefined;
  filters: RiscosFilter;
  onFiltersChange: (filters: RiscosFilter) => void;
}

export default function RiscosTable({ gheId, riscosData, filters, onFiltersChange }: Props) {
  const [targetRisco, setTargetRisco] = useState<Risco | null>(null);
  const [editDialogControlledOpen, setEditDialogControlledOpen] = useState(false);
  const [planoDialogOpen, setPlanoDialogOpen] = useState(false);
  const { isUserEditor } = useAuth();
  const queryClient = useQueryClient();

  const updateFilter = (patch: Partial<RiscosFilter>) => {
    onFiltersChange({ ...filters, ...patch });
  };

  const clearFilter = (...keys: (keyof RiscosFilter)[]) => {
    const next = { ...filters };
    for (const k of keys) delete next[k];
    onFiltersChange(next);
  };

  const hasFilter = (...keys: (keyof RiscosFilter)[]) =>
    keys.some((k) => filters[k] !== undefined && filters[k] !== "");

  const handleSort = (sortBy: string, sortDirection: "asc" | "desc") => {
    onFiltersChange({
      ...filters,
      sortBy: sortBy || undefined,
      sortDirection: sortBy ? sortDirection : undefined,
    });
  };

  const handleOnEditButtonPressed = (risco: Risco) => {
    setTargetRisco(risco);
    setEditDialogControlledOpen(true);
  };

  const handleOnDeleteButtonPressed = (risco: Risco) => {
    deleteMutate({ gheId: gheId ?? "", riscoId: risco.id });
  };

  const handleOnAddPlanoPressed = (risco: Risco) => {
    setTargetRisco(risco);
    setPlanoDialogOpen(true);
  };

  const handleOnDeleteSuccess = () => {
    invalidateQueriesForUpdatesOnRisco(queryClient, gheId!);
  };

  const { mutate: deleteMutate } = useMutation({
    mutationFn: RiscosService.deleteRisco,
    onSuccess: handleOnDeleteSuccess,
  });

  const getSignificanciaBadgeColor = (significancia: string) => {
    switch (significancia) {
      case "Baixo":
        return "bg-green-600 text-white hover:bg-green-700";
      case "Médio":
        return "bg-yellow-600 text-white hover:bg-yellow-700";
      default:
        return "bg-red-600 text-white hover:bg-red-700";
    }
  };

  const agentesFilterMap: Record<number, string> = {
    0: "Acidente",
    1: "Quimico",
    2: "Ergonomico",
    3: "ErgonomicoPsicossocial",
    4: "Fisico",
    5: "Biologico",
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <FilterableHeader label="Local" filterKeys={["local"]} hasFilter={hasFilter} clearFilter={clearFilter} sortKey="local" currentSortBy={filters.sortBy} currentSortDirection={filters.sortDirection} onSort={handleSort}>
              <Input
                placeholder="Buscar local..."
                value={filters.local ?? ""}
                onChange={(e) => updateFilter({ local: e.target.value })}
              />
            </FilterableHeader>

            <FilterableHeader label="Atividades" filterKeys={["atividades"]} hasFilter={hasFilter} clearFilter={clearFilter} sortKey="atividades" currentSortBy={filters.sortBy} currentSortDirection={filters.sortDirection} onSort={handleSort}>
              <Input
                placeholder="Buscar atividades..."
                value={filters.atividades ?? ""}
                onChange={(e) => updateFilter({ atividades: e.target.value })}
              />
            </FilterableHeader>

            <TableHead>
              <strong>Perigos</strong>
            </TableHead>

            <TableHead>
              <strong>Danos</strong>
            </TableHead>

            <FilterableHeader label="Agentes de Risco" filterKeys={["agentes"]} hasFilter={hasFilter} clearFilter={clearFilter} sortKey="agentes" currentSortBy={filters.sortBy} currentSortDirection={filters.sortDirection} onSort={handleSort}>
              <div className="space-y-1">
                {AgentesDeRisco.map((a) => (
                  <button
                    key={a.key}
                    type="button"
                    className={`block w-full text-left text-sm px-2 py-1 rounded ${
                      filters.agentes === agentesFilterMap[a.key]
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                    onClick={() =>
                      updateFilter({
                        agentes:
                          filters.agentes === agentesFilterMap[a.key]
                            ? undefined
                            : agentesFilterMap[a.key],
                      })
                    }
                  >
                    {a.value}
                  </button>
                ))}
              </div>
            </FilterableHeader>

            <FilterableHeader label="Tipo de Avaliação" filterKeys={["tipoDeAvaliacao"]} hasFilter={hasFilter} clearFilter={clearFilter} sortKey="tipoDeAvaliacao" currentSortBy={filters.sortBy} currentSortDirection={filters.sortDirection} onSort={handleSort}>
              <Input
                placeholder="Buscar tipo..."
                value={filters.tipoDeAvaliacao ?? ""}
                onChange={(e) => updateFilter({ tipoDeAvaliacao: e.target.value })}
              />
            </FilterableHeader>

            <FilterableHeader
              label="Severidade"
              filterKeys={["severidade", "minSeveridade", "maxSeveridade"]}
              hasFilter={hasFilter}
              clearFilter={clearFilter}
              sortKey="severidade"
              currentSortBy={filters.sortBy}
              currentSortDirection={filters.sortDirection}
              onSort={handleSort}
            >
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Exato</Label>
                  <Input
                    type="number"
                    placeholder="Valor exato"
                    value={filters.severidade ?? ""}
                    onChange={(e) =>
                      updateFilter({
                        severidade: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label className="text-xs">Mín</Label>
                    <Input
                      type="number"
                      placeholder="Mín"
                      value={filters.minSeveridade ?? ""}
                      onChange={(e) =>
                        updateFilter({
                          minSeveridade: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="text-xs">Máx</Label>
                    <Input
                      type="number"
                      placeholder="Máx"
                      value={filters.maxSeveridade ?? ""}
                      onChange={(e) =>
                        updateFilter({
                          maxSeveridade: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </FilterableHeader>

            <FilterableHeader
              label="Probabilidade"
              filterKeys={["probabilidade", "minProbabilidade", "maxProbabilidade"]}
              hasFilter={hasFilter}
              clearFilter={clearFilter}
              sortKey="probabilidade"
              currentSortBy={filters.sortBy}
              currentSortDirection={filters.sortDirection}
              onSort={handleSort}
            >
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Exato</Label>
                  <Input
                    type="number"
                    placeholder="Valor exato"
                    value={filters.probabilidade ?? ""}
                    onChange={(e) =>
                      updateFilter({
                        probabilidade: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label className="text-xs">Mín</Label>
                    <Input
                      type="number"
                      placeholder="Mín"
                      value={filters.minProbabilidade ?? ""}
                      onChange={(e) =>
                        updateFilter({
                          minProbabilidade: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="text-xs">Máx</Label>
                    <Input
                      type="number"
                      placeholder="Máx"
                      value={filters.maxProbabilidade ?? ""}
                      onChange={(e) =>
                        updateFilter({
                          maxProbabilidade: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </FilterableHeader>

            <FilterableHeader
              label="Significância"
              filterKeys={[
                "significancia",
                "minSignificancia",
                "maxSignificancia",
                "nivelSignificancia",
              ]}
              hasFilter={hasFilter}
              clearFilter={clearFilter}
              sortKey="significancia"
              currentSortBy={filters.sortBy}
              currentSortDirection={filters.sortDirection}
              onSort={handleSort}
            >
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Nível</Label>
                  <div className="space-y-1 mt-1">
                    {([
                      { label: "Baixo", value: "Baixo" },
                      { label: "Médio", value: "Medio" },
                      { label: "Alto", value: "Alto" },
                    ]).map((nivel) => (
                      <button
                        key={nivel.value}
                        type="button"
                        className={`block w-full text-left text-sm px-2 py-1 rounded ${
                          filters.nivelSignificancia === nivel.value
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                        onClick={() =>
                          updateFilter({
                            nivelSignificancia:
                              filters.nivelSignificancia === nivel.value
                                ? undefined
                                : nivel.value,
                          })
                        }
                      >
                        {nivel.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Exato</Label>
                  <Input
                    type="number"
                    placeholder="Valor exato"
                    value={filters.significancia ?? ""}
                    onChange={(e) =>
                      updateFilter({
                        significancia: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label className="text-xs">Mín</Label>
                    <Input
                      type="number"
                      placeholder="Mín"
                      value={filters.minSignificancia ?? ""}
                      onChange={(e) =>
                        updateFilter({
                          minSignificancia: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="text-xs">Máx</Label>
                    <Input
                      type="number"
                      placeholder="Máx"
                      value={filters.maxSignificancia ?? ""}
                      onChange={(e) =>
                        updateFilter({
                          maxSignificancia: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </FilterableHeader>

            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {riscosData?.map((risco) => (
            <TableRow key={risco.id}>
              <TableCell>
                <div className="max-w-[200px] truncate">
                  <small className="text-xs leading-none font-medium">
                    {risco.local}
                  </small>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[200px] truncate">
                  <small className="text-xs leading-none font-medium">
                    {risco.atividades}
                  </small>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[250px] flex flex-wrap gap-1">
                  {risco.perigos.map((perigo) => (
                    <Badge key={perigo.id} variant="secondary" className="whitespace-normal rounded-md bg-gray-200 text-gray-800">
                      {perigo.descricao}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[400px] flex flex-wrap gap-1">
                  {risco.danos.map((dano) => (
                    <Badge key={dano.id} variant="secondary" className="rounded-md bg-gray-200 text-gray-800">
                      {dano.descricao}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[400px] text-wrap">
                  <small className="text-xs leading-none font-medium">
                    {AgentesDeRisco.find((a) => a.key === risco.agentes)?.value}
                  </small>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[400px] text-wrap">
                  <small className="text-xs leading-none font-medium">
                    {risco.tipoDeAvaliacao}
                  </small>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[400px] text-wrap">
                  <small className="text-xs leading-none font-medium">
                    {risco.severidade}
                  </small>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[400px] text-wrap">
                  <small className="text-xs leading-none font-medium">
                    {risco.probabilidade}
                  </small>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[400px] text-wrap">
                  <Badge
                    className={getSignificanciaBadgeColor(
                      mapNivelSignificancia(risco.nivelSignificancia),
                    )}
                  >
                    <small className="text-xs leading-none font-medium">
                      {risco.significancia} |{" "}
                      {mapNivelSignificancia(risco.nivelSignificancia)}
                    </small>
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {isUserEditor && (
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        aria-label="Open menu"
                        size="icon-sm"
                      >
                        <MoreHorizontalIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="end">
                      <DropdownMenuLabel>
                        <strong>Ações</strong>
                      </DropdownMenuLabel>
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onSelect={() => handleOnEditButtonPressed(risco)}
                        >
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => handleOnDeleteButtonPressed(risco)}
                        >
                          Deletar
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>
                          <strong>Plano de Ação</strong>
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                          onSelect={() => handleOnAddPlanoPressed(risco)}
                        >
                          {risco.planoDeAcao ? "Gerenciar Plano" : "Adicionar Plano"}
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editDialogControlledOpen ? (
        <AddEditRiscoDialog
          controlledOpen={editDialogControlledOpen}
          setControlledOpen={setEditDialogControlledOpen}
          isEdit={true}
          gheId={gheId ?? ""}
          risco={targetRisco!}
        />
      ) : null}

      {planoDialogOpen && targetRisco ? (
        <PlanoDeAcaoDialog
          controlledOpen={planoDialogOpen}
          setControlledOpen={setPlanoDialogOpen}
          gheId={gheId ?? ""}
          riscoId={targetRisco.id}
          planoDeAcao={targetRisco.planoDeAcao}
        />
      ) : null}
    </div>
  );
}
