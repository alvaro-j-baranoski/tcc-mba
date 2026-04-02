using PGRFacilAPI.Application.Ghe;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Versao.VersaoGetAll
{
    public class VersaoGetAllUseCase(IVersaoRepository versaoRepository, IGheRepository gheRepository)
    {
        public async Task<VersaoGetAllOutputDto> Execute(VersaoGetAllInputDto input)
        {
            // Check if Ghe exists before querying Versoes.
            await gheRepository.GetById(input.GheId);

            IEnumerable<VersaoEntity> versoes = await versaoRepository.GetAllByGheId(input.GheId);
            List<VersaoDto> result = versoes
                .OrderBy(v => v.Versao, new VersaoComparer())
                .Select(v => new VersaoDto(v.Id, v.GheId, v.Versao, v.DataCriacao, v.Observacoes))
                .ToList();

            return new VersaoGetAllOutputDto(result);
        }

        private sealed class VersaoComparer : IComparer<string>
        {
            public int Compare(string? x, string? y)
            {
                var partsX = (x ?? "0.0").Split('.');
                var partsY = (y ?? "0.0").Split('.');

                int majorCompare = int.Parse(partsX[0]).CompareTo(int.Parse(partsY[0]));
                if (majorCompare != 0) return majorCompare;

                return int.Parse(partsX[1]).CompareTo(int.Parse(partsY[1]));
            }
        }
    }
}
