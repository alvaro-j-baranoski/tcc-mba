import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import type { Dano } from "../models/Dano";
import { useDanosTableDropdownMenu } from "./useDanosTableDropdownMenu";

interface DanosTableDropdownMenuProps {
    dano: Dano;
}

export default function DanosTableDropdownMenu({ dano }: DanosTableDropdownMenuProps) {
    const { handleOnEditButtonPressed, handleOnDeleteButtonPressed } = useDanosTableDropdownMenu();

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
                        {dano.descricao}
                        <MoreVerticalIcon className="h-3.5 w-3.5 text-slate-400" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                    <DropdownMenuLabel>
                        <strong>Ações</strong>
                    </DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={() => handleOnEditButtonPressed(dano)}>Editar</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleOnDeleteButtonPressed(dano)}>Deletar</DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
