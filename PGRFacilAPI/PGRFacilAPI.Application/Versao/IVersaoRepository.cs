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

        /// <summary>
        /// Gets a Versao by its ID.
        /// </summary>
        /// <exception cref="Application.Exceptions.EntityNotFoundException"/>
        Task<VersaoEntity> GetById(int id);

        /// <summary>
        /// Updates a Versao entry.
        /// </summary>
        /// <exception cref="Application.Exceptions.EntityNotFoundException"/>
        Task Update(int id, VersaoEntity entity);

        /// <summary>
        /// Deletes a Versao from the table based on the id.
        /// </summary>
        /// <exception cref="Application.Exceptions.EntityNotFoundException"/>
        Task Delete(int id);
    }
}
