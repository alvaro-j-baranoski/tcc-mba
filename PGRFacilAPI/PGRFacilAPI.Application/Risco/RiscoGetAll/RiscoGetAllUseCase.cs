using PGRFacilAPI.Application.Ghe;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Risco.RiscoGetAll
{
    public class RiscoGetAllUseCase(IGheRepository gheRepository, IRiscoRepository riscoRepository)
    {
        public async Task<RiscoGetAllOutputDto> Execute(RiscoGetAllInputDto input)
        {
            // Checks if GHE exists
            await gheRepository.GetById(input.GheId);
            
            IEnumerable<RiscoEntity> entities = await riscoRepository.GetAll(input.GheId);
            
            List<RiscoDto> dtos = [];
            foreach (var entity in entities)
            {
                dtos.Add(RiscoDto.From(entity));
            }

            return new RiscoGetAllOutputDto(dtos);
        }
    }
}
