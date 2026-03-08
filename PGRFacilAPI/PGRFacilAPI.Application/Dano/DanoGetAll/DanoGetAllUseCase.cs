using PGRFacilAPI.Application.Shared;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Dano.DanoGetAll
{
    public class DanoGetAllUseCase(IDanoRepository danoRepository)
    {
        public async Task<DanoGetAllOutputDto> Execute(GetAllInputDto input)
        {
            IEnumerable<DanoEntity> entities = await danoRepository.GetAll(input.Start, input.Limit);

            List<DanoDto> dtos = [];
            foreach (var entity in entities)
            {
                dtos.Add(new DanoDto(entity.Id, entity.Descricao));
            }

            return new DanoGetAllOutputDto(dtos);
        }
    }
}
