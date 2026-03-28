import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FilterableHeader } from "./FilterableHeader";
import { Input } from "@/components/ui/input";
import type { RiscosFilter } from "../../models/RiscosFilter";
import { AgentesDeRisco } from "@/models/AgentesDeRisco";
import { Label } from "@/components/ui/label";

interface Props {
  filters: RiscosFilter;
  onFiltersChange: (filters: RiscosFilter) => void;
}

export default function RiscosTableHeader({ filters, onFiltersChange }: Props) {

  const hasFilter = (...keys: (keyof RiscosFilter)[]) =>
    keys.some((k) => filters[k] !== undefined && filters[k] !== "");

  const clearFilter = (...keys: (keyof RiscosFilter)[]) => {
    const next = { ...filters };
    for (const k of keys) delete next[k];
    onFiltersChange(next);
  };

  const handleSort = (sortBy: string, sortDirection: "asc" | "desc") => {
    onFiltersChange({
      ...filters,
      sortBy: sortBy || undefined,
      sortDirection: sortBy ? sortDirection : undefined,
    });
  };

  const updateFilter = (patch: Partial<RiscosFilter>) => {
    onFiltersChange({ ...filters, ...patch });
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
    <TableHeader>
      <TableRow>
        <TableHead>
          <strong className="text-sm font-semibold">GHE</strong>
        </TableHead>

        <FilterableHeader
          label="Local"
          filterKeys={["local"]}
          hasFilter={hasFilter}
          clearFilter={clearFilter}
          sortKey="local"
          currentSortBy={filters.sortBy}
          currentSortDirection={filters.sortDirection}
          onSort={handleSort}
        >
          <Input
            placeholder="Buscar local..."
            value={filters.local ?? ""}
            onChange={(e) => updateFilter({ local: e.target.value })}
          />
        </FilterableHeader>

        <FilterableHeader
          label="Atividades"
          filterKeys={["atividades"]}
          hasFilter={hasFilter}
          clearFilter={clearFilter}
          sortKey="atividades"
          currentSortBy={filters.sortBy}
          currentSortDirection={filters.sortDirection}
          onSort={handleSort}
        >
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

        <FilterableHeader
          label="Agentes de Risco"
          filterKeys={["agentes"]}
          hasFilter={hasFilter}
          clearFilter={clearFilter}
          sortKey="agentes"
          currentSortBy={filters.sortBy}
          currentSortDirection={filters.sortDirection}
          onSort={handleSort}
        >
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

        <FilterableHeader
          label="Tipo de Avaliação"
          filterKeys={["tipoDeAvaliacao"]}
          hasFilter={hasFilter}
          clearFilter={clearFilter}
          sortKey="tipoDeAvaliacao"
          currentSortBy={filters.sortBy}
          currentSortDirection={filters.sortDirection}
          onSort={handleSort}
        >
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
                    severidade: e.target.value
                      ? Number(e.target.value)
                      : undefined,
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
                      minSeveridade: e.target.value
                        ? Number(e.target.value)
                        : undefined,
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
                      maxSeveridade: e.target.value
                        ? Number(e.target.value)
                        : undefined,
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
                    probabilidade: e.target.value
                      ? Number(e.target.value)
                      : undefined,
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
                      minProbabilidade: e.target.value
                        ? Number(e.target.value)
                        : undefined,
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
                      maxProbabilidade: e.target.value
                        ? Number(e.target.value)
                        : undefined,
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
                {[
                  { label: "Baixo", value: "Baixo" },
                  { label: "Médio", value: "Medio" },
                  { label: "Alto", value: "Alto" },
                ].map((nivel) => (
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
                    significancia: e.target.value
                      ? Number(e.target.value)
                      : undefined,
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
                      minSignificancia: e.target.value
                        ? Number(e.target.value)
                        : undefined,
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
                      maxSignificancia: e.target.value
                        ? Number(e.target.value)
                        : undefined,
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
  );
}
