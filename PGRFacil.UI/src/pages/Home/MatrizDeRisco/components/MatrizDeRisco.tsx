import { Spinner } from "@/components/ui/spinner";
import { HomeSection } from "../../HomeSection";
import MatrizDeRiscoHeader from "./MatrizDeRiscoHeader";
import MatrizDeRiscoHeaderRow from "./MatrizDeRiscoHeaderRow";
import MatrizDeRiscoRows from "./MatrizDeRiscoRows";
import MatrizDeRiscoTotalRow from "./MatrizDeRiscoTotalRow";
import { useMatrizDeRisco } from "./useMatrizDeRisco";

export function MatrizDeRisco() {
    const { data, isFetching } = useMatrizDeRisco();

    return (
        <HomeSection>
            {isFetching ? <Spinner className="mx-auto my-10 size-8" /> : null}

            {!isFetching && data ? (
                <>
                    <MatrizDeRiscoHeader />
                    <div className="min-w-[800px]">
                        <MatrizDeRiscoHeaderRow />
                        <MatrizDeRiscoRows data={data} />
                        <MatrizDeRiscoTotalRow data={data} />
                    </div>
                </>
            ) : null}
        </HomeSection>
    );
}
