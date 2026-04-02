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
            List<VersaoDto> result = [];

            foreach (VersaoEntity versao in versoes)
            {
                result.Add(new VersaoDto(versao.Id, versao.GheId, versao.Versao, versao.DataCriacao, versao.Observacoes));
            }

            return new VersaoGetAllOutputDto(result);
        }
    }
}
