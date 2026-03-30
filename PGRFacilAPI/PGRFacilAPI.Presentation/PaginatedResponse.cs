using System.Text.Json.Serialization;
using Microsoft.AspNetCore.WebUtilities;

namespace PGRFacilAPI.Presentation
{
    /// <summary>
    /// Represents a paginated response for GET methods that return collections.
    /// </summary>
    public class PaginatedResponse<T>(IEnumerable<T> items, HttpRequest request, bool hasMoreData, int start, int limit) where T : class
    {
        [JsonPropertyName("@nextLink")]
        public string? NextLink { get; set; } = hasMoreData ? request.Path + ParseQueryString(request.QueryString.Value, start, limit) : null;

        public IEnumerable<T> Items { get; set; } = items;

        private static string? ParseQueryString(string? queryString, int start, int limit)
        {
            var query = string.IsNullOrEmpty(queryString) ? [] : QueryHelpers.ParseQuery(queryString);

            query["start"] = (start + limit).ToString();
            query["limit"] = limit.ToString();

            return QueryString.Create(
                query.SelectMany(
                    kvp => kvp.Value,
                    (kvp, value) => new KeyValuePair<string, string?>(kvp.Key, value))
            ).Value;
        }
    }
}
