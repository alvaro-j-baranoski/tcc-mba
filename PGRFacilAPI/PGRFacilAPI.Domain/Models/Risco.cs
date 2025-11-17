using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Domain.Models
{
    public class Risco
    {
        public required string Local { get; set; }

        public required string Atividades { get; set; }
        
        public required string Perigos { get; set; }
        
        public required string Danos { get; set; }
        
        public AgentesDeRisco AgenteDeRisco { get; set; }
        
        public required string TipoDeAvaliacao { get; set; }

        public uint Severidade { get; set; }
        
        public uint Probabilidade { get; set; }
    }
}
