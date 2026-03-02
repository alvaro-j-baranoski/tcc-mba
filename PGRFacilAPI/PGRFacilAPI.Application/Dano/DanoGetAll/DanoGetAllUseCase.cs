using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Dano.DanoGetAll
{
    public class DanoGetAllUseCase(IDanoRepository danoRepository)
    {
        public async Task<DanoGetAllOutputDto> Execute()
        {
            IEnumerable<DanoEntity> entities = await danoRepository.GetAll();

            List<DanoDto> dtos = [];
            foreach (var entity in entities)
            {
                dtos.Add(new DanoDto(entity.Id, entity.Descricao));
            }

            return new DanoGetAllOutputDto(dtos);
        }
    }
}
