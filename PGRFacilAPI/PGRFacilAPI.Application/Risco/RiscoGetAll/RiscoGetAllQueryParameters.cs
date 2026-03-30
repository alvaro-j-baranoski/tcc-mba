using PGRFacilAPI.Application.Shared;
using System.Reflection;

namespace PGRFacilAPI.Application.Risco.RiscoGetAll
{
    public record RiscoGetAllQueryParameters(int Start, int Limit, SortDirection SortDirection, string? SortBy) : GetAllQueryParameters(Start, Limit, SortDirection);
}
