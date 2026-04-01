import "react-loading-skeleton/dist/skeleton.css";
import { HomeSection } from "../../HomeSection";
import DanosSectionHeader from "./DanosSectionHeader";
import { DanosActionsContextProvider } from "../context/DanosActionsContext";
import DanosSectionSearchInput from "./DanosSectionSearchInput";
import DanosTable from "./DanosTable";
import DanosSectionSkeleton from "./DanosSectionSkeleton";
import DanosSectionLoadMoreButton from "./DanosSectionLoadMoreButton";
import { useDanosSection } from "./useDanosSection";

export default function DanosSection() {
    const { isFetching, isFetchingNextPage, isUserEditor, setDebouncedSearch, danos, hasNextPage, fetchNextPage } =
        useDanosSection();

    return (
        <DanosActionsContextProvider>
            <HomeSection>
                <DanosSectionHeader isFetching={isFetching} isUserEditor={isUserEditor} />
                <DanosSectionSearchInput setDebouncedSearch={setDebouncedSearch} />

                {!isFetching || isFetchingNextPage ? (
                    <DanosTable isUserEditor={isUserEditor} danos={danos} />
                ) : (
                    <DanosSectionSkeleton />
                )}

                {hasNextPage && (
                    <DanosSectionLoadMoreButton isFetchingNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} />
                )}
            </HomeSection>
        </DanosActionsContextProvider>
    );
}
