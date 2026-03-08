namespace PGRFacilAPI.Presentation
{
    public static class QueryParameterValidationHelper
    {
        public static void Validate(int start, int limit, int maxLimit)
        {
            if (start < 0 || limit < 0)
            {
                throw new QueryParameterValidationException("Parâmetros start e limit devem ser maiores que 0");
            }

            if (limit > maxLimit)
            {
                throw new QueryParameterValidationException($"Parâmetro limit deve ser menor do que {maxLimit}");
            }
        }
    }

    public class QueryParameterValidationException(string message) : Exception 
    {
        public override string Message { get; } = message;
    }
}
