import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { FaPlus } from "react-icons/fa";

export default function PerigosTable() {
    const { isUserEditor } = useAuth();

    return (
        <div className="flex min-h-svh flex-col m-8 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Perigos</h1>
                {isUserEditor && (
                <Button>
                    <FaPlus />
                    <span className="ml-2">Adicionar Perigo</span>
                </Button>
                )}
            </div>
        </div>
    )
}