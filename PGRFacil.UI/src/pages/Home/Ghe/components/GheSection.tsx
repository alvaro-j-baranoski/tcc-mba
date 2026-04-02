import { QueryKeys } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";
import { HomeSection } from "@/pages/Home/HomeSection";
import { GheService } from "../services/GheService";
import { GheSectionHeader } from "./GheSectionHeader";
import GheTable from "./table/GheTable";
import { GheActionsContextProvider } from "../context/GheActionsContext";

export default function GheSection() {
    const { data, isFetching } = useQuery({
        queryKey: [QueryKeys.GetGhes],
        queryFn: GheService.getGhes,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    return (
        <GheActionsContextProvider>
            <HomeSection>
                <GheSectionHeader disabled={isFetching} />
                <GheTable isFetching={isFetching} ghes={data?.data} />
            </HomeSection>
        </GheActionsContextProvider>
    );
}
