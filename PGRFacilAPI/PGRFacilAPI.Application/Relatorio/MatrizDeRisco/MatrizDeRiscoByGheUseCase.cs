using PGRFacilAPI.Application.Ghe;
using PGRFacilAPI.Application.Risco;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Relatorio.MatrizDeRisco
{
    public class MatrizDeRiscoByGheUseCase(IGheRepository gheRepository, IRiscoRepository riscoRepository)
    {
        public async Task<MatrizDeRiscoOutputDto> Execute(MatrizDeRiscoByGheInputDto input)
        {
            await gheRepository.GetById(input.GheId);

            var result = new MatrizDeRiscoOutputDto();
            IEnumerable<RiscoEntity> riscos = await riscoRepository.GetByGheId(input.GheId);
            foreach (var item in result.Agentes)
            {
                var riscoPerAgente = riscos.Where(r => r.Agentes == item.Agente);
                foreach (var significancia in item.Significancias)
                {
                    var riscoPerSignificancia = riscoPerAgente.Where(r => r.NivelSignificancia == significancia.Significancia);
                    if (riscoPerSignificancia is not null)
                    {
                        significancia.NumeroDeRiscos = (uint)riscoPerSignificancia.Count();
                    }
                }
            }
            return result;
        }
    }
}
