import "react-loading-skeleton/dist/skeleton.css";
import { HomeSection } from "../../HomeSection";
import PerigosSectionHeader from "./PerigosSectionHeader";
import { PerigosActionsContextProvider } from "../context/PerigosActionsContext";
import PerigosSectionSearchInput from "./PerigosSectionSearchInput";
import PerigosTable from "./PerigosTable";
import PerigosSectionSkeleton from "./PerigosSectionSkeleton";
import PerigosSectionLoadMoreButton from "./PerigosSectionLoadMoreButton";
import { usePerigosSection } from "./usePerigosSection";

export default function PerigosSection() {
    const { isFetching, isFetchingNextPage, isUserEditor, setDebouncedSearch, perigos, hasNextPage, fetchNextPage } =
        usePerigosSection();

    return (
        <PerigosActionsContextProvider>
            <HomeSection>
                <PerigosSectionHeader isFetching={isFetching} isUserEditor={isUserEditor} />
                <PerigosSectionSearchInput setDebouncedSearch={setDebouncedSearch} />

                {!isFetching || isFetchingNextPage ? (
                    <PerigosTable isUserEditor={isUserEditor} perigos={perigos} />
                ) : (
                    <PerigosSectionSkeleton />
                )}

                {hasNextPage && (
                    <PerigosSectionLoadMoreButton isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
                )}
            </HomeSection>
        </PerigosActionsContextProvider>
    );
}
