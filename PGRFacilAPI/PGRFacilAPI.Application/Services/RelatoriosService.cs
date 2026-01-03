using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Models;

namespace PGRFacilAPI.Application.Services
{
    public class RelatoriosService(IRisksService riscoService) : IRelatoriosService
    {
        public async Task<MatrizDeRiscoDTO> GetMatrizDeRisco()
        {
            var result = new MatrizDeRiscoDTO();
            IEnumerable<SimplifiedRisk> riscos = await riscoService.GetSimplifiedRisk();
            foreach (var item in result.Agentes)
            {
                var riscosPerAgentes = riscos.Where(r => r.Agent == item.Agente);
                foreach (var significancia in item.Significancias)
                {
                    var riscosPerSignificancia = riscosPerAgentes.Where(r => r.SignificanceLevel == significancia.Significancia);
                    if (riscosPerSignificancia is not null)
                    {
                        significancia.NumeroDeRiscos = (uint)riscosPerSignificancia.Count();
                    }
                }
            }
            return result;
        }
    }
}
