using PGRFacilAPI.Application.Shared;

namespace PGRFacilAPI.Application.Perigo.PerigoGetAll
{
    public record PerigoGetAllInputDto : GetAllInputDto
    {
        public string? Descricao { get; init; }
    }
}
