using PGRFacilAPI.Application.Ghe;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Risco.RiscoCreate
{
    public class RiscoCreateUseCase(IGheRepository gheRepository, IRiscoRepository riscoRepository)
    {
        public async Task<RiscoCreateOutputDto> Execute(RiscoCreateInputDto input)
        {
            var entity = new RiscoEntity
            {
                Local = input.Local,
                Atividades = input.Atividades,
                Perigos = input.Perigos,
                Danos = input.Danos,
                Agentes = input.Agentes,
                TipoDeAvaliacao = input.TipoDeAvaliacao,
                Severidade = input.Severidade,
                Probabilidade = input.Probabilidade,
                GheId = input.GheId,
            };

            RiscoEntity createdRisco = await riscoRepository.Create(entity);
            await gheRepository.UpdateDateTime(input.GheId, DateTime.UtcNow);
            var dto = RiscoDto.From(createdRisco);
            return new RiscoCreateOutputDto(dto);
        }
    }
}
