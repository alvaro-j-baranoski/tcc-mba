namespace PGRFacilAPI.Application.Shared
{
    public record GetAllRepositoryResult<T>(IEnumerable<T> Entities, bool HasMoreData) where T : class;
}
