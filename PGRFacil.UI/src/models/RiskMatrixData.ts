export default interface ReportMatrixData {
    entry: RiskMatrixEntry[]
}

interface RiskMatrixEntry {
    categoria: string,
    significancias: CategoryEntry[]
}

interface CategoryEntry {
    significancia: string,
    valor: number
}