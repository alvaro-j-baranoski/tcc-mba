namespace PGRFacilAPI.Application.Versao
{
    public record VersaoDto(int Id, Guid GheId, string Versao, DateOnly DataCriacao, string? Observacoes);
}
