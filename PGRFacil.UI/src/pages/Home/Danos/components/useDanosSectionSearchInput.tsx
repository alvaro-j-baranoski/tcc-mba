import { useEffect, useState } from "react";

interface UseDanosSectionSearchInputProps {
    setDebouncedSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const useDanosSectionSearchInput = ({ setDebouncedSearch }: UseDanosSectionSearchInputProps) => {
    const [search, setSearch] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timer);
    }, [search, setDebouncedSearch]);

    return { search, setSearch };
};
