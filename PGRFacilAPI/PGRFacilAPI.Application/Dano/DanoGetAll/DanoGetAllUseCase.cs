using PGRFacilAPI.Application.Shared;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Dano.DanoGetAll
{
    public class DanoGetAllUseCase(IDanoRepository danoRepository)
    {
        public async Task<DanoGetAllOutputDto> Execute(DanoGetAllInputDto input)
        {
            var queryParameters = new GetAllQueryParameters(input.Start, input.Limit, input.SortDirection);
            GetAllRepositoryResult<DanoEntity> result = await danoRepository.GetAll(queryParameters, input.Descricao);
            IEnumerable<DanoDto> dtos = result.Entities.Select(e => new DanoDto(e.Id, e.Descricao));
            return new DanoGetAllOutputDto(dtos, result.HasMoreData);
        }
    }
}
