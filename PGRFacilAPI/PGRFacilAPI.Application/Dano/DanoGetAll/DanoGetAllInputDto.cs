using PGRFacilAPI.Application.Shared;

namespace PGRFacilAPI.Application.Dano.DanoGetAll
{
    public record DanoGetAllInputDto : GetAllInputDto
    {
        public string? Descricao { get; init; }
    }
}
