import "react-loading-skeleton/dist/skeleton.css";
import RiscosTable from "./table/RiscosTable";
import { HomeSection } from "../../HomeSection";
import RiscosSectionHeader from "./RiscosSectionHeader";
import { RiscosActionsContextProvider } from "../context/RiscosActionsContext";
import { PlanoDeAcaoActionsContextProvider } from "../context/PlanoDeAcaoActionsContext";
import { useRiscosSection } from "./useRiscosSection";

export default function RiscosSection() {
    const { isFetching, riscos, filters, setFilters, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useRiscosSection();

    return (
        <RiscosActionsContextProvider>
            <PlanoDeAcaoActionsContextProvider>
                <HomeSection>
                    <RiscosSectionHeader disabled={isFetching} />
                    <RiscosTable
                        isFetching={isFetching}
                        riscosData={riscos}
                        filters={filters}
                        onFiltersChange={setFilters}
                        fetchNextPage={fetchNextPage}
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                    />
                </HomeSection>
            </PlanoDeAcaoActionsContextProvider>
        </RiscosActionsContextProvider>
    );
}
