import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { usePerigosSectionHeader } from "./usePerigosSectionHeader";

interface PerigosSectionHeaderProps {
    isUserEditor: boolean;
    isFetching: boolean;
}

export default function PerigosSectionHeader({ isUserEditor, isFetching }: PerigosSectionHeaderProps) {
    const { openModal } = usePerigosSectionHeader();

    return (
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Perigos</h1>
            {isUserEditor && (
                <Button disabled={isFetching} onClick={openModal}>
                    <FaPlus />
                    <span className="ml-2">Adicionar Perigo</span>
                </Button>
            )}
        </div>
    );
}
