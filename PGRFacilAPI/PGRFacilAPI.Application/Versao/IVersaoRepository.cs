using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Application.Versao
{
    public interface IVersaoRepository
    {
        /// <summary>
        /// Creates a new Versao in the database.
        /// </summary>
        Task<VersaoEntity> Create(VersaoEntity versao);
    }
}
