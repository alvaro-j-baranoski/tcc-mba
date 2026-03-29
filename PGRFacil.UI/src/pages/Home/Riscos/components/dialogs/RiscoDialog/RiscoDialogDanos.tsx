import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Dano } from "@/pages/Home/Danos/models/Dano";
import { XIcon } from "lucide-react";
import { useRiscoDialogDanos } from "./useRiscoDialogDanos";

interface RiscoDialogDanosProps {
    selectedDanos: Dano[];
    setSelectedDanos: React.Dispatch<React.SetStateAction<Dano[]>>;
    disabled: boolean;
}

export default function RiscoDialogDanos({ selectedDanos, setSelectedDanos, disabled }: RiscoDialogDanosProps) {
    const {
        handleRemoveDano,
        handleSelectDano,
        danoPopoverOpen,
        setDanoPopoverOpen,
        danoSearch,
        setDanoSearch,
        availableDanos,
    } = useRiscoDialogDanos({
        selectedDanos,
        setSelectedDanos,
    });

    return (
        <>
            <Label>Danos</Label>
            <div className="flex flex-wrap gap-1.5 mb-2">
                {selectedDanos.map((dano) => (
                    <Badge key={dano.id} variant="secondary" className="gap-1">
                        {dano.descricao}
                        <button
                            type="button"
                            onClick={() => handleRemoveDano(dano.id)}
                            className="ml-0.5 hover:text-destructive"
                            disabled={disabled}
                        >
                            <XIcon className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
            </div>
            <Popover open={danoPopoverOpen} onOpenChange={setDanoPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-start text-muted-foreground font-normal"
                        disabled={disabled}
                    >
                        Buscar danos...
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                    <Command shouldFilter={false}>
                        <CommandInput
                            placeholder="Buscar danos..."
                            value={danoSearch}
                            onValueChange={setDanoSearch}
                        />
                        <CommandList>
                            <CommandEmpty>Nenhum dano encontrado.</CommandEmpty>
                            <CommandGroup>
                                {availableDanos.map((dano) => (
                                    <CommandItem
                                        key={dano.id}
                                        value={dano.id}
                                        onSelect={() => handleSelectDano(dano)}
                                    >
                                        {dano.descricao}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    );
}
