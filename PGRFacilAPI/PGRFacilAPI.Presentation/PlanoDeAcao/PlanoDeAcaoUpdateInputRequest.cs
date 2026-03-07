namespace PGRFacilAPI.Presentation.PlanoDeAcao
{
    public record PlanoDeAcaoUpdateInputRequest(string Responsavel, DateTime DataInicio, DateTime DataConclusao, string Descricao);
}
