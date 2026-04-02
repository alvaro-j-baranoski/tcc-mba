using PGRFacilAPI.Application.Ghe;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Versao.VersaoGetAll
{
    public class VersaoGetAllUseCase(IVersaoRepository versaoRepository, IGheRepository gheRepository)
    {
        public async Task<VersaoGetAllOutputDto> Execute(VersaoGetAllInputDto input)
        {
            // Check if Ghe exists before querying Versoes.
            await gheRepository.GetById(input.GheId);

            IEnumerable<VersaoEntity> versoes = await versaoRepository.GetAllByGheId(input.GheId);
            List<VersaoDto> result = versoes
                .OrderBy(v => new Version(v.Versao))
                .Select(v => new VersaoDto(v.Id, v.GheId, v.Versao, v.DataCriacao, v.Observacoes))
                .ToList();

            return new VersaoGetAllOutputDto(result);
        }
    }
}
