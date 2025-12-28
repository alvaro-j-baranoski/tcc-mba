using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Domain.Models
{
    public class Risco
    {
        public Guid Guid { get; set; } = Guid.NewGuid();
        public string Local { get; set; } = string.Empty;
        public string Atividades { get; set; } = string.Empty;
        public string Perigos { get; set; } = string.Empty;
        public string Danos { get; set; } = string.Empty;
        public AgentesDeRisco AgentesDeRisco { get; set; }
        public string TipoDeAvaliacao { get; set; } = string.Empty;
        public uint Severidade { get; set; }
        public uint Probabilidade { get; set; }
    
        public Guid? ProgramaID { get; set; }
        public Programa? Programa { get; set; }
    }
}
