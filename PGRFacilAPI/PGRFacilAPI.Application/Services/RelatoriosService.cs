using PGRFacilAPI.Application.DTOs;
using PGRFacilAPI.Application.Models;

namespace PGRFacilAPI.Application.Services
{
    public class RelatoriosService(IRiscoService riscoService) : IRelatoriosService
    {
        public async Task<MatrizDeRiscoDTO> GetMatrizDeRisco()
        {
            var result = new MatrizDeRiscoDTO();
            IEnumerable<SimplifiedRisco> riscos = await riscoService.GetSimplifiedRiscos();
            foreach (var item in result.Agentes)
            {
                var riscosPerAgentes = riscos.Where(r => r.Agente == item.Agente);
                foreach (var significancia in item.Significancias)
                {
                    var riscosPerSignificancia = riscosPerAgentes.Where(r => r.NivelSignificancia == significancia.Significancia);
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
