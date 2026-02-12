namespace PGRFacilAPI.Application.Ghe.GheCreate
{
    public record GheCreateOutputDto(Guid Id, string Nome, DateTime AtualizadoEm, int NumeroDeRiscos, Version Versao);
}
