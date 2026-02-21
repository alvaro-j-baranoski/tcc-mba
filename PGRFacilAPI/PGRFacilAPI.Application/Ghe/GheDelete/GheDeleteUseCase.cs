namespace PGRFacilAPI.Application.Ghe.GheDelete
{
    public class GheDeleteUseCase(IGheRepository gheRepository)
    {
        public async Task Execute(GheDeleteInputDto input)
        {
            await gheRepository.Delete(input.Id);
        }
    }
}
