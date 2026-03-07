using PGRFacilAPI.Application.PlanoDeAcao;

namespace PGRFacilAPI.Presentation.PlanoDeAcao
{
    public record PlanoDeAcaoOutputRequest(Guid Id, string Responsavel, DateTime DataInicio, DateTime DataConclusao, string Descricao)
    {
        /// <summary>
        /// Maps a <see cref="PlanoDeAcaoDto"/> to a <see cref="PlanoDeAcaoOutputRequest"/>.
        /// </summary>
        public static PlanoDeAcaoOutputRequest From(PlanoDeAcaoDto dto)
        {
            return new PlanoDeAcaoOutputRequest(dto.Id, dto.Responsavel, dto.DataInicio, dto.DataConclusao, dto.Descricao);
        }
    }
}
