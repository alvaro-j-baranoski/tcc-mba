using PGRFacilAPI.Application.Shared;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Perigo.PerigoGetAll
{
    public class PerigoGetAllUseCase(IPerigoRepository perigoRepository)
    {
        public async Task<PerigoGetAllOutputDto> Execute(PerigoGetAllInputDto input)
        {
            var queryParameters = new GetAllQueryParameters(input.Start, input.Limit, input.SortDirection);
            GetAllRepositoryResult<PerigoEntity> result = await perigoRepository.GetAll(queryParameters, input.Descricao);
            IEnumerable<PerigoDto> dtos = result.Entities.Select(e => new PerigoDto(e.Id, e.Descricao));
            return new PerigoGetAllOutputDto(dtos, result.HasMoreData);
        }
    }
}
