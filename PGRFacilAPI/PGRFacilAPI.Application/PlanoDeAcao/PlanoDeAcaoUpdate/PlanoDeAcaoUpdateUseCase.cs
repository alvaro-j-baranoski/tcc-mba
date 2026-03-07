using PGRFacilAPI.Application.Risco;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.PlanoDeAcao.PlanoDeAcaoUpdate
{
    public class PlanoDeAcaoUpdateUseCase(IPlanoDeAcaoRepository planoDeAcaoRepository, IRiscoRepository riscoRepository)
    {
        public async Task Execute(PlanoDeAcaoUpdateInputDto input)
        {
            // Checks if Risco exists.
            await riscoRepository.GetById(input.RiscoId);

            var entity = new PlanoDeAcaoEntity
            {
                Responsavel = input.Responsavel,
                DataInicio = input.DataInicio,
                DataConclusao = input.DataConclusao,
                Descricao = input.Descricao,
            };

            await planoDeAcaoRepository.Update(entity, input.RiscoId);
        }
    }
}
