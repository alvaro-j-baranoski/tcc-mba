import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import type { Perigo } from "../models/Perigo";
import { usePerigosTableDropdownMenu } from "./usePerigosTableDropdownMenu";

interface PerigosTableDropdownMenuProps {
    perigo: Perigo;
}

export default function PerigosTableDropdownMenu({ perigo }: PerigosTableDropdownMenuProps) {
    const { handleOnEditButtonPressed, handleOnDeleteButtonPressed } = usePerigosTableDropdownMenu();

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
                    {perigo.descricao}
                    <MoreVerticalIcon className="h-3.5 w-3.5 text-slate-400" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuLabel>
                    <strong>Ações</strong>
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={() => handleOnEditButtonPressed(perigo)}>Editar</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleOnDeleteButtonPressed(perigo)}>Deletar</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
