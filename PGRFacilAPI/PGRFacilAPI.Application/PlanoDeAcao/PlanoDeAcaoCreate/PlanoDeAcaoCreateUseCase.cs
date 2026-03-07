using PGRFacilAPI.Application.Risco;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.PlanoDeAcao.PlanoDeAcaoCreate
{
    public class PlanoDeAcaoCreateUseCase(IPlanoDeAcaoRepository planoDeAcaoRepository, IRiscoRepository riscoRepository)
    {
        public async Task<PlanoDeAcaoCreateOutputDto> Execute(PlanoDeAcaoCreateInputDto input)
        {
            // Check if Risco exists before adding PlanoDeAcao to the database.
            await riscoRepository.GetById(input.RiscoId);

            var entity = new PlanoDeAcaoEntity
            {
                Responsavel = input.Responsavel,
                DataInicio = input.DataInicio,
                DataConclusao = input.DataConclusao,
                Descricao = input.Descricao,
            };

            PlanoDeAcaoEntity createdPlanoDeAcao = await planoDeAcaoRepository.Create(entity, input.RiscoId);
            var dto = new PlanoDeAcaoDto(
                createdPlanoDeAcao.Id,
                createdPlanoDeAcao.Responsavel,
                createdPlanoDeAcao.DataInicio,
                createdPlanoDeAcao.DataConclusao,
                createdPlanoDeAcao.Descricao
            );
            return new PlanoDeAcaoCreateOutputDto(dto);
        }
    }
}
