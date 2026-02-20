namespace PGRFacilAPI.Presentation.Ghe
{
    public record GheGetByIdOutputRequest(Guid Id, string Nome, DateTime AtualizadoEm, int NumeroDeRiscos, Version Versao);
}
