export default interface MatrizDeRiscoData {
    agentes: MatrizDeRiscoEntry[]
}

interface MatrizDeRiscoEntry {
    agente: number,
    significancias: CategoryEntry[]
}

interface CategoryEntry {
    significancia: number,
    numeroDeRiscos: number
}