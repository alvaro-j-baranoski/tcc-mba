import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Perigo } from "@/pages/Home/Perigos/models/Perigo";
import { XIcon } from "lucide-react";
import { useRiscoDialogPerigos } from "./useRiscoDialogPerigos";

interface RiscoDialogPerigosProps {
    selectedPerigos: Perigo[];
    setSelectedPerigos: React.Dispatch<React.SetStateAction<Perigo[]>>;
    disabled: boolean;
}

export default function RiscoDialogPerigos({ selectedPerigos, setSelectedPerigos, disabled }: RiscoDialogPerigosProps) {
    const {
        handleRemovePerigo,
        handleSelectPerigo,
        perigoPopoverOpen,
        setPerigoPopoverOpen,
        perigoSearch,
        setPerigoSearch,
        availablePerigos,
    } = useRiscoDialogPerigos({
        selectedPerigos,
        setSelectedPerigos,
    });

    return (
        <>
            <Label>Perigos</Label>
            <div className="flex flex-wrap gap-1.5 mb-2">
                {selectedPerigos.map((perigo) => (
                    <Badge key={perigo.id} variant="secondary" className="gap-1">
                        {perigo.descricao}
                        <button
                            type="button"
                            onClick={() => handleRemovePerigo(perigo.id)}
                            className="ml-0.5 hover:text-destructive"
                            disabled={disabled}
                        >
                            <XIcon className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
            </div>
            <Popover open={perigoPopoverOpen} onOpenChange={setPerigoPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-start text-muted-foreground font-normal"
                        disabled={disabled}
                    >
                        Buscar perigos...
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                    <Command shouldFilter={false}>
                        <CommandInput
                            placeholder="Buscar perigos..."
                            value={perigoSearch}
                            onValueChange={setPerigoSearch}
                        />
                        <CommandList>
                            <CommandEmpty>Nenhum perigo encontrado.</CommandEmpty>
                            <CommandGroup>
                                {availablePerigos.map((perigo) => (
                                    <CommandItem
                                        key={perigo.id}
                                        value={perigo.id}
                                        onSelect={() => handleSelectPerigo(perigo)}
                                    >
                                        {perigo.descricao}
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
