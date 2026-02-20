using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Ghe.GheGetById
{
    public class GheGetByIdUseCase(IGheRepository gheRepository)
    {
        public async Task<GheGetByIdOutputDto> Execute(GheGetByIdInputDto input)
        {
            GheEntity entity = await gheRepository.GetById(input.Id);
            var dto = new GheDto(entity.Id, entity.Nome, entity.AtualizadoEm, entity.NumeroDeRiscos, entity.Versao);
            return new GheGetByIdOutputDto(dto);
        }
    }
}
