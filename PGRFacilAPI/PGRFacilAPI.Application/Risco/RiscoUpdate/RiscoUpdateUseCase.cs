using PGRFacilAPI.Application.Ghe;
using PGRFacilAPI.Application.Perigo;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Risco.RiscoUpdate
{
    public class RiscoUpdateUseCase(IGheRepository gheRepository, IRiscoRepository riscoRepository, IPerigoRepository perigoRepository)
    {
        public async Task Execute(RiscoUpdateInputDto input)
        {
            // Checks if GHE exists.
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
                Id = input.RiscoId,
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

            await riscoRepository.Update(entity);
            await gheRepository.UpdateDateTime(input.GheId, DateTime.UtcNow);
        }
    }
}

