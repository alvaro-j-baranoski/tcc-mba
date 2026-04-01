import { useEffect, useState } from "react";

interface UsePerigosSectionSearchInputProps {
    setDebouncedSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const usePerigosSectionSearchInput = ({ setDebouncedSearch }: UsePerigosSectionSearchInputProps) => {
    const [search, setSearch] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timer);
    }, [search, setDebouncedSearch]);

    return { search, setSearch };
};
