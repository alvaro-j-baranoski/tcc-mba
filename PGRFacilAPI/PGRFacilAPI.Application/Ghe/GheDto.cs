namespace PGRFacilAPI.Application.Ghe
{
    public record GheDto(Guid Id, string Nome, DateTime AtualizadoEm, int NumeroDeRiscos, Version Versao);
}
