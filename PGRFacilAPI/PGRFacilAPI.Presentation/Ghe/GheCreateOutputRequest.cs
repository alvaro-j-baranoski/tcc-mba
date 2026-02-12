namespace PGRFacilAPI.Presentation.Ghe
{
    public record GheCreateOutputRequest(Guid Id, string Nome, DateTime AtualizadoEm, int NumeroDeRiscos, Version Versao);
}
