using PGRFacilAPI.Application.DTOs.Programs;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Ghe.GheGetAll
{
    public class GheGetAllUseCase(IGheRepository gheRepository)
    {
        public async Task<GheGetAllOutputDto> Execute()
        {
            IEnumerable<GheEntity> ghes = await gheRepository.GetAll();
            List<GheDto> result = [];
            
            foreach (GheEntity ghe in ghes)
            {
                result.Add(new GheDto(ghe.Id, ghe.Nome, ghe.AtualizadoEm, ghe.NumeroDeRiscos, ghe.Versao));
            }

            return new GheGetAllOutputDto(result);
        }
    }
}
