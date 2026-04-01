namespace PGRFacilAPI.Application.Exceptions
{
    public class ValidationException(string message) : Exception
    {
        public override string Message { get; } = message;
    }
}
