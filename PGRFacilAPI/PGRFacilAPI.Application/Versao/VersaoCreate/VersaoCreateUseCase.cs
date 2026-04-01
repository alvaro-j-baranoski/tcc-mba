using System.Text.RegularExpressions;
using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Ghe;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Versao.VersaoCreate
{
    public partial class VersaoCreateUseCase(IVersaoRepository versaoRepository, IGheRepository gheRepository)
    {
        [GeneratedRegex(@"^\d+\.\d+$")]
        private static partial Regex VersaoFormatRegex();

        public async Task<VersaoCreateOutputDto> Execute(VersaoCreateInputDto input)
        {
            if (!VersaoFormatRegex().IsMatch(input.Versao))
            {
                throw new ValidationException("O formato da versão é inválido. Use o formato 'X.Y' (ex: 1.0, 2.5).");
            }

            // Check if Ghe exists before adding Versao to the database.
            await gheRepository.GetById(input.GheId);

            // Check if a Versao with the same value already exists for this GHE.
            if (await versaoRepository.ExistsByGheIdAndVersao(input.GheId, input.Versao))
            {
                throw new ValidationException("Já existe uma versão com esse valor para este GHE.");
            }

            var entity = new VersaoEntity
            {
                GheId = input.GheId,
                Versao = input.Versao,
                DataCriacao = DateOnly.FromDateTime(DateTime.UtcNow),
                Observacoes = input.Observacoes,
            };

            VersaoEntity createdEntity = await versaoRepository.Create(entity);
            var dto = new VersaoDto(
                createdEntity.Id,
                createdEntity.GheId,
                createdEntity.Versao,
                createdEntity.DataCriacao,
                createdEntity.Observacoes
            );
            return new VersaoCreateOutputDto(dto);
        }
    }
}
