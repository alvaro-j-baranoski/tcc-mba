namespace PGRFacilAPI.Presentation.Ghe
{
    public record GheGetAllOutputRequest(IEnumerable<GheOutputRequest> Ghes);

    public record GheOutputRequest(Guid Id, string Nome, DateTime AtualizadoEm, int NumeroDeRiscos, Version Versao);
}
