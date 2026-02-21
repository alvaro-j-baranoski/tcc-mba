using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Ghe.GheUpdate
{
    public class GheUpdateUseCase(IGheRepository gheRepository)
    {
        public async Task Execute(GheUpdateInputDto input)
        {
            var entity = new GheEntity { Nome = input.Nome, AtualizadoEm = DateTime.UtcNow };
            await gheRepository.Update(input.Id, entity);
        }
    }
}
