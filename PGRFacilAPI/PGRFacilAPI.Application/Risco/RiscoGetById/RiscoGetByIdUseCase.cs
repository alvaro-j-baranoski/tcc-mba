using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Risco.RiscoGetById
{
    public class RiscoGetByIdUseCase(IRiscoRepository riscoRepository)
    {
        public async Task<RiscoGetByIdOutputDto> Execute(RiscoGetByIdInputDto input)
        {
            RiscoEntity entity = await riscoRepository.GetById(input.GheId, input.RiscoId);
            var dto = RiscoDto.From(entity);
            return new RiscoGetByIdOutputDto(dto);
        }
    }
}
