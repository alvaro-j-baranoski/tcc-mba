namespace PGRFacilAPI.Application.Versao.VersaoDelete
{
    public class VersaoDeleteUseCase(IVersaoRepository versaoRepository)
    {
        public async Task Execute(VersaoDeleteInputDto input)
        {
            await versaoRepository.Delete(input.VersaoId);
        }
    }
}
