using PGRFacilAPI.Application.Ghe;

namespace PGRFacilAPI.Application.Risco.RiscoDelete
{
    public class RiscoDeleteUseCase(IGheRepository gheRepository, IRiscoRepository riscoRepository)
    {
        public async Task Execute(RiscoDeleteInputDto input)
        {
            // Checks if GHE exists.
            await gheRepository.GetById(input.GheId);
            await riscoRepository.Delete(input.RiscoId);
            await gheRepository.UpdateDateTime(input.GheId, DateTime.UtcNow);
        }
    }
}
