using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Dano.DanoCreate
{
    public class DanoCreateUseCase(IDanoRepository danoRepository)
    {
        public async Task<DanoCreateOutputDto> Execute(DanoCreateInputDto input)
        {
            var entity = new DanoEntity
            {
                Descricao = input.Descricao,
            };

            DanoEntity createdDano = await danoRepository.Create(entity);
            var dto = new DanoDto(createdDano.Id, createdDano.Descricao);
            return new DanoCreateOutputDto(dto);
        }
    }
}
