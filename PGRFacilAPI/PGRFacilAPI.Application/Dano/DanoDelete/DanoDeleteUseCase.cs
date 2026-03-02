namespace PGRFacilAPI.Application.Dano.DanoDelete
{
    public class DanoDeleteUseCase(IDanoRepository danoRepository)
    {
        public async Task Execute(DanoDeleteInputDto input)
        {
            await danoRepository.Delete(input.Id);
        }
    }
}
