namespace PGRFacilAPI.Application.Perigo.PerigoDelete
{
    public class PerigoDeleteUseCase(IPerigoRepository perigoRepository)
    {
        public async Task Execute(PerigoDeleteInputDto input)
        {
            await perigoRepository.Delete(input.Id);
        }
    }
}
