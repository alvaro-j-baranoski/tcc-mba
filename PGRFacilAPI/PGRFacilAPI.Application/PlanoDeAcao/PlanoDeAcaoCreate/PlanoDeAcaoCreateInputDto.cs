namespace PGRFacilAPI.Application.PlanoDeAcao.PlanoDeAcaoCreate
{
    public record PlanoDeAcaoCreateInputDto(Guid RiscoId, string Responsavel, DateTime DataInicio, DateTime DataConclusao, string Descricao);
}
