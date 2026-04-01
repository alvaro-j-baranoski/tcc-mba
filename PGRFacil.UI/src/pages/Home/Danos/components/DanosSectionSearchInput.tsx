import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useDanosSectionSearchInput } from "./useDanosSectionSearchInput";

interface DanosSectionSearchInputProps {
    setDebouncedSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function DanosSectionSearchInput({ setDebouncedSearch }: DanosSectionSearchInputProps) {
    const { search, setSearch } = useDanosSectionSearchInput({ setDebouncedSearch });

    return (
        <div className="relative mb-4 max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
                placeholder="Buscar danos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
            />
        </div>
    );
}
