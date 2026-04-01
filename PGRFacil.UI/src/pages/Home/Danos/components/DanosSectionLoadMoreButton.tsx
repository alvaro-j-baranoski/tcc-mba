import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface DanosSectionLoadMoreButtonProps {
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
}

export default function DanosSectionLoadMoreButton({
    isFetchingNextPage,
    fetchNextPage,
}: DanosSectionLoadMoreButtonProps) {
    return (
        <div className="flex justify-center pt-4">
            <Button variant="outline" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                {isFetchingNextPage ? <Spinner /> : "Carregar mais"}
            </Button>
        </div>
    );
}
