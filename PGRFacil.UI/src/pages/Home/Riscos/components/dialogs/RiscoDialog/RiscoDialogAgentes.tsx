import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AgentesDeRisco } from "@/models/AgentesDeRisco";

interface RiscoDialogAgentesProps {
    agentesDeRisco: number;
    setAgentesDeRisco: (value: number) => void;
    disabled: boolean;
}

export default function RiscoDialogAgentes({ agentesDeRisco, setAgentesDeRisco, disabled }: RiscoDialogAgentesProps) {
    return (
        <>
            <Label htmlFor="agentes-de-risco">Agentes</Label>
            <RadioGroup
                id="agentes-de-risco"
                defaultValue={"" + agentesDeRisco}
                onValueChange={(value) => setAgentesDeRisco(Number(value))}
                className="grid grid-cols-2 gap-2"
                disabled={disabled}
            >
                {AgentesDeRisco.map((agente) => {
                    return (
                        <div key={agente.key} className="flex items-center space-x-2">
                            <RadioGroupItem value={"" + agente.key} id={agente.value + agente.key} />
                            <Label htmlFor={agente.value + agente.key}>{agente.value}</Label>
                        </div>
                    );
                })}
            </RadioGroup>
        </>
    );
}
