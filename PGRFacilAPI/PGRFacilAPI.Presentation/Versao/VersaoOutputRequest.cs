using PGRFacilAPI.Application.Versao;

namespace PGRFacilAPI.Presentation.Versao
{
    public record VersaoOutputRequest(int Id, Guid GheId, string Versao, DateOnly DataCriacao, string? Observacoes)
    {
        public static VersaoOutputRequest From(VersaoDto dto)
        {
            return new VersaoOutputRequest(dto.Id, dto.GheId, dto.Versao, dto.DataCriacao, dto.Observacoes);
        }
    }
}
