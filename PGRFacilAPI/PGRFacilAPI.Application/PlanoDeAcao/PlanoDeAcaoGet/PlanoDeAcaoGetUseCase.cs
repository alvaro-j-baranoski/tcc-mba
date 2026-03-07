using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.PlanoDeAcao.PlanoDeAcaoGet
{
    public class PlanoDeAcaoGetUseCase(IPlanoDeAcaoRepository planoDeAcaoRepository)
    {
        public async Task<PlanoDeAcaoGetOutputDto> Execute(PlanoDeAcaoGetInputDto input)
        {
            PlanoDeAcaoEntity entity = await planoDeAcaoRepository.Get(input.RiscoId);
            var dto = PlanoDeAcaoDto.From(entity);
            return new PlanoDeAcaoGetOutputDto(dto);
        }
    }
}
