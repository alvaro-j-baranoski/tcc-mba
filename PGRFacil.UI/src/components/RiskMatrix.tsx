import type ReportMatrixData from "@/models/RiskMatrixData";

interface RiskMatrixProps {
  data: ReportMatrixData;
}

export function RiskMatrix({ data }: RiskMatrixProps) {
  const categories = [
    "ACIDENTE",
    "BIOLÓGICO",
    "ERGONÔMICO",
    "ERGONÔMICO (PSICOSSOCIAL)",
    "FÍSICO",
    "QUÍMICO",
  ];

  const significanceLevels = ["Baixa", "Média", "Alta"];

  const getCellColor = (level: string) => {
    switch (level) {
      case "Baixa":
        return "bg-emerald-100 text-emerald-900 border-emerald-200";
      case "Média":
        return "bg-orange-200 text-orange-900 border-orange-300";
      default:
        return "bg-slate-50 text-slate-900 border-slate-200";
    }
  };

  const getHeaderColor = (category: string) => {
    switch (category) {
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

  const getCount = (cat: string, sig: string) => {
    return data.entry
      .find((e) => e.categoria === cat)
      ?.significancias.find((s) => s.significancia === sig)?.valor;
  };

  const getTotal = (cat: string) => {
    let total = 0;
    data.entry
      .find((e) => e.categoria === cat)
      ?.significancias.forEach((s) => {
        total += s.valor;
      });
    return total;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-x-auto">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          Matriz de Riscos (Significância x Categoria)
        </h2>
        <p className="text-sm text-slate-500">
          Distribuição de riscos por nível de significância e categoria
        </p>
      </div>

      <div className="min-w-[800px]">
        {/* Header Row */}
        <div className="grid grid-cols-[100px_repeat(6,1fr)] gap-1 mb-1">
          <div className="flex items-end justify-center pb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Significância
            </span>
          </div>
          {categories.map((cat) => (
            <div
              key={cat}
              className={`
                ${getHeaderColor(cat)}
                p-3 text-xs font-bold uppercase text-center rounded-t-md flex items-center justify-center h-16
                shadow-sm
              `}
            >
              {cat.replace(" (PSICOSSOCIAL)", "\n(PSICOSSOCIAL)")}
            </div>
          ))}
        </div>

        {/* Matrix Rows */}
        {significanceLevels.map((sig) => (
          <div
            key={sig}
            className="grid grid-cols-[100px_repeat(6,1fr)] gap-1 mb-1"
          >
            {/* Row Label */}
            <div
              className={`
              flex items-center justify-center font-bold text-slate-700 rounded-l-md border-y border-l border-slate-200
            `}
            >
              {sig}
            </div>

            {/* Data Cells */}
            {categories.map((cat) => {
              const count = getCount(cat, sig);
              return (
                <div
                  key={`${cat}-${sig}`}
                  className={`
                    ${getCellColor(sig)}
                    h-12 flex items-center justify-center font-bold text-lg border
                    transition-colors
                  `}
                >
                  {count}
                </div>
              );
            })}
          </div>
        ))}

        {/* Totals Row */}
        <div className="grid grid-cols-[100px_repeat(6,1fr)] gap-1 mt-2 pt-2 border-t-2 border-slate-100">
          <div className="flex items-center justify-center font-bold text-slate-900 text-sm">
            TOTAL
          </div>
          {categories.map((cat) => (
            <div
              key={`total-${cat}`}
              className="flex items-center justify-center font-bold text-slate-900 text-lg bg-slate-50 rounded-md py-2"
            >
              {getTotal(cat)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
