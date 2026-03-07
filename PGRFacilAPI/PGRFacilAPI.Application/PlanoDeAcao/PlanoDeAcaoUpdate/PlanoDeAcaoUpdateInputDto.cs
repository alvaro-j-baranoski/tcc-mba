namespace PGRFacilAPI.Application.PlanoDeAcao.PlanoDeAcaoUpdate
{
    public record PlanoDeAcaoUpdateInputDto(Guid RiscoId, string Responsavel, DateTime DataInicio, DateTime DataConclusao, string Descricao);
}
