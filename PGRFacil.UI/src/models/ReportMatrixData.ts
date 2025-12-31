export default interface ReportMatrixData {
    agentes: RiskMatrixEntry[]
}

interface RiskMatrixEntry {
    agente: number,
    significancias: CategoryEntry[]
}

interface CategoryEntry {
    significancia: number,
    numeroDeRiscos: number
}