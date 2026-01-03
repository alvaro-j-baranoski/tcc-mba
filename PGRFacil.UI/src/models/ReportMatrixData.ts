export default interface ReportMatrixData {
    agents: RiskMatrixEntry[]
}

interface RiskMatrixEntry {
    agent: number,
    significances: CategoryEntry[]
}

interface CategoryEntry {
    significance: number,
    numberOfRisks: number
}