import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRiscoDialogGhe } from "./useRiscoDialogGhe";
import { Badge } from "@/components/ui/badge";

interface RiscoDialogGheProps {
    type: "add" | "edit";
    setGheId: (value: string | null) => void;
    gheName: string | null;
    disabled: boolean;
}

export default function RiscoDialogGhe({ type, setGheId, gheName, disabled }: RiscoDialogGheProps) {
    const { ghePopoverOpen, setGhePopoverOpen, availableGhes, handleSelectGhe, selectedGheName } = useRiscoDialogGhe({
        setGheId,
    });

    return (
        <>
            <Label>GHE</Label>
            {type === "add" ? (
                <>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                        <Badge key={selectedGheName} variant="secondary" className="gap-1">
                            {selectedGheName}
                        </Badge>
                    </div>
                    <Popover open={ghePopoverOpen} onOpenChange={setGhePopoverOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full justify-start text-muted-foreground font-normal"
                                disabled={disabled}
                            >
                                Buscar GHEs...
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                            <Command shouldFilter={false}>
                                <CommandList>
                                    <CommandEmpty>Nenhum GHE encontrado.</CommandEmpty>
                                    <CommandGroup>
                                        {availableGhes.map((ghe) => (
                                            <CommandItem
                                                key={ghe.id}
                                                value={ghe.id}
                                                onSelect={() => handleSelectGhe(ghe)}
                                            >
                                                {ghe.nome}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </>
            ) : (
                <Input value={gheName || ""} disabled />
            )}
        </>
    );
}
