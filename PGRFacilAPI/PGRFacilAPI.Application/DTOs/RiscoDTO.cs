namespace PGRFacilAPI.Application.DTOs
{
    public class RiscoDTO
    {
        public Guid Guid { get; set; }

        public required string Local { get; set; }

        public required string Atividades { get; set; }
        
        public required string Perigos { get; set; }
        
        public required string Danos { get; set; }
        
        public required string AgenteDeRisco { get; set; }
        
        public required string TipoDeAvaliacao { get; set; }

        public uint Severidade { get; set; }
        
        public uint Probabilidade { get; set; }
    }
}
