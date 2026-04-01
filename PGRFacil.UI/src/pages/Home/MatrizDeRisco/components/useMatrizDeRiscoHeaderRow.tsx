export const useMatrizDeRiscoHeaderRow = () => {
    const getHeaderColor = (agente: string) => {
        switch (agente) {
            case "ACIDENTE":
                return "bg-blue-600 text-white border-blue-700";
            case "BIOLÓGICO":
                return "bg-amber-700 text-white border-amber-800";
            case "ERGONÔMICO":
                return "bg-yellow-400 text-yellow-900 border-yellow-500";
            case "ERGONÔMICO (PSICOSSOCIAL)":
                return "bg-orange-400 text-white border-orange-500";
            case "FÍSICO":
                return "bg-green-600 text-white border-green-700";
            case "QUÍMICO":
                return "bg-red-600 text-white border-red-700";
            default:
                return "bg-slate-200 text-slate-700";
        }
    };

    return { getHeaderColor };
};
