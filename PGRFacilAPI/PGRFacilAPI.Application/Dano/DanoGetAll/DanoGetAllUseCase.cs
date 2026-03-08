using PGRFacilAPI.Application.Shared;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Dano.DanoGetAll
{
    public class DanoGetAllUseCase(IDanoRepository danoRepository)
    {
        public async Task<DanoGetAllOutputDto> Execute(GetAllInputDto input)
        {
            GetAllRepositoryResult<DanoEntity> result = await danoRepository.GetAll(input.Start, input.Limit, input.SortDirection);

            List<DanoDto> dtos = [];
            foreach (var entity in result.Entities)
            {
                dtos.Add(new DanoDto(entity.Id, entity.Descricao));
            }

            return new DanoGetAllOutputDto(dtos, result.HasMoreData);
        }
    }
}
