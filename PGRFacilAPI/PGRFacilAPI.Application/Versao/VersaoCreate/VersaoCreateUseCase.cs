using PGRFacilAPI.Application.Ghe;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Versao.VersaoCreate
{
    public class VersaoCreateUseCase(IVersaoRepository versaoRepository, IGheRepository gheRepository)
    {
        public async Task<VersaoCreateOutputDto> Execute(VersaoCreateInputDto input)
        {
            // Check if Ghe exists before adding Versao to the database.
            await gheRepository.GetById(input.GheId);

            var entity = new VersaoEntity
            {
                GheId = input.GheId,
                Versao = input.Versao,
                DataCriacao = DateOnly.FromDateTime(DateTime.UtcNow),
                Observacoes = input.Observacoes,
            };

            VersaoEntity createdEntity = await versaoRepository.Create(entity);
            var dto = new VersaoDto(
                createdEntity.Id,
                createdEntity.GheId,
                createdEntity.Versao,
                createdEntity.DataCriacao,
                createdEntity.Observacoes
            );
            return new VersaoCreateOutputDto(dto);
        }
    }
}
