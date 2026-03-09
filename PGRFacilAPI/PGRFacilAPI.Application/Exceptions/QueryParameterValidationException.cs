namespace PGRFacilAPI.Application.Exceptions
{
    public class QueryParameterValidationException(string message) : Exception
    {
        public override string Message { get; } = message;
    }
}
