using PGRFacilAPI.Application.Dano;
using PGRFacilAPI.Application.Ghe;
using PGRFacilAPI.Application.Perigo;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Risco.RiscoUpdate
{
    public class RiscoUpdateUseCase(IGheRepository gheRepository, IRiscoRepository riscoRepository, IPerigoRepository perigoRepository, IDanoRepository danoRepository)
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

            // Fetch all danos by their IDs
            var danos = new List<DanoEntity>();
            foreach (var danoId in input.DanoIds)
            {
                var dano = await danoRepository.GetById(danoId);
                danos.Add(dano);
            }

            var entity = new RiscoEntity
            {
                Id = input.RiscoId,
                Local = input.Local,
                Atividades = input.Atividades,
                Perigos = perigos,
                Danos = danos,
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
