using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.PlanoDeAcao
{
    public record PlanoDeAcaoDto(Guid Id, string Responsavel, DateTime DataInicio, DateTime DataConclusao, string Descricao)
    {
        public static PlanoDeAcaoDto From(PlanoDeAcaoEntity entity)
        {
            return new PlanoDeAcaoDto(entity.Id, entity.Responsavel, entity.DataInicio, entity.DataConclusao, entity.Descricao);
        }
    }
}
