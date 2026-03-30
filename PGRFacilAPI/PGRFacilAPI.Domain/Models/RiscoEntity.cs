using PGRFacilAPI.Domain.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace PGRFacilAPI.Domain.Models
{
    public class RiscoEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Local { get; set; } = string.Empty;
        public string Atividades { get; set; } = string.Empty;
        public IEnumerable<PerigoEntity> Perigos { get; set; } = [];
        public IEnumerable<DanoEntity> Danos { get; set; } = [];
        public AgentesDeRisco Agentes { get; set; }
        public string TipoDeAvaliacao { get; set; } = string.Empty;
        public uint Severidade { get; set; }
        public uint Probabilidade { get; set; }
        public PlanoDeAcaoEntity? PlanoDeAcao { get; set; }

        public uint Significancia => Severidade * Probabilidade;

        public NivelSignificancia NivelSignificancia
        {
            get
            {
                if (Significancia <= 2)
                {
                    return NivelSignificancia.Baixo;
                }
                else if (Significancia <= 6)
                {
                    return NivelSignificancia.Medio;
                }
                else
                {
                    return NivelSignificancia.Alto;
                }
            }
        } 

        public Guid GheId { get; set; }
        public string? GheNome { get; set; }

        public static (int?, int?) GetNivelSignificanciaThresholds(NivelSignificancia? nivelSignificancia)
        {
            return nivelSignificancia switch
            {
                NivelSignificancia.Baixo => (null, 2),
                NivelSignificancia.Medio => (3, 6),
                NivelSignificancia.Alto => (7, null),
                _ => throw new InvalidOperationException(),
            };
        }

    
    }
}
