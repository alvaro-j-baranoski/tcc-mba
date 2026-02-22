using PGRFacilAPI.Application.Ghe;

namespace PGRFacilAPI.Presentation.Ghe
{
    public record GheOutputRequest(Guid Id, string Nome, DateTime AtualizadoEm, int NumeroDeRiscos, Version Versao)
    {
        public static GheOutputRequest From(GheDto dto)
        {
            return new GheOutputRequest(dto.Id, dto.Nome, dto.AtualizadoEm, dto.NumeroDeRiscos, dto.Versao);
        }
    }
}
