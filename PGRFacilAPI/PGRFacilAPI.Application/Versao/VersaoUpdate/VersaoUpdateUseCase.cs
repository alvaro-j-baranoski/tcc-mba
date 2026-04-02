using System.Text.RegularExpressions;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Versao.VersaoUpdate
{
    public partial class VersaoUpdateUseCase(IVersaoRepository versaoRepository)
    {
        [GeneratedRegex(@"^\d+\.\d+$")]
        private static partial Regex VersaoFormatRegex();

        public async Task Execute(VersaoUpdateInputDto input)
        {
            if (!VersaoFormatRegex().IsMatch(input.Versao))
            {
                throw new ValidationException("O formato da versão é inválido. Use o formato 'X.Y' (ex: 1.0, 2.5).");
            }

            // Check if a Versao with the same value already exists for this GHE.
            VersaoEntity existing = await versaoRepository.GetById(input.VersaoId);
            if (existing.Versao != input.Versao && await versaoRepository.ExistsByGheIdAndVersao(existing.GheId, input.Versao))
            {
                throw new ValidationException("Já existe uma versão com esse valor para este GHE.");
            }

            var entity = new VersaoEntity
            {
                Versao = input.Versao,
                Observacoes = input.Observacoes,
            };

            await versaoRepository.Update(input.VersaoId, entity);
        }
    }
}
