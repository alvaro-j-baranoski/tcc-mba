using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Perigo.PerigoUpdate
{
    public class PerigoUpdateUseCase(IPerigoRepository perigoRepository)
    {
        public async Task Execute(PerigoUpdateInputDto input)
        {
            var entity = new PerigoEntity
            {
                Id = input.Id,
                Descricao = input.Descricao,
            };

            await perigoRepository.Update(entity);
        }
    }
}
