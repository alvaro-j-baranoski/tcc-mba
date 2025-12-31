using PGRFacilAPI.Application.DTOs;

namespace PGRFacilAPI.Application.Services
{
    public interface IRelatoriosService
    {
        Task<MatrizDeRiscoDTO> GetMatrizDeRisco();
    }
}
