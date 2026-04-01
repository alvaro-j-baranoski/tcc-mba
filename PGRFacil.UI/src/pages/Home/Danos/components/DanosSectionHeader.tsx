import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { useDanosSectionHeader } from "./useDanosSectionHeader";

interface DanosSectionHeaderProps {
    isUserEditor: boolean;
    isFetching: boolean;
}

export default function DanosSectionHeader({ isUserEditor, isFetching }: DanosSectionHeaderProps) {
    const { openModal } = useDanosSectionHeader();

    return (
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Danos</h1>
            {isUserEditor && (
                <Button disabled={isFetching} onClick={openModal}>
                    <FaPlus />
                    <span className="ml-2">Adicionar Dano</span>
                </Button>
            )}
        </div>
    );
}
