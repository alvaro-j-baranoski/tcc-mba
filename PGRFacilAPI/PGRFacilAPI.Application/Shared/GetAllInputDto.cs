namespace PGRFacilAPI.Application.Shared
{
    public abstract record GetAllInputDto
    {
        public int Start { get; init; }
        public int Limit { get; init; }
        public SortDirection SortDirection { get; init; }
    }
}
