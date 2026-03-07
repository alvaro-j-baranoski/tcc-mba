namespace PGRFacilAPI.Application.PlanoDeAcao
{
    public record PlanoDeAcaoDto(Guid Id, string Responsavel, DateTime DataInicio, DateTime DataConclusao, string Descricao);
}
