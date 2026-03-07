namespace PGRFacilAPI.Presentation.PlanoDeAcao
{
    public record PlanoDeAcaoCreateInputRequest(string Responsavel, DateTime DataInicio, DateTime DataConclusao, string Descricao);
}
