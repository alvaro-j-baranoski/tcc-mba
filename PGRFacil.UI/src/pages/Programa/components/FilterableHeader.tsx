import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TableHead } from "@/components/ui/table";
import type { RiscosFilter } from "@/pages/Programa/models/RiscosFilter";
import { ArrowDownIcon, ArrowUpIcon, FilterIcon } from "lucide-react";

interface FilterableHeaderProps {
  label: string;
  children: React.ReactNode;
  filterKeys: (keyof RiscosFilter)[];
  hasFilter: (...keys: (keyof RiscosFilter)[]) => boolean;
  clearFilter: (...keys: (keyof RiscosFilter)[]) => void;
  sortKey: string;
  currentSortBy?: string;
  currentSortDirection?: "asc" | "desc";
  onSort: (sortBy: string, sortDirection: "asc" | "desc") => void;
}

export function FilterableHeader({
  label,
  children,
  filterKeys,
  hasFilter,
  clearFilter,
  sortKey,
  currentSortBy,
  currentSortDirection,
  onSort,
}: FilterableHeaderProps) {
  const isActiveSortColumn = currentSortBy === sortKey;

  const handleSortClick = () => {
    if (!isActiveSortColumn) {
      onSort(sortKey, "asc");
    } else if (currentSortDirection === "asc") {
      onSort(sortKey, "desc");
    } else {
      onSort("", "asc");
    }
  };

  return (
    <TableHead>
      <div className="inline-flex items-center gap-1">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-1 font-semibold hover:text-primary transition-colors"
            >
              {label}
              <FilterIcon
                className="h-3 w-3"
                fill={hasFilter(...filterKeys) ? "black" : "white"}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-60 space-y-3" align="start">
            <p className="text-sm font-medium">Filtrar {label}</p>
            {children}
            {hasFilter(...filterKeys) && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => clearFilter(...filterKeys)}
              >
                Limpar filtro
              </Button>
            )}
          </PopoverContent>
        </Popover>
        <button
          type="button"
          className="hover:text-primary transition-colors"
          onClick={handleSortClick}
          title="Ordenar"
        >
          {isActiveSortColumn && currentSortDirection === "asc" ? (
            <ArrowUpIcon className="h-3 w-3" />
          ) : isActiveSortColumn && currentSortDirection === "desc" ? (
            <ArrowDownIcon className="h-3 w-3" />
          ) : (
            <ArrowUpIcon className="h-3 w-3 text-muted-foreground" />
          )}
        </button>
      </div>
    </TableHead>
  );
}
