using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Versao
{
    public interface IVersaoRepository
    {
        /// <summary>
        /// Creates a new Versao in the database.
        /// </summary>
        Task<VersaoEntity> Create(VersaoEntity versao);

        /// <summary>
        /// Checks if a Versao with the same version value already exists for the given GHE.
        /// </summary>
        Task<bool> ExistsByGheIdAndVersao(Guid gheId, string versao);

        /// <summary>
        /// Gets all Versoes for a given GHE.
        /// </summary>
        Task<IEnumerable<VersaoEntity>> GetAllByGheId(Guid gheId);
    }
}
