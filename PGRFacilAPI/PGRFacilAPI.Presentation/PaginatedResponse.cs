using System.Text.Json.Serialization;

namespace PGRFacilAPI.Presentation
{
    /// <summary>
    /// Represents a paginated response for GET methods that return collections.
    /// </summary>
    public class PaginatedResponse<T>(IEnumerable<T> items, string path, bool hasMoreData, int start, int limit) where T : class
    {
        [JsonPropertyName("@nextLink")]
        public string? NextLink { get; set; } = hasMoreData ? $"{path}?start={start + limit}&limit={limit}" : null;

        public IEnumerable<T> Items { get; set; } = items;
    }
}
