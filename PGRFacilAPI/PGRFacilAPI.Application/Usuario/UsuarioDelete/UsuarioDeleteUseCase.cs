namespace PGRFacilAPI.Application.Usuario.UsuarioDelete
{
    public class UsuarioDeleteUseCase(IUsuarioRepository userRepository)
    {
        public async Task Execute(UsuarioDeleteInputDto input)
        {
            await userRepository.DeleteAsync(input.Id);
        }
    }
}
