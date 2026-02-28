using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Perigo.PerigoGetAll
{
    public class PerigoGetAllUseCase(IPerigoRepository perigoRepository)
    {
        public async Task<PerigoGetAllOutputDto> Execute()
        {
            IEnumerable<PerigoEntity> entities = await perigoRepository.GetAll();

            List<PerigoDto> dtos = [];
            foreach (var entity in entities)
            {
                dtos.Add(new PerigoDto(entity.Id, entity.Descricao));
            }

            return new PerigoGetAllOutputDto(dtos);
        }
    }
}
