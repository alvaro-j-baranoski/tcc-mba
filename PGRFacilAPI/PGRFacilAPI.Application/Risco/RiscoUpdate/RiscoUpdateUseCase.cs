using PGRFacilAPI.Application.Ghe;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Risco.RiscoUpdate
{
    public class RiscoUpdateUseCase(IGheRepository gheRepository, IRiscoRepository riscoRepository)
    {
        public async Task Execute(RiscoUpdateInputDto input)
        {
            // Checks if GHE exists.
            await gheRepository.GetById(input.GheId);

            var entity = new RiscoEntity
            {
                Id = input.RiscoId,
                Local = input.Local,
                Perigos = input.Perigos,
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
