import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { useRiscosSectionHeader } from "./useRiscosSectionHeader";

interface RiscosSectionHeaderProps {
    disabled: boolean;
}

export default function RiscosSectionHeader({ disabled }: RiscosSectionHeaderProps) {
    const { isUserEditor, openModal } = useRiscosSectionHeader();

    return (
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Riscos</h1>
            {isUserEditor && (
                <Button disabled={disabled} onClick={openModal}>
                    <FaPlus />
                    <span className="ml-2">Adicionar Risco</span>
                </Button>
            )}
        </div>
    );
}
