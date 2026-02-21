using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Ghe.GheCreate
{
    public class GheCreateUseCase(IGheRepository gheRepository)
    {
        public async Task<GheCreateOutputDto> Execute(GheCreateInputDto input)
        {
            var entity = new GheEntity { Nome = input.Nome };
            GheEntity createdEntity = await gheRepository.Create(entity);
            var dto = new GheDto(createdEntity.Id, createdEntity.Nome, createdEntity.AtualizadoEm, createdEntity.NumeroDeRiscos, createdEntity.Versao);
            return new GheCreateOutputDto(dto);
        }
    }
}
