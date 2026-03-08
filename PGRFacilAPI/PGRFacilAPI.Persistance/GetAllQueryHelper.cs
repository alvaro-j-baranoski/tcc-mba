using Microsoft.EntityFrameworkCore;

namespace PGRFacilAPI.Persistance
{
    public static class GetAllQueryHelper
    {
        public static async Task<GetAllQueryResult<T>> Query<T>(IQueryable<T> dbSet, int start, int limit) where T : class
        {
            List<T> items = await dbSet.Skip(start).Take(limit).ToListAsync();
            bool hasMoreData = await dbSet.CountAsync() > start + limit;
            return new GetAllQueryResult<T>(items, hasMoreData);
        }
    }

    public record GetAllQueryResult<T>(List<T> Items, bool HasMoreData) where T : class;
}
