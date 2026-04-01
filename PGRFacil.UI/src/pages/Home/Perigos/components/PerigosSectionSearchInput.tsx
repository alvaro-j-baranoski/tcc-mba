import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePerigosSectionSearchInput } from "./usePerigosSectionSearchInput";

interface PerigosSectionSearchInputProps {
    setDebouncedSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function PerigosSectionSearchInput({ setDebouncedSearch }: PerigosSectionSearchInputProps) {
    const { search, setSearch } = usePerigosSectionSearchInput({ setDebouncedSearch });

    return (
        <div className="relative mb-4 max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
                placeholder="Buscar perigos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
            />
        </div>
    );
}
