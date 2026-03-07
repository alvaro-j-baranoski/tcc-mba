using PGRFacilAPI.Application.Risco;

namespace PGRFacilAPI.Application.PlanoDeAcao.PlanoDeAcaoDelete
{
    public class PlanoDeAcaoDeleteUseCase(IPlanoDeAcaoRepository planoDeAcaoRepository, IRiscoRepository riscoRepository)
    {
        public async Task Execute(PlanoDeAcaoDeleteInputDto input)
        {
            // Checks if Risco exists.
            await riscoRepository.GetById(input.RiscoId);
            await planoDeAcaoRepository.Delete(input.RiscoId);
        }
    }
}
