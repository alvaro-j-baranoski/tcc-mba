using PGRFacilAPI.Application.Shared;

namespace PGRFacilAPI.Presentation
{
    public static class QueryParameterHelper
    {
        private const string SORT_ASC = "asc";
        private const string SORT_DESC = "desc";

        /// <summary>
        /// Validates the query parameter inputs.
        /// </summary>
        /// <exception cref="QueryParameterValidationException"></exception>
        public static void Validate(int start, int limit, int maxLimit, string sortDirection)
        {
            if (start < 0 || limit < 0)
            {
                throw new QueryParameterValidationException("Parâmetros start e limit devem ser maiores que 0.");
            }

            if (limit > maxLimit)
            {
                throw new QueryParameterValidationException($"Parâmetro limit deve ser menor do que {maxLimit}.");
            }

            if (!sortDirection.Equals(SORT_ASC, StringComparison.InvariantCultureIgnoreCase) && 
                !sortDirection.Equals(SORT_DESC, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new QueryParameterValidationException("Parâmetro sortDirection deve ser asc ou desc.");
            }
        }

        /// <summary>
        /// Serializes the sort direction query parameter into an enum.
        /// </summary>
        /// <exception cref="QueryParameterValidationException"></exception>
        public static SortDirection SerializeSortDirection(string sortDirection) => sortDirection.ToLowerInvariant() switch
        {
            "asc" => SortDirection.Ascendent,
            "desc" => SortDirection.Descendent,
            _ => throw new QueryParameterValidationException("Parâmetro sortDirection deve ser asc ou desc.")
        };
    }

    public class QueryParameterValidationException(string message) : Exception
    {
        public override string Message { get; } = message;
    }
}
