using PGRFacilAPI.Application.Ghe;
using PGRFacilAPI.Application.Perigo;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Risco.RiscoCreate
{
    public class RiscoCreateUseCase(IGheRepository gheRepository, IRiscoRepository riscoRepository, IPerigoRepository perigoRepository)
    {
        public async Task<RiscoCreateOutputDto> Execute(RiscoCreateInputDto input)
        {
            // Check if GHE exists before adding it to the database.
            await gheRepository.GetById(input.GheId);

            // Fetch all perigos by their IDs
            var perigos = new List<PerigoEntity>();
            foreach (var perigoId in input.PerigoIds)
            {
                var perigo = await perigoRepository.GetById(perigoId);
                perigos.Add(perigo);
            }

            var entity = new RiscoEntity
            {
                Local = input.Local,
                Atividades = input.Atividades,
                Perigos = perigos,
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

