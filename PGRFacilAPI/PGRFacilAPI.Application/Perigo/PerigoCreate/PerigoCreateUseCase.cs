using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Perigo.PerigoCreate
{
    public class PerigoCreateUseCase(IPerigoRepository perigoRepository)
    {
        public async Task<PerigoCreateOutputDto> Execute(PerigoCreateInputDto input)
        {
            var entity = new PerigoEntity
            {
                Descricao = input.Descricao,
            };

            PerigoEntity createdPerigo = await perigoRepository.Create(entity);
            var dto = new PerigoDto(createdPerigo.Id, createdPerigo.Descricao);
            return new PerigoCreateOutputDto(dto);
        }
    }
}
