using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Dano.DanoUpdate
{
    public class DanoUpdateUseCase(IDanoRepository danoRepository)
    {
        public async Task Execute(DanoUpdateInputDto input)
        {
            var entity = new DanoEntity
            {
                Id = input.Id,
                Descricao = input.Descricao,
            };

            await danoRepository.Update(entity);
        }
    }
}
